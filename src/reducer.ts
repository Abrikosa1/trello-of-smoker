import { Task, Comment, State } from "./types";

export type Actions = 
          | { type: 'ADD_LIST', payload: string} 
          | { type: 'DELETE_LIST', payload: number} 
          | { type: 'RENAME_LIST', payload: { listId: number, newTitle: string} }
          | { type: 'ADD_TASK', payload: { listId: number, taskId: number, username: string, newTaskTitle: string} } 
          | { type: 'DELETE_TASK', payload: { taskId: number } } 
          | { type: 'RENAME_TASK', payload: { taskId: number, newTitle: string} } 
          | { type: 'TOGGLE_TASK_COMPLETED', payload: { taskId: number } } 
          | { type: 'EDIT_TASK_DESCRIPTION', payload: { taskId: number, newDesc: string} } 
          | { type: 'ADD_TASK_COMMENT', payload: { newComment: Comment } } 
          | { type: 'DELETE_TASK_COMMENT', payload: { commentId: number } } 
          | { type: 'EDIT_TASK_COMMENT', payload: { commentId: number, newCommentText: string } } 
              
  
  //                     'ADD_LIST' | 'DELETE_LIST' | 'RENAME_LIST' |
  //                     'ADD_TASK' | 'DELETE_TASK' | 'RENAME_TASK' |
  //                     'TOGGLE_TASK_COMPLETED' | 'EDIT_TASK_DESCRIPTION' | 
  //                     'ADD_TASK_COMMENT' | 'DELETE_TASK_COMMENT' | 'EDIT_TASK_COMMENT'}

const dataReducer = (state: State , action: Actions) => {
  switch (action.type) {
    case 'ADD_LIST': 
      return {...state, lists: [...state.lists, 
                      {
                        id: state.lists.length + 1, 
                        title: action.payload, 
                      }]};
    case 'DELETE_LIST':
      return {...state, lists: state.lists.filter(list =>  list.id !== action.payload)};
    case 'RENAME_LIST':
      return {...state, lists: state.lists.map(list => 
                    list.id === action.payload.listId
                    ? {...list, title: action.payload.newTitle}
                    : list)};
    case 'ADD_TASK':
      const added: Task = { id: action.payload.taskId, listId: action.payload.listId, title: action.payload.newTaskTitle, description: "", username: action.payload.username || "", complete: false, createTime: new Date()};
      return {...state, tasks: [...state.tasks, added]};
    case 'DELETE_TASK':
      return {...state, tasks: state.tasks.filter(task => task.id !== action.payload.taskId)};
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