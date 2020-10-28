import React from 'react';
import Header from './components/Header/Header';
import Main from './components/Main/Main';

import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';


const ColorContext = React.createContext("username");
function App() {
  return (
    <>
      <Header />
      <Main />
    </>
  );
}

export default App;
