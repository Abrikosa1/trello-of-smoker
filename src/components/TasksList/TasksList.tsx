import React, { RefObject, SetStateAction, useContext, useEffect, useRef, useState } from 'react';
import './tasksList.css';
import TaskCard from '../TaskCard/TaskCard';
import { AddTask, ChangeDescription, DeleteList, DeleteTask, List, RenameList, Task } from '../../types';
import AddTaskform from '../AddTaskForm/AddTaskform';
import { UserContext } from '../UserContext';
import { useOutsideAlerter } from '../../hooks/useOutsideAlerter';


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

  const handleBlurList = (e: React.FocusEvent<HTMLTextAreaElement>) => {
    if(e.target.value.length < 1) {
      e.target.focus();
    }
  };

  const changeDesc: ChangeDescription = (list_id: number, task_id: number, new_desc: string) => {
    // let newTasks = [...tasks];
    // let newTasksArr = newTasks.map(item => {
    //               if(item.id === task_id) {
    //                 return {...item, description: new_desc}
    //               }
    //               else {
    //                 return item;
    //               }
    //             }
    //   )
    //   setTask(newTasksArr);
    // let newLists = [...lists]
    // let newListsArr = newLists.map(item  => {
    //   if (item.id === list_id) {
    //     return {...item, 
    //               tasks: task
    //           }
    //     } else {
    //       return item;
    //     }
    //   });
    //   setLists([...newListsArr]); 
    //   console.log(newListsArr); 
    let arr = [...lists]
    let newArr = arr.map(item  => {
      if (item.id === list_id) {
        return {...item, 
                  tasks: item.tasks.map(task => task.id === task_id ? {...task, description: new_desc} : task)
              }
        } else {
          return item;
        }
      });
      setLists(newArr);
      console.log(newArr);
  }

  const textAreaAdjust = (e: any) => {
    e.target.style.height = '1px';
    e.target.style.height = e.target.scrollHeight +'px';
  };

  /* хук для отлова клика за элементом */
  const wrapperRef = useRef(null);
  useOutsideAlerter(wrapperRef, setOpened);



  return(
    <div className="tasks-list" id={id.toString()} >
      {/* <button onClick={changeDesc}></button> */}
      <div className="tasks-list__content">
        <div className="tasks-list__header">
          <textarea ref={listTitleInput}  className="tasks-list__title" value={title} onKeyUp={textAreaAdjust} onChange={handleRenameList} onBlur={handleBlurList} />
          <span className="icon-sm icon-delete" onClick={handleDeleteList}>&#10006;</span>
        </div>
        <div className="tasks-list__cards u-fancy-scrollbar">
          {task.map(item => {
            return (
              <TaskCard changeDesc={changeDesc} lists={lists} setTask={setTask} setLists={setLists} key={item.id} list={list} task={item} deleteTask={deleteTask} />
              //toggleCompleted={toggleCompleted}
            )
          })}
          
           {opened && <div ref={wrapperRef}><AddTaskform addTask={addTask} setOpened={setOpened} /></div>}
          
        </div>
        {!opened && <div className='tasks-list__card-composer '>
          <div className="tasks-composer__open">
            <span className="icon-sm icon-add"></span>
            <span className="js-add-another-card" onClick={addCard}>{tasks.length > 0 ? 'Add another card' : 'Add card'}</span>
          </div> 
        </div>}
      </div>
    </div>
  )
};

export default TasksList;

