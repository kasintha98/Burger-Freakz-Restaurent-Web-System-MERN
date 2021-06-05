import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAddress } from "../../actions";
import Header from "../../components/Header";
import Footer from "../../components/Footer";
import { Row, Col, Container, Button, Card, Table } from "react-bootstrap";
import AddressForm from "./AddressForm";

const CheckoutStep = (props) => {
  return <div></div>;
};

export default function CheckoutPage() {
  const user = useSelector((state) => state.user);
  const auth = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  const onAddressSubmit = () => {};

  useEffect(() => {
    dispatch(getAddress());
  }, []);

  return (
    <div>
      <Header></Header>
      <Container style={{ marginTop: "120px" }}>
        <div style={{ marginBottom: "50px" }} className="text-center">
          <h2>Checkout!</h2>
        </div>
        <Row>
          <Col sm={8} style={{ backgroundColor: "#cdcdcd", padding: "30px" }}>
            <Row style={{ marginBottom: "30px" }}>
              <Col>
                <div className="text-center">
                  <h3 style={{ marginBottom: "30px" }}>
                    Select Delivery Address
                  </h3>
                </div>
                <Row>
                  <div style={{ marginBottom: "30px" }}>
                    {auth.authenticate ? (
                      <div>
                        <h5>Name: {auth.user.fullName}</h5>
                        <h5>Email: {auth.user.email}</h5>
                        <h5>Contact Number: {auth.user.contactNumber}</h5>
                      </div>
                    ) : (
                      <h4>Please Login Before Checkout</h4>
                    )}
                  </div>
                </Row>

                {
                  <Row>
                    <Col sm={1}>
                      <div>
                        <input name="address" type="radio"></input>
                      </div>
                    </Col>
                    <Col sm={11}>
                      <div>
                        <p>{auth.user.address}</p>
                      </div>
                      <div>
                        <Button>Deliver Here</Button>
                      </div>
                    </Col>
                  </Row>
                }

                {user.addressNew.map((adr) => (
                  <Row>
                    <Col sm={1}>
                      <div>
                        <input name="address" type="radio"></input>
                      </div>
                    </Col>
                    <Col sm={11}>
                      {" "}
                      <div>
                        <p>{adr.addressNew}</p>
                      </div>
                      <div>
                        <Button>Deliver Here</Button>
                      </div>
                    </Col>
                  </Row>
                ))}
              </Col>
              <Col>
                <AddressForm></AddressForm>
              </Col>
            </Row>
            <Row style={{ marginBottom: "30px" }}>
              <h3 style={{ marginBottom: "30px" }}>Payment Option</h3>
            </Row>
          </Col>
          <Col sm={4}>
            <div className="text-center">
              <h3 style={{ marginBottom: "30px" }}>Order Summery</h3>
            </div>
          </Col>
        </Row>
      </Container>
      <Footer></Footer>
    </div>
  );
}
