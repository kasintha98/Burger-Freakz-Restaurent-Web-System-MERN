import React from "react";
import Footer from "../../components/Footer";
import Header from "../../components/Header";
import { Container } from "react-bootstrap";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

export default function ProfilePage(props) {
  const auth = useSelector((state) => state.auth);

  return (
    <div>
      <Header></Header>
      <Container style={{ marginTop: "120px" }}>
        <div class="text-center" style={{ paddingBottom: "60vh" }}>
          <h3>Profile</h3>
          {auth.authenticate ? <h3>Welcome {auth.user.fullName} !</h3> : null}
          <Link to="/profile/orders" className="btn btn-primary">
            View My Orders
          </Link>
        </div>
      </Container>
      <Footer></Footer>
    </div>
  );
}
