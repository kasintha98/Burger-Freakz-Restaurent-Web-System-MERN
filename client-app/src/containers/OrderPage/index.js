import React, { useEffect } from "react";
import { Row, Col, Container, Card, Button } from "react-bootstrap";
import Header from "../../components/Header";
import Footer from "../../components/Footer";
import { useDispatch, useSelector } from "react-redux";
import { getOrders } from "../../actions";
import { generatePublicUrl } from "../../urlConfig";
import CurrencyFormat from "react-currency-format";
import { Link } from "react-router-dom";

export default function OrderPage(props) {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user);

  useEffect(() => {
    dispatch(getOrders());
  }, []);

  return (
    <div>
      <Header></Header>
      <Container style={{ marginTop: "120px" }}>
        <div style={{ marginBottom: "50px" }} className="text-center">
          <h2>My Orders!</h2>
        </div>
        {user.orders.map((order) => {
          return order.items.map((item) => (
            <Link to={`orderDetails/${order._id}`}>
              <Card style={{ width: "100%" }}>
                <Row>
                  <Col sm={3}>
                    <Card.Img
                      variant="top"
                      src={generatePublicUrl(
                        item.productId.productImages[0].img
                      )}
                    />
                  </Col>
                  <Col sm={9}>
                    <Row>
                      <Col>
                        <Card.Title>{item.productId.name}</Card.Title>
                        <Card.Text>
                          Price:{" "}
                          <CurrencyFormat
                            value={item.payablePrice}
                            displayType={"text"}
                            thousandSeparator={true}
                            prefix={"Rs. "}
                          />{" "}
                        </Card.Text>
                        {item.offer ? (
                          <Card.Text>
                            Offer:{" "}
                            <CurrencyFormat
                              style={{ color: "red", fontWeight: "bold" }}
                              value={item.offer}
                              displayType={"text"}
                              thousandSeparator={true}
                              prefix={"Rs. "}
                            />{" "}
                          </Card.Text>
                        ) : null}
                        <Card.Text>
                          Purchased Qty: {item.purchasedQty}
                        </Card.Text>
                      </Col>
                      <Col>
                        <Card.Text>
                          Grand Total:{" "}
                          <CurrencyFormat
                            style={{ color: "green", fontWeight: "bold" }}
                            value={
                              item.payablePrice * item.purchasedQty -
                              item.purchasedQty * item.offer
                            }
                            displayType={"text"}
                            thousandSeparator={true}
                            prefix={"Rs. "}
                          />
                        </Card.Text>
                        <Button variant="primary">Give Feedback</Button>
                      </Col>
                    </Row>
                    <Card.Body></Card.Body>
                  </Col>
                </Row>
              </Card>
            </Link>
          ));
        })}
      </Container>
      <Footer></Footer>
    </div>
  );
}
