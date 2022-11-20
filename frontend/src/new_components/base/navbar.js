import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { CDBIcon } from 'cdbreact';

import { useAuth } from '../auth/useAuth';
// import AccountStatus from './account_status';

// Local CSS import
import "../matador_components.css";

function MatadorNavBar() {
  
  const { user, signoutFrontend } = useAuth();

  const onSignoutPressed = () => {
      // This logs the user out
      fetch("api/signoutUser").then(signoutFrontend());
      // This seems kinda jenky; not sure if there is a better way.
  };

  return (
    <>
      <Navbar>
        <Container>
          <Navbar.Brand href={!user ? "/" : "/dashboard"}>
          {/* <img FIGURE OUT HOW TO GET IMAGES TO SHOW UP
              alt=""
              src="/logo512.png"
              width="30"
              height="30"
              className="d-inline-block align-top"
          />{' '}   */}
          Matador
          </Navbar.Brand>
          <Nav>
            <Nav.Link href="/about">About</Nav.Link>
            <Nav.Link href="/research">Research</Nav.Link>
            <Nav.Link href="/strategies">Strategies</Nav.Link>
          </Nav>
          {!user ? 
            <Nav className="justify-content-end">
              <Nav.Link href="/signin">Sign In</Nav.Link>
              <Nav.Link href="/signup">Sign Up</Nav.Link>
            </Nav>: 
            <Nav className="justify-content-end">
              <Nav.Link href="/account">
                  <CDBIcon className="mr-2" icon="user" />
                  Account
              </Nav.Link>
              <Nav.Link onClick={onSignoutPressed}>Sign Out</Nav.Link>
            </Nav>}
          {/* <AccountStatus props={{ auth: user }}/> */}
        </Container>
      </Navbar>
      <hr/>
      </>
  );
}

export default MatadorNavBar;