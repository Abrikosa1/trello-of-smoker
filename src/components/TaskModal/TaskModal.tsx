import React, { SetStateAction, useEffect, useState } from 'react';
import { Modal } from 'react-bootstrap';
import { DeleteTask, List, Task } from '../../types';
import './taskModal.css';

interface ITaskModal {
  task: Task;
  deleteTask: DeleteTask;
  //taskModalShow: boolean;
  setTaskModalShow: React.Dispatch<SetStateAction<boolean>>;
  list: List;
}

const TaskModal: React.FC<ITaskModal> = ({ task, deleteTask, list, setTaskModalShow }) => {
  const [show, setShow] = useState(true);
  const handleCloseModal = (e: React.MouseEvent<HTMLSpanElement>) => {
    setShow(false);
    setTaskModalShow(false);
  };

  return (
    <Modal
      show={show}
      onHide={handleCloseModal}
      aria-labelledby="example-custom-modal-styling-title"
      dialogClassName="task-modal__wrapper"
      centered 
    >
        <span className="icon-sm icon-delete task-modal__close" onClick={handleCloseModal}>&#10006;</span>
        <div className="task-details u-clearfix">
          <div className="task-details__header">
            <span className="task-details__icon">&#128073;</span>
            <div className="task-details__title">
              <textarea value={task.title} className="task-details__title task-details__input"></textarea>
            </div>
            <div className="task-details__list-info">
              <p className="u-inline-block u-bottom">in list <a href="#" className="js-open-move-from-header">{list.title}</a></p>
            </div>
          </div>

          <div className="task-details__main">
            <div className="task-details__task-description">
              
              <div className="task-description__title">
                <span className="task-description__icon">&#128457;</span>
                <h3 className="task-description__heading">Description</h3>
                <div className="task-description__task-editable">
                  <a className="task-editable__button" href="#">Edit</a>
                </div>
              </div>

              <div className="task-description__text">
                <p>{task.description}</p>
              </div>
                Author: {task.username}
            </div>
          </div>

        </div>
    </Modal>
  );
}

export default TaskModal;