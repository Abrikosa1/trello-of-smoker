import React from 'react';
import { Comment } from '../../types';
import './commentComponent.css'

interface IComment {
  comment: Comment;
}

const CommentComponent: React.FC<IComment> = ( {comment} ) => {

  const date: Date = new Date(comment.create_time);
  const month = date.toLocaleString('en-en', { month: 'short' });
  const day = date.getDate();
  const time = date.toLocaleString('en-US', { hour: 'numeric', minute: 'numeric', hour12: true })
  console.log(day);
  // let date2 = comment.create_time;
  // console.log(comment.create_time);
  return (
    <div key={comment.id} className="comment__wrapper">
      <div className="comment__header">
        <span className="comment__author">{comment.author}</span>
        <span className="comment__date">{month + ' ' + day + ' at ' + time}</span>
      </div>
      <div className="comment__body">
        <span className="comment__icon">🗩</span>
        <div className="comment__card">
          <p className="comment__text">{comment.text}</p>
        </div>
      </div>
      {/* <div className="comment__footer">
        <span>Edit</span>
      </div> */}
    </div>
  );
}

export default CommentComponent;