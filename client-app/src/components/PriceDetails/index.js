import React, { useState } from "react";
import { Card } from "react-bootstrap";

export default function PriceDetails(props) {
  return (
    <div>
      <Card style={{ width: "100%" }}>
        <Card.Body>
          <Card.Title>
            Price ({props.totalItems} items) : {props.totalPrice}
          </Card.Title>
          <Card.Title>Delivery Charges : {props.distance * 15}</Card.Title>
          <Card.Title>
            Grand Total: {props.totalPrice + props.distance * 15}
          </Card.Title>
        </Card.Body>
      </Card>
    </div>
  );
}
