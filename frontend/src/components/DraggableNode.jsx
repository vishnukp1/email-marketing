import "../pages/drapdrp/index.css"
const DraggableNode = ({ nodeType, onDragStart }) => {
    return (
      <div className="dndnode" onDragStart={(event) => onDragStart(event, nodeType)} draggable>
        {nodeType}
      </div>
    );
  };
  
  export default DraggableNode;
  