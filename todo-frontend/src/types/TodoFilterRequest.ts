export interface TodoFilterRequest {
  isDone?: boolean;
  description?: string;
  dueDate?: string;
  dueDateBefore?: string;
  dueDateAfter?: string;
}
