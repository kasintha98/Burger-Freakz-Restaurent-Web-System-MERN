import React from "react";
import { Row, Card } from "react-bootstrap";
import StarRatings from "react-star-ratings";

export default function Feedback() {
  return (
    <div>
      <Row>
        <Card style={{ width: "100%" }}>
          <Card.Body>
            <Card.Title>Kamal Perera</Card.Title>
            <Card.Subtitle className="mb-2 text-muted">
              Rating:{" "}
              <StarRatings
                rating={4.5}
                starDimension="25px"
                starSpacing="5px"
                starRatedColor="orange"
              />
            </Card.Subtitle>
            <Card.Text>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
              eiusmod tempor incididunt ut labore et dolore magna aliqua.
            </Card.Text>
          </Card.Body>
        </Card>
      </Row>
      <Row>
        <Card style={{ width: "100%" }}>
          <Card.Body>
            <Card.Title>Saman Perera</Card.Title>
            <Card.Subtitle className="mb-2 text-muted">
              Rating:{" "}
              <StarRatings
                rating={4}
                starDimension="25px"
                starSpacing="5px"
                starRatedColor="orange"
              />
            </Card.Subtitle>
            <Card.Text>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
              eiusmod tempor incididunt ut labore et dolore magna aliqua.
            </Card.Text>
          </Card.Body>
        </Card>
      </Row>
      <Row>
        <Card style={{ width: "100%" }}>
          <Card.Body>
            <Card.Title>Kasun Kalhara</Card.Title>
            <Card.Subtitle className="mb-2 text-muted">
              Rating:{" "}
              <StarRatings
                rating={5}
                starDimension="25px"
                starSpacing="5px"
                starRatedColor="orange"
              />
            </Card.Subtitle>
            <Card.Text>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
              eiusmod tempor incididunt ut labore et dolore magna aliqua.
            </Card.Text>
          </Card.Body>
        </Card>
      </Row>
    </div>
  );
}
