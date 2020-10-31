import React, { useState } from 'react';
import { Task, ToggleCompleted } from '../../types';
import TasksList from '../TasksList/TasksList';

import './main.css';

const initialtodos: Array<Task> = [
  { title: '1', username: "vasya", complete: false}, 
  { title: 'title', username: "Вомбат", complete: false, },
]

localStorage.setItem('sdfsdfsJ', JSON.stringify(initialtodos));

const Main: React.FC = () => {

 // const username: string | null = localStorage.getItem('username');

  const initialTasks: Array<Task> = JSON.parse(localStorage.getItem('sdfsdfsJ' || '')|| '');
  //console.log(initialTasks);
  const[tasks, setTasks] = useState(initialtodos);
  //console.log(JSON.parse(localStorage.getItem(`sdfsdfsJ`) || ''));
  const toggleCompleted: ToggleCompleted = selectedTask => {
    const updatedTodos = tasks.map(task => {
      if (task === selectedTask) {
        task.complete = !task.complete;
        return task;
      }
      return task;
    });
    setTasks(updatedTodos);
  };


  return(
    <> 
      <main>
        <div id="board" className="board u-fancy-scrollbar">
          <TasksList id={1} tasks={tasks} setTasks={setTasks} toggleCompleted={toggleCompleted} />
          <TasksList id={2} tasks={tasks} setTasks={setTasks} toggleCompleted={toggleCompleted} />
          <TasksList id={3} tasks={tasks} setTasks={setTasks} toggleCompleted={toggleCompleted} />
          <div className="tasks-list__add-list tasks-list">
            <span className="add-list__placeholder">
              <span className="icon-sm icon-add"></span>
              Add another list
            </span>
          </div>
        </div>
      </main>
    </>
  );
}

export default Main;