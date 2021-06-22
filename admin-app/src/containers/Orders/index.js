import React, { useState } from "react";
import Layout from "../../components/Layouts";
import { useDispatch, useSelector } from "react-redux";
import { Row, Card, Button, Form } from "react-bootstrap";
import "./style.css";
import { Col } from "react-bootstrap";
import { updateOrder } from "../../actions";

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
              <Row>
                <Col sm={9}>
                  {" "}
                  <div
                    style={{
                      boxSizing: "border-box",
                      padding: "100px",
                      display: "flex",
                    }}
                  >
                    <div className="orderTrack">
                      <div className="orderStatus">
                        <div className="point"></div>
                        <div className="orderInfo">
                          <div className="status">Ordered</div>
                          <div className="date">Fri, 2021</div>
                        </div>
                      </div>
                      <div className="orderStatus">
                        <div className="point"></div>
                        <div className="orderInfo">
                          <div className="status">Packed</div>
                          <div className="date">Fri, 2021</div>
                        </div>
                      </div>
                      <div className="orderStatus">
                        <div className="point"></div>
                        <div className="orderInfo">
                          <div className="status">Shipped</div>
                          <div className="date">Fri, 2021</div>
                        </div>
                      </div>
                      <div className="orderStatus">
                        <div className="point"></div>
                        <div className="orderInfo">
                          <div className="status">Delivered</div>
                          <div className="date">Fri, 2021</div>
                        </div>
                      </div>
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
