import React from "react";
import { Row, Card } from "react-bootstrap";
import StarRatings from "react-star-ratings";

export default function Feedback(props) {
  return (
    <div>
      {props.feedbacks.map((feedback) => (
        <Row>
          <Card style={{ width: "100%" }}>
            <Card.Body>
              <Card.Title>
                {feedback.userId.firstName} {feedback.userId.lastName}
              </Card.Title>
              <Card.Subtitle className="mb-2 text-muted">
                Rating:{" "}
                <StarRatings
                  rating={feedback.rating}
                  starDimension="25px"
                  starSpacing="5px"
                  starRatedColor="orange"
                />
              </Card.Subtitle>
              <Card.Text>{feedback.feedback}</Card.Text>
            </Card.Body>
          </Card>
        </Row>
      ))}
    </div>
  );
}
