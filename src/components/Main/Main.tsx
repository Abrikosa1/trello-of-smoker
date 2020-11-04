import React, { SetStateAction, useEffect, useRef, useState } from 'react';
import { AddList, DeleteList, List, RenameList } from '../../types';
import AddListForm from '../AddListForm/AddListForm';
import TasksList from '../TasksList/TasksList';

import './main.css';

interface IMainListProps {
  lists: Array<List>;
  setLists: React.Dispatch<SetStateAction<Array<List>>>;
}

const Main: React.FC<IMainListProps> = ({ lists, setLists }) => {
 
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


  /* Лучше вынести в отдельный хук, т.к дублируется, и приводит к багу после модалки логина*/
  // const addListFormRef = useRef<HTMLDivElement>(null);
  // const handleOutsideclick = (e: any) => {
  //   if (addListFormRef.current && !addListFormRef.current.contains(e.target)) {
  //     setShowForm(!showForm);
  //   }
  // };

  // useEffect(() => {
  //   document.addEventListener("click", handleOutsideclick);

  //   return () => {
  //     document.removeEventListener("click", handleOutsideclick);
  //   };
  // });
  
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
          <div  className={`tasks-list__add-list tasks-list ${showForm ? "mod-add" : ""}`}>
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