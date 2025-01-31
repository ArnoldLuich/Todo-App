/**
 * Represents the state of a todo item being edited.
 */
export type EditState = {
  id: number | null;
  description: string;
  dueDate: string;
  isDone: boolean;
};
