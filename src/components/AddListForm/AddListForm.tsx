import React, { useState } from 'react';
import { Form, Button } from 'react-bootstrap';
import { AddList } from '../../types';

interface IAddListFormProps {
  addList: AddList;
}

const AddListForm: React.FC<IAddListFormProps> = ({ addList }) => {
  const [newList, setNewList] = useState('');

  //const newTask = '';


  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setNewList(e.target.value);
  };

  const handleSubmit = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    addList(newList);
  };

  return(
    <Form>
      <Form.Group className="add-list__form" controlId="exampleForm.ControlTextarea1" style={{ marginBottom: '0px' }}>
        <Form.Control value={newList} 
          onChange={handleChange}
          className="add-list__input" 
          placeholder="Enter list title..." 
       />
      
        <Button variant="primary" type="submit" onClick={handleSubmit} style={{ marginTop: '8px' }}>
          Submit
        </Button>
      </Form.Group>
    </Form>
  )
}

export default AddListForm;