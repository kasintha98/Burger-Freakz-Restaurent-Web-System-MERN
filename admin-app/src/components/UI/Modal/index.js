import React from "react";
import { Modal, Button } from "react-bootstrap";

function NewModal(props) {
  return (
    <div>
      <Modal size={props.size} show={props.show} onHide={props.handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>{props.modalTitle}</Modal.Title>
        </Modal.Header>
        <Modal.Body>{props.children}</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={props.handleClose}>
            {props.clsBtnName ? props.clsBtnName : "Close"}
          </Button>
          <Button
            hidden={props.hiddenAddBtn}
            variant={props.variant ? props.variant : "primary"}
            onClick={() => {
              props.addNewItem();

              if (!props.cat) {
                props.handleClose();
              }
            }}
          >
            {props.saveBtnName ? props.saveBtnName : "Save"}
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}

export default NewModal;
