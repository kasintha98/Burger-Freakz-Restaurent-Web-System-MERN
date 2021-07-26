import React, { useEffect, useState } from "react";
import Layout from "../../components/Layouts";
import { Table, Button, Row, Col } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { getInventory, addInventory, deleteInventory } from "../../actions";
import NewModal from "../../components/UI/Modal";
import Input from "../../components/UI/Input";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function Inventory(props) {
  const inventory = useSelector((state) => state.inventory);
  const purchase = useSelector((state) => state.purchase);

  const [show, setShow] = useState(false);
  const [name, setName] = useState("");
  const [qty, setQty] = useState("");
  const [description, setDescription] = useState("");
  const [deleteInventoryModal, setDeleteInventoryModal] = useState(false);
  const [currentInventory, setCurrentInventory] = useState({});

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getInventory());
  }, []);

  const handleClose = () => {
    setShow(false);
  };
  const handleShow = () => setShow(true);

  //adding a new Inventory from user entered form data. Those formdata pass into the addInventory() function in actions
  const addNewInventory = () => {
    const inventoryObj = { name, description, qty };

    //validations of data
    if (name === "") {
      toast.error("Name can't be empty!", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
      return;
    }

    if (qty === "") {
      toast.error("Quantity can't be empty!", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
      return;
    }

    if (isNaN(qty)) {
      toast.error("Quantity must be a number!", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
      return;
    }

    if (description === "") {
      toast.error("Description can't be empty!", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
      return;
    }

    dispatch(addInventory(inventoryObj));

    setName("");
    setDescription("");
    setQty(0);
  };

  const deleteInventoryData = (inv) => {
    dispatch(deleteInventory(inv._id));
  };

  //popup modal to delete inventory
  const renderDeleteInventoryModal = () => {
    return (
      <NewModal
        modalTitle="Please Confirm!"
        variant="danger"
        clsBtnName="No"
        saveBtnName="Yes"
        addNewItem={() => deleteInventoryData(currentInventory)}
        show={deleteInventoryModal}
        handleClose={() => {
          setDeleteInventoryModal(false);
        }}
      >{`Do you want to delete "${currentInventory.name}" item?`}</NewModal>
    );
  };

  const renderInventory = (inv) => {
    return (
      <tbody>
        {inv.map((item) => (
          <tr>
            <td>{item.name}</td>
            <td>{item.qty}</td>
            <td>{item.description}</td>
            <td>
              <Button variant="success">Edit</Button>
              &nbsp;
              <Button
                variant="danger"
                onClick={() => {
                  setDeleteInventoryModal(true);
                  setCurrentInventory(item);
                }}
              >
                Delete
              </Button>
            </td>
          </tr>
        ))}
      </tbody>
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

              <td>{item.description}</td>
              <td>
                <Button variant="success">Edit</Button>
                &nbsp;
                <Button variant="danger">Delete</Button>
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

  //show add inventory popup modal
  const renderInventoryModal = () => {
    return (
      <NewModal
        show={show}
        handleClose={handleClose}
        addNewItem={addNewInventory}
        modalTitle="Add New Inventory Item"
        cat={true}
      >
        <Input
          lable="Item Name"
          type={"text"}
          value={name}
          placeholder={"Item Name"}
          onChange={(e) => {
            setName(e.target.value);
          }}
        />
        <Input
          lable="Item Quantity"
          type={"text"}
          value={qty}
          placeholder={"Item Quantity"}
          onChange={(e) => {
            setQty(e.target.value);
          }}
        />
        <Input
          lable="Item Description"
          as="textarea"
          rows={3}
          value={description}
          placeholder={"Item Description"}
          onChange={(e) => {
            setDescription(e.target.value);
          }}
        />
      </NewModal>
    );
  };

  return (
    <Layout sidebar>
      <ToastContainer />
      {inventory.loading ? (
        <div class="d-flex justify-content-center">
          <div class="spinner-border text-primary" role="status"></div>
        </div>
      ) : (
        <>
          <Row>
            <Col md={12}>
              <div style={{ display: "flex", justifyContent: "space-between" }}>
                <h3>Inventory</h3>
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
                <th>Description</th>
                <th>Actions</th>
              </tr>
            </thead>
            {renderInventory(inventory.inventory)}
            {renderPurchase(purchase.purchase)}
          </Table>
          {renderInventoryModal()}
          {renderDeleteInventoryModal()}
        </>
      )}
    </Layout>
  );
}
