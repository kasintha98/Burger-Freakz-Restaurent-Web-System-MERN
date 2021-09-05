import React from "react";
import { Card } from "react-bootstrap";
import CurrencyFormat from "react-currency-format";

export default function PriceDetails(props) {
  return (
    <div>
      <Card style={{ width: "100%" }}>
        <Card.Body>
          <Card.Title>
            Price ({props.totalItems} items) :{" "}
            <CurrencyFormat
              value={props.totalPrice}
              displayType={"text"}
              thousandSeparator={true}
              prefix={"Rs. "}
              suffix={".00"}
            />
          </Card.Title>
          <Card.Title>
            Delivery Charges :{" "}
            <CurrencyFormat
              value={props.distance * 15}
              displayType={"text"}
              thousandSeparator={true}
              prefix={"Rs. "}
              suffix={".00"}
            />
          </Card.Title>
          <Card.Title style={{ color: "red", fontWeight: "bold" }}>
            Offer :{" "}
            <CurrencyFormat
              value={props.offer}
              displayType={"text"}
              thousandSeparator={true}
              prefix={"Rs. "}
              suffix={".00"}
            />
          </Card.Title>
          <Card.Title style={{ color: "green", fontWeight: "bold" }}>
            Grand Total:{" "}
            <CurrencyFormat
              value={props.totalPrice + props.distance * 15 - props.offer}
              displayType={"text"}
              thousandSeparator={true}
              prefix={"Rs. "}
              suffix={".00"}
            />
          </Card.Title>
        </Card.Body>
      </Card>
    </div>
  );
}
