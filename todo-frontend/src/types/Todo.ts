/**
 * Represents a Todo item with its details.
 */
interface Todo {
  id: number;
  description: string;
  dueDate: string;
  createdAt?: string;
  isDone: boolean;
}

export default Todo;
