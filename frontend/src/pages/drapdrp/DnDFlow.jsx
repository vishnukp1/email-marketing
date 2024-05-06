import { useState, useRef, useCallback, useEffect } from "react";
import ReactFlow, {
  ReactFlowProvider,
  addEdge,
  useNodesState,
  useEdgesState,
  Controls,
  Background,
} from "reactflow";
import "reactflow/dist/style.css";

import Sidebar from "./Sidebar";

import "./index.css";
import Node from "../Node";
import Edge from "../Edge";

const initialNodes = [
  { id: "1",
  type: "input",
  data: { label: "main node" },
  position: { x: 0, y: -80 },}
  ,
  {
    id: "2",
    type: "input",
    data: { label: "input-1 node" },
    position: { x: -200, y: 0},
  },
  {
    id: "3",
    type: "input",
    data: { label: "input-2 node" },
    position: { x: 200, y: 0 },
  },
];


let id = 0;
const getId = () => `dndnode_${id++}`;

const DnDFlow = () => {
  const reactFlowWrapper = useRef(null);
  const [nodes, setNodes, onNodesChange] = useNodesState(Node);
  const [edges, setEdges, onEdgesChange] = useEdgesState(Edge);
  const [reactFlowInstance, setReactFlowInstance] = useState(null);
  const [variant, setVariant] = useState("lines");
  const [editValue, setEditValue] = useState("");
  const [selectedNodeId, setSelectedNodeId] = useState(null); // Rename id state variable
  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    // Add initial edges connecting the "main node" to both "input-1 node" and "input-2 node"
    const initialEdges = [
      { id: 'e1-2', source: '1', target: '2', animated: true, type: "step" },
      { id: 'e1-3', source: '1', target: '3', animated: true, type: "step" }
    ];
    setEdges(initialEdges);
  }, [setEdges]);
  const onNodeClick = (event, node) => {
    setEditValue(node.data.label);
    setSelectedNodeId(node.id); // Store the id of the selected node
    setIsEditing(true)
  };

  const handleChange = (event) => {
    setEditValue(event.target.value); // Update editValue state with the new value
  };

  const handleCancel = () => {
    setIsEditing(false)// Update editValue state with the new value
  };

  const onDeleteSelectedNode = () => {
    if (!selectedNodeId) return;
  
    const updatedNodes = nodes.filter((node) => node.id !== selectedNodeId);
    setNodes(updatedNodes);
    setEdges((edges) =>
      edges.filter((edge) => edge.source !== selectedNodeId && edge.target !== selectedNodeId)
    );
  
    setEditValue("");
    setIsEditing(false);
  };
  


  const handleEdit = () => {
    if (!selectedNodeId) return; // If no node is selected, return

    const updatedNodes = nodes.map((node) => {
      if (node.id === selectedNodeId) {
        return {
          ...node,
          data: {
            ...node.data,
            label: editValue, // Update the label of the selected node
          },
        };
      }
      return node;
    });

    setNodes(updatedNodes);
    setEditValue("");
    setIsEditing(false);
  };
  const onConnect = useCallback(
    (params) => setEdges((eds) => addEdge(params, eds)),
    []
  );

  const onDragOver = useCallback((event) => {
    event.preventDefault();
    event.dataTransfer.dropEffect = "move";
  }, []);

  const onDrop = useCallback(
    (event) => {
      event.preventDefault();

      const type = event.dataTransfer.getData("application/reactflow");

      // check if the dropped element is valid
      if (typeof type === "undefined" || !type) {
        return;
      }

      // reactFlowInstance.project was renamed to reactFlowInstance.screenToFlowPosition
      // and you don't need to subtract the reactFlowBounds.left/top anymore
      // details: https://reactflow.dev/whats-new/2023-11-10
      const position = reactFlowInstance.screenToFlowPosition({
        x: event.clientX,
        y: event.clientY,
      });
      const newNode = {
        id: getId(),
        type,
        position,
        data: { label: `${type} node` },
      };

      setNodes((nds) => nds.concat(newNode));
    },
    [reactFlowInstance]
  );

  return (
    <div className="dndflow"  >
      {isEditing && (
        <div className="updatenode-controls">
          <label>labels:</label>
          <br />
          <input type="text" value={editValue} onChange={handleChange} />
          <button className="bts" onClick={handleEdit}>
            update
          </button>
          <button className="bts" onClick={handleCancel}>
           cancel
          </button>
          <button onClick={onDeleteSelectedNode} >delete-Nodes</button>
        </div>
      )}

      <ReactFlowProvider>
        <div className="reactflow-wrapper"  style={{height:900,marginTop:"-300px"}} ref={reactFlowWrapper}>
          <ReactFlow
            nodes={nodes}
            edges={edges}
            onNodeClick={(e, val) => onNodeClick(e, val)}
            onNodesChange={onNodesChange}
            onEdgesChange={onEdgesChange}
            onConnect={onConnect}
            onInit={setReactFlowInstance}
            onDrop={onDrop}
            onDragOver={onDragOver}
        
            fitView
          >
            <Background color="#99b3ec" variant={variant} />
            <Controls />
          </ReactFlow>
          
        </div>
        <Sidebar />
      </ReactFlowProvider>
    </div>
  );
};

export default DnDFlow;
