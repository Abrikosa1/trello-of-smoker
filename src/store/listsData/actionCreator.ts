import { Comment } from '../../types';

export const ADD_LIST = 'ADD_LIST';
export const RENAME_LIST = 'RENAME_LIST';
export const DELETE_LIST = 'DELETE_LIST';

export const ADD_TASK = 'ADD_TASK';
export const DELETE_TASK = 'DELETE_TASK';
export const RENAME_TASK = 'RENAME_TASK';
export const EDIT_TASK_DESCRIPTION = 'EDIT_TASK_DESCRIPTION';
export const TOGGLE_TASK_COMPLETED = 'TOGGLE_TASK_COMPLETED';

export const ADD_TASK_COMMENT = 'ADD_TASK_COMMENT';
export const DELETE_TASK_COMMENT = 'DELETE_TASK_COMMENT';
export const EDIT_TASK_COMMENT = 'EDIT_TASK_COMMENT';

//lists
export const addList = (taskTitle: string) => ({
  type: ADD_LIST,
  payload: taskTitle,
});

export const deleteList = (listId: string) => ({
  type: DELETE_LIST,
  payload: {listId: listId},
});

export const renameList = (listId: string, newTitle: string) => ({
  type: RENAME_LIST,
  payload: {listId: listId, newTitle: newTitle},
});


//tasks
export const addTask = (taskId: string, listId: string, username: string, newTaskTitle: string) => ({
  type: ADD_TASK,
  payload: {taskId: taskId, listId: listId, username: username, newTaskTitle: newTaskTitle},
});

export const deleteTask = (taskId: string) => ({
  type: DELETE_TASK,
  payload: {taskId: taskId},
});

export const renameTask = (taskId: string, newTitle: string) => ({
  type: RENAME_TASK,
  payload: {taskId: taskId, newTitle: newTitle},
});

export const editTaskDesctiption = (taskId: string, newDesc: string) => ({
  type: EDIT_TASK_DESCRIPTION,
  payload: {taskId: taskId, newDesc: newDesc},
});

export const toggleTaskCompleted = (taskId: string) => ({
  type: TOGGLE_TASK_COMPLETED,
  payload: {taskId: taskId},
});

//comments
export const addTaskComment = (newComment: Comment) => ({
  type: ADD_TASK_COMMENT,
  payload: {newComment: newComment},
});

export const deleteTaskComment = (commentId: string) => ({
  type: DELETE_TASK_COMMENT,
  payload: {commentId: commentId},
});

export const editTaskComment = (commentId: string, newCommentText: string) => ({
  type:   EDIT_TASK_COMMENT,
  payload: {commentId: commentId, newCommentText: newCommentText},
});

