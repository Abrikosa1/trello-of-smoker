import React, { useContext, useState } from 'react';
import { Comment, List, Task } from '../../types';
import { UserContext } from '../UserContext';
import './commentComponent.css'

interface IComment {
  comment: Comment;
  task: Task;
  list: List;
  dispatch: any;
}

const CommentComponent: React.FC<IComment> = ({ list, task, comment, dispatch }) => {

  const author = useContext(UserContext);
  const date: Date = new Date(comment.create_time);
  const month = date.toLocaleString('en-en', { month: 'short' });
  const day = date.getDate();
  const time = date.toLocaleString('en-US', { hour: 'numeric', minute: 'numeric', hour12: true })


  /* Delete comment */
  const hancleClickDeleteComment = (e: React.MouseEvent<HTMLSpanElement>) => {
    dispatch({
      type: 'DELETE_TASK_COMMENT',
      payload: {listId: list.id, taskId: task.id, commentId: comment.id}
    })
  };
  

  /* Edit comment */
  const [edit, setEdit] = useState(false);
  const [editedComment, setEditedComment] = useState(comment.text);

  const handleEditComment = (e: React.MouseEvent<HTMLButtonElement>) => {
    setEdit(!edit);
  };

  const hancleClickEditComment = (e: React.MouseEvent<HTMLSpanElement>) => {
    setEdit(true);
  };
  
  const handleCommentChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setEditedComment(e.target.value);
  }

  const hancleSubmitEditComment = (e: React.MouseEvent<HTMLSpanElement>) => {
    dispatch({
      type: 'EDIT_TASK_COMMENT',
      payload: {listId: list.id, taskId: task.id, commentId: comment.id, newComment: editedComment}
    })
    setEdit(false);
  };


  
  // Для автоматического увеличения высоты texarea
  const textAreaAdjust = (e: any) => {
    e.target.style.height = '1px';
    e.target.style.height = e.target.scrollHeight +'px';
  };


  return (
    <div key={comment.id} className="comment__wrapper">
      <div className="comment__header">
        <span className="comment__author">{comment.author}</span>
        <span className="comment__date">{month + ' ' + day + ' at ' + time}</span>
      </div>
      <div className="comment__body">
        <span className="comment__icon">🗩</span>
        {!edit && <div className="comment__card">
          <p className="comment__text">{comment.text}</p>
        </div>}
      </div>
      <div className="comment__footer">
        {((comment.author === author.username) && !edit) && <span className="comment__edit" onClick={hancleClickEditComment}>Edit</span>}
          <div className={`task-description__edit ${!edit ? 'edit_closed' : ''}`}>
              <textarea onKeyUp={textAreaAdjust} value={editedComment} onChange={handleCommentChange} className="description-edit__texarea card-description" placeholder="Oh, have you changed your mind?" >
              </textarea>
              <div className="edit-controls">
                <input className="" disabled={editedComment.length === 0} type="submit" value="Save" onClick={hancleSubmitEditComment}/>
                <span className="edit-controls__cancel-icon icon-sm" onClick={handleEditComment}>&#10006;</span>
              </div>
          </div>
        {((comment.author === author.username) && !edit) && <span className="comment__edit" onClick={hancleClickDeleteComment}>Deliete</span>}
      </div>
    </div>
  );
}

export default CommentComponent;