import React from "react";
import { Navbar, Nav, Container } from "react-bootstrap";
import { Link, NavLink } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import logo from "../../img/logo.jpg";
import { signout } from "../../actions";
import "./style.css";

function Header(props) {
  const auth = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  //logout action calling
  const logout = () => {
    dispatch(signout());
  };

  //show logged in navbar
  const renderLoggedInLinks = () => {
    return (
      <Nav>
        <li className="nav-item">
          <span className="nav-link" onClick={logout}>
            <i class="fa fa-sign-out"></i>&nbsp; Sign Out
          </span>
        </li>
      </Nav>
    );
  };

  //show non logged in navbar
  const renderNonLoggedInLinks = () => {
    return (
      <Nav>
        <li className="nav-item">
          <NavLink to="/signin" className="nav-link">
            <i class="fa fa-sign-in"></i>&nbsp; Sign In
          </NavLink>
        </li>
        <li className="nav-item">
          <NavLink to="/signup" className="nav-link">
            <i class="fa fa-user-plus"></i>&nbsp; Sign Up
          </NavLink>
        </li>
      </Nav>
    );
  };

  return (
    <div>
      <Navbar
        collapseOnSelect
        fixed="top"
        expand="lg"
        variant="dark"
        style={{ zIndex: "2" }}
        className="NavStyle"
      >
        <Container fluid>
          <Link className="navbar-brand" to="/">
            <img
              alt="logo"
              src={logo}
              width="30"
              height="30"
              className="d-inline-block align-top"
            />
            &nbsp; &nbsp; Admin Dashboard
          </Link>
          <Navbar.Toggle aria-controls="responsive-navbar-nav" />
          <Navbar.Collapse id="responsive-navbar-nav">
            <Nav className="mr-auto"></Nav>
            {auth.authenticate
              ? renderLoggedInLinks()
              : renderNonLoggedInLinks()}
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </div>
  );
}

export default Header;
