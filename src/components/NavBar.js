/*eslint-disable no-unused-vars*/
import React, { useContext } from 'react';
import { useHistory } from 'react-router-dom';
import { Button, Nav, Navbar } from 'react-bootstrap';
import LoggedIn from '../components/LoginContext';
import '../styles/NavBar.css';

const JumpToMainContent = () => {
  if (window.location.pathname === '/shipment-list') {
    return (
      <a href="#main-content" className="skip-link">
        Skip To Content
      </a>
    );
  }
  return <span></span>;
};
/*eslint-enable no-unused-vars*/

const NavBar = () => {
  const { loggedIn, setLoggedInHelper } = useContext(LoggedIn);
  const history = useHistory();

  const handleClick = async () => {
    if (!loggedIn.loggedIn) {
      history.push('/login');
    } else {
      const response = await fetch('/auth/logout');

      if (response.status === 200) {
        setLoggedInHelper(false, null, null, null);
        history.push('/');
      } else {
        alert('Failed to log out. Please contact the developer.');
      }
    }
  };

  return (
    <>
      <JumpToMainContent />
      <Navbar className="navbar" bg="light" expand="lg" sticky="top">
        <Navbar.Brand href="/" className="brand">
          ShipCare
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="mr-auto">
            <Nav.Item as="li" className="p-1">
              <Nav.Link href="/">Home</Nav.Link>
            </Nav.Item>
            <Nav.Item as="li" className="p-1">
              <Nav.Link href="/shipment-list">My Shipments</Nav.Link>
            </Nav.Item>
          </Nav>
          <Button
            variant="outline-secondary"
            onClick={handleClick}
            className="p-1"
          >
            {loggedIn.loggedIn ? 'Sign Out' : 'Sign In'}
          </Button>
        </Navbar.Collapse>
      </Navbar>
    </>
  );
};

export default NavBar;
