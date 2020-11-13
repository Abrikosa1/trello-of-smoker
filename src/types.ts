export type List = {
  id: string;
  title: string;
}

export type Task = {
  id: string;
  listId: string;
  title: string;
  description: string;
  username: string;
  complete: boolean;
  createTime: Date;
}

export type Comment = {
  id: string;
  taskId: string;
  text: string;
  author: string;
  createTime: Date;
}

export type State = {
  lists: Array<List>;
  tasks: Array<Task>;
  comments: Array<Comment>;
}

export type ToggleCompleted = (selectedTodo: Task) => void;

export type AddTask = (listId: number, taskId: number, newTask: string, author: string) => void;

export type DeleteTask = (listId: number, taskId: number) => void;

export type AddList = (newList: string) => void;

export type RenameTask = (listId: number, taskId: number, newTitle: string) => void;

export type RenameList = (listId: number, newTitle: string) => void;

export type DeleteList = (listId: number) => void;

export type ChangeDescription = (listId: number, taskId: number, new_desc: string) => void;