import { useState, useRef, useCallback, useEffect } from 'react';
import ReactFlow, { ReactFlowProvider, addEdge, Controls, Background } from 'reactflow';
import 'reactflow/dist/style.css';
import Sidebar from './Sidebar';


const DnDFlow = ({ flow, onCreateFlow, onUpdateFlow, onDeleteFlow, selectedFlow }) => {
  const reactFlowWrapper = useRef(null);
  const [elements, setElements] = useState([]);
  const [editValue, setEditValue] = useState('');
  const [selectedNodeId, setSelectedNodeId] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  console.log(flow,"eleee");

  useEffect(() => {
    if (selectedFlow) {
      const nodes = selectedFlow.nodes.map(node => ({
        ...node,
        position: {
          x: node.position.x,
          y: node.position.y
        }
      }));
      
      const edges = selectedFlow.edges.map(edge => ({
        ...edge,
        id: edge.id,
        source: edge.source,
        target: edge.target
      }));
      
      setElements([...nodes, ...edges]);
    }
  }, [selectedFlow]);
  
  const onConnect = useCallback(
    (params) => setElements((els) => addEdge(params, els)),
    []
  );

  const onNodeDragStop = useCallback(
    async (event, node) => {
      if (onUpdateFlow) {
        const updatedElements = elements.map(el =>
          el.id === node.id ? { ...el, position: node.position } : el
        );
        setElements(updatedElements);
        await onUpdateFlow(updatedElements.filter(el => !el.source && !el.target)); // Exclude edges
      }
    },
    [elements, onUpdateFlow]
  );

  const onElementsRemove = useCallback(
    async (elementsToRemove) => {
      if (onDeleteFlow) {
        const elementsToRemoveIds = elementsToRemove.map(el => el.id);
        await onDeleteFlow(elementsToRemoveIds);
      }
      setElements((els) => removeElements(elementsToRemove, els));
    },
    [onDeleteFlow]
  );

  const handleEdit = () => {
    if (!selectedNodeId) return;

    const updatedNodes = elements.map((el) => {
      if (el.id === selectedNodeId && el.type !== 'input') {
        return {
          ...el,
          data: {
            ...el.data,
            label: editValue,
          },
        };
      }
      return el;
    });

    setElements(updatedNodes);
    setIsEditing(false);
  };

  const handleCancel = () => {
    setIsEditing(false);
    setEditValue('');
  };

  const onDeleteSelectedNode = () => {
    if (!selectedNodeId) return;

    const updatedElements = elements.filter((el) => el.id !== selectedNodeId);
    setElements(updatedElements);
    setIsEditing(false);
  };

  const handleChange = (event) => {
    setEditValue(event.target.value);
  };

  return (
    <div className="dndflow">
      <ReactFlowProvider>
        <div className="reactflow-wrapper" style={{ height: 900, marginTop: '-300px' }} ref={reactFlowWrapper}>
          <ReactFlow
            elements={elements}
            onConnect={onConnect}
      
            nodesDraggable={!selectedFlow}
            zoomOnScroll={!selectedFlow}
          
            deleteKeyCode={46}
            selectNodesOnDrag={!selectedFlow}
            fitView
          >
            <Background color="#fff" gap={16} />
            <Controls />
          </ReactFlow>
        </div>
      </ReactFlowProvider>

      {isEditing && (
        <div className="updatenode-controls">
          <label>Label:</label>
          <br />
          <input type="text" value={editValue} onChange={handleChange} />
          <button className="bts" onClick={handleEdit}>
            Update
          </button>
          <button className="bts" onClick={handleCancel}>
            Cancel
          </button>
          <button onClick={onDeleteSelectedNode}>Delete Node</button>
        </div>
      )}
      <Sidebar/>
    </div>
  );
};

export default DnDFlow;
