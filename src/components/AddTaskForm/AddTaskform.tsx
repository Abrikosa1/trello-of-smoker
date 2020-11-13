import React, { SetStateAction, useContext, useRef, useState } from 'react';
import { Button, Form } from 'react-bootstrap';
import { List } from '../../types';
import { DataContext } from '../DataContext';
import { UserContext } from '../UserContext';
import { v4 as uuidv4 } from 'uuid';
import './addTaskform.css';

interface IProps {
  setOpened: React.Dispatch<SetStateAction<boolean>>;
  list: List;
}

const AddTaskform: React.FC<IProps> = ({ setOpened, list }) => {

  const { dispatch } = useContext(DataContext);

  //add task
  const [newTaskTitle, setNewTaskTitle] = useState('');
  const { username } = useContext(UserContext);
  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setNewTaskTitle(e.target.value);
  };

  const textInput = useRef<HTMLTextAreaElement>(null);
  const handleSubmit = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    if(newTaskTitle.length > 0) {
      dispatch({
        type: 'ADD_TASK',
        payload: { taskId: uuidv4(), listId: list.id, newTaskTitle: newTaskTitle, username: username!}
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
                <Form.Control ref={textInput} value={newTaskTitle} 
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