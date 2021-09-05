import React, { useState } from "react";
import axios from "axios";
import Header from "../../components/Header";
import Footer from "../../components/Footer";
import Input from "../../components/Input";
import { useParams } from "react-router-dom";
import { Row, Col, Container, Image, Button } from "react-bootstrap";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import side3 from "../../img/side3.jpg";

export default function ChangePasswordPage() {
  const [password, setPassword] = useState("");
  const [rptPassword, setRptPassword] = useState("");
  const { token } = useParams();

  const changePassword = (props) => {
    //input validation
    if (password === "") {
      toast.error("Please Enter The New Password", {
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

    if (password.length < 8) {
      toast.error("Password Must Be At Least 8 Characters Long", {
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

    if (password !== rptPassword) {
      toast.error("Passwords Don't Match!", {
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

    const passwordObj = { password: password, token: token };

    axios
      .post(`http://localhost:2000/api/new-password`, passwordObj)
      .then((res) => {
        if (res.data.error) {
          toast.error(res.data.error, {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
          });
        }

        toast.success(res.data.message, {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
      })
      .catch((err) => {
        toast.error(err, {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
      });

    setPassword("");
    setRptPassword("");
  };

  return (
    <div>
      <Header></Header>
      <ToastContainer />
      <Container
        style={{ marginTop: "120px", minHeight: "calc(100vh - 180px)" }}
      >
        <div style={{ marginBottom: "50px" }} className="text-center">
          <h2>Change Password!</h2>
        </div>
        <Row>
          <Col>
            <Image src={side3} thumbnail />
          </Col>
          <Col>
            <Input
              value={password}
              onChange={(e) => {
                setPassword(e.target.value);
              }}
              lable="New Password"
              type="password"
              placeholder="Enter your new password..."
            ></Input>
            <Input
              value={rptPassword}
              onChange={(e) => {
                setRptPassword(e.target.value);
              }}
              lable="Repeat Password"
              type="password"
              placeholder="Enter your password again..."
            ></Input>

            <Button
              className="w-100"
              variant="dark"
              onClick={() => {
                changePassword();
              }}
            >
              Change Password
            </Button>
          </Col>
        </Row>
      </Container>
      <Footer></Footer>
    </div>
  );
}
