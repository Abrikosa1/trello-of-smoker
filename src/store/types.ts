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

export type Data = {
  lists: Array<List>;
  tasks: Array<Task>;
  comments: Array<Comment>;
}

export type User = {
  username: string;
}

export type State = {
  data: Data;
  user: User;
}
