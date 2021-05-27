import React from "react";
import { CardGroup, Card } from "react-bootstrap";
import chef1 from "../../img/chef1.jpg";
import chef2 from "../../img/chef2.jpg";
import chef3 from "../../img/chef3.jpg";

export default function index() {
  return (
    <div>
      <div className="text-center">
        <br></br>
        <br></br>
        <h2>Meet Our Chefs</h2>
        <br></br>
        <br></br>
      </div>
      <CardGroup>
        <Card>
          <Card.Img variant="top" src={chef1} />
          <Card.Body>
            <Card.Title>
              <div className="text-center">Chef 1</div>
            </Card.Title>
            <Card.Text>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
              eiusmod tempor incididunt ut labore et dolore magna aliqua.
            </Card.Text>
          </Card.Body>
        </Card>
        <Card>
          <Card.Img variant="top" src={chef2} />
          <Card.Body>
            <Card.Title>
              {" "}
              <div className="text-center">Chef 2</div>
            </Card.Title>
            <Card.Text>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
              eiusmod tempor incididunt ut labore et dolore magna aliqua.
            </Card.Text>
          </Card.Body>
        </Card>
        <Card>
          <Card.Img variant="top" src={chef3} />
          <Card.Body>
            <Card.Title>
              {" "}
              <div className="text-center">Chef 3</div>
            </Card.Title>
            <Card.Text>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
              eiusmod tempor incididunt ut labore et dolore magna aliqua.
            </Card.Text>
          </Card.Body>
        </Card>
      </CardGroup>
    </div>
  );
}
