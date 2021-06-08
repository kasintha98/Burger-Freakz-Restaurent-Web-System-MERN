import React from "react";
import Header from "../Header";
import { Col, Container, Row } from "react-bootstrap";
import { NavLink } from "react-router-dom";
import "./style.css";
import Footer from "../Footer";

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
                  <NavLink exact to={"/employee"}>
                    <i class="fa fa-user"></i>
                    &nbsp; Employee Users
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
                <li>
                  <NavLink to={"/reports"}>
                    <i class="fa fa-pie-chart"></i>
                    &nbsp; Reports
                  </NavLink>
                </li>
                <li>
                  <NavLink to={"/inventory"}>
                    <i class="fa fa-suitcase"></i>
                    &nbsp; Inventory
                  </NavLink>
                </li>
                <li>
                  <NavLink to={"/purchases"}>
                    <i class="fa fa-money"></i>
                    &nbsp; Purchases
                  </NavLink>
                </li>
              </ul>
            </Col>
            <Col md={10} style={{ marginLeft: "auto", padding: "60px" }}>
              {props.children}
            </Col>
          </Row>
        </Container>
      ) : (
        props.children
      )}
      <Footer></Footer>
    </div>
  );
}

export default Layout;
