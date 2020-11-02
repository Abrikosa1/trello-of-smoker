import React, { SetStateAction, useContext, useEffect, useRef, useState } from 'react';
import './tasksList.css';
import TaskCard from '../TaskCard/TaskCard';
import { AddTask, DeleteTask, List, Task } from '../../types';
import AddTaskform from '../AddTaskForm/AddTaskform';
import { UserContext } from '../UserContext';


interface ITasksListProps {
  id: number;
  title: string;
  tasks: Array<Task>;
  list: List;
  lists: Array<List>;
  setLists: React.Dispatch<SetStateAction<Array<List>>>;
  //setTasks: React.Dispatch<SetStateAction<Array<Task>>>;
  // toggleCompleted: ToggleCompleted;
}

const TasksList: React.FC<ITasksListProps> = ({ id, title, tasks, list, lists, setLists }) => {

  const[task, setTask] = useState(tasks);

  const [opened, setOpened] = useState(false);
  const addCard = (e: React.MouseEvent<HTMLSpanElement>) => {
    e.preventDefault();
    setOpened(true);
  }

  const { username } = useContext(UserContext);
  
  const addTask: AddTask = (newTask: string) => {
    console.log(list.tasks);
    const added = { id: tasks.length + 1, title: newTask, description: "", username: username || "", complete: false, create_time: new Date() };
    setTask([...tasks, added]);
    list.tasks.push(added);
    localStorage.setItem('lists' || "", JSON.stringify(lists));
    setOpened(!opened);
  };

  
  const deleteTask: DeleteTask = (list_id: number, task_id: number) => {
    const newTasksList = task.filter(item => {
      return item.id !== task_id 
    });
    setTask(newTasksList);
    list.tasks = newTasksList;

    localStorage.setItem('lists' || "", JSON.stringify(lists));
  }
  
  const handleDeleteList = (e: React.MouseEvent<HTMLSpanElement>) => {
    console.log('А вот нет пока удаления');
  };

  const renameList = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    list.title = e.target.value;
    localStorage.setItem('lists' || "", JSON.stringify(lists));
  }

  const ref = useRef<HTMLDivElement>(null);
  const handleOutsideclick = (e: any) => {
    
    if (ref.current && !ref.current.contains(e.target)) {
      setOpened(!opened);
    }
  };

  useEffect(() => {
    document.addEventListener("click", handleOutsideclick);

    return () => {
      document.removeEventListener("click", handleOutsideclick);
    };
  });
  return(
    <div className="tasks-list" id={id.toString()} >
      <div className="tasks-list__content">
        <div className="tasks-list__header">
          <textarea spellCheck="false" className="tasks-list__title" defaultValue={title} onChange={renameList}/>
          <span className="icon-sm icon-delete" onClick={handleDeleteList}>&#10006;</span>
        </div>
        <div className="tasks-list__cards u-fancy-scrollbar">
          {task.map(item => {
            return (
              <TaskCard key={item.id} list={list} task={item} deleteTask={deleteTask}/>
              //toggleCompleted={toggleCompleted}
            )
          })}
          
           {opened ? <div ref={ref}><AddTaskform addTask={addTask} setOpened={setOpened} /></div> : ""}
          
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