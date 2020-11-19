import React from 'react';
import NameModal from '../NameModal/NameModal';
import { Navbar, Badge } from "react-bootstrap";

import './header.css';

interface IProps {
  username: string;
}

const Header: React.FC<IProps> = ({ username }) => {
 
  return(
    <> 
      <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark" className="justify-content-between">

        <Navbar.Brand>Trello(no)</Navbar.Brand>
  
        <Navbar.Text >
          Signed in as: <Badge pill variant="info" className="badge-xxl" >{username ? username : 'Неопознанный вомбат'}</Badge>
        </Navbar.Text>
       
      </Navbar>
      <NameModal username={username} />
    </>
    
  )
}

export default Header;