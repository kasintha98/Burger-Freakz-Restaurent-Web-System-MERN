import React, { useState } from "react";
import Footer from "../../components/Footer";
import Header from "../../components/Header";
import Input from "../../components/Input";
import {
  Container,
  Card,
  Row,
  Col,
  Image,
  Button,
  Modal,
  Form,
} from "react-bootstrap";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import banner from "../../img/bannar.jpg";

export default function ProfilePage(props) {
  const auth = useSelector((state) => state.auth);

  const [email, setEmail] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [gender, setGender] = useState("other");
  const [contactNumber, setContactNumberNumber] = useState("");
  const [nic, setNicNumber] = useState("");
  const [address, setAddress] = useState("");

  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const editProfile = () => {
    return (
      <>
        <Modal show={show} onHide={handleClose}>
          <Modal.Header closeButton>
            <Modal.Title>Edit Profile</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Input
              value={firstName}
              onChange={(e) => {
                setFirstName(e.target.value);
              }}
              lable="First Name"
              type="text"
              placeholder="Enter your first name..."
            ></Input>
            <Input
              value={lastName}
              onChange={(e) => {
                setLastName(e.target.value);
              }}
              lable="Last Name"
              type="text"
              placeholder="Enter your last name..."
            ></Input>
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
              value={address}
              onChange={(e) => {
                setAddress(e.target.value);
              }}
              lable="Address"
              as="textarea"
              rows="3"
              placeholder="Enter your address..."
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
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleClose}>
              Close
            </Button>
            <Button variant="primary" onClick={handleClose}>
              Save
            </Button>
          </Modal.Footer>
        </Modal>
      </>
    );
  };

  return (
    <div>
      {console.log(auth)}
      <Header></Header>
      <Container
        style={{ marginTop: "120px", minHeight: "calc(100vh - 180px)" }}
      >
        <div class="text-center" style={{ paddingBottom: "100px" }}>
          <h3>My Profile!</h3>
          <Card className="bg-dark text-white">
            <Card.Img src={banner} alt="Card image" />
            <Card.ImgOverlay>
              <Card.Title style={{ textShadow: "2px 2px black" }}>
                {auth.authenticate ? (
                  <h1>Welcome {auth.user.fullName} !</h1>
                ) : null}
              </Card.Title>
            </Card.ImgOverlay>
          </Card>

          <Row
            style={{ marginTop: "40px", textAlign: "left", fontSize: "22px" }}
          >
            <Col sm={8}>
              <div className="text-center">
                {auth.user.profilePicture ? (
                  <Image
                    width="150px"
                    src={auth.user.profilePicture}
                    roundedCircle
                  />
                ) : (
                  <Image
                    width="150px"
                    src="https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png"
                    roundedCircle
                  />
                )}
                <br></br>
                <br></br>
              </div>
              <p>
                <i className="fa fa-check"></i> User ID:{" "}
                <span style={{ color: "#0275d8" }}>{auth.user._id}</span>
              </p>
              <p>
                <i className="fa fa-check"></i> First Name:{" "}
                <span style={{ color: "#0275d8" }}>{auth.user.firstName}</span>
              </p>
              <p>
                <i className="fa fa-check"></i> Last Name:{" "}
                <span style={{ color: "#0275d8" }}>{auth.user.lastName}</span>{" "}
              </p>
              <p>
                <i className="fa fa-check"></i> Primary Address:{" "}
                <span style={{ color: "#0275d8" }}>{auth.user.address}</span>
              </p>
              <p>
                <i className="fa fa-check"></i> Contact Number:{" "}
                <span style={{ color: "#0275d8" }}>
                  {auth.user.contactNumber}
                </span>
              </p>
              <p>
                <i className="fa fa-check"></i> NIC:{" "}
                <span style={{ color: "#0275d8" }}>{auth.user.nic}</span>
              </p>
              <p>
                <i className="fa fa-check"></i> Email:{" "}
                <span style={{ color: "#0275d8" }}>{auth.user.email}</span>
              </p>
              <p>
                <i className="fa fa-check"></i> Gender:{" "}
                <span style={{ color: "#0275d8" }}>{auth.user.gender}</span>
              </p>
            </Col>
            <Col
              sm={4}
              style={{
                backgroundColor: "#333",
                color: "white",
              }}
            >
              <br></br>
              <div className="text-center">
                <h3>Actions</h3>
              </div>
              <br></br>
              <div className="text-center"></div>
              <Row style={{ paddingLeft: "10px", paddingRight: "10px" }}>
                <Link
                  style={{ height: "50px", marginBottom: "20px" }}
                  to="/profile/orders"
                  className="btn btn-primary w-100"
                >
                  View My Orders
                </Link>
                <Button
                  className="btn btn-primary w-100"
                  style={{ height: "50px", marginBottom: "20px" }}
                  onClick={handleShow}
                >
                  Edit Profile
                </Button>
              </Row>
            </Col>
          </Row>
        </div>
        {editProfile()}
      </Container>
      <Footer></Footer>
    </div>
  );
}
