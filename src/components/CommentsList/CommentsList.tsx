import React from 'react';
import { Task, List, Comment } from '../../types';
import CommentComponent from '../Comment/CommentComponent';
import './commentsList.css'
import { shallowEqual, useSelector } from 'react-redux';

interface IProps {
  task: Task;
  list: List;
}

const CommentsList: React.FC<IProps> = React.memo(({ task, list }) => {
  const selectComments = (state: any) => state.data.comments;
  const comments = useSelector(selectComments, shallowEqual)
  return (
    <div className="comments-box">
      {comments.filter((comment: Comment) => comment.taskId === task.id)
                     .map((comment: Comment) => <CommentComponent key={comment.id} comment={comment} task={task} list={list} />)}   
    </div>  
  )
});

export default CommentsList;