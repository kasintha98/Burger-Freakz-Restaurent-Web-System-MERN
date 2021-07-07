import React, { useEffect, useState } from "react";
import Layout from "../../components/Layouts";
import { Table, Button, Row, Col } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { getPurchase, addPurchase, deletePurchase } from "../../actions";
import NewModal from "../../components/UI/Modal";
import Input from "../../components/UI/Input";

export default function Purchases(props) {
  const purchase = useSelector((state) => state.purchase);

  const [show, setShow] = useState(false);
  const [title, setTitle] = useState("");
  const [qty, setQty] = useState("");
  const [description, setDescription] = useState("");
  const [unitPrice, setUnitPrice] = useState("");
  const [deletePurchaseModal, setDeletePurchaseModal] = useState(false);
  const [currentPurchase, setCurrentPurchase] = useState({});

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getPurchase());
  }, []);

  const handleClose = () => {
    setShow(false);
  };
  const handleShow = () => setShow(true);

  //adding a new Purchase from user entered form data. Those formdata pass into the addPurchase() function in actions
  const addNewPurchase = () => {
    const purchaseObj = { title, description, qty, unitPrice };

    //validations of data
    if (title === "") {
      alert("Title can't be empty!");
      return;
    }
    if (description === "") {
      alert("Description can't be empty!");
      return;
    }
    if (qty === "") {
      alert("Quantity can't be empty!");
      return;
    }

    if (unitPrice === "") {
      alert("Unit Price can't be empty!");
      return;
    }

    dispatch(addPurchase(purchaseObj));

    setTitle("");
    setDescription("");
    setQty(0);
    setUnitPrice(0);
  };

  const deletePurchaseData = (inv) => {
    dispatch(deletePurchase(inv._id));
  };

  //popup modal to delete purchase
  const renderDeletePurchaseModal = () => {
    return (
      <NewModal
        modalTitle="Please Confirm!"
        variant="danger"
        clsBtnName="No"
        saveBtnName="Yes"
        addNewItem={() => deletePurchaseData(currentPurchase)}
        show={deletePurchaseModal}
        handleClose={() => {
          setDeletePurchaseModal(false);
        }}
      >{`Do you want to delete "${currentPurchase.name}" item?`}</NewModal>
    );
  };

  const renderPurchase = (pur) => {
    return (
      <tbody>
        {pur ? (
          pur.map((item) => (
            <tr>
              <td>{item.title}</td>
              <td>{item.qty}</td>
              <td>{item.unitPrice}</td>
              <td>{item.description}</td>
              <td>
                <Button variant="success">Edit</Button>
                &nbsp;
                <Button
                  variant="danger"
                  onClick={() => {
                    setDeletePurchaseModal(true);
                    setCurrentPurchase(item);
                  }}
                >
                  Delete
                </Button>
              </td>
            </tr>
          ))
        ) : (
          <div class="d-flex justify-content-center">
            <div class="spinner-border text-primary" role="status"></div>
          </div>
        )}
      </tbody>
    );
  };

  //show add purchase popup modal
  const renderPurchaseModal = () => {
    return (
      <NewModal
        show={show}
        handleClose={handleClose}
        addNewItem={addNewPurchase}
        modalTitle="Add New Purchase Item"
      >
        <Input
          lable="Purchase Title"
          type={"text"}
          value={title}
          placeholder={"Purchase Title"}
          onChange={(e) => {
            setTitle(e.target.value);
          }}
        />
        <Input
          lable="Purchase Quantity"
          type={"number"}
          value={qty}
          placeholder={"Purchase Quantity"}
          onChange={(e) => {
            setQty(e.target.value);
          }}
        />
        <Input
          lable="Unit Price"
          type={"number"}
          value={unitPrice}
          placeholder={"Unit Price"}
          onChange={(e) => {
            setUnitPrice(e.target.value);
          }}
        />
        <Input
          lable="Purchase Description"
          as="textarea"
          rows={3}
          value={description}
          placeholder={"Purchase Description"}
          onChange={(e) => {
            setDescription(e.target.value);
          }}
        />
      </NewModal>
    );
  };

  return (
    <Layout sidebar>
      {purchase.loading ? (
        <div class="d-flex justify-content-center">
          <div class="spinner-border text-primary" role="status"></div>
        </div>
      ) : (
        <>
          <Row>
            <Col md={12}>
              <div style={{ display: "flex", justifyContent: "space-between" }}>
                <h3>Purchases</h3>
                <Button
                  variant="dark"
                  onClick={handleShow}
                  style={{ marginTop: "5px" }}
                >
                  Add
                </Button>
              </div>
            </Col>
          </Row>
          <Table responsive>
            <thead>
              <tr>
                <th>Name</th>
                <th>Quantity</th>
                <th>Unit Price</th>
                <th>Description</th>
                <th>Actions</th>
              </tr>
            </thead>
            {renderPurchase(purchase.purchase)}
          </Table>
          {renderPurchaseModal()}
          {renderDeletePurchaseModal()}
        </>
      )}
    </Layout>
  );
}
