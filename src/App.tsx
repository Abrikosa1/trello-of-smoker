import React from 'react';
import Header from './components/Header/Header';
import Main from './components/Main/Main';
import NameModal from './components/NameModal/NameModal';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';

function App() {
  return (
    <>
      <Header />
      <Main />
      <NameModal />
    </>
  );
}

export default App;
