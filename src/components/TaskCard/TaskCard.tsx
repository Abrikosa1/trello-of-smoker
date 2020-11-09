import React, { useContext, useState } from 'react';
import { List, Task } from '../../types';
import { ListsDataContext } from '../ListsDataContext';
import TaskModal from '../TaskModal/TaskModal';
import './taskCard.css';
import { BsChatFill } from "react-icons/bs";

interface ITaskCardProps {
  task: Task;
  list: List;
};

const TaskCard: React.FC<ITaskCardProps> = ({ task, list }) => {
  const { dispatch } = useContext(ListsDataContext);
  
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
            <span className="badge__icon badge__icon_sm badge__icon_comment" ><BsChatFill /></span>
            <span className="badge__text">{task.comments.length}</span>
          </div>
        </div>
      </div>
    </div>
    <TaskModal taskModalShow={taskModalShow} setTaskModalShow={setTaskModalShow} task={task} list={list} />
  </>
  );
}

export default TaskCard;