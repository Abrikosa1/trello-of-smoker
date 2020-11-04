import React, { SetStateAction, useRef, useState } from 'react';
import { Modal } from 'react-bootstrap';
import { DeleteTask, List, RenameTask, Task } from '../../types';
import './taskModal.css';

interface ITaskModal {
  task: Task;
  deleteTask: DeleteTask;
  taskModalShow: boolean;
  setTaskModalShow: React.Dispatch<SetStateAction<boolean>>;
  list: List;
  setName: React.Dispatch<SetStateAction<Task>>;
  setTask: React.Dispatch<SetStateAction<Array<Task>>>;
  renameTask: RenameTask;
}

const TaskModal: React.FC<ITaskModal> = ({ task, deleteTask, list, taskModalShow, setTaskModalShow, renameTask }) => {
  //console.log(list, task.id);
  console.log(task.comments.map(item => item));
  const ref = useRef(null);
  const [show, setShow] = useState(taskModalShow);
  const handleCloseModal = (e: React.MouseEvent<HTMLSpanElement>) => {
    console.log('close');
    setShow(false);
    setTaskModalShow(false);
    // show:boolean = false;
    taskModalShow = false;
    
  };


  const handleTitleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    renameTask(list.id,task.id, e.target.value);
  };

  
  const author: string | '' = localStorage.getItem('username') || '';
  const textAreaAdjust = (e: any) => {
    e.target.style.height = '1px';
    e.target.style.height = (25 + e.target.scrollHeight) +'px';
  };
  return (
    <Modal
      show={taskModalShow}
      onHide={handleCloseModal}
      aria-labelledby="example-custom-modal-styling-title"
      dialogClassName="task-modal__wrapper"
      animation={false}
      centered 
      ref={ref}
    >
        <span className="icon-sm icon-delete task-modal__close" onClick={handleCloseModal}>&#10006;</span>
        <div className="task-details u-clearfix">
          <div className="task-details__header">
            <span className="task-details__icon">&#128073;</span>
            <div className="task-details__title">
              <textarea value={task.title} className="task-details__title task-details__input" onChange={handleTitleChange} required></textarea>
            </div>
            <div className="task-details__list-info">
              <p className="u-inline-block u-bottom">in list <a href="#" className="js-open-move-from-header">{list.title}</a></p>
            </div>
          </div>
          {/* <input type="text" onChange={e => setName(e.target.value)} /> */}
          <div className="task-details__main">
            <div className="task-details__task-description">
              
              <div className="task-description__title">
                <span className="task-description__icon">&#128457;</span>
                <h3 className="task-description__heading">Description</h3>
                <div className="task-description__task-editable">
                  <button className="task-editable__button">Edit</button>
                </div>
              </div>

              <div className="task-description__text">
                <p>{task.description}</p>
              </div>

              <div className="task-description__title task-description__title_author">
                <span className="task-description__author-icon">&#9997;</span>
                <h3 className="task-description__heading">Author</h3>
              </div>
              <div className="task-description__text">
                <p>{task.username}</p>
              </div>
            </div>

            <div className="task-details__task-activities">

              <div className="task-description__title task-description__title_author">
                <span className="task-description__icon">&#128489;</span>
                <h3 className="task-description__heading">Activity</h3>
              </div>

              <div className="task-comments">
                <form>
                  <div className="comment-box">
                    <textarea className="comment-box__input"  placeholder="Write a comment…" onKeyUp={textAreaAdjust}>
                    </textarea>
                    <div className="comment-box__save">
                      <input className="" disabled={true} type="submit" value="Save"></input>
                      <p className="author">author:&nbsp;<span className="author-initials" title={author} aria-label={author}>{" " + author}</span></p>
                    </div>
                  </div>
                </form>
              </div>
              {/* <!-- /.task-comments --> */}
              <ul>
                {task.comments.map(comment => {
                  return (<li key={`dsfds' + ${Math.floor(Math.random() * 10)}`}>{comment.text}</li>)
                })}
              </ul>
              
            </div>

          </div>

          <button className="task-editable__button delete-button" onClick={e => deleteTask(list.id, task.id)}>Delete</button>

        </div> 
        {/* <!-- /.task-details --> */}

    </Modal>
  );
}

export default TaskModal;