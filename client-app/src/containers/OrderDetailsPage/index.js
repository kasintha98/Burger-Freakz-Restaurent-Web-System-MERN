import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getOrder } from "../../actions";
import Header from "../../components/Header";
import Footer from "../../components/Footer";
import Bill from "../../components/Bill";
import { Row, Col, Container, Card, Table } from "react-bootstrap";
import CurrencyFormat from "react-currency-format";

var dateFormat = require("dateformat");

export default function OrderDetailsPage(props) {
  const dispatch = useDispatch();
  const orderDetails = useSelector((state) => state.user.orderDetails);

  console.log({ props });

  useEffect(() => {
    const payload = { orderId: props.match.params.orderId };
    dispatch(getOrder(payload));
  }, []);

  return (
    <div>
      <Header></Header>
      <Container
        style={{ marginTop: "120px", minHeight: "calc(100vh - 180px)" }}
      >
        {orderDetails ? (
          <Card style={{ width: "100%" }}>
            <Card.Body>
              <Card.Title>
                <Row>
                  <Col>Order Id : {orderDetails._id}</Col>
                  <Col>
                    Grand Total : &nbsp;
                    <CurrencyFormat
                      style={{ color: "red", fontWeight: "bold" }}
                      value={orderDetails.totalAmount}
                      displayType={"text"}
                      thousandSeparator={true}
                      prefix={"Rs. "}
                      suffix={".00"}
                    />
                  </Col>
                </Row>
              </Card.Title>
              <Card.Text>
                <Table striped bordered hover>
                  <thead>
                    <tr>
                      <th>Delivery Address</th>
                      <th>Order Items</th>
                      <th>Quantity</th>
                      <th>Payment Type</th>
                      <th>Order Status</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td>{orderDetails.address.addressNew}</td>
                      <td>
                        {orderDetails.items.map((item, index) => (
                          <p key={index}>{item.productId.name}</p>
                        ))}
                      </td>
                      <td>
                        {orderDetails.items.map((item, index) => (
                          <p key={index}>{item.purchasedQty}</p>
                        ))}
                      </td>
                      <td>
                        {orderDetails.paymentType === "cod"
                          ? "Cash On Delivery"
                          : orderDetails.paymentType}
                      </td>
                      <td>
                        {orderDetails.orderStatus.map((status) => (
                          <Row>
                            <Col sm={4}>{status.type}</Col>
                            <Col sm={2}>
                              {status.isCompleted ? (
                                <i
                                  className="fa fa-check"
                                  style={{ color: "green" }}
                                ></i>
                              ) : (
                                <div
                                  class="spinner-border text-warning spinner-border-sm"
                                  role="status"
                                  style={{}}
                                ></div>
                              )}
                            </Col>
                            <Col style={{ fontSize: "12px" }} sm={6}>
                              {status.date
                                ? dateFormat(
                                    status.date,
                                    "mm-dd-yyyy, h:MM:ss TT"
                                  )
                                : null}
                            </Col>
                          </Row>
                        ))}
                      </td>
                    </tr>
                  </tbody>
                </Table>
              </Card.Text>
            </Card.Body>
            <Bill
              orderId={orderDetails._id}
              address={orderDetails.address.addressNew}
              items={orderDetails.items}
              paymentType={orderDetails.paymentType}
              total={orderDetails.totalAmount}
            ></Bill>
          </Card>
        ) : (
          <div class="spinner-border text-primary" role="status"></div>
        )}
      </Container>
      <Footer></Footer>
    </div>
  );
}
