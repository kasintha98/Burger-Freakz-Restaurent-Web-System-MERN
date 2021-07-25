import React from "react";
import { Modal, Button } from "react-bootstrap";
import "./style.css";
import { Link } from "react-router-dom";

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
          {props.hideFooter ? null : (
            <>
              <div className="text-center">
                <p>
                  Forgot Password? <Link to="/reset-password">Reset Now!</Link>
                </p>
              </div>
              <br></br>
              <div>
                <p>
                  Don't have an account?{" "}
                  <Link to="/signupuser">Signup Now!</Link>
                </p>
              </div>
            </>
          )}
        </Modal.Footer>
      </Modal>
    </div>
  );
}

export default NewModal;
