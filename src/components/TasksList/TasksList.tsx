import React, { SetStateAction, useContext, useState } from 'react';
import './tasksList.css';
import TaskCard from '../TaskCard/TaskCard';
import { AddTask, List, Task } from '../../types';
import AddTaskform from '../AddTaskForm/AddTaskform';
import { UserContext } from '../UserContext';

interface ITasksListProps {
  id: number;
  title: string;
  tasks: Array<Task>;
  list: List;
  lists: Array<List>;
  setLists: React.Dispatch<SetStateAction<Array<List>>>;
  // setTasks: React.Dispatch<SetStateAction<Array<Task>>>;
  // toggleCompleted: ToggleCompleted;
}
//todo

const TasksList: React.FC<ITasksListProps> = ({ tasks, id, title, list, lists, setLists }) => {
  const[task, setTask] = useState(tasks);

  const [opened, setOpened] = useState(false);
  const addCard = (e: React.MouseEvent<HTMLSpanElement>) => {
    e.preventDefault();
    setOpened(true);
  }
  const { username } = useContext(UserContext);
  
  const addTask: AddTask = (newTask: string) => {
    const added = { id: tasks.length + 1, title: newTask, username: username || "", complete: false };
    setTask([...tasks, added]);
    list.tasks.push(added);
    localStorage.setItem('lists' || "", JSON.stringify(lists));
    setOpened(false);
  };

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
              <TaskCard key={item.title} task={item} />
              //toggleCompleted={toggleCompleted}
            )
          })}
           {opened ? <AddTaskform addTask={addTask} setOpened={setOpened}/> : ""}
        </div>
        <div className={`tasks-list__card-composer ${opened ? "hide" : ""}`}>
          <div className="tasks-composer__open">
            <span className="icon-sm icon-add"></span>
            <span className="js-add-another-card" onClick={addCard}>{tasks.length > 0 ? 'Add another card' : 'Add card'}</span>
          </div>
        </div>
      </div>
    </div>
  )
};

export default TasksList;