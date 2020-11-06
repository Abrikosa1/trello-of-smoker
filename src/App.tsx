import React, { useEffect, useState } from 'react';
import Header from './components/Header/Header';
import Main from './components/Main/Main';
import { UserContext } from './components/UserContext';

import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { List, Task, Comment } from './types';
import { DataContext } from './DataContext';


// const comments = [
//   { id: 1, list_id: 2, task_id: 3, text: 'Ку-ку', author: "Ya", create_time: new Date() }, 
//   { id: 2, text: 'Вот это задачка', author: "Вомбат", create_time: new Date() }, 
//   { id: 3, text: 'Блин, походу не сделаю', author: "Ya", create_time: new Date() }, 
// ]

const initialComments1: Array<Comment> = [
  { id: 1, text: 'Ку-ку', author: "Ya", create_time: new Date() }, 
  { id: 2, text: 'Вот это задачка', author: "Вомбат", create_time: new Date() }, 
  { id: 3, text: 'Блин, походу не сделаю', author: "Ya", create_time: new Date() }, 
]

const initialComments2: Array<Comment> = [
  { id: 1, text: 'Коммент1', author: "Ya", create_time: new Date() }, 
  { id: 2, text: 'Коммент2', author: "ывавыа", create_time: new Date() }, 
  { id: 3, text: 'Коммент3', author: "Ya", create_time: new Date() }, 
]

const initialTasks1: Array<Task> = [
  { id: 1, title: 'Ку-ку', description: "Да-да, куку", username: "Вомбат", complete: false, create_time: new Date(), comments: [] }, 
  { id: 2, title: 'Задачка', description: "И кто-то должен ее сделать", username: "Не вомбат", complete: true, create_time: new Date(), comments: [] }, 
  { id: 3, title: 'Еще одна', description: "И эту тоже", username: "Вомбат", complete: false, create_time: new Date(), comments: initialComments2 },
]

const initialTasks2: Array<Task> = [
  { id: 1, title: 'В магз за едой', description: "Не забыть пельмени", username: "vasya", complete: false, create_time: new Date(), comments: initialComments1 }, 
  { id: 2, title: 'Приготовить', description: "Описание Описание Описание Описание Описание Описание Описание", username: "vasya", complete: true, create_time: new Date(), comments: []}, 
  { id: 3, title: 'Съесть', description: "Съееесть", username: "Вомбат", complete: true, create_time: new Date(), comments: [] },
  { id: 4, title: 'Все', description: "Кайфовать, в общем", username: "dsfafw", complete: true, create_time: new Date(), comments: [] },
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
  const [lists, setLists] = useState(listsData);
  const name = localStorage.getItem('username');
  const [username, setUsername] = useState(name);


  useEffect(() => {
    setLists(lists);
    localStorage.setItem('lists' || "", JSON.stringify(lists));
  }, [lists]);

  return (
    <> 
      <div className="app-wrapper">
        <UserContext.Provider value={ { username, setUsername } }>
          <Header />
          <DataContext.Provider value={ { lists, setLists } }>
          {name ? <Main lists={lists} setLists={setLists}/> : ''}
          </DataContext.Provider>
      </UserContext.Provider>
      </div>
    </>
  );
}

export default App;
