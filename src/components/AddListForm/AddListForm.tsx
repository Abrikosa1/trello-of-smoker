import React, { SetStateAction, useContext, useRef, useState } from 'react';
import { Form, Button } from 'react-bootstrap';
import { DataContext } from '../DataContext';

interface IAddListFormProps {
  setShowForm: React.Dispatch<SetStateAction<boolean>>;
}

const AddListForm: React.FC<IAddListFormProps> = ({setShowForm }) => {
  const { dispatch } = useContext(DataContext);
  const [newListTitle, setNewListTitle] = useState('');

  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setNewListTitle(e.target.value);
  };

  const listTitleInput = useRef<HTMLInputElement>(null);
  const handleSubmit = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    if(newListTitle.length > 1) {
      dispatch({
        type: 'ADD_LIST',
        payload: newListTitle
      });
      setShowForm(false);
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
        <Form.Control value={newListTitle} 
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