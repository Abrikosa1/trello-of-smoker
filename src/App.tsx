import React, { useEffect, useState} from 'react';
import Header from './components/Header/Header';
import Main from './components/Main/Main';
import { UserContext } from './components/UserContext';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';


// if(!localStorage.getItem('data')) {
//   if(initialState) {
//     localStorage.setItem('data', JSON.stringify(initialState));
//   } else {
//     localStorage.setItem('data', JSON.stringify([]));
//   }
// }  

const App: React.FC = () => {
  //const [state, dispatch] = useReducer(reducer, JSON.parse(localStorage.getItem('data') as string));
  const name = localStorage.getItem('username');
  const [username, setUsername] = useState(name);
 
  // useEffect(() => {
  //   localStorage.setItem('data', JSON.stringify(state));
  // }, [state]);
  //const [state, setState] = useState({});

  return (
    <> 
      <div className="app-wrapper">
          <UserContext.Provider value={{ username, setUsername }}>
            <Header />
            {name && <Main />}
          </UserContext.Provider>
      </div>
    </>
  );
}

export default App;
