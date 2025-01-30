import { useState } from "react";
import TodoService from "../services/TodoService";
import type Todo from "../types/Todo";

type Props = { setTodos: React.Dispatch<React.SetStateAction<Todo[]>> };

const TodoForm = ({ setTodos }: Props) => {
  const [formData, setFormData] = useState({ text: "", dueDate: "" });

  const handleAddTodo = async () => {
    if (!formData.text.trim() || !formData.dueDate) return;

    try {
      const newTodo = await TodoService.addTodos(
        formData.text,
        formData.dueDate
      );
      setTodos((prev) => [...prev, newTodo]);
      setFormData({ text: "", dueDate: "" });
    } catch (error) {
      console.error("Error adding todo:", error);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };
  return (
    <div className="card bg-dark bg-gradient text-white mb-4">
      <div className="card-body row g-3">
        <h3>Create Todo</h3>
        <div className="col-md-5">
          <input
            type="text"
            name="text"
            className="form-control bg-light"
            value={formData.text}
            onChange={handleChange}
            placeholder="Add a Task"
            maxLength={200}
          />
        </div>

        <div className="col-md-4">
          <input
            type="date"
            name="dueDate"
            className="form-control bg-light"
            value={formData.dueDate}
            onChange={handleChange}
          />
        </div>

        <div className="col-md-3">
          <button
            className="btn btn-primary w-100"
            onClick={handleAddTodo}
            disabled={!formData.text.trim() || !formData.dueDate}
          >
            Add Todo
          </button>
        </div>
      </div>
    </div>
  );
};

export default TodoForm;
