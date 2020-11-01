import React from 'react';
import { DeleteTask, Task } from '../../types';
import './taskCard.css';

interface ITaskCardProps {
  task: Task;
  deleteTask: DeleteTask;
  list_id: number;
  // toggleCompleted: ToggleCompleted;
};

const TaskCard: React.FC<ITaskCardProps> = ({ task, deleteTask, list_id }) => {
  //toggleCompleted 

  const handleDeleteTask = (e: React.MouseEvent<HTMLSpanElement>) => {
    deleteTask(list_id, task.id);
  };

  return(
    <div className="card" key={ task.title }>
      <div className="card__details">
        <div className="card__header">
          {/* <input className="card__checkbox" type="checkbox" aria-label="Checkbox for following text input" checked={task.complete} /> */}
          <span className={`card__title ${task.complete ? "complete" : ""}`} >{task.title}</span>
          <span className="icon-sm icon-delete" onClick={handleDeleteTask}>&#10006;</span>
        </div>
        <div className="card__badges">
          <div className="card__badge">
            <span className="badge__icon badge__icon_sm badge__icon_comment">&#128489;</span>
            <span className="badge__text">1</span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default TaskCard;