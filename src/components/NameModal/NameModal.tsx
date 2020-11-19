import React, { useState, useEffect } from 'react';
import { Form, Modal, Button, InputGroup, FormControl } from 'react-bootstrap';
import { useDispatch } from 'react-redux';
import { addUsername } from '../../store/userData/actionCreators';

interface IProps {
  username: string;
}

const NameModal: React.FC<IProps> = ({ username }) => {

  let inputUsername: string;

  const dispatch = useDispatch();

  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);


  const changeUsername = (e: React.ChangeEvent<HTMLInputElement>) => {
      inputUsername = e.target.value.trim();
  }

  const submitModal = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
      dispatch(addUsername(inputUsername));
      handleClose();
  };

  useEffect(() => {
    if(!username) {
      handleShow();
    }
  }, [username])

  return (
    <>
      <Modal
        show={show}
        onHide={handleClose}
        backdrop="static"
        keyboard={false}
        animation={false}
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