import React, { SetStateAction, useRef, useState } from 'react';
import { Button, Form } from 'react-bootstrap';
import { AddTask } from '../../types';

import './addTaskform.css';

interface IAddTaskFormProps {
  addTask: AddTask;
  setOpened: React.Dispatch<SetStateAction<boolean>>;
}

const AddTaskform: React.FC<IAddTaskFormProps> = ({ addTask, setOpened }) => {

  //add task
  const [newTask, setNewTask] = useState('');

  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setNewTask(e.target.value);
  };

  const textInput = useRef<HTMLTextAreaElement>(null);
  const handleSubmit = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    const regExp = /^[a-zA-Zа-яА-ЯеЁ0-9-_.]{2,20}$/;
    if(regExp.test(newTask)) {
      addTask(newTask);
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
                  <Button variant="primary" type="submit" onClick={handleSubmit}  >
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