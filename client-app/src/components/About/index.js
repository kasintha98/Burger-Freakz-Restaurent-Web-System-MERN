import React from "react";
import { Row, Col, Card } from "react-bootstrap";
import res from "../../img/res.jpg";
import logo from "../../img/logo.jpg";

export default function About() {
  return (
    <div>
      <br></br>
      <br></br>
      <br></br>
      <Card style={{ width: "100%" }}>
        <Row>
          <Col sm={5}>
            <Card.Img variant="top" src={res} />
          </Col>
          <Col sm={7}>
            <Card.Body>
              <Card.Title>
                <div className="text-center">
                  <h2>About Us</h2>
                </div>{" "}
              </Card.Title>
              <Card.Text>
                Burger Freakz Restaurant is a food supplying company mainly
                focused on serving different kinds of burgers, submarines, and
                submarines. For example, Crispy Chicken Cheesy Blast, Double
                Cheesy Blast, Double Crispy Chicken Blast are some of the iconic
                burgers that we are selling. We supply better quality food than
                other our competitive food companies. We mainly focus on quality
                rather than quantity.
                <br></br>
                <br></br>
                The company has both dine-in and delivery facilities. The
                company was started by Mr Yukthika Wimalaweera and his sister Ms
                Yasara Wimalaweera in May 2020.
                <br></br>
                <br></br>
                The restaurant is situated in a calm area in the city of
                Homagama. You can enjoy your foods away from the noisy city, but
                close to nature.
                <br></br>
                <br></br>
                So, what are you waiting for? Come and feel the difference!
                <br></br>
                <br></br>
                <div className="text-center">
                  <img style={{ width: "200px" }} src={logo} alt="logo"></img>
                </div>
              </Card.Text>
            </Card.Body>
          </Col>
        </Row>
      </Card>
    </div>
  );
}
