import React, { useRef, useState } from 'react';
import { shallowEqual, useSelector } from 'react-redux';
import { useOutsideAlerter } from '../../hooks/useOutsideAlerter';
import { selectLists } from '../../store/selectors';
import { List } from '../../store/types';
import AddListForm from '../AddListForm/AddListForm';
import TasksList from '../TasksList/TasksList';

import './main.css';

interface IProps {
  
}

const Main: React.FC<IProps> = React.memo(() => {
  const [showForm, setShowForm] = useState(false);
  const lists = useSelector(selectLists, shallowEqual);


  const toggleAddList = (e: React.MouseEvent<HTMLSpanElement>) => {
    e.preventDefault();
    setShowForm(true);
  };


  /* хук для отлова клика за элементом */
  const wrapperRef = useRef<HTMLDivElement>(null);
  useOutsideAlerter(wrapperRef, setShowForm);

  return(
    <> 
      <main>
        <div id="board" className="board u-fancy-scrollbar">
          {lists.map((list: List) => {
            return (
              <TasksList key={list.id} list={list} />
            )
          })}
          <div ref={wrapperRef} className={`tasks-list__add-list tasks-list ${showForm ? "mod-add" : ""}`}>
            {showForm ? <div ><AddListForm setShowForm={setShowForm}/></div> : ''}
            <span className={`add-list__placeholder ${showForm ? "hide" : ""}`} onClick={toggleAddList}>
              <span className="icon-sm icon-add"></span>
              {lists.length > 0 ? 'Add another list' : 'Add list '}
            </span>
          </div>
        </div>
      </main>
    </>
  );
});

export default Main;