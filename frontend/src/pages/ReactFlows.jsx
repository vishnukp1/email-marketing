import { useCallback, useState } from 'react';
import ReactFlow, { addEdge, applyEdgeChanges, applyNodeChanges, Background, Controls, MiniMap } from 'reactflow';
import 'reactflow/dist/style.css';

import initialNodes from './Node';
import initialEdges from './Edge';

function CustomNode({ label, type }) {
  const onDragStart = (event) => {
    event.dataTransfer.setData('application/reactflow', type);
    event.dataTransfer.effectAllowed = 'move';
  };

  return (
    <div
      className={`border-${type.toLowerCase()}-200`}
      draggable
      onDragStart={(event) => onDragStart(event)}
    >
      {label}
    </div>
  );
}

function Flow() {
  const [nodes, setNodes] = useState(initialNodes);
  const [edges, setEdges] = useState(initialEdges);

  const onNodesChange = useCallback(
    (changes) => setNodes((nds) => applyNodeChanges(changes, nds)),
    [setNodes]
  );
  const onEdgesChange = useCallback(
    (changes) => setEdges((eds) => applyEdgeChanges(changes, eds)),
    [setEdges]
  );
  const onConnect = useCallback(
    (connection) => setEdges((eds) => addEdge(connection, eds)),
    [setEdges]
  );

  return (
    <div style={{ height: 700 }}>
      <ReactFlow
        nodes={nodes}
        edges={edges}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        onConnect={onConnect}
        fitView
      >
        <MiniMap />
        <Controls />
        <Background variant="lines" />
      </ReactFlow>

      {/* Custom nodes */}
      <div className="flex mt-10 flex-col gap-5">
        <CustomNode label="Send Email" type="Input" />
        <CustomNode label="Wait" type="Decision" />
        <CustomNode label="Decision" type="Output" />
      </div>
    </div>
  );
}

export default Flow;
