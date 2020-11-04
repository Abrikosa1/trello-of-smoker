import React, { SetStateAction, useRef, useState } from 'react';
import { Form, Button } from 'react-bootstrap';
import { AddList } from '../../types';

interface IAddListFormProps {
  addList: AddList;
  setShowForm: React.Dispatch<SetStateAction<boolean>>;
}

const AddListForm: React.FC<IAddListFormProps> = ({ addList, setShowForm }) => {
  const [newList, setNewList] = useState('');

  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setNewList(e.target.value);
  };

  const listTitleInput = useRef<HTMLInputElement>(null);
  const handleSubmit = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    const regExp = /^[a-zA-Zа-яА-ЯеЁ0-9-_.]{2,20}$/;
    if(regExp.test(newList)) {
      addList(newList);
    }
    else {
      listTitleInput.current!.focus();
    }
  };
  const handleCancel = (e: React.MouseEvent<HTMLButtonElement>) => {
    setShowForm(false);
  };
  return(
    <Form>
      <Form.Group className="add-list__form" controlId="exampleForm.ControlTextarea1" style={{ marginBottom: '0px' }}>
        <Form.Control value={newList} 
          onChange={handleChange}
          className="add-list__input" 
          placeholder="Enter list title..." 
          ref={listTitleInput}
       />
        <Form.Group style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '3px'}}>
          <Button variant="primary" type="submit" onClick={handleSubmit} style={{ marginTop: '8px' }}>
            Submit
          </Button>
          <Button variant="danger" type="submit" onClick={handleCancel} style={{ marginTop: '8px' }} >
            Cancel
          </Button>
        </Form.Group>
        
      </Form.Group>
    </Form>
  )
}

export default AddListForm;