import { Task, Comment, State } from "./types";
import { v4 as uuidv4 } from 'uuid';

export type Actions = 
          | { type: 'ADD_LIST', payload: string } 
          | { type: 'DELETE_LIST', payload: { listId: string, tasksIds: Array<string> } }
          | { type: 'RENAME_LIST', payload: { listId: string, newTitle: string} }
          | { type: 'ADD_TASK', payload: { taskId: string, listId: string, username: string, newTaskTitle: string} } 
          | { type: 'DELETE_TASK', payload: { taskId: string } } 
          | { type: 'RENAME_TASK', payload: { taskId: string, newTitle: string} } 
          | { type: 'TOGGLE_TASK_COMPLETED', payload: { taskId: string } } 
          | { type: 'EDIT_TASK_DESCRIPTION', payload: { taskId: string, newDesc: string} } 
          | { type: 'ADD_TASK_COMMENT', payload: { newComment: Comment } } 
          | { type: 'DELETE_TASK_COMMENT', payload: { commentId: string } } 
          | { type: 'EDIT_TASK_COMMENT', payload: { commentId: string, newCommentText: string } } 
          | { type: 'DELETE_ALL_TASK_COMMENTS', payload: { taskId: string } }
          | { type: 'DELETE_ALL_LIST_TASKS', payload: { listId: string } }
              

const dataReducer = (state: State , action: Actions) => {
  switch (action.type) {
    case 'ADD_LIST': 
      return {...state, lists: [...state.lists, 
                      {
                        id: uuidv4(), 
                        title: action.payload, 
                      }]};
    case 'DELETE_LIST':
      return {...state, 
        lists: state.lists.filter(list => list.id !== action.payload.listId),
        tasks: state.tasks.filter(task => 
                      task.listId !== action.payload.listId
                    ),
        comments: state.comments.filter(comment => 
                               !action.payload.tasksIds.includes(comment.taskId))
                                 
              };

    case 'RENAME_LIST':
      return {...state, lists: state.lists.map(list => 
                    list.id === action.payload.listId
                    ? {...list, title: action.payload.newTitle}
                    : list)};
    case 'ADD_TASK':
      const added: Task = { id: action.payload.taskId, listId: action.payload.listId, title: action.payload.newTaskTitle, description: "", username: action.payload.username || "", complete: false, createTime: new Date()};
      return {...state, tasks: [...state.tasks, added]};
    case 'DELETE_TASK':
      return {...state, 
              tasks: state.tasks.filter(task => task.id !== action.payload.taskId), 
              comments: state.comments.filter(comment => 
                      comment.taskId !== action.payload.taskId
                    )};
    case 'RENAME_TASK':
      return {...state, tasks: state.tasks.map(task => 
                    task.id === action.payload.taskId
                    ? {...task, title: action.payload.newTitle}
                    : task)};
    case 'TOGGLE_TASK_COMPLETED':
      return {...state, tasks: state.tasks.map(task => 
                    task.id === action.payload.taskId
                    ? {...task, complete: !task.complete}
                    : task)};
    case 'EDIT_TASK_DESCRIPTION':
      return {...state, tasks: state.tasks.map(task => 
                    task.id === action.payload.taskId
                    ? {...task, description: action.payload.newDesc}
                    : task)};
    case 'ADD_TASK_COMMENT':
      return {...state, comments: [...state.comments, action.payload.newComment]};
    case 'DELETE_TASK_COMMENT':
      return {...state, comments: state.comments.filter(comment => 
                      comment.id !== action.payload.commentId
                    )}
    case 'EDIT_TASK_COMMENT':
      return {...state, comments: state.comments.map(comment => 
                      comment.id === action.payload.commentId 
                      ? {...comment, text: action.payload.newCommentText}
                      : comment
                    )};
    default: 
      return state;
  }
} 

export default dataReducer;