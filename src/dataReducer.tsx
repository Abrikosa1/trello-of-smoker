import { List, Comment } from "./types";

export type Actions = 
          | { type: 'ADD_LIST', payload: string} 
          | { type: 'DELETE_LIST', payload: number} 
          | { type: 'RENAME_LIST', payload: { listId: number, newTitle: string} }
          | { type: 'ADD_TASK', payload: { listId: number, taskId: number, username: string, newTaskTitle: string} } 
          | { type: 'DELETE_TASK', payload: { listId: number, taskId: number} } 
          | { type: 'RENAME_TASK', payload: { listId: number, taskId: number, newTitle: string} } 
          | { type: 'TOGGLE_TASK_COMPLETED', payload: { listId: number, taskId: number} } 
          | { type: 'EDIT_TASK_DESCRIPTION', payload: { listId: number, taskId: number, newDesc: string} } 
          | { type: 'ADD_TASK_COMMENT', payload: { listId: number, taskId: number, newComment: Comment} } 
          | { type: 'DELETE_TASK_COMMENT', payload: { listId: number, taskId: number, commentId: number} } 
          | { type: 'EDIT_TASK_COMMENT', payload: { listId: number, taskId: number, commentId: number, newComment: string} } 
              
  
  //                     'ADD_LIST' | 'DELETE_LIST' | 'RENAME_LIST' |
  //                     'ADD_TASK' | 'DELETE_TASK' | 'RENAME_TASK' |
  //                     'TOGGLE_TASK_COMPLETED' | 'EDIT_TASK_DESCRIPTION' | 
  //                     'ADD_TASK_COMMENT' | 'DELETE_TASK_COMMENT' | 'EDIT_TASK_COMMENT'}

const dataReducer = (lists: Array<List>, action: Actions) => {
  switch (action.type) {
    case 'ADD_LIST': 
      return [
        ...lists, 
        {
           id: lists.length + 1, 
           title: action.payload, 
           tasks : [] 
        }
      ];
    case 'DELETE_LIST':
      return lists.filter((list: List) =>  list.id !== action.payload);
    case 'RENAME_LIST':
      return lists.map((list : List) => 
                    list.id === action.payload.listId
                    ? {...list, title: action.payload.newTitle}
                    : list);
    case 'ADD_TASK':
      const added = { id: action.payload.taskId, title: action.payload.newTaskTitle, description: "", username: action.payload.username || "", complete: false, create_time: new Date(), comments: [] };
      return lists.map((list: List)  => {
              if (list.id === action.payload.listId) {
                return {...list, tasks: [...list.tasks, added]} 
              } else {
                  return list;
              }
            });
    case 'DELETE_TASK':
      return lists.map((list: List) => {
              if (list.id === action.payload.listId) {
                return {...list, 
                          tasks: list.tasks.filter(task => {
                              return task.id !== action.payload.taskId
                          })
                       } 
              } else {
                  return list;
              }
            });
    case 'RENAME_TASK':
      return lists.map((list: List) => {
              if (list.id === action.payload.listId) {
                return {...list, 
                          tasks: list.tasks.map(task => 
                            task.id === action.payload.taskId 
                            ? {...task, title: action.payload.newTitle} 
                            : task)
                      }
                } else {
                  return list;
                }
              });
    case 'TOGGLE_TASK_COMPLETED':
      return lists.map((list: List) => {
              if (list.id === action.payload.listId) {
                return {...list, 
                          tasks: list.tasks.map(task => 
                            task.id === action.payload.taskId 
                            ? {...task, complete: !task.complete} 
                            : task)
                      }
                } else {
                  return list;
                }
              });
    case 'EDIT_TASK_DESCRIPTION':
      return lists.map((list: List) => {
                if (list.id === action.payload.listId) {
                  return {...list, 
                            tasks: list.tasks.map(task => 
                              task.id === action.payload.taskId 
                              ? {...task, description: action.payload.newDesc} 
                              : task)
                        }
                  } else {
                    return list;
                  }
                });
    case 'ADD_TASK_COMMENT':
      return lists.map((list: List) => {
        if (list.id === action.payload.listId) {
          return {...list, 
                    tasks: list.tasks.map(task => 
                      task.id === action.payload.taskId
                      ? {...task, comments: [...task.comments, action.payload.newComment]} 
                      : task)
                }
          } else {
            return list;
          }
        });
    case 'DELETE_TASK_COMMENT':
      return lists.map((list: List) => {
        if (list.id === action.payload.listId) {
          return {...list, 
                    tasks: list.tasks.map(task => 
                      task.id === action.payload.taskId
                      ? {...task, comments: task.comments.filter(comment => {
                        return comment.id !== action.payload.commentId
                      })} 
                      : task)
                }
          } else {
            return list;
          }
        });
    case 'EDIT_TASK_COMMENT':
      return lists.map((list: List) => {
                if (list.id === action.payload.listId) {
                  return {...list, 
                            tasks: list.tasks.map(task => 
                              task.id === action.payload.taskId 
                              ? {...task, comments: task.comments.map(comment => 
                                comment.id === action.payload.commentId 
                                ? {...comment, text: action.payload.newComment}
                                : comment
                              )} 
                              : task)
                        }
                  } else {
                    return list;
                  }
                });
    default: 
      return lists;
  }
} 

export default dataReducer;