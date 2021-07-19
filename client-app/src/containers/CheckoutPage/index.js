import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addOrder, getAddress, getCartItems } from "../../actions";
import Header from "../../components/Header";
import Footer from "../../components/Footer";
import { Row, Col, Container, Button, Form, Alert } from "react-bootstrap";
import AddressForm from "./AddressForm";
import PriceDetails from "../../components/PriceDetails";
import Paypal from "../../components/Paypal";
import CartPage from "../CartPage";

export default function CheckoutPage() {
  const user = useSelector((state) => state.user);
  const auth = useSelector((state) => state.auth);
  const cart = useSelector((state) => state.cart);

  const [newAddress, setNewAddress] = useState([]);
  const [confirmAddress, setConfirmAddress] = useState(false);
  const [selectedAddress, setSelectedAddress] = useState(null);
  const [orderConfirmation, setOrderConfirmation] = useState(false);
  const [paymentOption, setPaymentOption] = useState("");
  const [paymentStatus, setPaymentStatus] = useState("");
  const [paid, setPaid] = useState("");
  const [confirmPayment, setConfirmPayment] = useState(false);
  //user.addressNew.push(auth.user.address);

  useEffect(() => {
    setPaid(localStorage.getItem("paid"));
  }, [localStorage.getItem("paid")]);

  const dispatch = useDispatch();

  const selectAddress = (adr) => {
    console.log(adr);
    const updatedAddress = newAddress.map((ad) =>
      ad._id === adr._id
        ? { ...ad, selected: true }
        : { ...ad, selected: false }
    );

    setNewAddress(updatedAddress);
  };

  const selectPayment = (option) => {
    setPaymentOption(option);
    console.log(option);
  };

  const onAddressSubmit = (adr) => {
    setConfirmAddress(true);
    setSelectedAddress(adr);
  };

  const confirmDeliveryAddress = (adr) => {
    setConfirmAddress(true);
    setSelectedAddress(adr);
  };

  const userOrderConfirmation = () => {
    const netAmount = Object.keys(cart.cartItems).reduce(
      (totalPrice, key, deli) => {
        const { price, qty } = cart.cartItems[key];
        return totalPrice + price * qty;
      },
      0
    );

    const totalOffer = Object.keys(cart.cartItems).reduce(function (
      offer,
      key
    ) {
      return offer + cart.cartItems[key].offer * cart.cartItems[key].qty;
    },
    0);

    const deliveryCharges = 150;

    const totalAmount =
      Number(netAmount) - Number(totalOffer) + deliveryCharges;

    const items = Object.keys(cart.cartItems).map((key) => ({
      productId: key,
      payablePrice: cart.cartItems[key].price,
      offer: cart.cartItems[key].offer,
      purchasedQty: cart.cartItems[key].qty,
    }));

    const payload = {
      user: auth.user,
      addressId: selectedAddress._id,
      totalAmount,
      items,
      paymentStatus,
      paymentType: paymentOption,
    };

    console.log(payload);
    dispatch(addOrder(payload));
    setOrderConfirmation(true);
    localStorage.setItem("paid", null);
  };

  /* const onConfirmPayment = () => {
    setConfirmPayment(true);
  }; */

  useEffect(() => {
    auth.authenticate && dispatch(getAddress());
    auth.authenticate && dispatch(getCartItems());

    /* if (auth.authenticate && !newAddress.includes(auth.user.address)) {
      newAddress.push(auth.user.address);
    } */
  }, [auth.authenticate]);

  useEffect(() => {
    //pushing default user address to new user addresses

    const addressNew = user.addressNew.map((adr) => ({
      ...adr,
      selected: false,
      edit: false,
    }));

    setNewAddress(addressNew);
  }, [user.addressNew]);

  if (orderConfirmation) {
    return (
      <div>
        <Header></Header>
        <Container style={{ marginTop: "120px", marginBottom: "300px" }}>
          <div class="alert alert-success text-center" role="alert">
            <h4>
              Thank You! <br></br>
              You Have Successfully Placed Your Order!
            </h4>
          </div>
        </Container>
        <Footer></Footer>
      </div>
    );
  }

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
                style={{
                  backgroundColor: "#333",
                  padding: "30px",
                }}
              >
                <Row style={{ marginBottom: "30px" }}>
                  <Col
                    style={{
                      backgroundImage:
                        "linear-gradient(rgb(235, 235, 235), #ffffff)",
                      padding: "20px",
                    }}
                  >
                    <div>
                      <h3 style={{ marginBottom: "30px" }}>
                        <span style={{ fontSize: "15px" }}>&#9899;</span> Select
                        Delivery Address
                      </h3>
                    </div>
                    <Row>
                      <div style={{ marginBottom: "30px" }}>
                        <div>
                          <h5>&#128100; Name: {auth.user.fullName}</h5>
                          <h5>&#128233; Email: {auth.user.email}</h5>
                          <h5>
                            &#128222; Contact Number: {auth.user.contactNumber}
                          </h5>
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
                        <h5>
                          &#128204; Address: {selectedAddress.addressNew}
                          <br></br>
                          <br></br>
                        </h5>
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
                    {confirmAddress ? (
                      <Row>
                        <CartPage onlyCartItems={true}></CartPage>
                      </Row>
                    ) : null}
                  </Col>

                  {!confirmAddress ? (
                    <Col
                      style={{
                        backgroundImage:
                          "linear-gradient(rgb(235, 235, 235), #ffffff)",
                        padding: "20px",
                      }}
                    >
                      <AddressForm onSubmitForm={onAddressSubmit}></AddressForm>
                    </Col>
                  ) : null}
                </Row>
                <Row>
                  <div
                    style={{
                      backgroundImage:
                        "linear-gradient(rgb(235, 235, 235), #ffffff)",
                      padding: "20px",
                      width: "100%",
                    }}
                  >
                    <Row>
                      <div>
                        <h3>
                          <span style={{ fontSize: "15px" }}>&#9899;</span>{" "}
                          Payment Option
                        </h3>
                      </div>
                    </Row>
                    <br></br>
                    {localStorage.getItem("paid") !== "null" ? (
                      <Alert variant={`success`}>
                        Online Payment Successfull!
                      </Alert>
                    ) : (
                      <>
                        <Row>
                          <Col sm={1}>
                            <div>
                              <input
                                name="paymentOption"
                                type="radio"
                                value="online"
                                onClick={() => {
                                  selectPayment("online");
                                  setPaymentStatus("completed");
                                }}
                              ></input>
                            </div>
                          </Col>
                          <Col sm={11}>
                            <div>Online payment</div>
                            {/*  <Button>Confirm Payment Option</Button> */}
                          </Col>
                        </Row>
                        <Row>
                          <Col sm={1}>
                            <div>
                              <input
                                name="paymentOption"
                                type="radio"
                                value="cod"
                                onClick={() => {
                                  selectPayment("cod");
                                  setPaymentStatus("pending");
                                }}
                              ></input>
                            </div>
                          </Col>
                          <Col sm={11}>
                            <div>Cash On Delivery</div>
                            {/* <Button onClick={onConfirmPayment}>
                          Confirm Payment Option
                        </Button> */}
                          </Col>
                        </Row>
                        <br></br>
                        <Row>
                          {paymentOption === "online" ? (
                            <Paypal
                              totalPrice={Object.keys(cart.cartItems).reduce(
                                (totalPrice, key, deli) => {
                                  const { price, qty } = cart.cartItems[key];
                                  return totalPrice + price * qty;
                                },
                                0
                              )}
                              distance="10"
                              offer={Object.keys(cart.cartItems).reduce(
                                function (offer, key) {
                                  return (
                                    offer +
                                    cart.cartItems[key].offer *
                                      cart.cartItems[key].qty
                                  );
                                },
                                0
                              )}
                            ></Paypal>
                          ) : null}
                        </Row>
                      </>
                    )}

                    <Row>
                      <div>
                        <h3>
                          <span style={{ fontSize: "15px" }}>&#9899;</span>{" "}
                          Delivery Note
                        </h3>
                      </div>
                    </Row>
                    <Row>
                      <Form.Group>
                        <Form.Control as="textarea" rows={3} />
                      </Form.Group>
                    </Row>
                    {confirmAddress ? (
                      <Row>
                        <div>
                          <h4>
                            Order confirmation email will send to{" "}
                            <strong> {auth.user.email}</strong>
                          </h4>
                          {/* <Button onClick={userOrderConfirmation}>
                            Continue
                          </Button> */}
                        </div>
                      </Row>
                    ) : null}
                  </div>
                </Row>
              </Col>
              <Col sm={4}>
                <div className="text-center">
                  <h3 style={{ marginBottom: "30px" }}>Order Details</h3>
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
                </div>
                {confirmAddress && paymentOption ? (
                  <Button
                    style={{ width: "100%" }}
                    onClick={userOrderConfirmation}
                  >
                    Confirm Order
                  </Button>
                ) : null}
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
