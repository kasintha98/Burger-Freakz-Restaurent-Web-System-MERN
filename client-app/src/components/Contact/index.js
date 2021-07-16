import React, { useEffect, useState } from "react";
import { Row, Col, Button } from "react-bootstrap";
import Input from "../Input";
import { GoogleMap, withScriptjs, withGoogleMap } from "react-google-maps";

function Map() {
  return (
    <GoogleMap
      defaultZoom={16}
      defaultCenter={{ lat: 6.841273, lng: 80.003059 }}
    />
  );
}

const WrappedMap = withScriptjs(withGoogleMap(Map));

export default function Contact() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [msg, setMsg] = useState("");

  const sendMsg = () => {
    const msgObj = {
      name,
      email,
      msg,
    };

    console.log(msgObj);
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
            googleMapURL={`https://maps.googleapis.com/maps/api/js?v=3.exp&libraries=geometry,drawing,places&key=AIzaSyC4gFCQVS9xyi-qEFb3qsnNH_fbyM-gnQo`}
          ></WrappedMap>
        </Col>
        <Col sm={6}>
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
