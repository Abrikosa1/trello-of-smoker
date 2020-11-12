import React, { SetStateAction, useContext, useRef, useState } from 'react';
import { Button, Form } from 'react-bootstrap';
import { List } from '../../types';
import { DataContext } from '../DataContext';
import { UserContext } from '../UserContext';

import './addTaskform.css';

interface IAddTaskFormProps {
  setOpened: React.Dispatch<SetStateAction<boolean>>;
  list: List;
}

const AddTaskform: React.FC<IAddTaskFormProps> = ({ setOpened, list }) => {
  const { dispatch, state } = useContext(DataContext);
  //add task
  const [newTask, setNewTask] = useState('');
  const { username } = useContext(UserContext);
  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setNewTask(e.target.value);
  };

  const textInput = useRef<HTMLTextAreaElement>(null);
  const handleSubmit = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    if(newTask.length > 0) {
      dispatch({
        type: 'ADD_TASK',
        payload: { listId: list.id, taskId: state.tasks.length + 1, newTaskTitle: newTask, username: username!}
      })
      
      setOpened(false);
    } else {      
      textInput.current!.focus();
    }
  };

  //cancel add
  const handleCancel = (e: any) => {
    console.log('handleCancel');
    e.preventDefault();
      setOpened(false);
  };

  
  return(
     <div className="task-card__composer" >
       <div  className="card" >
         <div className="card__details">
            <Form className="card-add__form">
              <Form.Group controlId="exampleForm.ControlTextarea1" style={{ marginBottom: '3px' }}>
                <Form.Control ref={textInput} value={newTask} 
                  onChange={handleChange}
                  className="card-add__textarea" 
                  placeholder="Enter a title for this card…" 
                  as="textarea" 
                  rows={3} 
                  required
                  autoFocus
                />
                <Form.Group style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '3px' }} >
                  <Button variant="primary" type="submit" onClick={handleSubmit}>
                    Submit
                  </Button>
                  <Button variant="danger" type="submit" onClick={handleCancel}>
                    Cancel
                  </Button>
                </Form.Group>
              </Form.Group>
            </Form>
          </div>
      </div>
    </div>
  );
}

export default AddTaskform;