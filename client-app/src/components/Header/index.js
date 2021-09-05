import React, { useState, useRef } from "react";
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
import { Link, NavLink } from "react-router-dom";
import { useScrollSection } from "react-scroll-section";
import CartNum from "../UI/CartNum";
import { ToastContainer } from "react-toastify";

export default function Header(props) {
  const [loginModal, setLoginModal] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const auth = useSelector((state) => state.auth);
  const cart = useSelector((state) => state.cart);

  const dispatch = useDispatch();

  //calling action to login the user
  const userLogin = () => {
    try {
      dispatch(login({ email, password }));
      console.log({ auth: auth });
    } catch (error) {
      console.log({ error });
    }
  };

  //calling the action to logout the user
  const logout = () => {
    dispatch(signout());
  };

  const myRef = useRef(null);
  const executeScroll = () => myRef.current.scrollIntoView();

  const homeSection = useScrollSection("home");
  const aboutSection = useScrollSection("about");
  const chefSection = useScrollSection("chef");
  const menuSection = useScrollSection("menu");
  const contactSection = useScrollSection("contact");

  const renderLoggedInMenu = () => {
    return (
      <>
        <NavLink
          className="nav-link"
          to="/"
          onClick={homeSection.onClick}
          selected={homeSection.selected}
        >
          Home
        </NavLink>
        <Nav.Link
          onClick={aboutSection.onClick}
          selected={aboutSection.selected}
        >
          About
        </Nav.Link>
        <Nav.Link
          className="nav-link"
          onClick={chefSection.onClick}
          selected={chefSection.selected}
        >
          Chef
        </Nav.Link>
        <Nav.Link
          className="nav-link"
          onClick={menuSection.onClick}
          selected={menuSection.selected}
        >
          Menu
        </Nav.Link>
        <Nav.Link
          className="nav-link"
          onClick={contactSection.onClick}
          selected={contactSection.selected}
        >
          Contact
        </Nav.Link>
        <NavLink className="nav-link" to="/cart">
          {Object.keys(cart.cartItems).length > 0 ? (
            <CartNum count={Object.keys(cart.cartItems).length}></CartNum>
          ) : (
            <CartNum count={0}></CartNum>
          )}
          <i className="fa fa-cart-plus"></i> Cart
        </NavLink>
        <DropdownButton title={`${auth.user.fullName}`} variant="dark">
          <Dropdown.Item>
            <Link to="/profile">
              <i className="fa fa-id-badge"></i> Profile
            </Link>
          </Dropdown.Item>
          <Dropdown.Item>
            <Link onClick={() => logout()} to="/">
              <i className="fa fa-sign-out"></i> Logout
            </Link>
          </Dropdown.Item>
        </DropdownButton>
      </>
    );
  };

  const renderNonLoggedInMenu = () => {
    return (
      <>
        <NavLink className="nav-link" to="/">
          Home
        </NavLink>
        <Nav.Link
          onClick={aboutSection.onClick}
          selected={aboutSection.selected}
        >
          About
        </Nav.Link>
        <Nav.Link
          className="nav-link"
          onClick={chefSection.onClick}
          selected={chefSection.selected}
        >
          Chef
        </Nav.Link>
        <Nav.Link
          className="nav-link"
          onClick={menuSection.onClick}
          selected={menuSection.selected}
        >
          Menu
        </Nav.Link>
        <Nav.Link
          className="nav-link"
          onClick={contactSection.onClick}
          selected={contactSection.selected}
        >
          Contact
        </Nav.Link>
        <Nav.Link
          onClick={() => {
            setLoginModal(true);
          }}
        >
          Login
        </Nav.Link>
        <NavLink className="nav-link" to="/cart">
          {Object.keys(cart.cartItems) ? (
            <CartNum count={Object.keys(cart.cartItems).length}></CartNum>
          ) : null}
          <i className="fa fa-cart-plus"></i> Cart
        </NavLink>
      </>
    );
  };

  const renderLoginModal = () => {
    return (
      <NewModal
        size="lg"
        modalTitle="Login"
        variant="primary"
        action={userLogin}
        saveBtnName="Login"
        show={loginModal}
        handleClose={() => {
          setLoginModal(false);
        }}
        log={true}
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
      <ToastContainer />
      <Navbar fixed="top" bg="dark" variant="dark" expand="lg">
        <Container>
          <Navbar.Brand>
            <Link to="/">
              <img width="40px" src={logo} alt="logo" />
            </Link>
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
