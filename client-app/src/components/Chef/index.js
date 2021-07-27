import React from "react";
import { CardGroup, Card } from "react-bootstrap";
import sathish from "../../img/sathish.jpg";
import supun from "../../img/supun.jpg";
import deshitha from "../../img/deshitha.jpg";

export default function index() {
  return (
    <div>
      <div className="text-center">
        <br></br>
        <br></br>
        <br></br>
        <h2>Meet Our Chefs</h2>
        <br></br>
        <br></br>
      </div>
      <CardGroup>
        <Card>
          <Card.Img variant="top" src={sathish} />
          <Card.Body>
            <Card.Title>
              <div className="text-center">Sathish Suharsha</div>
            </Card.Title>
            <Card.Text>
              Well experienced and talented chef. 2+ years of experience.
            </Card.Text>
          </Card.Body>
        </Card>
        <Card>
          <Card.Img variant="top" src={supun} />
          <Card.Body>
            <Card.Title>
              <div className="text-center">Supun Dhananjaya</div>
            </Card.Title>
            <Card.Text>
              Well experienced and talented chef. 2+ years of experience.
            </Card.Text>
          </Card.Body>
        </Card>
        <Card>
          <Card.Img variant="top" src={deshitha} />
          <Card.Body>
            <Card.Title>
              <div className="text-center">Deshitha Perera</div>
            </Card.Title>
            <Card.Text>
              Well experienced and talented chef. 2+ years of experience.
            </Card.Text>
          </Card.Body>
        </Card>
      </CardGroup>
    </div>
  );
}
