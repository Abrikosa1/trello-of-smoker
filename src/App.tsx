import React from 'react';
import Header from './components/Header/Header';
import Main from './components/Main/Main';
import { shallowEqual, useSelector } from 'react-redux';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';


const App: React.FC = React.memo(() => {
  const selectUsername = (state: any) => state.user.username;
  const username = useSelector(selectUsername, shallowEqual);
  return (
    <> 
      <div className="app-wrapper">
            <Header username={username} />
            {username && <Main />}
      </div>
    </>
  );
});

export default App;
