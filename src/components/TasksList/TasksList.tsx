import React, { useRef, useState } from 'react';
import './tasksList.css';
import TaskCard from '../TaskCard/TaskCard';
import { List, Task } from '../../types';
import AddTaskform from '../AddTaskForm/AddTaskform';
import { useOutsideAlerter } from '../../hooks/useOutsideAlerter';
import { shallowEqual, useDispatch, useSelector } from 'react-redux';
import { deleteList, renameList } from '../../store/state/actionCreator';


interface IProps {
  list: List;
}

const TasksList: React.FC<IProps> = React.memo(({ list }) => {

  const selectData = (state: any) => state.data;
  const data = useSelector(selectData, shallowEqual)

  const dispatch = useDispatch();

  const [opened, setOpened] = useState(false);
  const addCard = (e: React.MouseEvent<HTMLSpanElement>) => {
    e.preventDefault();
    setOpened(!opened);
  }

  //List events handlers
  const handleDeleteList = (e: React.MouseEvent<HTMLSpanElement>) => {
    dispatch(deleteList(list.id,));
  };

  const listTitleInput = useRef<HTMLTextAreaElement>(null);
  
  const handleRenameList = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    dispatch(renameList(list.id, e.target.value));
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


  //подсчет кол-ва заданий в этом листе
  const tasksCount = data.tasks.filter((task: Task) => task.listId === list.id).length;

  /* хук для отлова клика за элементом */
  const wrapperRef = useRef(null);
  useOutsideAlerter(wrapperRef, setOpened);



  return(
    <div className="tasks-list" >
      <div className="tasks-list__content">
        <div className="tasks-list__header">
          <textarea ref={listTitleInput}  className="tasks-list__title" value={list.title} onKeyUp={textAreaAdjust} onChange={handleRenameList} onBlur={handleBlurList} />
          <span className="icon-sm icon-delete" onClick={handleDeleteList}>&#10006;</span>
        </div>
        <div className="tasks-list__cards u-fancy-scrollbar">
          {data.tasks.filter((task: Task) => task.listId === list.id)
                      .map((task: Task) => <TaskCard key={task.id} list={list} task={task} />)}
          {opened && <div ref={wrapperRef}><AddTaskform setOpened={setOpened} list={list} /></div>}        
        </div>
        {!opened && <div className='tasks-list__card-composer '>
          <div className="tasks-composer__open">
            <span className="icon-sm icon-add"></span>
            <span className="js-add-another-card" onClick={addCard}>{tasksCount > 0 ? 'Add another card' : 'Add card'}</span>
          </div> 
        </div>}
      </div>
    </div>
  )
});

export default TasksList;

