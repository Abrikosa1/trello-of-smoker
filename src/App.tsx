import React, { useEffect, useState, useReducer } from 'react';
import Header from './components/Header/Header';
import Main from './components/Main/Main';
import { UserContext } from './components/UserContext';
import { DataContext } from './components/DataContext';
import reducer from './reducer';
import { List, Task, Comment } from './types';

import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';





const newInitialComments: Array<Comment> = [
  { id: 0, taskId: 1, text: 'Коммент1', author: "Ya", createTime: new Date() }, 
  { id: 1, taskId: 1, text: 'Коммент2', author: "ывавыа", createTime: new Date() }, 
  { id: 2, taskId: 1, text: 'Коммент3', author: "Ya", createTime: new Date() }, 
  { id: 4, taskId: 4, text: 'Ку-ку', author: "Ya", createTime: new Date() }, 
  { id: 5, taskId: 5, text: 'Вот это задачка', author: "Вомбат", createTime: new Date() }, 
  { id: 6, taskId: 6, text: 'Блин, походу не сделаю', author: "Ya", createTime: new Date() }, 
]


const newInitialTasks: Array<Task> = [
  { id: 0, listId: 1, title: 'В магз за едой', description: "Не забыть пельмени", username: "vasya", complete: false, createTime: new Date() }, 
  { id: 1, listId: 1, title: 'Приготовить', description: "Описание Описание Описание Описание Описание Описание Описание", username: "vasya", complete: true, createTime: new Date() }, 
  { id: 2, listId: 1, title: 'Съесть', description: "Съееесть", username: "Вомбат", complete: true, createTime: new Date() },
  { id: 3, listId: 0, title: 'Все', description: "Кайфовать, в общем", username: "dsfafw", complete: true, createTime: new Date() },
  { id: 4, listId: 0, title: 'Ку-ку', description: "Да-да, куку", username: "Вомбат", complete: false, createTime: new Date() }, 
  { id: 5, listId: 0, title: 'Задачка', description: "И кто-то должен ее сделать", username: "Не вомбат", complete: true, createTime: new Date() }, 
  { id: 6, listId: 0, title: 'Еще одна', description: "И эту тоже", username: "Вомбат", complete: false, createTime: new Date() },
]

let newInitialLists: Array<List> = [
  { id: 0, title: 'TODO' },
  { id: 1, title: 'In Progress' },
  { id: 2, title: 'Testing' },
  { id: 3, title: 'Done' }
]

const initialState = {
  lists: newInitialLists,
  tasks: newInitialTasks,
  comments: newInitialComments
}

if(!localStorage.getItem('data')) {
  if(initialState) {
    localStorage.setItem('data', JSON.stringify(initialState));
  } else {
    localStorage.setItem('data', JSON.stringify([]));
  }
}  

function App() {

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
