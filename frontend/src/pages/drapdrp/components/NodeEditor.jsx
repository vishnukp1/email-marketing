
import Button from '../../../components/Button';

const NodeEditor = ({ editValue, handleChange, handleEdit, handleCancel, onDeleteSelectedNode, userId, selectedNodeId }) => {
  return (
    <div className="w-[220px]">
      <label className="block text-center mb-2 text-[18px]">Edit selected node</label>
      <input
        type="text"
        value={editValue}
        onChange={handleChange}
        className="border border-gray-800 rounded px-3 py-1 mx-2 mb-2 w-full"
        style={{ borderWidth: '1px', borderColor: 'red' }} // Add inline styles to override
      />

      <Button onClick={handleEdit} className="btn-primary">Update</Button>
      <Button onClick={handleCancel} className="btn-secondary">Cancel</Button>
      <Button onClick={() => onDeleteSelectedNode(userId, selectedNodeId)} className="btn-danger border-1">Delete Nodes</Button>
    </div>
  );
};

export default NodeEditor;
