import React from "react";
import Footer from "../../components/Footer";
import Header from "../../components/Header";
import { Container, Card, Row, Col } from "react-bootstrap";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import banner from "../../img/bannar.jpg";

export default function ProfilePage(props) {
  const auth = useSelector((state) => state.auth);

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
            <Col>
              <p>
                User ID:{" "}
                <span style={{ color: "#0275d8" }}>{auth.user._id}</span>
              </p>
              <p>
                First Name:{" "}
                <span style={{ color: "#0275d8" }}>{auth.user.firstName}</span>
              </p>
              <p>
                Last Name:{" "}
                <span style={{ color: "#0275d8" }}>{auth.user.lastName}</span>{" "}
              </p>
              <p>
                Primary Address:{" "}
                <span style={{ color: "#0275d8" }}>{auth.user.address}</span>
              </p>
              <p>
                Contact Number:{" "}
                <span style={{ color: "#0275d8" }}>
                  {auth.user.contactNumber}
                </span>
              </p>
              <p>
                NIC: <span style={{ color: "#0275d8" }}>{auth.user.nic}</span>
              </p>
              <p>
                Email:{" "}
                <span style={{ color: "#0275d8" }}>{auth.user.email}</span>
              </p>
              <p>
                Gender:{" "}
                <span style={{ color: "#0275d8" }}>{auth.user.gender}</span>
              </p>
            </Col>
            <Col>
              <Link to="/profile/orders" className="btn btn-primary">
                View My Orders
              </Link>
            </Col>
          </Row>
        </div>
      </Container>
      <Footer></Footer>
    </div>
  );
}
