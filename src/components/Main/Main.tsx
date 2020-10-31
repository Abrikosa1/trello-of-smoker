import React, { SetStateAction, useState } from 'react';
import { AddList, List, Task, ToggleCompleted } from '../../types';
import AddListForm from '../AddListForm/AddListForm';
import TasksList from '../TasksList/TasksList';

import './main.css';

interface IMainListProps {
  lists: Array<List>;
  setLists: React.Dispatch<SetStateAction<Array<List>>>;
}

const initialtodos: Array<Task> = [
  { id: 1, title: '1', username: "vasya", complete: false}, 
  { id: 2, title: 'Thetitle', username: "vasya", complete: true}, 
  { id: 1, title: 'title', username: "Вомбат", complete: false, },
]


localStorage.setItem('sdfsdfsJ', JSON.stringify(initialtodos));

const Main: React.FC<IMainListProps> = ({ lists, setLists }) => {
  //{ lists }
 // const username: string | null = localStorage.getItem('username');

  //const initialTasks: Array<Task> = JSON.parse(localStorage.getItem('sdfsdfsJ' || '')|| '');
  const[tasks, setTasks] = useState(initialtodos);

  //вычеркивание выполненного
  // const[tasks, setTasks] = useState(initialtodos);
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


  const addList: AddList = newList => {
    setLists([...lists, { id: lists.length + 1, title: newList, tasks : [] }]);
    //localStorage.setItem(username || "", JSON.stringify(tasks));
    //setValue(false);
  };

  const [showForm, setShowForm] = useState(false);
  const addListToggle = (e: React.MouseEvent<HTMLSpanElement>) => {
    e.preventDefault();
    setShowForm(true);
  };





  return(
    <> 
      <main>
        <div id="board" className="board u-fancy-scrollbar">
          {lists.map(list => {
            return (
              <TasksList id={list.id} tasks={list.tasks} title={list.title} setTasks={setTasks} toggleCompleted={toggleCompleted}/>
            )
          })}
          {/* <TasksList id={1} tasks={tasks} setTasks={setTasks} toggleCompleted={toggleCompleted} />
          <TasksList id={2} tasks={tasks} setTasks={setTasks} toggleCompleted={toggleCompleted} />
          <TasksList id={3} tasks={tasks} setTasks={setTasks} toggleCompleted={toggleCompleted} /> */}
          <div className={`tasks-list__add-list tasks-list ${showForm ? "mod-add" : ""}`}>
            {showForm ? <AddListForm addList={addList}/> : ''}
            <span className={`add-list__placeholder ${showForm ? "hide" : ""}`} onClick={addListToggle}>
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