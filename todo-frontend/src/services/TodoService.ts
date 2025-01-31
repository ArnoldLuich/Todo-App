import Todo from "../types/Todo";
import axios from "axios";
import { TodoFilterRequest } from "../types/TodoFilterRequest";

// Base API URL for the Todo service
const API_URL = "http://localhost:8080/todos";

const api = axios.create({ baseURL: API_URL });

const TodoService = {
  /**
   * Adds a new todo item to the server.
   * @param description - The text description of the todo.
   * @param dueDate - The due date of the todo.
   * @returns The created todo object.
   */
  addTodos: async (description: string, dueDate: string) => {
    try {
      const { data } = await api.post<Todo>("", {
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

  /**
   * Updates an existing todo item.
   * @param todo - The updated todo object.
   * @returns The updated todo object from the server.
   */
  updateTodo: async (todo: Todo) => {
    try {
      const { data } = await api.put<Todo>(`/${todo.id}`, todo);
      return data;
    } catch (error) {
      console.error("Error updating todo:", error);
      throw error;
    }
  },

  /**
   * Deletes a todo item by its ID.
   * @param id - The ID of the todo to delete.
   */
  deleteTodo: async (id: number) => {
    try {
      await api.delete(`/${id}`);
    } catch (error) {
      console.error(`Error deleting todo with ID ${id}:`, error);
    }
  },

  /**
   * Retrieves a filtered list of todos based on given criteria.
   * @param filter - The filtering options (e.g., completed status, date range).
   * @returns A list of filtered todo items.
   */
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
