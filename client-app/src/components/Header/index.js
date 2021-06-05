import React, { useState, useEffect } from "react";
import {
  Navbar,
  Button,
  Nav,
  FormControl,
  Form,
  Dropdown,
  DropdownButton,
  Container,
} from "react-bootstrap";
import "./style.css";
import NewModal from "../Modal";
import Input from "../Input";
import { useDispatch, useSelector } from "react-redux";
import logo from "../../img/logo.jpg";
import { login, signout } from "../../actions";
import { NavLink } from "react-router-dom";

export default function Header(props) {
  const [loginModal, setLoginModal] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const auth = useSelector((state) => state.auth);

  const dispatch = useDispatch();

  const userLogin = () => {
    dispatch(login({ email, password }));
  };

  const logout = () => {
    dispatch(signout());
  };

  /* useEffect(() => {
     if(auth.authenticate){

    } 
  }, [auth.authenticate]); */

  const renderLoggedInMenu = () => {
    return (
      <>
        <NavLink class="nav-link" to="/">
          Home
        </NavLink>
        <NavLink class="nav-link" to="/">
          About
        </NavLink>
        <NavLink class="nav-link" to="/">
          Chef
        </NavLink>
        <NavLink class="nav-link" to="/">
          Menu
        </NavLink>
        <NavLink class="nav-link" to="/">
          Contact
        </NavLink>
        {/* <Nav.Link href="#action6">{auth.user.fullName}</Nav.Link> */}
        <NavLink class="nav-link" to="/cart">
          <i className="fa fa-cart-plus"></i> Cart
        </NavLink>
        <DropdownButton title={auth.user.fullName} variant="dark">
          <Dropdown.Item href="#/action-1">Profile</Dropdown.Item>
          <Dropdown.Item onClick={() => logout()}>Logout</Dropdown.Item>
        </DropdownButton>
      </>
    );
  };

  const renderNonLoggedInMenu = () => {
    return (
      <>
        <NavLink class="nav-link" to="/">
          Home
        </NavLink>
        <NavLink class="nav-link" to="/">
          About
        </NavLink>
        <NavLink class="nav-link" to="/">
          Chef
        </NavLink>
        <NavLink class="nav-link" to="/">
          Menu
        </NavLink>
        <NavLink class="nav-link" to="/">
          Contact
        </NavLink>
        <Nav.Link
          href="#action6"
          onClick={() => {
            setLoginModal(true);
          }}
        >
          Login
        </Nav.Link>
        <NavLink class="nav-link" to="/cart">
          <i className="fa fa-cart-plus"></i> Cart
        </NavLink>
      </>
    );
  };

  const renderLoginModal = () => {
    return (
      <NewModal
        modalTitle="Login"
        variant="primary"
        action={userLogin}
        saveBtnName="Login"
        show={loginModal}
        handleClose={() => {
          setLoginModal(false);
        }}
      >
        <Input
          value={email}
          onChange={(e) => {
            setEmail(e.target.value);
          }}
          lable="Email"
          type="text"
          placeholder="Enter your email..."
        ></Input>
        <Input
          value={password}
          onChange={(e) => {
            setPassword(e.target.value);
          }}
          lable="Password"
          type="password"
          placeholder="Enter your password..."
        ></Input>
      </NewModal>
    );
  };

  return (
    <div>
      <Navbar fixed="top" bg="dark" variant="dark" expand="lg">
        <Container>
          <Navbar.Brand href="/">
            <img width="40px" src={logo} alt="logo" />
          </Navbar.Brand>
          <Form className="d-flex">
            <FormControl
              type="search"
              placeholder="Search"
              className="mr-2"
              aria-label="Search"
            />
            <Button variant="outline-success">Search</Button>
          </Form>
          <Navbar.Toggle aria-controls="navbarScroll" />
          <Navbar.Collapse id="navbarScroll">
            <Nav
              className="mr-auto my-2 my-lg-0 justify-content-end"
              style={{ maxHeight: "200px", width: "100%" }}
              navbarScroll
            >
              {auth.authenticate
                ? renderLoggedInMenu()
                : renderNonLoggedInMenu()}
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
      {renderLoginModal()}
    </div>
  );
}
