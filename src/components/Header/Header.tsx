import React from 'react';
import { Navbar } from "react-bootstrap";


const Header: React.FC = () => {
  return(
    <>
      <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark" className="justify-content-between">

        <Navbar.Brand href="#home" >Trello(no)</Navbar.Brand>
  
        <Navbar.Text >
          Signed in as: <a href="#login">Name</a>
        </Navbar.Text>
       
      </Navbar>
    </>
  )
}

export default Header;