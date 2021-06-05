import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import Header from "../../components/Header";
import CartItem from "../../components/CartItem";
import Footer from "../../components/Footer";
import { Row, Col, Container, Button, Card, Table } from "react-bootstrap";
import { addToCart, getCartItems } from "../../actions";
import { Link } from "react-router-dom";

export default function CartPage(props) {
  const cart = useSelector((state) => state.cart);
  const auth = useSelector((state) => state.auth);

  const dispatch = useDispatch();

  const [cartItems, setCartItems] = useState("");

  useEffect(() => {
    setCartItems(cart.cartItems);
  }, [cart.cartItems]);

  useEffect(() => {
    if (auth.authenticate) {
      dispatch(getCartItems());
    }
  }, [auth.authenticate]);

  const onQuantityIncrement = (_id, qty) => {
    console.log({ _id, qty });
    const { name, price, img } = cartItems[_id];
    dispatch(addToCart({ _id, name, price, img }, 1));
  };

  const onQuantityDecrement = (_id, qty) => {
    console.log({ _id, qty });
    const { name, price, img } = cartItems[_id];
    dispatch(addToCart({ _id, name, price, img }, -1));
  };

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
                    <CartItem
                      key={index}
                      cartItem={cartItems[key]}
                      onQuantityDec={onQuantityDecrement}
                      onQuantityInc={onQuantityIncrement}
                    ></CartItem>
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
                <Link to="/" className="btn btn-primary">
                  Shop More!
                </Link>
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
