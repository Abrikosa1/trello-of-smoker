import React, { SetStateAction, useEffect, useRef, useState } from 'react';
import { Button, Form, Overlay, Tooltip } from 'react-bootstrap';
import { AddTask } from '../../types';

import './addTaskform.css';

interface IAddTaskFormProps {
  addTask: AddTask;
  setOpened: React.Dispatch<SetStateAction<boolean>>;
}

const AddTaskform: React.FC<IAddTaskFormProps> = ({ addTask, setOpened }) => {

  const [showAddForm, setShowAddForm] = useState(true);
  const ref = useRef<HTMLDivElement>(null);
  
  //Show tooltip
  const [show, setShow] = useState(false);
  const target = useRef(null);


  //add task
  const [newTask, setNewTask] = useState('');

  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setNewTask(e.target.value);
  };

  const handleSubmit = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    const regExp = /^[a-zA-Zа-яА-ЯеЁ0-9-_.]{2,20}$/;
    if(regExp.test(newTask)) {
      addTask(newTask);
    } else {
      setShow(!show);
      setTimeout(() => setShow(show), 3000);
    }
  };

  const handleCancel = (e: any) => {
    e.preventDefault();
    if (ref.current && !ref.current.contains(e.target)) {
      console.log("1");
      setOpened(false);
      //setShowAddForm(false);
    }
  };

  useEffect(() => {
    document.addEventListener("click", handleCancel);

    return () => {
      document.removeEventListener("click", handleCancel);
    };
  });
  
  return(
     <div className="task-card__composer" >
       {showAddForm && (
       <div  className="card" ref={ref}>
         <div className="card__details">
            <Form className="card-add__form">
              <Form.Group controlId="exampleForm.ControlTextarea1" style={{ marginBottom: '3px' }}>
                <Form.Control value={newTask} 
                  onChange={handleChange}
                  className="card-add__textarea" 
                  placeholder="Enter a title for this card…" 
                  as="textarea" 
                  rows={3} 
                />
                <Form.Group style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '3px' }}>
                  <Button variant="primary" type="submit" onClick={handleSubmit} ref={target}>
                    Submit
                  </Button>
                  <Overlay target={target.current} show={show} placement="bottom">
                    {(props) => (
                      <Tooltip id="overlay-example" {...props}>
                        Может лучше ввести что-нибудь?
                      </Tooltip>
                    )}
                  </Overlay>
                  <Button variant="danger" type="submit" onClick={handleCancel}>
                    Cancel
                  </Button>
                </Form.Group>
              </Form.Group>
            </Form>
          </div>
      </div>)}
    </div>
  );
}

export default AddTaskform;