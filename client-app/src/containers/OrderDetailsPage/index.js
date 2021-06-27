import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getOrder } from "../../actions";
import Header from "../../components/Header";
import Footer from "../../components/Footer";
import { Row, Col, Container, Card, Button, Table } from "react-bootstrap";
import CurrencyFormat from "react-currency-format";

export default function OrderDetailsPage(props) {
  const dispatch = useDispatch();
  const orderDetails = useSelector((state) => state.user.orderDetails);

  useEffect(() => {
    console.log({ props });
    const payload = { orderId: props.match.params.orderId };

    dispatch(getOrder(payload));
  }, []);

  if (!(orderDetails && orderDetails.address)) {
    return null;
  }
  console.log(orderDetails);
  return (
    <div>
      <Header></Header>
      <Container style={{ marginTop: "120px" }}>
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
                    <td>Shipped</td>
                  </tr>
                </tbody>
              </Table>
            </Card.Text>
            <Button variant="primary">Download Bill</Button>
          </Card.Body>
        </Card>
      </Container>
    </div>
  );
}
