import React, { SetStateAction, useContext, useEffect, useRef, useState } from 'react';
import './tasksList.css';
import TaskCard from '../TaskCard/TaskCard';
import { AddTask, DeleteList, DeleteTask, List, RenameList, Task } from '../../types';
import AddTaskform from '../AddTaskForm/AddTaskform';
import { UserContext } from '../UserContext';


interface ITasksListProps {
  id: number;
  title: string;
  tasks: Array<Task>;
  list: List;
  lists: Array<List>;
  setLists: React.Dispatch<SetStateAction<Array<List>>>;
  renameList: RenameList;
  deleteList: DeleteList;
  //setTasks: React.Dispatch<SetStateAction<Array<Task>>>;
  // toggleCompleted: ToggleCompleted;
}

const TasksList: React.FC<ITasksListProps> = ({ id, title, tasks, list, lists, setLists, renameList, deleteList }) => {
  
  const[task, setTask] = useState(tasks);

  const [opened, setOpened] = useState(false);
  const addCard = (e: React.MouseEvent<HTMLSpanElement>) => {
    console.log(opened);
    e.preventDefault();
    setOpened(!opened);
  }

  const { username } = useContext(UserContext);
  
  const addTask: AddTask = (newTask: string) => {
    const added = { id: tasks.length + 1, title: newTask, description: "", username: username || "", complete: false, create_time: new Date(), comments: [] };
    setTask([...tasks, added]);
    list.tasks.push(added);
    localStorage.setItem('lists' || "", JSON.stringify(lists));
        // setLists(lists.map(item  => {
        //       if (item.id === list.id) {
        //         return {...item, 
        //                   tasks: task
        //                } 
        //       } else {
        //           return item;
        //       }
        //     }))
    setOpened(!opened);
  };

  const deleteTask: DeleteTask = (list_id: number, task_id: number) => {
    const newTasksList = task.filter(item => {
      return item.id !== task_id 
    });
    setTask(newTasksList);
    setLists(lists.map(item  => {
              if (item.id === list_id) {
                return {...item, 
                          tasks: newTasksList
                       } 
              } else {
                  return item;
              }
            }))
  }



  //List events handlers
  const handleDeleteList = (e: React.MouseEvent<HTMLSpanElement>) => {
    deleteList(id);
  };

  const listTitleInput = useRef<HTMLTextAreaElement>(null);
  
  const handleRenameList = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
      renameList(id, e.target.value); 
  };



  /* Лучше вынести в отдельный хук, т.к дублируется, и приводит к багу после модалки логина*/
  // const ref = useRef<HTMLDivElement>(null);
  // const handleOutsideclick = (e: any) => {
  //   console.log("ffdsf");
  //   if (ref.current && !ref.current.contains(e.target)) {
  //     setOpened(!opened);
  //   }
  // };

  // useEffect(() => {
  //   document.addEventListener("click", handleOutsideclick);

  //   return () => {
  //     document.removeEventListener("click", handleOutsideclick);
  //   };
  // });
  return(
    <div className="tasks-list" id={id.toString()} >
      <div className="tasks-list__content">
        <div className="tasks-list__header">
          <textarea id={'textarea' + id} ref={listTitleInput}  className="tasks-list__title" value={title} onChange={handleRenameList}/>
          <span className="icon-sm icon-delete" onClick={handleDeleteList}>&#10006;</span>
        </div>
        <div className="tasks-list__cards u-fancy-scrollbar">
          {task.map(item => {
            return (
              <TaskCard lists={lists} setTask={setTask} setLists={setLists} key={item.id} list={list} task={item} deleteTask={deleteTask} />
              //toggleCompleted={toggleCompleted}
            )
          })}
          
           {opened ? <div ><AddTaskform addTask={addTask} setOpened={setOpened} /></div> : ""}
          
        </div>
        {!opened ? <div className='tasks-list__card-composer '>
          <div className="tasks-composer__open">
            <span className="icon-sm icon-add"></span>
            <span className="js-add-another-card" onClick={addCard}>{tasks.length > 0 ? 'Add another card' : 'Add card'}</span>
          </div> 
        </div>: ""}
      </div>
    </div>
  )
};

export default TasksList;