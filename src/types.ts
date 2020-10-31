export type Task = {
  title: string;
  username: string;
  complete: boolean;
}

export type ToggleCompleted = (selectedTodo: Task) => void;

export type AddTask = (newTask: string) => void;