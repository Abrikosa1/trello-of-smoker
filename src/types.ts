export type Task = {
  id: number;
  title: string;
  username: string;
  complete: boolean;
  create_time: Date;
}

export type List = {
  id: number;
  title: string;
  tasks: Array<Task>
}

export type ToggleCompleted = (selectedTodo: Task) => void;

export type AddTask = (newTask: string) => void;

export type DeleteTask = (list_id: number, task_id: number) => void;

export type AddList = (newList: string) => void