import React from 'react';
import TodoList from '../TodoList/TodoList';

import './main.css';

const Main: React.FC = () => {

  return(
    <> 
      <main>
        <div id="board" className="board u-fancy-scrollbar">
          <TodoList />
          <TodoList />
          <TodoList />
          <TodoList />
          <TodoList />
          <TodoList />
        </div>
      </main>
    </>
  );
}

export default Main;