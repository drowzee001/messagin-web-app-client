import React from "react";
import { Navbar, Nav } from "react-bootstrap";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import { logout } from "../redux/actions/authAction";

const NavBar = () => {
  const history = useHistory();
  const dispatch = useDispatch();
  const logOut = () => {
    dispatch(logout());
  };

  return (
    <Navbar fixed="top" collapseOnSelect expand="sm" bg="dark" variant="dark">
      <Navbar.Brand>Messenger</Navbar.Brand>
      <Navbar.Toggle aria-controls="responsive-navbar-nav" />
      <Navbar.Collapse id="responsive-navbar-nav">
        <Nav className="mr-auto">
          <Nav.Link onClick={() => history.push("/home")}>Home</Nav.Link>
          {/* <NavDropdown title="Account" id="collasible-nav-dropdown">
            <NavDropdown.Item href="/ProfilePic">
              Change Profile Picture
            </NavDropdown.Item>
            <NavDropdown.Item href="/components/Account/Email">
              Change Email
            </NavDropdown.Item>
            <NavDropdown.Item href="/components/Account/Password">
              Change Password
            </NavDropdown.Item>
          </NavDropdown> */}
          <Nav.Link onClick={() => logOut()}>Logout</Nav.Link>
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  );
};

export default NavBar;
