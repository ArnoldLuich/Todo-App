import Todo from "../types/Todo";

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
  const handleEditStart = () => {
    onEditStart(todo);
  };

  const handleDelete = () => {
    onDelete(todo.id);
  };

  return (
    <>
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
          onClick={handleEditStart}
        >
          Edit
        </button>
        <button
          className="btn btn-outline-danger btn-sm"
          onClick={handleDelete}
        >
          Delete
        </button>
      </div>
    </>
  );
};

export default TodoItem;
