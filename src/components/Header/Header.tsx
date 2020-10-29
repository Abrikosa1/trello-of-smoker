import React, { useContext } from 'react';
import NameModal from '../NameModal/NameModal';
import { Navbar, Badge } from "react-bootstrap";
import { UserContext } from '../UserContext';


const Header: React.FC = () => {
 
  const { username } = useContext(UserContext);


  return(
    <> 
      <style type="text/css">
      {`
      .badge-xxl {
        font-size: inherit;
      }
      `}
    </style>
      <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark" className="justify-content-between">

        <Navbar.Brand href="#home" >Trello(no)</Navbar.Brand>
  
        <Navbar.Text >
          Signed in as: <Badge pill variant="info" className="badge-xxl" >{username ? username : 'Неопознанный вомбат'}</Badge>
        </Navbar.Text>
       
      </Navbar>
      <NameModal />
    </>
    
  )
}

export default Header;