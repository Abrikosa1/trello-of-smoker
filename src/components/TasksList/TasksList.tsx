import React, { SetStateAction, useContext, useState } from 'react';
import './tasksList.css';
import TaskCard from '../TaskCard/TaskCard';
import { AddTask, Task, ToggleCompleted } from '../../types';
import AddTaskform from '../AddTaskForm/AddTaskform';
import { UserContext } from '../UserContext';

interface ITasksListProps {
  id: number;
  title: string;
  tasks: Array<Task>;
  setTasks: React.Dispatch<SetStateAction<Array<Task>>>;
  toggleCompleted: ToggleCompleted;
}
//todo

const TasksList: React.FC<ITasksListProps> = ({ tasks, id, title, setTasks, toggleCompleted }) => {
  const[task, setTask] = useState(tasks);
  console.log(task);
  const [value, setValue] = useState(false);
  const addCard = (e: React.MouseEvent<HTMLSpanElement>) => {
    e.preventDefault();
    setValue(true);
  }
  const { username } = useContext(UserContext);

  const addTask: AddTask = (newTask: string) => {
    setTask([...tasks, { id: task.length + 1, title: newTask, username: username || "", complete: false }]);
    //localStorage.setItem(username || "", JSON.stringify(tasks));
    setValue(false);
  };
  

 /*------------------------------------------- */


  return(
    <div className="tasks-list" id={id.toString()}>
      <div className="tasks-list__content">
        <div className="tasks-list__header">
          <textarea defaultValue={title} className="tasks-list__title"/>
          <div className="tasks-list__extras">X</div>
        </div>
        <div className="tasks-list__cards u-fancy-scrollbar">
          {task.map(item => {
            return (
              <TaskCard key={item.title} task={item} toggleCompleted={toggleCompleted}/>
            )
          })}
           {value ? <AddTaskform addTask={addTask} /> : ""}
        </div>
        <div className={`tasks-list__card-composer ${value ? "hide" : ""}`}>
          <a className="tasks-composer__open" href="/">
            <span className="icon-sm icon-add"></span>
            <span className="js-add-a-card hide">Add a card</span>
            <span className="js-add-another-card" onClick={addCard}>Add another card</span>
          </a>
        </div>
      </div>
    </div>
  )
};

export default TasksList;