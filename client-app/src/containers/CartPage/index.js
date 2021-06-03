import React, { useState } from "react";
import { useSelector } from "react-redux";
import Header from "../../components/Header";
import Footer from "../../components/Footer";
import { Row, Col, Container, Button, Card, Table } from "react-bootstrap";
import { generatePublicUrl } from "../../urlConfig";

export default function CartPage(props) {
  const cart = useSelector((state) => state.cart);

  const cartItems = cart.cartItems;

  return (
    <div>
      <Header></Header>
      <Container style={{ marginTop: "120px" }}>
        <div className="text-center">
          <h2>My Cart</h2>
        </div>
        <br></br>
        <Card style={{ width: "100%" }}>
          <Card.Body>
            <Card.Text>
              <Table responsive="sm">
                <thead>
                  <tr className="text-center">
                    <th>Image</th>
                    <th>Description</th>
                    <th>Price</th>
                    <th>Quanity</th>
                    <th>Total</th>
                  </tr>
                </thead>
                <tbody>
                  {Object.keys(cartItems).map((key, index) => (
                    <tr className="text-center" key={index}>
                      <td>
                        <img
                          src={generatePublicUrl(`${cartItems[key].img}`)}
                          alt="pic"
                          width="100px"
                          height="100px"
                        />
                      </td>
                      <td>{cartItems[key].name}</td>
                      <td>{cartItems[key].price}</td>
                      <td>{cartItems[key].qty}</td>
                      <td>
                        {Number(cartItems[key].price) *
                          Number(cartItems[key].qty)}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </Table>
            </Card.Text>
          </Card.Body>
          <Card.Footer>
            <Row className="justify-content-md-center">
              <Col sm={6}></Col>
              <Col sm={6}>Grand Total: grand Total</Col>
            </Row>
            <Row>
              <Col>
                <Button>Shop More!</Button>
              </Col>
              <Col>
                <Button>Checkout!</Button>
              </Col>
            </Row>
          </Card.Footer>
        </Card>
      </Container>
      <Footer></Footer>
    </div>
  );
}
