import React from 'react';
import Container from 'react-bootstrap/Navbar';
import TodoList from '../TodoList/TodoList';
import Board from '../Board/Board';

import './main.css';

const Main: React.FC = () => {

  return(
    <>
      <main>
        <Container>
          <div id="board" className="board u-fancy-scrollbar">
            <TodoList />
            <TodoList />
            <TodoList />
            <TodoList />
            <TodoList />
            <TodoList />
          </div>
        </Container>
      </main>
    </>
  );
}

export default Main;