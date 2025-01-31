import { useState, useEffect } from "react";
import Todo from "../types/Todo";
import TodoService from "../services/TodoService";
import AddTodoForm from "./AddTodoForm";
import TodoItem from "./TodoItem";
import TodoEditItem from "./TodoEditItem";
import { EditState } from "../types/EditState";
import { TodoFilterRequest } from "../types/TodoFilterRequest";
import TodoFilter from "./TodoFilter";

/**
 * Main Todo List component that handles:
 * - Displaying and filtering todos
 * - CRUD operations for todos
 * - Edit state management
 * - User feedback through alerts
 */
const TodoList = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [editing, setEditing] = useState<EditState>({
    // Tracks current todo being edited
    id: null,
    description: "",
    dueDate: "",
    isDone: false,
  });
  const [filter, setFilter] = useState<TodoFilterRequest>({}); // Stores current filter settings
  const [alert, setAlert] = useState<{ message: string; type: string } | null>(
    null
  );

  // Fetch todos whenever filter changes
  useEffect(() => {
    const fetchTodos = async () => {
      const data = await TodoService.getFilteredTodos(filter);
      setTodos(data);
    };
    fetchTodos();
  }, [filter]);

  const isOverdue = (dueDate: string) => {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    return new Date(dueDate) < today;
  };

  // Start editing a todo
  const handleEditStart = (todo: Todo) => {
    setEditing({ ...todo });
  };

  const handleEditCancel = () => {
    setEditing({ id: null, description: "", dueDate: "", isDone: false });
  };

  //Handles saving edited todo after validation
  const handleEditSave = async () => {
    if (!editing.description.trim() || editing.id === null) return;

    try {
      const updatedTodo = await TodoService.updateTodo({
        id: editing.id,
        description: editing.description,
        dueDate: editing.dueDate,
        createdAt: new Date().toISOString().split("T")[0],
        isDone: editing.isDone,
      });
      setTodos(
        todos.map((todo) => (todo.id === editing.id ? updatedTodo : todo))
      );
      setAlert({ message: "Todo updated successfully!", type: "success" });
      handleEditCancel();
    } catch (error) {
      console.error("Error updating todo:", error);
      setAlert({ message: "Error updating todo!", type: "danger" });
    }
  };

  // Delete a todo by ID
  const handleDelete = async (id: number) => {
    try {
      await TodoService.deleteTodo(id);
      setTodos((prev) => prev.filter((todo) => todo.id !== id));
      setAlert({ message: "Todo deleted successfully!", type: "warning" });
    } catch (err) {
      console.error("Delete error:", err);
      setAlert({ message: "Error deleting todo!", type: "danger" });
    }
  };

  return (
    <div className="container mt-4">
      {/* Alert system for user feedback */}
      {alert && (
        <div
          className={`alert alert-${alert.type} alert-dismissible fade show`}
          role="alert"
        >
          <strong>{alert.message}</strong>
          <button
            type="button"
            className="btn-close"
            onClick={() => setAlert(null)}
            aria-label="Close"
          ></button>
        </div>
      )}

      {/* Filter controls */}
      <TodoFilter onFilterChange={setFilter} />

      {/* Add new todo form */}
      <AddTodoForm setTodos={setTodos} />

      {/* Todo list container */}
      <div className="list-group">
        {todos.map((todo) => {
          const overdue = !todo.isDone && isOverdue(todo.dueDate); // This could be performance issue
          return (
            <div
              key={todo.id}
              className={`list-group-item mb-2 ${
                todo.isDone
                  ? "list-group-item-success"
                  : overdue
                  ? "list-group-item-danger"
                  : "list-group-item-primary"
              }`}
              style={{ borderRadius: "8px" }}
            >
              <div className="d-flex justify-content-between align-items-center">
                {editing.id === todo.id ? (
                  // Edit mode UI
                  <TodoEditItem
                    editing={editing}
                    setEditing={setEditing}
                    onSave={handleEditSave}
                    onCancel={handleEditCancel}
                  />
                ) : (
                  // Read-only mode UI
                  <TodoItem
                    todo={todo}
                    isOverdue={overdue}
                    onEditStart={handleEditStart}
                    onDelete={handleDelete}
                  />
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default TodoList;
