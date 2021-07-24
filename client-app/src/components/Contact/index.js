import React, { useEffect, useState } from "react";
import { Row, Col, Button, Toast } from "react-bootstrap";
import axios from "axios";
import Input from "../Input";
import {
  GoogleMap,
  withScriptjs,
  withGoogleMap,
  Marker,
} from "react-google-maps";
import { key } from "../../apikey";

function Map(props) {
  return (
    <GoogleMap
      defaultZoom={16}
      defaultCenter={{ lat: 6.841273, lng: 80.003059 }}
    >
      {props.isMarkerShown && (
        <Marker position={{ lat: 6.841273, lng: 80.003059 }} />
      )}
    </GoogleMap>
  );
}

const WrappedMap = withScriptjs(withGoogleMap(Map));

export default function Contact() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [msg, setMsg] = useState("");

  const [err, setErr] = useState("");
  const [suc, setSuc] = useState("");
  const [showA, setShowA] = useState(true);
  const [showB, setShowB] = useState(true);

  const toggleShowA = () => setShowA(!showA);
  const toggleShowB = () => setShowB(!showB);

  const sendMsg = () => {
    if (name === "") {
      setErr("Please Fill The Name Field!");
      setShowA(true);
      return;
    }

    if (email === "") {
      setErr("Please Fill The Email Field!");
      setShowA(true);
      return;
    }

    if (msg === "") {
      setErr("Please Fill The Message Field!");
      setShowA(true);
      return;
    }

    const msgObj = {
      name,
      email,
      msg,
    };

    console.log(msgObj);

    axios.post(`http://localhost:2000/api/contact/sendmail`, msgObj);

    setSuc("Message Send Successfully!");
    setShowB(true);

    setName("");
    setMsg("");
    setEmail("");

    setErr("");
    setShowA(false);
  };

  return (
    <div>
      <div className="text-center">
        <br></br>
        <br></br>
        <br></br>
        <h2>Contact Us</h2>
        <br></br>
        <br></br>
      </div>
      <Row>
        <Col sm={6}>
          <WrappedMap
            loadingElement={<div style={{ height: `100%` }} />}
            containerElement={<div style={{ height: `400px` }} />}
            mapElement={<div style={{ height: `100%` }} />}
            googleMapURL={`https://maps.googleapis.com/maps/api/js?v=3.exp&libraries=geometry,drawing,places&key=${key}`}
            isMarkerShown
          ></WrappedMap>
        </Col>
        <Col sm={6}>
          {err ? (
            <Toast show={showA} onClose={toggleShowA}>
              <Toast.Header
                style={{ backgroundColor: "#913c3c", color: "white" }}
              >
                <strong className="me-auto">Error!</strong>
              </Toast.Header>
              <Toast.Body style={{ backgroundColor: "#fa6666" }}>
                {err}
              </Toast.Body>
            </Toast>
          ) : null}
          {suc ? (
            <Toast show={showB} onClose={toggleShowB}>
              <Toast.Header
                style={{ backgroundColor: "#3c915b", color: "white" }}
              >
                <strong className="me-auto">Success!</strong>
              </Toast.Header>
              <Toast.Body style={{ backgroundColor: "#67eb97" }}>
                {suc}
              </Toast.Body>
            </Toast>
          ) : null}
          <Input
            lable="Your Name"
            type="text"
            placeholder="Enter your name..."
            value={name}
            onChange={(e) => {
              setName(e.target.value);
            }}
          ></Input>
          <Input
            lable="Your Email"
            type="email"
            placeholder="Enter your email..."
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          ></Input>
          <Input
            lable="Tell Us"
            as="textArea"
            placeholder="Enter your message..."
            rows="3"
            value={msg}
            onChange={(e) => setMsg(e.target.value)}
          ></Input>
          <div className="text-center">
            <Button
              style={{ width: "100%" }}
              onClick={() => {
                sendMsg();
              }}
            >
              Contact Us
            </Button>
          </div>

          <div className="text-center">
            <h4>Our Hotline: +94 75 316 1285</h4>
          </div>
        </Col>
      </Row>
    </div>
  );
}
