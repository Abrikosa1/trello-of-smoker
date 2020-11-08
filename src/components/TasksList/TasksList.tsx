import React, { useRef, useState } from 'react';
import './tasksList.css';
import TaskCard from '../TaskCard/TaskCard';
import { List } from '../../types';
import AddTaskform from '../AddTaskForm/AddTaskform';
import { useOutsideAlerter } from '../../hooks/useOutsideAlerter';


interface ITasksListProps {
  list: List;
  dispatch: any;
  // toggleCompleted: ToggleCompleted;
}

const TasksList: React.FC<ITasksListProps> = ({ list, dispatch }) => {
  
  const [opened, setOpened] = useState(false);
  const addCard = (e: React.MouseEvent<HTMLSpanElement>) => {
    e.preventDefault();
    setOpened(!opened);
  }

  //List events handlers
  const handleDeleteList = (e: React.MouseEvent<HTMLSpanElement>) => {
    dispatch({
      type: 'DELETE_LIST',
      payload: list.id
    })
  };

  const listTitleInput = useRef<HTMLTextAreaElement>(null);
  
  const handleRenameList = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    dispatch({
      type: 'RENAME_LIST',
      payload: { listId: list.id, newTitle: e.target.value }
    })
  };

  const handleBlurList = (e: React.FocusEvent<HTMLTextAreaElement>) => {
    if(e.target.value.length < 1) {
      e.target.focus();
    }
  };



  const textAreaAdjust = (e: any) => {
    e.target.style.height = '1px';
    e.target.style.height = e.target.scrollHeight +'px';
  };

  /* хук для отлова клика за элементом */
  const wrapperRef = useRef(null);
  useOutsideAlerter(wrapperRef, setOpened);



  return(
    <div className="tasks-list" >
      {/* <button onClick={changeDesc}></button> */}
      <div className="tasks-list__content">
        <div className="tasks-list__header">
          <textarea ref={listTitleInput}  className="tasks-list__title" value={list.title} onKeyUp={textAreaAdjust} onChange={handleRenameList} onBlur={handleBlurList} />
          <span className="icon-sm icon-delete" onClick={handleDeleteList}>&#10006;</span>
        </div>
        <div className="tasks-list__cards u-fancy-scrollbar">
          {list.tasks.map(item => {
            return (
              <TaskCard key={item.id} list={list} task={item} dispatch={dispatch} />
              //toggleCompleted={toggleCompleted}
            )
          })}
          
           {opened && <div ref={wrapperRef}><AddTaskform dispatch={dispatch} setOpened={setOpened} list={list} /></div>}
          
        </div>
        {!opened && <div className='tasks-list__card-composer '>
          <div className="tasks-composer__open">
            <span className="icon-sm icon-add"></span>
            <span className="js-add-another-card" onClick={addCard}>{list.tasks.length > 0 ? 'Add another card' : 'Add card'}</span>
          </div> 
        </div>}
      </div>
    </div>
  )
};

export default TasksList;

