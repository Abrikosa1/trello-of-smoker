import React, { useRef, useState } from 'react';
import { useOutsideAlerter } from '../../hooks/useOutsideAlerter';
import { List } from '../../types';
import AddListForm from '../AddListForm/AddListForm';
import TasksList from '../TasksList/TasksList';

import './main.css';

interface IMainListProps {
  lists: Array<List>;
  dispatch: any;
}

const Main: React.FC<IMainListProps> = ({ lists, dispatch }) => {
  //вычеркивание выполненного

  //const[tasks, setTasks] = useState(initialtodos);
  // const toggleCompleted: ToggleCompleted = selectedTask => {
  //   const updatedTodos = tasks.map(task => {
  //     if (task === selectedTask) {
  //       task.complete = !task.complete;
  //       return task;
  //     }
  //     return task;
  //   });
  //   setTasks(updatedTodos);
  // };


  const [showForm, setShowForm] = useState(false);

  const toggleAddList = (e: React.MouseEvent<HTMLSpanElement>) => {
    e.preventDefault();
    setShowForm(true);
  };


  /* хук для отлова клика за элементом */
  const wrapperRef = useRef(null);
  useOutsideAlerter(wrapperRef, setShowForm);

  return(
    <> 
      <main>
        <div id="board" className="board u-fancy-scrollbar">
          {lists.map(list => {
            return (
              <TasksList key={list.id} dispatch={dispatch} list={list} />
              /*setTasks={setTasks} toggleCompleted={toggleCompleted}*/
            )
          })}
          <div ref={wrapperRef} className={`tasks-list__add-list tasks-list ${showForm ? "mod-add" : ""}`}>
            {showForm ? <div ><AddListForm dispatch={dispatch} setShowForm={setShowForm}/></div> : ''}
            <span className={`add-list__placeholder ${showForm ? "hide" : ""}`} onClick={toggleAddList}>
              <span className="icon-sm icon-add"></span>
              {lists ? 'Add another list' : 'Add list '}
            </span>
          </div>
        </div>
      </main>
    </>
  );
}

export default Main;