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
import Sidebar from "./components/Sidebar";
import "./index.css";
import Axios from "../../auth/Autherization";

import { v4 as uuidv4 } from "uuid";

import NodeEditor from "./components/NodeEditor";

const getId = () => uuidv4();

const FlowPage = () => {
  const reactFlowWrapper = useRef(null);
  const [nodes, setNodes, onNodesChange] = useNodesState();
  const [edges, setEdges, onEdgesChange] = useEdgesState();
  const [reactFlowInstance, setReactFlowInstance] = useState(null);
  const [variant, setVariant] = useState("lines");
  const [editValue, setEditValue] = useState("");
  const [selectedNodeId, setSelectedNodeId] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [sequenceId, setSequenceId] = useState(null);
  const [userId, setUserId] = useState(null);

  useEffect(() => {
    const getCurrentUserId = () => {
      const token = localStorage.getItem("token");
      if (token) {
        // Split the token by '.' and decode the payload (second part)
        const payload = token.split(".")[1];
        const decodedPayload = atob(payload);

        const { id } = JSON.parse(decodedPayload);
       
        setUserId(id);
      } else {
        return null;
      }
    };
    getCurrentUserId();
  }, []);

 
console.log(userId);
  useEffect(() => {
    const fetchFlows = async () => {
      try {
        console.log(userId);
        const response = await Axios.get(`/api/flow/${userId}`);
        const flows = response.data.data || [];

        // Extract nodes and edges from each flow object
        const allNodes = flows.flatMap((flow) => flow.nodes);
        const allEdges = flows.flatMap((flow) => flow.edges);
        setNodes(allNodes);
        setEdges(allEdges);

        if (flows.length > 0) {
          setSequenceId(flows[0].sequenceId);
        }
      } catch (error) {
        console.error("Error fetching flows:", error);
      }
    };

    fetchFlows();
  }, [userId]);

  useEffect(() => {
    // Add initial edges connecting the "main node" to both "input-1 node" and "input-2 node"
    const initialEdges = [
      { id: "e1-2", source: "1", target: "2", animated: true, type: "step" },
      { id: "e1-3", source: "1", target: "3", animated: true, type: "step" },
    ];
    setEdges(initialEdges);
  }, [setEdges]);

  const onNodeClick = (event, node) => {
    setEditValue(node.data.label);
    setSelectedNodeId(node.id); // Store the id of the selected node
    setIsEditing(true);
  };

  const handleChange = (event) => {
    setEditValue(event.target.value);
  };

  const handleCancel = () => {
    setIsEditing(false); // Update editValue state with the new value
  };

  const onDeleteSelectedNode = async (userId, nodeId) => {
    try {
      await Axios.delete(`/api/flow/${userId}/node/${nodeId}`);
      console.log("Node deleted successfully");

      // Update the local state to reflect the deletion
      const updatedNodes = nodes.filter((node) => node.id !== selectedNodeId);
      setNodes(updatedNodes);
      setEdges((edges) =>
        edges.filter(
          (edge) =>
            edge.source !== selectedNodeId && edge.target !== selectedNodeId
        )
      );

      setEditValue("");
      setIsEditing(false);
    } catch (error) {
      console.error("Error deleting node:", error);
    }
  };

  const handleEdit = async () => {
    if (!selectedNodeId) return; // If no node is selected, return

    try {
      const updatedNodes = nodes.map((node) => {
        if (node.id === selectedNodeId) {
          return {
            ...node,
            data: {
              ...node.data,
              label: editValue,
            },
          };
        }
        return node;
      });

      await Axios.patch(`/api/flow/${userId}/node/${selectedNodeId}`, {
        label: editValue,
      });

      setNodes(updatedNodes);

      setEditValue("");
      setIsEditing(false);
    } catch (error) {
      console.error("Error updating node label:", error);
    }
  };

  const onConnect = useCallback((params) => {
    const newEdge = {
      id: getId(), // Generate a unique ID for the edge
      source: params.source,
      target: params.target,
      type: "step",
    };
    setEdges((edges) => addEdge(newEdge, edges));
  }, []);

  
  const onDragOver = useCallback((event) => {
    event.preventDefault();
    event.dataTransfer.dropEffect = "move";
  }, []);

  const onDrop = useCallback(
    async (event) => {
      event.preventDefault();

      const type = event.dataTransfer.getData("application/reactflow");

      // Check if the dropped element is valid
      if (typeof type === "undefined" || !type) {
        return;
      }

      // Get the position of the drop event
      const position = reactFlowInstance.screenToFlowPosition({
        x: event.clientX,
        y: event.clientY,
      });

      // Create a new node based on the type and position
      const newNode = {
        id: getId(),
        type,
        position,
        data: { label: `${type}` || null },
      };

      // Add the new node to the list of nodes
      setNodes((nds) => nds.concat(newNode));

      if (type === "user") {
        try {
          await Axios.post("/api/createflow", {
            userId: userId,
            title: "user1",
            nodes: [newNode],
            edges: [edges],
          });
        } catch (error) {
          console.error("Error posting flow data:", error);
        }
      } else {
        try {
          await Axios.post("/api/flow", {
            userId: userId,
            title: "Your sequence title",
            nodes: [newNode],
            edges: [edges],
          });
        } catch (error) {
          console.error("Error posting flow data:", error);
        }
      }
    },
    [reactFlowInstance, edges]
  );

  return (
    <div className="dndflow">
         {isEditing && (
        <NodeEditor
          editValue={editValue}
          handleChange={handleChange}
          handleEdit={handleEdit}
          handleCancel={handleCancel}
          onDeleteSelectedNode={onDeleteSelectedNode}
          userId={userId}
          selectedNodeId={selectedNodeId}
        />
      )}
      <ReactFlowProvider>
        <div
          className="reactflow-wrapper"
          style={{ height: 900, marginTop: "-300px" }}
          ref={reactFlowWrapper}
        >
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

export default FlowPage;
