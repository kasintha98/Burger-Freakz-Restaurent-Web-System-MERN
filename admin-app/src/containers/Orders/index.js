import React, { useState, useEffect } from "react";
import Layout from "../../components/Layouts";
import { useDispatch, useSelector } from "react-redux";
import { Row, Card, Button, Form, Table, FormControl } from "react-bootstrap";
import CurrencyFormat from "react-currency-format";
import "./style.css";
import axios from "axios";
import { Col } from "react-bootstrap";
import { updateOrder } from "../../actions";
var dateFormat = require("dateformat");

function Orders(props) {
  const order = useSelector((state) => state.order);
  const [type, setType] = useState("");
  const [keywords, setKeywords] = useState("");
  const [usrAdr, setusrAdr] = useState("");
  const [searchedOrders, setSearchedOrders] = useState();
  const dispatch = useDispatch();

  /*  useEffect(() => {
    for (let i = 0; order.orders.length; i++) {
       axios
        .get(
          `http://localhost:2000/api/order/getAddressByUser/${order.orders[i].user}`
        )
        .then((res) => {
          console.log(res.data.address);
          setusrAdr(res.data.address);
        });
      console.log(order.orders[i]);
    }
  }); */

  const onOrderUpdate = (orderId) => {
    const payload = {
      orderId,
      type,
    };
    dispatch(updateOrder(payload));
  };

  const search = (e) => {
    e.preventDefault();

    const searchObj = { _id: keywords };

    axios
      .post("http://localhost:2000/api/searchOrders", searchObj)
      .then((res) => {
        console.log(res.data.orders);
        setSearchedOrders(res.data.orders);
      });
  };

  return (
    <Layout sidebar>
      <Row>
        <div style={{ display: "flex", justifyContent: "space-between" }}>
          <h3>Orders</h3>
          &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
          <Form inline>
            <FormControl
              type="text"
              placeholder="Search Order By ID"
              className="mr-sm-2"
              value={keywords}
              onChange={(e) => {
                setKeywords(e.target.value);
              }}
            />
            <Button variant="outline-success" onClick={search}>
              Search
            </Button>
          </Form>
        </div>
      </Row>
      {keywords && searchedOrders ? (
        <>
          {searchedOrders.length < 1 ? (
            <p>No Orders Found With Given ID</p>
          ) : (
            <>
              {searchedOrders.map((orderItem, index) => (
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
                            {/*  <td>{orderItem.addressId.address}</td> */}
                          </tr>
                        </tbody>
                      </Table>
                    </Card.Text>
                  </Card.Body>
                </Card>
              ))}
            </>
          )}
        </>
      ) : (
        <>
          {order.orders
            .slice(0)
            .reverse()
            .map((orderItem, index) => (
              <Card key={index} style={{ width: "100%" }}>
                <Card.Body>
                  <Card.Title>
                    <Row>
                      <Col>Order ID : {orderItem._id}</Col>
                      <Col>
                        Order Date:{" "}
                        {dateFormat(
                          orderItem.createdAt,
                          "mmmm dS, yyyy, h:MM:ss TT"
                        )}
                      </Col>
                    </Row>
                  </Card.Title>
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
                          <td>
                            {/* {(() => {
                            if (usrAdr.addressNew) {
                              for (
                                var i = 0;
                                i < usrAdr.addressNew.length;
                                i++
                              ) {
                                if (
                                  usrAdr.addressNew[i]._id ===
                                  orderItem.addressId
                                ) {
                                  return (
                                    <p>{usrAdr.addressNew[i].addressNew}</p>
                                  );
                                }
                              }
                            }
                          })()} */}
                          </td>
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
                                    <option
                                      key={status.type}
                                      value={status.type}
                                    >
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
        </>
      )}
    </Layout>
  );
}

export default Orders;
