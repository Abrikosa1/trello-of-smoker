import React from 'react';
import './todoList.css';
import TaskCard from '../TaskCard/TaskCard';

const TodoList: React.FC = () => {
  return(
    <div className="todo-list">
      <div className="todo-list__content">
        <div className="todo-list__header">
          <textarea className="todo-list__title">TODO</textarea>
          <div className="todo-list__extras">X</div>
        </div>
        <div className="todo-list__cards">
          <TaskCard />
          <TaskCard />
          <TaskCard />
          <TaskCard />
          <TaskCard />
        </div>
        <div className="todo-list__card-composer">
          <a className="card-composer__open" href="#">
            <span className="icon-sm icon-add"></span>
            <span className="js-add-a-card hide">Add a card</span>
            <span className="js-add-another-card">Add another card</span>
          </a>
        </div>
      </div>
    </div>
  )
};

export default TodoList;