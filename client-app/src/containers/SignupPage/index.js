import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { signup } from "../../actions";
import Header from "../../components/Header";
import Footer from "../../components/Footer";
import { Row, Col, Container, Image, Form, Button } from "react-bootstrap";
import { useHistory } from "react-router-dom";
import Input from "../../components/Input";
import side from "../../img/side.jpg";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function SignupPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordRpt, setPasswordRpt] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [gender, setGender] = useState("other");
  const [contactNumber, setContactNumberNumber] = useState("");
  const [nic, setNicNumber] = useState("");
  //const [address, setAddress] = useState("");
  const [noNew, setNoNew] = useState("");
  const [streetNew, setStreetNew] = useState("");
  const [cityNew, setCityNew] = useState("");

  const auth = useSelector((state) => state.auth);

  const dispatch = useDispatch();
  const history = useHistory();

  const userSignup = (e) => {
    e.preventDefault();

    if (noNew === "") {
      toast.error("Address No. can't be empty!", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
      return;
    }
    if (streetNew === "") {
      toast.error("Address street can't be empty!", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
      return;
    }
    if (!cityNew) {
      toast.error("Address city can't be empty!", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
      return;
    }
    if (password !== passwordRpt) {
      toast.error("Passwords don't match!", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
      return;
    }

    let address = `${noNew}, ${streetNew}, ${cityNew}.`;

    const user = {
      firstName,
      lastName,
      gender,
      email,
      password,
      contactNumber,
      nic,
      address,
    };

    const payload = {
      addressNew: {
        address,
      },
    };
    console.log(payload);

    dispatch(signup(user));
  };

  return (
    <div>
      {!auth.authenticate ? (
        <>
          <Header></Header>
          <ToastContainer />
          <Container
            style={{ marginTop: "120px", minHeight: "calc(100vh - 180px)" }}
          >
            <div style={{ marginBottom: "50px" }} className="text-center">
              <h2>Signup!</h2>
            </div>

            <Form onSubmit={userSignup}>
              <Row>
                <Col>
                  <Image src={side} thumbnail />
                </Col>
                <Col>
                  <Row>
                    <Col>
                      <Input
                        value={firstName}
                        onChange={(e) => {
                          setFirstName(e.target.value);
                        }}
                        lable="First Name"
                        type="text"
                        placeholder="Enter your first name..."
                      ></Input>
                    </Col>
                    <Col>
                      <Input
                        value={lastName}
                        onChange={(e) => {
                          setLastName(e.target.value);
                        }}
                        lable="Last Name"
                        type="text"
                        placeholder="Enter your last name..."
                      ></Input>
                    </Col>
                  </Row>
                  <Input
                    value={email}
                    onChange={(e) => {
                      setEmail(e.target.value);
                    }}
                    lable="Email"
                    type="text"
                    placeholder="Enter your email..."
                  ></Input>
                  <Input
                    value={nic}
                    onChange={(e) => {
                      setNicNumber(e.target.value);
                    }}
                    lable="National Identity Card Number"
                    type="text"
                    placeholder="Enter your NIC..."
                  ></Input>
                  <Input
                    value={contactNumber}
                    onChange={(e) => {
                      setContactNumberNumber(e.target.value);
                    }}
                    lable="Contact Number"
                    type="text"
                    placeholder="Enter your contact number..."
                  ></Input>
                  <Input
                    value={noNew}
                    onChange={(e) => {
                      setNoNew(e.target.value);
                    }}
                    lable="Address"
                    type="text"
                    placeholder="No..."
                  ></Input>
                  <Form.Control
                    value={streetNew}
                    onChange={(e) => {
                      setStreetNew(e.target.value);
                    }}
                    type="text"
                    placeholder="Street..."
                  />
                  <br></br>
                  <Form.Control
                    value={cityNew}
                    onChange={(e) => {
                      setCityNew(e.target.value);
                    }}
                    type="text"
                    placeholder="City..."
                  />
                  <br></br>
                  <Input
                    value={password}
                    onChange={(e) => {
                      setPassword(e.target.value);
                    }}
                    lable="Password"
                    type="password"
                    placeholder="Enter your password..."
                  ></Input>
                  <Input
                    value={passwordRpt}
                    onChange={(e) => {
                      setPasswordRpt(e.target.value);
                    }}
                    lable="Confirm Password"
                    type="password"
                    placeholder="Re-Enter your password..."
                  ></Input>
                  <Form.Group>
                    <Form.Label>Gender</Form.Label>
                    <Form.Control
                      as="select"
                      onChange={(e) => {
                        setGender(e.target.value);
                      }}
                    >
                      <option value="other">Other</option>
                      <option value="male">Male</option>
                      <option value="female">Female</option>
                    </Form.Control>
                  </Form.Group>
                  <Button className="w-100" variant="dark" type="submit">
                    Signup
                  </Button>
                </Col>
              </Row>
            </Form>
          </Container>
        </>
      ) : (
        history.push("/")
      )}

      <Footer></Footer>
    </div>
  );
}
