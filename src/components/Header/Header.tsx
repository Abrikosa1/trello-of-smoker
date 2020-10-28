import React, { useState, useEffect } from 'react';
import NameModal from '../NameModal/NameModal';
import { Navbar } from "react-bootstrap";


const Header: React.FC = () => {
 
  let username = localStorage.getItem('username');
  const [name, setName] = useState(username);
  
  return(
    <>
      <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark" className="justify-content-between">

        <Navbar.Brand href="#home" >Trello(no)</Navbar.Brand>
  
        <Navbar.Text >
          Signed in as: <a href="#login">{username}</a>
        </Navbar.Text>
       
      </Navbar>
      <NameModal />
    </>
  )
}

export default Header;