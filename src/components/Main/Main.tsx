import React, { SetStateAction, useEffect, useRef, useState } from 'react';
import { useOutsideAlerter } from '../../hooks/useOutsideAlerter';
import { AddList, DeleteList, List, RenameList } from '../../types';
import AddListForm from '../AddListForm/AddListForm';
import TasksList from '../TasksList/TasksList';

import './main.css';

interface IMainListProps {
  lists: Array<List>;
  setLists: React.Dispatch<SetStateAction<Array<List>>>;
}

const Main: React.FC<IMainListProps> = ({ lists, setLists }) => {
  console.log(Math.floor((Math.random() * 3) + 1));
  //вычеркивание выполненного

  //const[tasks, setTasks] = useState(initialtodos);
  // const toggleCompleted: ToggleCompleted = selectedTask => {
  //   const updatedTodos = tasks.map(task => {
  //     if (task === selectedTask) {
  //       task.complete = !task.complete;
  //       return task;
  //     }
  //     return task;
  //   });
  //   setTasks(updatedTodos);
  // };


  const deleteList: DeleteList = list_id => {
    const filteredList = lists.filter(list => {
      return list.id !== list_id 
    });
    setLists(filteredList);
  };

  const addList: AddList = newList => {
    setLists([...lists, { id: lists.length + 1, title: newList, tasks : [] }]);
    setShowForm(false);
  };

  const renameList: RenameList = (list_id: number, newTitle: string) => {
      setLists(lists.map(item => 
                    item.id === list_id
                    ? {...item, title: newTitle}
                    : item
      ));
  }


  const [showForm, setShowForm] = useState(false);
  const addListToggle = (e: React.MouseEvent<HTMLSpanElement>) => {
    e.preventDefault();
    setShowForm(true);
  };


    const changeDesc = (e: React.MouseEvent<HTMLButtonElement>) => {
    let arr = [...lists]
    let newArr = arr.map(item  => {
      if (item.id === 1) {
        return {...item, 
                  tasks: item.tasks.map(task => task.id === 1 ? {...task, description: 'DENISKA'} : task)
              }
        } else {
          return item;
        }
      });
      setLists(newArr);
  }

  /* хук для отлова клика за элементом */
  const wrapperRef = useRef(null);
  useOutsideAlerter(wrapperRef, setShowForm);

  return(
    <> 
      <main>
        <div id="board" className="board u-fancy-scrollbar">
          {lists.map(list => {
            return (
              <TasksList deleteList={deleteList} renameList={renameList} key={list.id} lists={lists} setLists={setLists} id={list.id} tasks={list.tasks} title={list.title} list={list} />
              /*setTasks={setTasks} toggleCompleted={toggleCompleted}*/
            )
          })
          }
          <div ref={wrapperRef} className={`tasks-list__add-list tasks-list ${showForm ? "mod-add" : ""}`}>
            {showForm ? <div ><AddListForm addList={addList} setShowForm={setShowForm}/></div> : ''}
            <span className={`add-list__placeholder ${showForm ? "hide" : ""}`} onClick={addListToggle}>
              <span className="icon-sm icon-add"></span>
              {lists ? 'Add another list' : 'Add list '}
            </span>
          </div>
        </div>
      </main>
    </>
  );
}

export default Main;