import React from "react";
import { Navbar, Button, Nav, FormControl, Form } from "react-bootstrap";
import "./style.css";
import logo from "../../img/logo.jpg";

export default function Header(props) {
  return (
    <div>
      <Navbar fixed="top" bg="dark" variant="dark" expand="lg">
        <Navbar.Brand href="#">
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
            <Nav.Link href="#action1">Home</Nav.Link>
            <Nav.Link href="#action2">About</Nav.Link>
            <Nav.Link href="#action2">Chef</Nav.Link>
            <Nav.Link href="#action1">Menu</Nav.Link>
            <Nav.Link href="#action2">Contact</Nav.Link>
            <Nav.Link href="#action2">Login</Nav.Link>
            <Nav.Link href="#action2">
              <i className="fa fa-cart-plus"></i> Cart
            </Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Navbar>
    </div>
  );
}
