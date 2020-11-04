export type List = {
  id: number;
  title: string;
  tasks: Array<Task>
}

export type Task = {
  id: number;
  title: string;
  description: string;
  username: string;
  complete: boolean;
  create_time: Date;
  comments: Array<Comment>;
}

export type Comment = {
  id: number;
  text: string;
  author: string;
  create_time: Date;
}

export type ToggleCompleted = (selectedTodo: Task) => void;

export type AddTask = (newTask: string) => void;

export type DeleteTask = (list_id: number, task_id: number) => void;

export type AddList = (newList: string) => void;

export type RenameTask = (list_id: number, task_id: number, newTitle: string) => void;

export type RenameList = (list_id: number, newTitle: string) => void;

export type DeleteList = (list_id: number) => void;