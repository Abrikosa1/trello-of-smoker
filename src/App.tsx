import React, { useEffect, useState, useReducer } from 'react';
import Header from './components/Header/Header';
import Main from './components/Main/Main';
import { UserContext } from './components/UserContext';
import { ListsDataContext } from './components/ListsDataContext';
import dataReducer from './dataReducer';
import { List, Task, Comment } from './types';

import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';



const initialComments1: Array<Comment> = [
  { id: 0, text: 'Ку-ку', author: "Ya", create_time: new Date() }, 
  { id: 1, text: 'Вот это задачка', author: "Вомбат", create_time: new Date() }, 
  { id: 2, text: 'Блин, походу не сделаю', author: "Ya", create_time: new Date() }, 
]

const initialComments2: Array<Comment> = [
  { id: 0, text: 'Коммент1', author: "Ya", create_time: new Date() }, 
  { id: 1, text: 'Коммент2', author: "ывавыа", create_time: new Date() }, 
  { id: 2, text: 'Коммент3', author: "Ya", create_time: new Date() }, 
]

const initialTasks1: Array<Task> = [
  { id: 0, title: 'Ку-ку', description: "Да-да, куку", username: "Вомбат", complete: false, create_time: new Date(), comments: [] }, 
  { id: 1, title: 'Задачка', description: "И кто-то должен ее сделать", username: "Не вомбат", complete: true, create_time: new Date(), comments: [] }, 
  { id: 2, title: 'Еще одна', description: "И эту тоже", username: "Вомбат", complete: false, create_time: new Date(), comments: initialComments2 },
]

const initialTasks2: Array<Task> = [
  { id: 0, title: 'В магз за едой', description: "Не забыть пельмени", username: "vasya", complete: false, create_time: new Date(), comments: initialComments1 }, 
  { id: 1, title: 'Приготовить', description: "Описание Описание Описание Описание Описание Описание Описание", username: "vasya", complete: true, create_time: new Date(), comments: []}, 
  { id: 2, title: 'Съесть', description: "Съееесть", username: "Вомбат", complete: true, create_time: new Date(), comments: [] },
  { id: 3, title: 'Все', description: "Кайфовать, в общем", username: "dsfafw", complete: true, create_time: new Date(), comments: [] },
]


let initialLists: Array<List> = [
  { id: 0, title: 'TODO', tasks : initialTasks1 },
  { id: 1, title: 'In Progress', tasks : initialTasks2 },
  { id: 2, title: 'Testing', tasks : [] },
  { id: 3, title: 'Done', tasks : [] }
]

if(!localStorage.getItem('lists')) {
  if(initialLists) {
    localStorage.setItem('lists', JSON.stringify(initialLists));
  } else {
    localStorage.setItem('lists', JSON.stringify([]));
  }
}  
function App() {

  const [lists, dispatch] = useReducer(dataReducer, JSON.parse(localStorage.getItem('lists') as string));
  const name = localStorage.getItem('username');
  const [username, setUsername] = useState(name);

  useEffect(() => {
    localStorage.setItem('lists', JSON.stringify(lists));
  }, [lists]);

  return (
    <> 
      <div className="app-wrapper">
        <ListsDataContext.Provider value={{ lists, dispatch }}>
          <UserContext.Provider value={{ username, setUsername }}>
            <Header />
            {name && <Main lists={lists} />}
          </UserContext.Provider>
        </ListsDataContext.Provider>
      </div>
    </>
  );
}

export default App;
