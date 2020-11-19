import React from 'react';
import { Task, List } from '../../store/types';
import CommentComponent from '../Comment/CommentComponent';
import { shallowEqual, useSelector } from 'react-redux';
import './commentsList.css';
import { selectCommentsByTaskId } from '../../store/selectors';

interface IProps {
  task: Task;
  list: List;
  username: string;
}

const CommentsList: React.FC<IProps> = React.memo(({ task, list, username }) => {
  const comments = useSelector(selectCommentsByTaskId(task.id), shallowEqual)
  return (
    <div className="comments-box">
      {comments.map(comment => <CommentComponent key={comment.id} username={username} comment={comment} task={task} list={list} />)}   
    </div>  
  )
});

export default CommentsList;