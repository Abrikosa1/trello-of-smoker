import React, { SetStateAction, useRef, useState } from 'react';
import { Form, Button, Overlay, Tooltip } from 'react-bootstrap';
import { AddList } from '../../types';

interface IAddListFormProps {
  addList: AddList;
  setShowForm: React.Dispatch<SetStateAction<boolean>>;
}

const AddListForm: React.FC<IAddListFormProps> = ({ addList, setShowForm }) => {
  const [newList, setNewList] = useState('');


  const [show, setShow] = useState(false);
  const target = useRef(null);

  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setNewList(e.target.value);
  };

  const handleSubmit = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    const regExp = /^[a-zA-Zа-яА-ЯеЁ0-9-_.]{2,20}$/;
    if(regExp.test(newList)) {
      addList(newList);
    }
    else {
      setShow(!show);
      setTimeout(() => setShow(show), 3000);
    }
  };
  const handleCancel = (e: React.MouseEvent<HTMLButtonElement>) => {
    console.log(e.target)
    setShowForm(false);
  };
  return(
    <Form>
      <Form.Group className="add-list__form" controlId="exampleForm.ControlTextarea1" style={{ marginBottom: '0px' }}>
        <Form.Control value={newList} 
          onChange={handleChange}
          className="add-list__input" 
          placeholder="Enter list title..." 
       />
        <Form.Group style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '3px'}}>
          <Button variant="primary" type="submit" onClick={handleSubmit} ref={target} style={{ marginTop: '8px' }}>
            Submit
          </Button>
          <Overlay target={target.current} show={show} placement="bottom">
            {(props) => (
              <Tooltip id="overlay-example" {...props}>
                Может лучше ввести что-нибудь?
              </Tooltip>
            )}
          </Overlay>
          <Button variant="danger" type="submit" onClick={handleCancel} style={{ marginTop: '8px' }} >
            Cancel
          </Button>
        </Form.Group>
        
      </Form.Group>
    </Form>
  )
}

export default AddListForm;