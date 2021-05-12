import React from "react";
import Header from "../Header";
import { Col, Container, Row } from "react-bootstrap";
import { NavLink } from "react-router-dom";
import "./style.css";

function Layout(props) {
  return (
    <div>
      <Header></Header>
      {props.sidebar ? (
        <Container fluid>
          <Row>
            <Col md={2} className="sidebar">
              <ul>
                <li>
                  <NavLink exact to={"/"}>
                    <i class="fa fa-home"></i>
                    &nbsp; Home
                  </NavLink>
                </li>
                <li>
                  <NavLink to={"/categories"}>
                    <i class="fa fa-cubes"></i>
                    &nbsp; Categories
                  </NavLink>
                </li>
                <li>
                  <NavLink to={"/products"}>
                    <i class="fa fa-cutlery"></i>
                    &nbsp; Products
                  </NavLink>
                </li>
                <li>
                  <NavLink to={"/orders"}>
                    <i class="fa fa-motorcycle"></i>
                    &nbsp; Orders
                  </NavLink>
                </li>
              </ul>
            </Col>
            <Col md={10} style={{ marginLeft: "auto" }}>
              {props.children}
            </Col>
          </Row>
        </Container>
      ) : (
        props.children
      )}
    </div>
  );
}

export default Layout;
