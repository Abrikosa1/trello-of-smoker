import React, { ChangeEvent, FormEvent, useState } from 'react';
import { Button, Form } from 'react-bootstrap';
import { AddTask } from '../../types';
import './addTaskform.css';

interface IAddTaskFormProps {
  addTask: AddTask;
}

const AddTaskform: React.FC<IAddTaskFormProps> = ({ addTask }) => {
  const [newTask, setNewTask] = useState('');

  const handleChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
    setNewTask(e.target.value);
  }

  const handleSubmit = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    addTask(newTask);
  }
  return(
     <div className="task-card__composer">
       <div className="card">
         <div className="card__details">
            <Form className="card-add__form">
              <Form.Group controlId="exampleForm.ControlTextarea1">
                <Form.Control value={newTask} 
                onChange={handleChange}
                className="card-add__textarea" 
                placeholder="Enter a title for this card…" 
                as="textarea" 
                rows={3} />
                <Button variant="primary" type="submit" onClick={handleSubmit}>
                  Submit
                </Button>
              </Form.Group>
            </Form>
          </div>
      </div>
    </div>
  );
}

export default AddTaskform;