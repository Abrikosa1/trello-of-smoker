import React, { SetStateAction, useEffect, useState } from 'react';
import { AddList, List } from '../../types';
import AddListForm from '../AddListForm/AddListForm';
import TasksList from '../TasksList/TasksList';

import './main.css';

interface IMainListProps {
  lists: Array<List>;
  setLists: React.Dispatch<SetStateAction<Array<List>>>;
}

const Main: React.FC<IMainListProps> = ({ lists, setLists }) => {
 
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


  const addList: AddList = newList => {
    setLists([...lists, { id: lists.length + 1, title: newList, tasks : [] }]);
    setShowForm(false);
  };

  useEffect(() => {
    localStorage.setItem('lists' || "", JSON.stringify(lists));
  }, [lists]);

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
              <TasksList key={list.id} lists={lists} setLists={setLists} id={list.id} tasks={list.tasks} title={list.title} list={list} />
              /*setTasks={setTasks} toggleCompleted={toggleCompleted}*/
            )
          })}
          <div className={`tasks-list__add-list tasks-list ${showForm ? "mod-add" : ""}`}>
            {showForm ? <AddListForm addList={addList} setShowForm={setShowForm}/> : ''}
            <span className={`add-list__placeholder ${showForm ? "hide" : ""}`} onClick={addListToggle}>
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