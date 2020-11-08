import React from 'react';
import { Task, List } from '../../types';
import CommentComponent from '../Comment/CommentComponent';
import './commentsList.css'

interface ICommentsList {
  task: Task;
  list: List;
}

const CommentsList: React.FC<ICommentsList> = ({ task, list }) => {
  return (
    <div className="comments-box">
      {task.comments.map(comment => {
        return (<CommentComponent key={comment.id} comment={comment} task={task} list={list} />)
      })}   
    </div>  
  )
};

export default CommentsList;