import React, { useState } from "react";
import axios from "axios";
import Header from "../../components/Header";
import Footer from "../../components/Footer";
import Input from "../../components/Input";
import { Row, Col, Container, Image, Button } from "react-bootstrap";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import side2 from "../../img/side2.jpg";

export default function ResetPasswordPage() {
  const [email, setEmail] = useState("");

  const resetPassword = () => {
    if (email === "") {
      toast.error("Please Enter The Email!", {
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

    const emailObj = { email: email };

    axios
      .post(`http://localhost:2000/api/reset-password`, emailObj)
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

    setEmail("");
  };

  return (
    <div>
      <Header></Header>
      <ToastContainer />
      <Container
        style={{ marginTop: "120px", minHeight: "calc(100vh - 180px)" }}
      >
        <div style={{ marginBottom: "50px" }} className="text-center">
          <h2>Reset Password!</h2>
        </div>
        <Row>
          <Col>
            <Image src={side2} thumbnail />
          </Col>
          <Col>
            <Input
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);
              }}
              lable="Email"
              type="text"
              placeholder="Enter your email..."
            ></Input>

            <Button
              className="w-100"
              variant="dark"
              onClick={() => {
                resetPassword();
              }}
            >
              Send Password Reset Request
            </Button>
          </Col>
        </Row>
      </Container>
      <Footer></Footer>
    </div>
  );
}
