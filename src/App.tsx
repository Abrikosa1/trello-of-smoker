import React from 'react';
import Header from './components/Header/Header';
import Main from './components/Main/Main';
import { shallowEqual, useSelector } from 'react-redux';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import { selectCurrentUsername } from './store/selectors';


const App: React.FC = React.memo(() => {
  const username = useSelector(selectCurrentUsername, shallowEqual);
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


