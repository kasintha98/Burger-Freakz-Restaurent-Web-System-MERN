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
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
                eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
                enim ad minim veniam, quis nostrud exercitation ullamco laboris
                nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor
                in reprehenderit in voluptate velit esse cillum dolore eu fugiat
                nulla pariatur. Excepteur sint occaecat cupidatat non proident,
                sunt in culpa qui officia deserunt mollit anim id est laborum.
                <br></br>
                <br></br>
                Sed ut perspiciatis unde omnis iste natus error sit voluptatem
                accusantium doloremque laudantium, totam rem aperiam, eaque ipsa
                quae ab illo inventore veritatis et quasi architecto beatae
                vitae dicta sunt explicabo. Nemo enim ipsam voluptatem quia
                voluptas sit aspernatur aut odit aut fugit, sed quia
                consequuntur magni dolores eos qui ratione voluptatem sequi
                nesciunt. Neque porro quisquam est, qui dolorem ipsum quia dolor
                sit amet, consectetur, adipisci velit, sed quia non numquam eius
                modi tempora incidunt ut labore et dolore magnam aliquam quaerat
                voluptatem.
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
