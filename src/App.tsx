import React, { useState } from 'react';
import Header from './components/Header/Header';
import Main from './components/Main/Main';
import { UserContext } from './components/UserContext';

import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { List, Task } from './types';


const initialTasks1: Array<Task> = [
  { id: 1, title: 'Ку-ку', username: "Вомбат", complete: false, create_time: new Date() }, 
  { id: 2, title: 'Задачка', username: "Не вомбат", complete: true, create_time: new Date() }, 
  { id: 3, title: 'Еще одна', username: "Вомбат", complete: false, create_time: new Date() },
]

const initialTasks2: Array<Task> = [
  { id: 1, title: 'В магз за едой', username: "vasya", complete: false, create_time: new Date() }, 
  { id: 2, title: 'Приготовить', username: "vasya", complete: true, create_time: new Date() }, 
  { id: 3, title: 'Съесть', username: "Вомбат", complete: true, create_time: new Date() },
  { id: 4, title: 'Все', username: "dsfafw", complete: true, create_time: new Date() },
]


const initialLists: Array<List> = [
  { id: 1, title: 'TODO', tasks : initialTasks1 },
  { id: 2, title: 'In Progress', tasks : initialTasks2 },
  { id: 3, title: 'Testing', tasks : [] },
  { id: 4, title: 'Done', tasks : [] }
]

if(!localStorage.getItem('lists')) {
  localStorage.setItem('lists', JSON.stringify(initialLists));
}  


function App() {
  const listsData = JSON.parse(localStorage.getItem('lists') || '');
  const[lists, setLists] = useState(listsData);
  const name = localStorage.getItem('username');
  const [username, setUsername] = useState(name);


  return (
    <> 
      <div className="app-wrapper">
        <UserContext.Provider value={ { username, setUsername } }>
          <Header />
        </UserContext.Provider>
        {name ? <Main lists={lists} setLists={setLists}/> : ''}
      </div>
    </>
  );
}

export default App;
