import { EditState } from "../types/EditState";

type Props = {
  editing: EditState;
  setEditing: (state: EditState) => void;
  onSave: () => void;
  onCancel: () => void;
};

const TodoEditItem = ({ editing, setEditing, onSave, onCancel }: Props) => {
  // Memoize the event handler to prevent unnecessary re-renders
  const handleDescriptionChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEditing({ ...editing, description: e.target.value });
  };

  const handleDueDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEditing({ ...editing, dueDate: e.target.value });
  };

  const handleIsDoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEditing({ ...editing, isDone: e.target.checked });
  };

  return (
    <div className="w-100 row g-3">
      <div className="col-md-4">
        <input
          className="form-control"
          value={editing.description || ""}
          onChange={handleDescriptionChange}
        />
      </div>
      <div className="col-md-3">
        <input
          type="date"
          className="form-control"
          value={editing.dueDate}
          onChange={handleDueDateChange}
        />
      </div>
      <div className="col-md-3">
        <div className="form-check">
          <input
            className="form-check-input"
            type="checkbox"
            checked={editing.isDone}
            onChange={handleIsDoneChange}
          />
          <label className="form-check-label">Completed</label>
        </div>
      </div>
      <div className="col-md-2">
        <button className="btn btn-success btn-sm me-2" onClick={onSave}>
          Save
        </button>
        <button className="btn btn-secondary btn-sm" onClick={onCancel}>
          Cancel
        </button>
      </div>
    </div>
  );
};

export default TodoEditItem;
