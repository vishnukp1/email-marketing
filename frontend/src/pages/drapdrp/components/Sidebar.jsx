const SidebarNode = ({ nodeType, label, className, onDragStart }) => {
  return (
    <div className={`dndnode ${className}`} onDragStart={(event) => onDragStart(event, nodeType)} draggable>
      {label}
    </div>
  );
};

const Sidebar = () => {
  const onDragStart = (event, nodeType) => {
    event.dataTransfer.setData('application/reactflow', nodeType);
    event.dataTransfer.effectAllowed = 'move';
  };

  return (
    <aside>
      <div className="mb-8">
        <div className="description text-base mb-4">Drag these nodes</div>
        <SidebarNode nodeType="Sent email" label="Sent email" className="input" onDragStart={onDragStart} />
        <SidebarNode nodeType="Pending" label="Pending" className="" onDragStart={onDragStart} />
        <SidebarNode nodeType="Decision" label="Decision" className="output" onDragStart={onDragStart} />
      </div>
      <div className="description text-base mb-4">Create new customer</div>
      <SidebarNode nodeType="Add new user" label="Add new user" className="input" onDragStart={onDragStart} />
    </aside>
  );
};

export default Sidebar;
