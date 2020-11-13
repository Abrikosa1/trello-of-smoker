import React, { useEffect, useState, useReducer } from 'react';
import Header from './components/Header/Header';
import Main from './components/Main/Main';
import { UserContext } from './components/UserContext';
import { DataContext } from './components/DataContext';
import reducer from './reducer';
import { List, Task, Comment } from './types';
import { v4 as uuidv4 } from 'uuid';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';



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

let initialLists: Array<List> = [
  { id: list0Id, title: 'TODO' },
  { id: list1Id, title: 'In Progress' },
  { id: list2Id, title: 'Testing' },
  { id: list3Id, title: 'Done' },
]

const initialState = {
  lists: initialLists,
  tasks: initialTasks,
  comments: initialComments
}

if(!localStorage.getItem('data')) {
  if(initialState) {
    localStorage.setItem('data', JSON.stringify(initialState));
  } else {
    localStorage.setItem('data', JSON.stringify([]));
  }
}  

const App: React.FC = () => {
  const [state, dispatch] = useReducer(reducer, JSON.parse(localStorage.getItem('data') as string));
  const name = localStorage.getItem('username');
  const [username, setUsername] = useState(name);

  useEffect(() => {
    localStorage.setItem('data', JSON.stringify(state));
  }, [state]);

  return (
    <> 
      <div className="app-wrapper">
        <DataContext.Provider value={{ state, dispatch }}>
          <UserContext.Provider value={{ username, setUsername }}>
            <Header />
            {name && <Main lists={state.lists} />}
          </UserContext.Provider>
        </DataContext.Provider>
      </div>
    </>
  );
}

export default App;
