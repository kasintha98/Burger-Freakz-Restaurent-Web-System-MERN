import React, { useState } from "react";
import Layout from "../../components/Layouts";
import { Container, Form, Button, Row, Col } from "react-bootstrap";
import Input from "../../components/UI/Input";
import { Redirect } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { signup } from "../../actions";
import "./style.css";
import logo from "../../img/logo.jpg";

function Signup(props) {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [nic, setNic] = useState("");
  const [gender, setGender] = useState("Male");
  const [role, setRole] = useState("System Admin");
  const [contactNumber, setContactNumber] = useState("");
  const [address, setAddress] = useState("");
  //initial state of email
  const [email, setEmail] = useState("");
  //initial state of password
  const [password, setPassword] = useState("");
  //initial state of error
  const [error, setError] = useState("");
  const [passwordRpt, setPasswordRpt] = useState("");

  const auth = useSelector((state) => state.auth);
  const user = useSelector((state) => state.user);
  const dispatch = useDispatch();

  if (auth.authenticate === true) {
    //if authenticate is true (this means  user's LOGIN_SUCCESS) redirecting the user to the home page
    return <Redirect to={"/"} />;
  }

  if (user.loading) {
    return <div className="spinner-border text-primary" role="status"></div>;
  }

  const userSignup = (e) => {
    e.preventDefault();

    //validations of data
    if (firstName === "") {
      alert("First Name can't be empty!");
      return;
    }
    if (lastName === "") {
      alert("Last Name can't be empty!");
      return;
    }
    if (nic === "") {
      alert("NIC can't be empty!");
      return;
    }
    if (gender === "") {
      alert("Gender can't be empty!");
      return;
    }

    if (role === "") {
      alert("Role can't be empty!");
      return;
    }

    if (contactNumber === "") {
      alert("Contact Number can't be empty!");
      return;
    }

    if (address === "") {
      alert("Address can't be empty!");
      return;
    }

    if (email === "") {
      alert("Email can't be empty!");
      return;
    }

    if (password === "") {
      alert("Password can't be empty!");
      return;
    }

    if (password === passwordRpt) {
      alert("Passwords don't match!");
      return;
    }

    const user = {
      firstName,
      lastName,
      nic,
      gender,
      role,
      contactNumber,
      address,
      email,
      password,
    };

    dispatch(signup(user));
    props.history.push("/signin");
  };

  return (
    <div>
      <Layout>
        <Row style={{ height: "100vh" }}>
          <Col className="mainReg col-4"></Col>
          <Col className="col-8">
            {/* showing error messages */}
            {user.message ? (
              <div
                className="alert alert-success text-center"
                role="alert"
                style={{ marginTop: "20px" }}
              >
                {user.message}
              </div>
            ) : null}

            <Row
              style={{
                marginTop: "50px",
                marginBottom: "50px",
                padding: "20px",
              }}
            >
              <Col md={{ span: 6, offset: 3 }}>
                <img
                  style={{ marginLeft: "36%" }}
                  width="100px"
                  src={logo}
                  alt="logo"
                />
                <h2 className="text-center">Sign Up</h2>
                <br></br>
                <h3 className="text-center">Burger Freakz Admin Dashboard</h3>
                <br></br>
                <Form onSubmit={userSignup}>
                  <Row>
                    <Col md={6}>
                      <Input
                        lable="First Name"
                        type="text"
                        placeholder="Enter first name"
                        value={firstName}
                        onChange={(e) => {
                          setFirstName(e.target.value);
                        }}
                      ></Input>
                    </Col>
                    <Col md={6}>
                      <Input
                        lable="Last Name"
                        type="text"
                        placeholder="Enter last name"
                        value={lastName}
                        onChange={(e) => {
                          setLastName(e.target.value);
                        }}
                      ></Input>
                    </Col>
                  </Row>

                  <Input
                    lable="Email"
                    type="email"
                    placeholder="Enter email"
                    value={email}
                    onChange={(e) => {
                      setEmail(e.target.value);
                    }}
                    error="We'll never share your email with anyone else."
                  ></Input>

                  <Input
                    lable="National Identity Card Number"
                    type="text"
                    placeholder="Enter NIC number"
                    value={nic}
                    onChange={(e) => {
                      setNic(e.target.value);
                    }}
                  ></Input>
                  <Form.Group>
                    <Form.Label>Gender</Form.Label>
                    <Form.Control
                      as="select"
                      value={gender}
                      onChange={(e) => {
                        setGender(e.target.value);
                      }}
                    >
                      <option value="male">Male</option>
                      <option value="female">Female</option>
                      <option value="other">Other</option>
                    </Form.Control>
                  </Form.Group>

                  <Form.Group>
                    <Form.Label>Role</Form.Label>
                    <Form.Control
                      as="select"
                      value={role}
                      onChange={(e) => {
                        setRole(e.target.value);
                      }}
                    >
                      <option value="admin">System Admin</option>
                      <option value="manager">Manager</option>
                      <option value="chef">Chef</option>
                      <option value="deliveryrider">Delivery Rider</option>
                    </Form.Control>
                  </Form.Group>

                  <Input
                    lable="Contact Number"
                    type="tel"
                    placeholder="Enter contact number"
                    value={contactNumber}
                    onChange={(e) => {
                      setContactNumber(e.target.value);
                    }}
                  ></Input>

                  <Input
                    lable="Address"
                    as="textarea"
                    rows="3"
                    placeholder="Enter address"
                    value={address}
                    onChange={(e) => {
                      setAddress(e.target.value);
                    }}
                  ></Input>

                  <Input
                    lable="Password"
                    type="password"
                    placeholder="Enter password"
                    value={password}
                    onChange={(e) => {
                      setPassword(e.target.value);
                    }}
                  ></Input>

                  <Input
                    lable="Confirm Password"
                    type="password"
                    placeholder="Enter password again"
                    value={passwordRpt}
                    onChange={(e) => {
                      setPasswordRpt(e.target.value);
                    }}
                  ></Input>
                  <Button
                    variant="primary"
                    type="submit"
                    style={{ width: "100%", marginBottom: "50px" }}
                  >
                    Sign Up
                  </Button>
                </Form>
              </Col>
            </Row>
          </Col>
        </Row>
      </Layout>
    </div>
  );
}

export default Signup;
