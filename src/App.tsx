import React, { useState } from 'react';
import Header from './components/Header/Header';
import Main from './components/Main/Main';
import { UserContext } from './components/UserContext';

import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';



function App() {
  const name = localStorage.getItem('username');
  const [username, setUsername] = useState(name);
  return (
    <> 
      <div className="app-wrapper">
        <UserContext.Provider value={ { username, setUsername } }>
          <Header />
        </UserContext.Provider>
        {name ? <Main /> : ''}
      </div>
    </>
  );
}

export default App;
