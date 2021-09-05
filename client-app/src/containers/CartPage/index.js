import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import Header from "../../components/Header";
import CartItem from "../../components/CartItem";
import Footer from "../../components/Footer";
import { Row, Col, Container, Button, Card, Table } from "react-bootstrap";
import { addToCart, getCartItems, removeCartItem } from "../../actions";
import { Link } from "react-router-dom";
import PriceDetails from "../../components/PriceDetails";

export default function CartPage(props) {
  const cart = useSelector((state) => state.cart);
  const auth = useSelector((state) => state.auth);

  const dispatch = useDispatch();

  const [cartItems, setCartItems] = useState("");

  //calling the action to add items to cart
  useEffect(() => {
    setCartItems(cart.cartItems);
  }, [cart.cartItems]);

  //calling action to get the cart items
  useEffect(() => {
    if (auth.authenticate) {
      dispatch(getCartItems());
    }
  }, [auth.authenticate]);

  const onQuantityIncrement = (_id, qty) => {
    console.log({ _id, qty });
    const { name, price, img, offer } = cartItems[_id];
    dispatch(addToCart({ _id, name, price, img, offer }, 1));
  };

  const onQuantityDecrement = (_id, qty) => {
    console.log({ _id, qty });
    const { name, price, img, offer } = cartItems[_id];
    dispatch(addToCart({ _id, name, price, img, offer }, -1));
  };

  const onRemoveCartItem = (_id) => {
    dispatch(removeCartItem({ productId: _id }));
  };

  return (
    <div>
      {props.onlyCartItems === true ? (
        <Card style={{ width: "100%" }}>
          <div className="text-center">
            <h5>Order Summery</h5>
          </div>
          <br></br>
          <Card.Body>
            {Object.keys(cart.cartItems).length > 0 ? (
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
            ) : (
              <div className="text-center">
                <div class="alert alert-danger" role="alert">
                  <h5>Your Cart Is Empty!</h5>
                </div>
              </div>
            )}
          </Card.Body>
        </Card>
      ) : (
        <div>
          <Header></Header>
          <Container
            style={{ marginTop: "120px", minHeight: "calc(100vh - 180px)" }}
          >
            <div className="text-center">
              <h2>My Cart</h2>
            </div>
            <br></br>
            <Card style={{ width: "100%" }}>
              <Card.Body>
                <Card.Text>
                  {Object.keys(cart.cartItems).length > 0 ? (
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
                            onRemoveCartItem={onRemoveCartItem}
                            width="120px"
                          ></CartItem>
                        ))}
                      </tbody>
                    </Table>
                  ) : (
                    <div className="text-center" style={{ padding: "10vh" }}>
                      <div class="alert alert-danger" role="alert">
                        <h5>Your Cart Is Empty!</h5>
                      </div>
                    </div>
                  )}
                </Card.Text>
              </Card.Body>
              <Card.Footer>
                {Object.keys(cart.cartItems).length > 0 ? (
                  <Row className="justify-content-md-center">
                    <Col sm={6}></Col>
                    <Col sm={6}>
                      <PriceDetails
                        totalItems={Object.keys(cart.cartItems).reduce(
                          function (qty, key) {
                            return qty + cart.cartItems[key].qty;
                          },
                          0
                        )}
                        totalPrice={Object.keys(cart.cartItems).reduce(
                          (totalPrice, key, deli) => {
                            const { price, qty } = cart.cartItems[key];
                            return totalPrice + price * qty;
                          },
                          0
                        )}
                        distance="10"
                        offer={Object.keys(cart.cartItems).reduce(function (
                          offer,
                          key
                        ) {
                          return (
                            offer +
                            cart.cartItems[key].offer * cart.cartItems[key].qty
                          );
                        },
                        0)}
                      ></PriceDetails>
                    </Col>
                  </Row>
                ) : null}

                <Row>
                  <Col>
                    <Link to="/" className="btn btn-primary">
                      Shop More!
                    </Link>
                  </Col>
                  <Col>
                    {Object.keys(cart.cartItems).length > 0 ? (
                      <Button
                        onClick={() => {
                          props.history.push("/checkout");
                        }}
                      >
                        Checkout!
                      </Button>
                    ) : null}
                  </Col>
                </Row>
              </Card.Footer>
            </Card>
          </Container>
          <Footer></Footer>
        </div>
      )}
    </div>
  );
}
