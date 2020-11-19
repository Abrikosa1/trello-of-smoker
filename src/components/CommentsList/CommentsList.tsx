import React from 'react';
import { Task, List, State } from '../../store/types';
import CommentComponent from '../Comment/CommentComponent';
import { shallowEqual, useSelector } from 'react-redux';
import './commentsList.css';

interface IProps {
  task: Task;
  list: List;
  username: string;
}

const CommentsList: React.FC<IProps> = React.memo(({ task, list, username }) => {
  const selectComments = (state: State) => state.data.comments;
  const comments = useSelector(selectComments, shallowEqual)
  return (
    <div className="comments-box">
      {comments.filter(comment => comment.taskId === task.id)
               .map(comment => <CommentComponent key={comment.id} username={username} comment={comment} task={task} list={list} />)}   
    </div>  
  )
});

export default CommentsList;