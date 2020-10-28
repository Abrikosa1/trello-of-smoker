import React, { useState, useEffect, useLayoutEffect } from 'react';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import InputGroup from 'react-bootstrap/InputGroup';
import FormControl from 'react-bootstrap/FormControl';

const NameModal: React.FC = () => {
  
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);


  const [username, setUsername] = useState<string | null>(localStorage.getItem('username' || '') );

  const changeUsername = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUsername(e.target.value.trim());
    localStorage.setItem('username', username || '');
  }


  const submitModal = () => {
    if(username?.trim()) {
      localStorage.setItem('username', username || '');
      handleClose();
    } 
  };


  //  useEffect(()=>{
  //   if(!localStorage.getItem('username')) {
  //     handleShow();
  //   } 
  // },[])

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
          <Modal.Title>Modal title</Modal.Title>
        </Modal.Header>
        <Modal.Body>
            <InputGroup>
              <FormControl value={username || ''} onChange={changeUsername}
                placeholder="Input your username"
                aria-label="Recipient's username"
                aria-describedby="basic-addon2"
                required
              />
            </InputGroup>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close {username}
          </Button>
          <Button variant="primary" onClick={submitModal}>Understood</Button>
        </Modal.Footer>
      </Modal>

      <Button variant="primary" onClick={handleShow}>
        Launch static backdrop modal
      </Button>
    </>
  );
}

export default NameModal;