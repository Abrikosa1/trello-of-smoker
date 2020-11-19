import { List, Task, Comment, Data } from '../types';
import { v4 as uuidv4 } from 'uuid';
import { load } from 'redux-localstorage-simple';
import { 
  ADD_LIST, 
  RENAME_LIST, 
  DELETE_LIST, 
  ADD_TASK, 
  DELETE_TASK, 
  RENAME_TASK, 
  EDIT_TASK_DESCRIPTION,
  TOGGLE_TASK_COMPLETED,
  ADD_TASK_COMMENT,
  DELETE_TASK_COMMENT,
  EDIT_TASK_COMMENT
} from "./actionCreators";
import { DataActionTypes } from './actionTypes';

const list0Id = uuidv4(),
      list1Id = uuidv4(),
      list2Id = uuidv4(),
      list3Id = uuidv4();

const task0Id = uuidv4(),
      task1Id = uuidv4(),
      task2Id = uuidv4(),
      task3Id = uuidv4(),
      task4Id = uuidv4(),
      task5Id = uuidv4(),
      task6Id = uuidv4();

const cooment0Id = uuidv4(),
      cooment1Id = uuidv4(),
      cooment2Id = uuidv4(),
      cooment3Id = uuidv4(),
      cooment4Id = uuidv4(),
      cooment5Id = uuidv4();


const initialComments: Array<Comment> = [
  { id: cooment0Id, taskId: task0Id, text: 'Коммент1', author: "Ya", createTime: new Date() }, 
  { id: cooment1Id, taskId: task0Id, text: 'Коммент2', author: "ывавыа", createTime: new Date() }, 
  { id: cooment2Id, taskId: task0Id, text: 'Коммент3', author: "Ya", createTime: new Date() }, 
  { id: cooment3Id, taskId: task4Id, text: 'Ку-ку', author: "Ya", createTime: new Date() }, 
  { id: cooment4Id, taskId: task5Id, text: 'Вот это задачка', author: "Вомбат", createTime: new Date() }, 
  { id: cooment5Id, taskId: task6Id, text: 'Блин, походу не сделаю', author: "Ya", createTime: new Date() }, 
]


const initialTasks: Array<Task> = [
  { id: task0Id, listId: list1Id, title: 'В магз за едой', description: "Не забыть пельмени", username: "vasya", complete: false, createTime: new Date() }, 
  { id: task1Id, listId: list1Id, title: 'Приготовить', description: "Описание Описание Описание Описание Описание Описание Описание", username: "vasya", complete: true, createTime: new Date() }, 
  { id: task2Id, listId: list1Id, title: 'Съесть', description: "Съееесть", username: "Вомбат", complete: true, createTime: new Date() },
  { id: task3Id, listId: list0Id, title: 'Все', description: "Кайфовать, в общем", username: "dsfafw", complete: true, createTime: new Date() },
  { id: task4Id, listId: list0Id, title: 'Ку-ку', description: "Да-да, куку", username: "Вомбат", complete: false, createTime: new Date() }, 
  { id: task5Id, listId: list0Id, title: 'Задачка', description: "И кто-то должен ее сделать", username: "Не вомбат", complete: true, createTime: new Date() }, 
  { id: task6Id, listId: list0Id, title: 'Еще одна', description: "И эту тоже", username: "Вомбат", complete: false, createTime: new Date() },
]

const initialLists: Array<List> = [
  { id: list0Id, title: 'TODO' },
  { id: list1Id, title: 'In Progress' },
  { id: list2Id, title: 'Testing' },
  { id: list3Id, title: 'Done' },
]

const initialData: Data = {
  lists: initialLists,
  tasks: initialTasks,
  comments: initialComments
}

let initialState: any = load({ namespace: 'data' });

if(!initialState || !initialState.data) {
  initialState = {
    ...initialState,
    data: initialData,
  }
}


const dataReducer = (state: Data = initialState.data, action: DataActionTypes): Data => {
  switch (action.type) {
    case ADD_LIST:
      return {
        ...state, 
        lists: [
          ...state.lists, {
            id: uuidv4(), 
            title: action.payload, 
          }
        ]
      };
    case DELETE_LIST:
      const tasksIds:Array<string>  = state.tasks.filter(task => task.listId === action.payload.listId)
                                                 .map(task => task.id);
      return {
        ...state, 
        lists: state.lists.filter(list => 
          list.id !== action.payload.listId),
        tasks: state.tasks.filter(task => 
          task.listId !== action.payload.listId),
        comments: state.comments.filter(comment => 
          !tasksIds.includes(comment.taskId))                  
        };
    case RENAME_LIST:
      return {
        ...state, 
        lists: state.lists.map(list => 
          list.id === action.payload.listId
          ? {...list, title: action.payload.newTitle}
          : list
          )
        };
    case ADD_TASK:
      const newTask: Task = { id: action.payload.taskId, listId: action.payload.listId, title: action.payload.newTaskTitle, description: "", username: action.payload.username || "", complete: false, createTime: new Date()};
      return {...state, tasks: [...state.tasks, newTask]};
    case DELETE_TASK:
      return {
        ...state, 
        tasks: state.tasks.filter(task => task.id !== action.payload.taskId), 
        comments: state.comments.filter(comment => 
          comment.taskId !== action.payload.taskId)
        };
    case RENAME_TASK:
      return {
        ...state, tasks: state.tasks.map(task => 
          task.id === action.payload.taskId
          ? {...task, title: action.payload.newTitle}
          : task)
        };
    case TOGGLE_TASK_COMPLETED:
      return {...state, tasks: state.tasks.map(task => 
        task.id === action.payload.taskId
        ? {...task, complete: !task.complete}
        : task)
      };
    case EDIT_TASK_DESCRIPTION:
      return {...state, tasks: state.tasks.map(task => 
         task.id === action.payload.taskId
         ? {...task, description: action.payload.newDesc}
         : task)
        };
    case ADD_TASK_COMMENT:
      const newComment: Comment = { id: uuidv4(), taskId: action.payload.taskId, text: action.payload.text, author: action.payload.author, createTime: new Date() }
      return {...state, comments: [...state.comments, newComment]};
    case DELETE_TASK_COMMENT:
      return {
        ...state, 
        comments: state.comments.filter(comment => 
          comment.id !== action.payload.commentId)
        }
    case EDIT_TASK_COMMENT:
      return {
        ...state, 
        comments: state.comments.map(comment => 
          comment.id === action.payload.commentId 
          ? {...comment, text: action.payload.newCommentText}
          : comment)
        };
    default:
      return state;
  }
}

export default dataReducer;