import React, { SetStateAction, useContext, useRef, useState } from 'react';
import { Modal } from 'react-bootstrap';
import { List, Task } from '../../types';
import CommentComponent from '../Comment/CommentComponent';
import { UserContext } from '../UserContext';
import { Comment } from '../../types';
import './taskModal.css';

interface ITaskModal {
  task: Task;
  taskModalShow: boolean;
  setTaskModalShow: React.Dispatch<SetStateAction<boolean>>;
  list: List;
  dispatch: any;
}


const TaskModal: React.FC<ITaskModal> = ({ task, dispatch, list, setTaskModalShow,  taskModalShow}) => {
     /* get current username from context*/
  const currentUser = useContext(UserContext);
  const author = currentUser.username;
  
  
  const ref = useRef(null);
  const handleCloseModal = () => {
    setTaskModalShow(false);
  }

  const handleTitleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    dispatch({
      type: 'RENAME_TASK',
      payload: {listId: list.id, taskId: task.id, newTitle: e.target.value}
    })
  };

  const handleTitleBlur = (e: React.FocusEvent<HTMLTextAreaElement>) => {
    if(e.target.value.length < 1) {
      e.target.focus();
    }
  }

  const [edit, setEdit] = useState(false);
  const handleEditDescription = (e: React.MouseEvent<HTMLButtonElement>) => {
    setEdit(!edit);
  };


  const [description, setDescription] = useState(task.description);
  const handleDescriptionChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setDescription(e.target.value);
  }
   const handleDescriptionSubmit = (e: React.MouseEvent<HTMLInputElement>) => {
     //task.description = description;
     dispatch({
       type: 'EDIT_TASK_DESCRIPTION',
       payload: { listId: list.id, taskId: task.id, newDesc: description}
     })
     setEdit(false);
   }
  
   const handleClickDeleteTask = (e: React.MouseEvent<HTMLButtonElement>) => {
    dispatch({
      type: 'DELETE_TASK',
      payload: {listId: list.id, taskId: task.id}
      })
   };



   /* add comment */
   const [newComment, setNewComment] = useState('');
   const handleCommentChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setNewComment(e.target.value);
   };

  const handleCommentSubmit = (e: React.MouseEvent<HTMLInputElement>) => {
    e.preventDefault();
    const addedComment:Comment = { id: task.comments.length + 1, text: newComment, author: author!, create_time: new Date()};
    dispatch({
      type: 'ADD_TASK_COMMENT',
      payload: {listId: list.id, taskId: task.id, newComment: addedComment}
    })
    setNewComment('')
   }




  // Для автоматического увеличения высоты texarea
  const textAreaAdjust = (e: any) => {
    e.target.style.height = '1px';
    e.target.style.height = e.target.scrollHeight +'px';
  };


  const handleToggleTaskCompleted = (e: React.ChangeEvent<HTMLInputElement>) => {
    dispatch({
      type: 'TOGGLE_TASK_COMPLETED',
      payload: {listId: list.id, taskId: task.id}
    })
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
              <textarea value={task.title} onKeyUp={textAreaAdjust} className={`task-details__title task-details__input ${task.complete ? 'complete' : 
            ''}`} onChange={handleTitleChange} onBlur={handleTitleBlur} required></textarea>
            </div>
            <div className="task-details__list-info">
              <p className="u-inline-block u-bottom">in list <span className="task-details__list-name">{list.title}</span></p>
            </div>
          </div>
          <div className="task-details__main">
            <div className="task-details__task-description">
              
              <div className="task-description__title">
                <span className="task-description__icon">&#128457;</span>
                <h3 className="task-description__heading">Description</h3>
                <div className="task-description__task-editable">
                  <button className="task-editable__button" onClick={handleEditDescription}>Edit</button>
                </div>
              </div>

              <div className="task-description__text">
                {(task.description && !edit) ? <p>{task.description}</p> : ""}
                <div className={`task-description__edit ${!edit ? 'edit_closed' : ''}`}>
                  <textarea onKeyUp={textAreaAdjust} value={description} onChange={handleDescriptionChange} className="description-edit__texarea card-description" placeholder="Add a more detailed description…" >
                  </textarea>
                  <div className="edit-controls">
                    <input className="edit-controls__save-btn" type="submit" value="Save" onClick={handleDescriptionSubmit}/>
                    <span className="edit-controls__cancel-icon icon-sm" onClick={handleEditDescription}>&#10006;</span>
                  </div>
              </div>
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
                <span className="task-description__icon">&#128491;</span>
                <h3 className="task-description__heading">Activity</h3>
                <div className="task__complete">
                  <span>Set as completed: &nbsp;</span>
                  <input className="card__checkbox" type="checkbox" aria-label="Checkbox for following text input" checked={task.complete} onChange={handleToggleTaskCompleted} />  
                </div>
              </div>

              <div className="task-comments">
                <form>
                  <div className="comment-box">
                    <textarea className="comment-box__input" value={newComment} placeholder="Write a comment…" onKeyUp={textAreaAdjust} onChange={handleCommentChange}>
                    </textarea>
                    <div className="comment-box__save">
                      <input className="" disabled={newComment.length === 0} type="submit" value="Save" onClick={handleCommentSubmit}></input>
                      <p className="author">author:&nbsp;<span className="author-initials" title={author!} aria-label={author!}>{" " + author}</span></p>
                    </div>
                  </div>
                </form>
              </div>
              {/* <!-- /.task-comments --> */}
              <div className="comments-box">
                {task.comments.map(comment => {
                  return (<CommentComponent key={comment.id} comment={comment} task={task} list={list} dispatch={dispatch} />)
                })}   
              </div>                        
            </div>
 
          </div>
     
          <button className="task-editable__button delete-button" onClick={handleClickDeleteTask}>Delete</button>

        </div> 
        {/* <!-- /.task-details --> */}

    </Modal>
  );
}

export default TaskModal;