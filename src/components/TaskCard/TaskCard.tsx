import React, { SetStateAction, useState } from 'react';
import { ChangeDescription, DeleteTask, List, RenameTask, Task } from '../../types';
import TaskModal from '../TaskModal/TaskModal';
import './taskCard.css';

interface ITaskCardProps {
  task: Task;
  list: List;
  // toggleCompleted: ToggleCompleted;
  dispatch: any;
  
};

const TaskCard: React.FC<ITaskCardProps> = ({ task, list, dispatch }) => {
  //toggleCompleted 

  const handleDeleteTask = (e: React.MouseEvent<HTMLSpanElement>) => {
    dispatch({
      type: 'DELETE_TASK',
      payload: {listId: list.id, taskId: task.id}
    })
  };


  const [taskModalShow, setTaskModalShow] = useState(false);

  const handleShowModal = (e: React.MouseEvent<HTMLDivElement>) => {
    setTaskModalShow(true);
  };


  
  
  return( 
    <>
    <div className="card" key={ task.title } onClick={handleShowModal}>
      <div className="card__details">
        <div className="card__header">
          <span className={`card__title ${task.complete ? "complete" : ""}`} >{task.title}</span>
          <span className="icon-sm icon-delete" onClick={handleDeleteTask}>&#10006;</span>
        </div>
        <div className="card__badges" >
          <div className="card__badge">
            <span className="badge__icon badge__icon_sm badge__icon_comment" >&#128489;</span>
            <span className="badge__text">{task.comments.length}</span>
          </div>
        </div>
      </div>
    </div>
    <TaskModal taskModalShow={taskModalShow} setTaskModalShow={setTaskModalShow} task={task} list={list} dispatch={dispatch} />
  </>
  );
}

export default TaskCard;