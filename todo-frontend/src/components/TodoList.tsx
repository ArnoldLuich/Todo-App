import { useState, useEffect } from "react";
import Todo from "../types/Todo";
import TodoService from "../services/TodoService";
import AddTodoForm from "./AddTodoForm";
import TodoItem from "./TodoItem";
import TodoEditItem from "./TodoEditItem";
import { EditState } from "../types/EditState";
import { TodoFilterRequest } from "../types/TodoFilterRequest";
import TodoFilter from "./TodoFilter";

const TodoList = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [editing, setEditing] = useState<EditState>({
    id: null,
    description: "",
    dueDate: "",
    isDone: false,
  });

  const [filter, setFilter] = useState<TodoFilterRequest>({});

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
      handleEditCancel();
    } catch (error) {
      console.error("Error updating todo:", error);
    }
  };

  // Delete a todo by ID
  const handleDelete = async (id: number) => {
    try {
      await TodoService.deleteTodo(id);
      setTodos(todos.filter((todo) => todo.id !== id));
    } catch (err) {
      console.error("Delete error:", err);
    }
  };

  return (
    <div className="container mt-4">
      <TodoFilter onFilterChange={setFilter} />
      <AddTodoForm setTodos={setTodos} />

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
                  // Render edit mode component
                  <TodoEditItem
                    editing={editing}
                    setEditing={setEditing}
                    onSave={handleEditSave}
                    onCancel={handleEditCancel}
                  />
                ) : (
                  // Render normal todo item
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
