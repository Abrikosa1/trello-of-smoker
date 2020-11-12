import React, { useContext } from 'react';
import { Task, List } from '../../types';
import { DataContext } from '../DataContext';
import CommentComponent from '../Comment/CommentComponent';
import './commentsList.css'

interface ICommentsList {
  task: Task;
  list: List;
}

const CommentsList: React.FC<ICommentsList> = ({ task, list }) => {
  const { state } = useContext(DataContext);
  return (
    <div className="comments-box">
      {state.comments.filter(comment => comment.taskId === task.id)
                     .map((comment, id) => <CommentComponent key={id} comment={comment} task={task} list={list} />)}   
    </div>  
  )
};

export default CommentsList;