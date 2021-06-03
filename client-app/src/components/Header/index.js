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
        <Nav.Link href="/">Home</Nav.Link>
        <Nav.Link href="#action2">About</Nav.Link>
        <Nav.Link href="#action3">Chef</Nav.Link>
        <Nav.Link href="#action4">Menu</Nav.Link>
        <Nav.Link href="#action5">Contact</Nav.Link>
        {/* <Nav.Link href="#action6">{auth.user.fullName}</Nav.Link> */}
        <Nav.Link href="#action7">
          <i className="fa fa-cart-plus"></i> Cart
        </Nav.Link>
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
        <Nav.Link href="/">Home</Nav.Link>
        <Nav.Link href="#action2">About</Nav.Link>
        <Nav.Link href="#action3">Chef</Nav.Link>
        <Nav.Link href="#action4">Menu</Nav.Link>
        <Nav.Link href="#action5">Contact</Nav.Link>
        <Nav.Link
          href="#action6"
          onClick={() => {
            setLoginModal(true);
          }}
        >
          Login
        </Nav.Link>
        <Nav.Link href="#action7">
          <i className="fa fa-cart-plus"></i> Cart
        </Nav.Link>
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
