import React from "react";
import { Modal, Button, Row, Col } from "react-bootstrap";
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
        <Modal.Footer className="text-center">
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

              if (!props.log) {
                props.handleClose();
              }
            }}
            style={{ width: "100%" }}
          >
            {props.saveBtnName ? props.saveBtnName : "Save"}
          </Button>
        </Modal.Footer>
        {props.hideFooter ? null : (
          <>
            <Row className="justify-content-md-center">
              <Col>
                <div className="text-center">
                  <p>
                    Forgot Password?{" "}
                    <Link to="/reset-password">Reset Now!</Link>
                  </p>
                </div>
              </Col>
              <Col>
                <div className="text-center">
                  <p>
                    Don't have an account?{" "}
                    <Link to="/signupuser">Signup Now!</Link>
                  </p>
                </div>
              </Col>
            </Row>
          </>
        )}
      </Modal>
    </div>
  );
}

export default NewModal;
