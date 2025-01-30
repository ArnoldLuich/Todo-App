import Todo from "../types/Todo";
import axios from "axios";
import { TodoFilterRequest } from "../types/TodoFilterRequest";

const API_URL = "http://localhost:8080/todos";

const api = axios.create({ baseURL: API_URL });

const TodoService = {
  addTodos: async (description: string, dueDate: string) => {
    try {
      const { data } = await api.post<Todo>("/", {
        description,
        dueDate,
        isDone: false,
      });
      return data;
    } catch (error) {
      console.error("Error adding todo:", error);
      throw error;
    }
  },

  updateTodo: async (todo: Todo) => {
    try {
      const { data } = await api.put<Todo>(`/${todo.id}`, todo);
      return data;
    } catch (error) {
      console.error("Error updating todo:", error);
      throw error;
    }
  },

  deleteTodo: async (id: number) => {
    try {
      await api.delete(`/${id}`);
    } catch (error) {
      console.error(`Error deleting todo with ID ${id}:`, error);
    }
  },

  getFilteredTodos: async (filter: TodoFilterRequest) => {
    try {
      const { data } = await api.get<Todo[]>("/filter", { params: filter });
      return data;
    } catch (error) {
      console.error("Error filtering todos:", error);
      return [];
    }
  },
};

export default TodoService;
