import React, { useState, useEffect, useContext } from 'react';
import { UserContext } from '../UserContext';
import { Form, Modal, Button, InputGroup, FormControl } from 'react-bootstrap';

const NameModal: React.FC = () => {

  let inputUsername: string;

  const { setUsername } = useContext(UserContext);
  

  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);


  const changeUsername = (e: React.ChangeEvent<HTMLInputElement>) => {
    inputUsername = e.target.value.trim();
  }

  const submitModal = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setUsername(inputUsername);
    localStorage.setItem('username', inputUsername);
    handleClose();
  };

  useEffect(()=>{
    if(!localStorage.getItem('username')) {
      handleShow();
    } 
  },[])

  return (
    <>
      <Modal
        show={show}
        onHide={handleClose}
        backdrop="static"
        keyboard={false}
        centered 
      >
        <Modal.Header closeButton>
          <Modal.Title>Oops... what is your username?</Modal.Title>
        </Modal.Header>
        <Form onSubmit={submitModal}>
          <Modal.Body>
            <InputGroup>
              <FormControl onChange={changeUsername}
                placeholder="Input your username"
                aria-label="Recipient's username"
                aria-describedby="basic-addon2"
                required
              />
            </InputGroup>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="primary" type="submit">Submit</Button>
          </Modal.Footer>
        </Form>
      </Modal>
    </>
  );
}

export default NameModal;