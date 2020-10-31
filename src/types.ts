export type Task = {
  id: number;
  title: string;
  username: string;
  complete: boolean;
}

export type List = {
  id: number;
  title: string;
  tasks: Array<Task>
}

export type ToggleCompleted = (selectedTodo: Task) => void;

export type AddTask = (newTask: string) => void;

export type AddList = (newList: string) => void