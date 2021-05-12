import React, { useState } from "react";
import Layout from "../../components/Layouts";
import { Container, Form, Button, Row, Col } from "react-bootstrap";
import Input from "../../components/UI/Input";
import { login } from "../../actions";
import { useDispatch, useSelector } from "react-redux";
import { Redirect } from "react-router-dom";
import "./style.css";

function Signin(props) {
  //initial state of email
  const [email, setEmail] = useState("");
  //initial state of password
  const [password, setPassword] = useState("");
  //initial state of error
  const [error, setError] = useState("");
  //geting user's authenticate status (from auth.reducers.js) and storing in the auth variable
  const auth = useSelector((state) => state.auth);

  const dispatch = useDispatch();

  const userLogin = (e) => {
    e.preventDefault();

    const user = { email, password };

    console.log(user);
    dispatch(login(user));
  };

  if (auth.authenticate === true) {
    //if authenticate is true (this means  user's LOGIN_SUCCESS) redirecting the user to the home page
    return <Redirect to={"/"} />;
  }

  return (
    <div>
      <Layout>
        <Container className="main">
          <Row
            style={{ marginTop: "120px", padding: "20px" }}
            className="text-center"
          >
            <Col md={{ span: 6, offset: 3 }}>
              <Form onSubmit={userLogin}>
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
                  lable="Password"
                  type="password"
                  placeholder="Enter password"
                  value={password}
                  onChange={(e) => {
                    setPassword(e.target.value);
                  }}
                ></Input>
                <Form.Group>
                  <Form.Check
                    className="text-center"
                    type="checkbox"
                    label="Remember Me"
                  />
                </Form.Group>
                <Button
                  variant="primary"
                  type="submit"
                  style={{ width: "100%" }}
                >
                  Sign In
                </Button>
              </Form>
            </Col>
          </Row>
        </Container>
      </Layout>
    </div>
  );
}

export default Signin;
