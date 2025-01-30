import { useCallback } from "react";
import Todo from "../types/Todo";

type Props = {
  todo: Todo;
  isOverdue: boolean;
  onEditStart: (todo: Todo) => void;
  onDelete: (id: number) => void;
};

const TodoItem = ({ todo, isOverdue, onEditStart, onDelete }: Props) => {
  const handleEditStart = useCallback(() => {
    onEditStart(todo);
  }, [onEditStart, todo]);

  const handleDelete = useCallback(() => {
    onDelete(todo.id);
  }, [onDelete, todo.id]);

  return (
    <>
      <div className="flex-grow-1 me-3" style={{ minWidth: 0 }}>
        <h5 className="text-truncate mb-1" style={{ wordWrap: "break-word" }}>
          {todo.description}
        </h5>
        <div className="text-body-secondary small">
          Due: {todo.dueDate} | Created: {todo.createdAt} | Status:{" "}
          {todo.isDone ? "Completed" : isOverdue ? "Overdue" : "Pending"}
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
