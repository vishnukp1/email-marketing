const Sidebar = () => {
    const onDragStart = (event, nodeType) => {
      event.dataTransfer.setData('application/reactflow', nodeType);
      event.dataTransfer.effectAllowed = 'move';
    };
  
    return (
      <aside>
        <div className="description">You can drag these nodes to the pane on the right.</div>
        <div className="dndnode input" onDragStart={(event) => onDragStart(event, 'Sent email')} draggable>
         Sent email
        </div>
        <div className="dndnode" onDragStart={(event) => onDragStart(event, 'Pending')} draggable>
         Pending
        </div>
        <div className="dndnode output" onDragStart={(event) => onDragStart(event, 'Decision')} draggable>
        Decision
        </div>
      </aside>
    );
  };
  
  export default Sidebar;
  