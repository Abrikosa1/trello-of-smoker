import { ADD_LIST, ADD_TASK, ADD_TASK_COMMENT, DELETE_LIST, DELETE_TASK, DELETE_TASK_COMMENT, EDIT_TASK_COMMENT, EDIT_TASK_DESCRIPTION, RENAME_LIST, RENAME_TASK, TOGGLE_TASK_COMPLETED } from "./actionCreators";

interface AddListAction {
  type: typeof ADD_LIST
  payload: string
}

interface DeleteListAction {
  type: typeof DELETE_LIST
  payload: { listId: string }
}

interface RenameListAction {
  type: typeof RENAME_LIST
  payload: { listId: string, newTitle: string }
}

interface AddTaskAction {
  type: typeof ADD_TASK
  payload: { taskId: string, listId: string, username: string, newTaskTitle: string }
}

interface DeleteTaskAction {
  type: typeof DELETE_TASK
  payload: { taskId: string }
}

interface RenameTaskAction {
  type: typeof RENAME_TASK
  payload: { taskId: string, newTitle: string }
}

interface EditTaskDescriptionAction {
  type: typeof EDIT_TASK_DESCRIPTION
  payload: { taskId: string, newDesc: string }
}

interface ActionToggleTaskCompleted {
  type: typeof TOGGLE_TASK_COMPLETED
  payload: { taskId: string }
}

interface ActionAddTaskComment {
  type: typeof ADD_TASK_COMMENT
  payload: { taskId: string, text: string, author: string }
}

interface ActionDeleteTaskComment {
  type: typeof DELETE_TASK_COMMENT
  payload: { commentId: string }
}

interface ActionEditTaskComment {
  type: typeof EDIT_TASK_COMMENT
  payload: { commentId: string, newCommentText: string }
}

export type DataActionTypes = AddListAction | DeleteListAction | RenameListAction |
                              AddTaskAction | DeleteTaskAction | RenameTaskAction |
                              EditTaskDescriptionAction | ActionToggleTaskCompleted |
                              ActionAddTaskComment | ActionDeleteTaskComment | ActionEditTaskComment
                              