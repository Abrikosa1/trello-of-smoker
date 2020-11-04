import React, { SetStateAction, useEffect, useState } from 'react';
import { DeleteTask, List, RenameTask, Task } from '../../types';
import TaskModal from '../TaskModal/TaskModal';
import './taskCard.css';

interface ITaskCardProps {
  task: Task;
  deleteTask: DeleteTask;
  list: List;
  setTask: React.Dispatch<SetStateAction<Array<Task>>>;
  setLists: React.Dispatch<SetStateAction<Array<List>>>;
  // toggleCompleted: ToggleCompleted;
  lists: Array<List>;
};

const TaskCard: React.FC<ITaskCardProps> = ({ task, deleteTask, list, setTask, setLists, lists }) => {
  //toggleCompleted 

  const handleDeleteTask = (e: React.MouseEvent<HTMLSpanElement>) => {
    deleteTask(list.id, task.id);
  };


  const [taskModalShow, setTaskModalShow] = useState(false);

  const handleShowModal = (e: React.MouseEvent<HTMLDivElement>) => {
    setTaskModalShow(true);
  };
  // useEffect(() => {
  //   setTaskModalShow(false);
  // }, [taskModalShow]);

  const [name, setName] = useState(task);


  // const localLists = JSON.parse(localStorage.getItem('lists') || '') || '';
  // let [userData, setUserData] = useState(localLists);
  // console.log(localLists);

 const renameTask: RenameTask = (list_id: number, task_id: number, newTitle: string) => {
  task.title = newTitle;
  let arr = [...lists]
  let newArr = arr.map(item  => {
    if (item.id === list_id) {
      return {...item, 
                tasks: item.tasks.map(task => task.id === task_id ? {...task, title: newTitle} : task)
             }
      } else {
        return item;
      }
    });
    console.log(newArr);
    setLists([...newArr]);
  }

  return(
    <div className="card" key={ task.title } onClick={handleShowModal}>
      <div className="card__details">
        <div className="card__header">
          {/* <input className="card__checkbox" type="checkbox" aria-label="Checkbox for following text input" checked={task.complete} /> */}
          <span className={`card__title ${task.complete ? "complete" : ""}`} >{task.title}</span>
          <span className="icon-sm icon-delete" onClick={handleDeleteTask}>&#10006;</span>
        </div>
        <div className="card__badges">
          <div className="card__badge">
            <span className="badge__icon badge__icon_sm badge__icon_comment" >&#128489;</span>
            <span className="badge__text" >1</span>
          </div>
        </div>
      </div>
      {taskModalShow ? <TaskModal taskModalShow={taskModalShow}  renameTask={renameTask} setTask={setTask} setName={setName} task={task} list={list} deleteTask={deleteTask} setTaskModalShow={setTaskModalShow}/> : ""} 
    </div>
  );
}

export default TaskCard;