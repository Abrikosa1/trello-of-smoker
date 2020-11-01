import React, { useState } from 'react';
import Header from './components/Header/Header';
import Main from './components/Main/Main';
import { UserContext } from './components/UserContext';

import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { List, Task } from './types';

const initialTasks1: Array<Task> = [
  { id: 1, title: '1', username: "vasya", complete: false}, 
  { id: 2, title: 'Thetitle', username: "vasya", complete: true}, 
  { id: 3, title: 'title', username: "Вомбат", complete: false, },
]

const initialTasks2: Array<Task> = [
  { id: 1, title: 'title1', username: "vasya", complete: false}, 
  { id: 2, title: 'title2', username: "vasya", complete: true}, 
  { id: 3, title: 'title3', username: "Вомбат", complete: true, },
  { id: 4, title: 'title4', username: "dsfafw", complete: true, },
]


const initialLists: Array<List> = [
  { id: 1, title: 'Number1', tasks : initialTasks1 },
  { id: 2, title: 'Number2', tasks : initialTasks2 },
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
