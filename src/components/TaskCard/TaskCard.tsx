import React, { useState } from 'react';
import { List, Task, Comment } from '../../types';
import TaskModal from '../TaskModal/TaskModal';
import './taskCard.css';
import { BsChatFill } from "react-icons/bs";
import { shallowEqual, useDispatch, useSelector } from 'react-redux';
import { deleteTask } from '../../store/listsData/actionCreator';

interface IProps {
  task: Task;
  list: List;
};

const TaskCard: React.FC<IProps> = ({ task, list }) => {
  const dispatch = useDispatch();
  
  const handleDeleteTask = (e: React.MouseEvent<HTMLSpanElement>) => {
    dispatch(deleteTask(task.id));
  };

  const selectComments = (state: any) => state.data.comments;
  const comments = useSelector(selectComments, shallowEqual)
  
  const [taskModalShow, setTaskModalShow] = useState(false);

  const handleShowModal = (e: React.MouseEvent<HTMLDivElement>) => {
    setTaskModalShow(true);
  };


    //подсчет кол-ва комментов в этой задачке
  const commentsCount = comments.filter((comment: Comment) => comment.taskId === task.id).length;

  return( 
    <>
      <div className="card" key={ task.title }>
        <div className="card__details">
          <div className="card__header">
            <span className={`card__title ${task.complete ? "complete" : ""}`} onClick={handleShowModal} >{task.title}</span>
            <span className="icon-sm icon-delete" onClick={handleDeleteTask}>&#10006;</span>
          </div>
          <div className="card__badges" onClick={handleShowModal}>
            <div className="card__badge">
              <span className="badge__icon badge__icon_sm badge__icon_comment" ><BsChatFill /></span>
              <span className="badge__text">{commentsCount}</span>
            </div>
          </div>
        </div>
      </div>
      <TaskModal taskModalShow={taskModalShow} setTaskModalShow={setTaskModalShow} task={task} list={list} />
    </>
  );
}

export default TaskCard;