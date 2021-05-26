import React from "react";
import { Form } from "react-bootstrap";

function Input(props) {
  /* let input = null;

  switch (props.type) {
    case "select":
      input = (
        <div>
          <Form.Group>
            <Form.Label>{props.lable}</Form.Label>
            <select className="form-control form-control-sm" value={props.value} onChange={props.onChange}>
              <option>{props.placeholder}</option>
              {props.options.length > 0
                ? props.options.map((option, index) => (
                    <option key={option.value}>{option.name}</option>
                  ))
                : null}
            </select>
          </Form.Group>
        </div>
      );
      break;
    case "text":
    default:
      input = (
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

  return input; */
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
