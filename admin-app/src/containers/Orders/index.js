import React, { useState } from "react";
import Layout from "../../components/Layouts";
import { useDispatch, useSelector } from "react-redux";
import { Row, Card, Button, Form, Table } from "react-bootstrap";
import CurrencyFormat from "react-currency-format";
import "./style.css";
import { Col } from "react-bootstrap";
import { updateOrder } from "../../actions";
var dateFormat = require("dateformat");

function Orders(props) {
  const order = useSelector((state) => state.order);
  const [type, setType] = useState("");
  const dispatch = useDispatch();

  const onOrderUpdate = (orderId) => {
    const payload = {
      orderId,
      type,
    };
    dispatch(updateOrder(payload));
  };

  return (
    <Layout sidebar>
      <Row>
        <div className="text-center">
          <h3>Orders</h3>
        </div>
      </Row>
      {order.orders.map((orderItem, index) => (
        <Card key={index} style={{ width: "100%" }}>
          <Card.Body>
            <Card.Title>Order ID : {orderItem._id}</Card.Title>
            <Card.Text>
              <Table responsive="sm">
                <thead>
                  <tr>
                    <th>Items</th>
                    <th>Grand Total</th>
                    <th>Payment Type</th>
                    <th>Payment Status</th>
                    <th>Delivery Location</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>
                      {orderItem.items.map((item, index) => (
                        <p key={index}>{item.productId.name}</p>
                      ))}
                    </td>
                    <td>
                      <CurrencyFormat
                        value={orderItem.totalAmount}
                        displayType={"text"}
                        thousandSeparator={true}
                        prefix={"Rs. "}
                        suffix={".00"}
                      />
                    </td>
                    <td>
                      {orderItem.paymentType === "cod"
                        ? "Cash On Delivery"
                        : orderItem.paymentType}
                    </td>
                    <td>{orderItem.paymentStatus}</td>
                    <td>{orderItem.addressId.address}</td>
                  </tr>
                </tbody>
              </Table>
            </Card.Text>
            <Card.Text>
              <Row>
                <Col sm={9}>
                  <div
                    style={{
                      boxSizing: "border-box",
                      padding: "100px",
                      display: "flex",
                    }}
                  >
                    <div className="orderTrack">
                      {orderItem.orderStatus.map((status) => (
                        <div
                          className={`orderStatus ${
                            status.isCompleted ? "active" : ""
                          }`}
                        >
                          <div
                            className={`point ${
                              status.isCompleted ? "active" : ""
                            }`}
                          ></div>
                          <div className="orderInfo">
                            <div className="status">{status.type}</div>
                            <div className="date">
                              {status.date
                                ? dateFormat(
                                    status.date,
                                    "mmmm dS, yyyy, h:MM:ss TT"
                                  )
                                : null}
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </Col>
                <Col sm={3}>
                  {/* select input of order status */}
                  <Form.Group style={{ paddingTop: "30px" }}>
                    <Form.Label>Select Order Status</Form.Label>
                    <select
                      className="form-control"
                      onChange={(e) => setType(e.target.value)}
                    >
                      <option value={""}>Select Status</option>
                      {orderItem.orderStatus.map((status) => {
                        return (
                          <>
                            {!status.isCompleted ? (
                              <option key={status.type} value={status.type}>
                                {status.type}
                              </option>
                            ) : null}
                          </>
                        );
                      })}
                    </select>
                  </Form.Group>
                  <Button
                    variant="dark"
                    className="w-100"
                    onClick={() => onOrderUpdate(orderItem._id)}
                  >
                    Confirm
                  </Button>
                </Col>
              </Row>
            </Card.Text>
          </Card.Body>
        </Card>
      ))}
    </Layout>
  );
}

export default Orders;
