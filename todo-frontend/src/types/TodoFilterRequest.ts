/**
 * Represents the filtering criteria for fetching Todo items.
 * This interface allows filtering based on completion status, description, and due date ranges.
 */
export interface TodoFilterRequest {
  isDone?: boolean;
  description?: string;
  dueDate?: string;
  dueDateBefore?: string;
  dueDateAfter?: string;
}
