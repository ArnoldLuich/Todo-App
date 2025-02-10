import { EditState } from "../types/EditState";

type Props = {
  editing: EditState;
  setEditing: (state: EditState) => void;
  onSave: () => void;
  onCancel: () => void;
};

const TodoEditItem = ({ editing, setEditing, onSave, onCancel }: Props) => {
  // Handles changes to the description input field
  const handleDescriptionChange = (e: React.ChangeEvent<HTMLInputElement>) => { //useCallback ensures the function does not get recreated on every render
    setEditing({ ...editing, description: e.target.value });
  };

  // Handles changes to the due date input field
  const handleDueDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEditing({ ...editing, dueDate: e.target.value });
  };

  // Handles changes to the "isDone" checkbox
  const handleIsDoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEditing({ ...editing, isDone: e.target.checked });
  };

  return (
    <div className="w-100 row g-3">
      {/* Input field for editing the task description */}
      <div className="col-md-4">
        <input
          className="form-control"
          value={editing.description || ""}
          onChange={handleDescriptionChange}
        />
      </div>

      {/* Input field for setting the due date */}
      <div className="col-md-3">
        <input
          type="date"
          className="form-control"
          value={editing.dueDate}
          onChange={handleDueDateChange}
        />
      </div>

      {/* Checkbox to mark the task as completed */}
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
      {/* Buttons for saving or canceling edits */}
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
