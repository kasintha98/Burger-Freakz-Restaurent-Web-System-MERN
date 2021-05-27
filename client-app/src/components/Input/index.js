import React from "react";
import { Form } from "react-bootstrap";

function Input(props) {
  return (
    <div>
      <Form.Group>
        <Form.Label>{props.lable}</Form.Label>
        <Form.Control
          type={props.type}
          placeholder={props.placeholder}
          value={props.value}
          onChange={props.onChange}
          as={props.as}
          rows={props.rows}
        />
        <Form.Text className="text-muted">{props.error}</Form.Text>
      </Form.Group>
    </div>
  );
}

export default Input;
