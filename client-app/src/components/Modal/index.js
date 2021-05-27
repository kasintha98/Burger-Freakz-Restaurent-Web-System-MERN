import React from "react";
import { Modal, Button } from "react-bootstrap";
import "./style.css";

function NewModal(props) {
  return (
    <div>
      <Modal size={props.size} show={props.show} onHide={props.handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>{props.modalTitle}</Modal.Title>
        </Modal.Header>
        <Modal.Body>{props.children}</Modal.Body>
        <Modal.Footer>
          {props.clsBtnName ? (
            <Button variant="secondary" onClick={props.handleClose}>
              props.clsBtnName
            </Button>
          ) : null}
          <Button
            hidden={props.hiddenAddBtn}
            variant={props.variant ? props.variant : "primary"}
            onClick={() => {
              props.action();
              props.handleClose();
            }}
            style={{ width: "100%" }}
          >
            {props.saveBtnName ? props.saveBtnName : "Save"}
          </Button>
          <div>
            <p>
              Don't have an account? <a href="#signup">Signup Now!</a>
            </p>
          </div>
          {/* <span>{props.footerText}</span> */}
        </Modal.Footer>
      </Modal>
    </div>
  );
}

export default NewModal;
