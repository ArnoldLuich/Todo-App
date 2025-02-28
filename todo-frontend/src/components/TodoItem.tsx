import { useState } from "react";
import Todo from "../types/Todo";
import DeleteConfirmationModal from "./DeleteConfirmationModal";

/**
 * Props type definition for TodoItem component
 * @typedef {Object} Props
 * @property {Todo} todo - The todo item to display
 * @property {boolean} isOverdue - Flag indicating if the todo is overdue
 * @property {Function} onEditStart - Callback to initiate edit mode for this todo
 * @property {Function} onDelete - Callback to delete this todo
 */

type Props = {
  todo: Todo;
  isOverdue: boolean;
  onEditStart: (todo: Todo) => void;
  onDelete: (id: number) => void;
};

const TodoItem = ({ todo, isOverdue, onEditStart, onDelete }: Props) => {
  const [showDeleteModal, setShowDeleteModal] = useState(false);

  return (
    <>
      {/* Todo Item Content */}
      <div className="flex-grow-1 me-3" style={{ minWidth: 0 }}>
        <h5 className="text-wrap mb-1" style={{ wordWrap: "break-word" }}>
          {todo.description}
        </h5>
        <br />
        <div className="text-body-secondary small">
          <b>
            Due: {todo.dueDate} | Created: {todo.createdAt} | Status:{" "}
            {todo.isDone ? "Completed" : isOverdue ? "Overdue" : "Pending"}
          </b>
        </div>
      </div>
      <div className="flex-shrink-0">
        <button
          className="btn btn-outline-warning btn-sm me-2"
          onClick={() => onEditStart(todo)}
        >
          Edit
        </button>
        <button
          className="btn btn-outline-danger btn-sm"
          onClick={() => setShowDeleteModal(true)}
        >
          Delete
        </button>
      </div>

      {/* Delete Confirmation Modal */}
      <DeleteConfirmationModal
        show={showDeleteModal}
        onConfirm={() => {
          onDelete(todo.id);
          setShowDeleteModal(false);
        }}
        onCancel={() => setShowDeleteModal(false)}
      />
      
    </>
  );
};

export default TodoItem;