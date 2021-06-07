import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAddress } from "../../actions";
import Header from "../../components/Header";
import Footer from "../../components/Footer";
import { Row, Col, Container, Button, Card, Table } from "react-bootstrap";
import AddressForm from "./AddressForm";
import PriceDetails from "../../components/PriceDetails";

const CheckoutStep = (props) => {
  return <div></div>;
};

export default function CheckoutPage() {
  const user = useSelector((state) => state.user);
  const auth = useSelector((state) => state.auth);
  const cart = useSelector((state) => state.cart);

  const [newAddress, setNewAddress] = useState([]);
  const [confirmAddress, setConfirmAddress] = useState(false);
  const [selectedAddress, setSelectedAddress] = useState(null);

  //user.addressNew.push(auth.user.address);

  const dispatch = useDispatch();

  const selectAddress = (adr) => {
    //console.log(adr);
    const updatedAddress = newAddress.map((ad) =>
      ad._id === adr._id
        ? { ...ad, selected: true }
        : { ...ad, selected: false }
    );

    setNewAddress(updatedAddress);
  };

  const onAddressSubmit = (adr) => {
    setConfirmAddress(true);
    setSelectedAddress(adr);
  };

  const confirmDeliveryAddress = (adr) => {
    setConfirmAddress(true);
    setSelectedAddress(adr);
  };

  useEffect(() => {
    auth.authenticate && dispatch(getAddress());
  }, [auth.authenticate]);

  useEffect(() => {
    //pushing default user address to new user addresses
    if (auth.authenticate) {
      const defaultAddress = JSON.parse(
        JSON.stringify({ _id: auth.user._id, addressNew: auth.user.address })
      );
      user.addressNew.push(defaultAddress);
    }

    const addressNew = user.addressNew.map((adr) => ({
      ...adr,
      selected: false,
      edit: false,
    }));

    setNewAddress(addressNew);
  }, [user.addressNew]);

  return (
    <div>
      <Header></Header>
      <Container style={{ marginTop: "120px" }}>
        <div style={{ marginBottom: "50px" }} className="text-center">
          <h2>Checkout!</h2>
        </div>
        {auth.authenticate ? (
          <>
            <Row>
              <Col
                sm={8}
                style={{ backgroundColor: "#cdcdcd", padding: "30px" }}
              >
                <Row style={{ marginBottom: "30px" }}>
                  <Col>
                    <div className="text-center">
                      <h3 style={{ marginBottom: "30px" }}>
                        Select Delivery Address
                      </h3>
                    </div>
                    <Row>
                      <div style={{ marginBottom: "30px" }}>
                        <div>
                          <h5>Name: {auth.user.fullName}</h5>
                          <h5>Email: {auth.user.email}</h5>
                          <h5>Contact Number: {auth.user.contactNumber}</h5>
                        </div>
                      </div>
                    </Row>

                    {/* <Row>
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
                    </Row> */}

                    {confirmAddress ? (
                      <Row>
                        <h5>Address: {selectedAddress.addressNew}</h5>
                      </Row>
                    ) : (
                      newAddress.map((adr) => (
                        <Row>
                          <Col sm={1}>
                            <div>
                              <input
                                name="address"
                                type="radio"
                                onClick={() => {
                                  selectAddress(adr);
                                }}
                              ></input>
                            </div>
                          </Col>
                          <Col sm={11}>
                            <div>
                              <p>{adr.addressNew}</p>
                            </div>
                            <div>
                              {adr.selected && (
                                <Button
                                  onClick={() => confirmDeliveryAddress(adr)}
                                >
                                  Deliver Here
                                </Button>
                              )}
                            </div>
                          </Col>
                        </Row>
                      ))
                    )}
                  </Col>
                  <Col>
                    {auth.authenticate ? (
                      <AddressForm onSubmitForm={onAddressSubmit}></AddressForm>
                    ) : null}
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
                <div>
                  <PriceDetails
                    totalItems={Object.keys(cart.cartItems).reduce(function (
                      qty,
                      key
                    ) {
                      return qty + cart.cartItems[key].qty;
                    },
                    0)}
                    deliveryCharges="100"
                    totalPrice={Object.keys(cart.cartItems).reduce(
                      (totalPrice, key, deli) => {
                        const { price, qty } = cart.cartItems[key];
                        return totalPrice + price * qty;
                      },
                      0
                    )}
                    distance="10"
                  ></PriceDetails>
                </div>
              </Col>
            </Row>
          </>
        ) : (
          <div style={{ padding: "10vh" }}>
            <div
              style={{ padding: "50px" }}
              class="alert alert-danger text-center"
              role="alert"
            >
              <h3>Please Login Before Checkout</h3>
            </div>
          </div>
        )}
      </Container>
      <Footer></Footer>
    </div>
  );
}
