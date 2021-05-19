import React, { useState } from "react";
import {
  Container,
  Row,
  Col,
  Button,
  Table,
  ButtonGroup,
} from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { addCategory } from "../../actions";
import Layout from "../../components/Layouts";
import Input from "../../components/UI/Input";
import NewModal from "../../components/UI/Modal";
import { generatePublicUrl } from "../../urlConfig";
import "./style.css";

function Category(props) {
  const category = useSelector((state) => state.category);

  const [categoryName, setCategoryName] = useState("");
  const [categoryImage, setCategoryImage] = useState("");
  const [categoryDescription, setCategoryDescription] = useState("");
  const [updateCategoryModal, setUpdateCategoryModal] = useState(false);

  const [categoryNameUpdate, setCategoryNameUpdate] = useState("");
  const [categoryImageUpdate, setCategoryImageUpdate] = useState("");
  const [categoryDescriptionUpdate, setCategoryDescriptionUpdate] =
    useState("");

  const dispatch = useDispatch();

  const [show, setShow] = useState(false);

  if (category.loading) {
    return <div className="spinner-border text-primary" role="status"></div>;
  }

  const addNewCategory = () => {
    const form = new FormData();

    form.append("name", categoryName);
    form.append("description", categoryDescription);
    form.append("categoryImages", categoryImage);

    dispatch(addCategory(form));

    setCategoryName("");
    setCategoryDescription("");
    setCategoryImage("");
  };

  const handleClose = () => {
    setShow(false);
  };
  const handleShow = () => setShow(true);

  const renderCategories = (categories) => {
    let myCategories = [];

    for (let category of categories) {
      myCategories.push(
        <tr key={category._id}>
          <td>
            <div style={{ maxWidth: "100px" }}>
              {category.categoryImages ? (
                category.categoryImages.map((picture) => (
                  <div className="categoryImageContainer">
                    <img src={generatePublicUrl(picture.img)} alt="" />
                  </div>
                ))
              ) : (
                <div
                  className="spinner-border text-primary"
                  role="status"
                ></div>
              )}
            </div>
          </td>
          <td>{category.name}</td>
          <td>{category.description}</td>
          <td>
            <ButtonGroup style={{ width: "100%" }}>
              <Button
                onClick={() => {
                  updateCategory(category);
                }}
                variant="success"
              >
                Edit
              </Button>
              <Button variant="danger">Delete</Button>
            </ButtonGroup>
            <Button style={{ width: "100%" }} size="sm">
              Show Full Details
            </Button>
          </td>
        </tr>
      );
    }

    return myCategories;
  };

  const handleCategoryImage = (e) => {
    setCategoryImage(e.target.files[0]);
  };

  const handleCategoryImageUpdate = (e) => {
    setCategoryImageUpdate(e.target.files[0]);
  };

  const updateCategory = (cat) => {
    setUpdateCategoryModal(true);
    /* const categories = category.categories;
    console.log(categories);*/
    console.log(cat);

    setCategoryNameUpdate(cat.name);
    setCategoryDescriptionUpdate(cat.description);
    // setCategoryImageUpdate(cat.)
    cat.categoryImages.map((picture) => setCategoryImageUpdate(picture.img));

    //console.log(categoryNameUpdate);

    /* categories.length>0 && categories.forEach((cat._id, index)=>{
      const category = categories.find((category, _index)=>{ cat._id == category._id})
    })

    console.log(category); */
  };

  return (
    <Layout sidebar>
      <Container>
        <Row>
          <Col md={12}>
            <div style={{ display: "flex", justifyContent: "space-between" }}>
              <h3>Categories</h3>
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
        <Row>
          <Col md={12}>
            <Table responsive="sm">
              <thead>
                <tr>
                  <th>Image</th>
                  <th>Name</th>
                  <th>Description</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>{renderCategories(category.categories)}</tbody>
            </Table>
            ;
          </Col>
        </Row>
      </Container>

      {/* Add new category modal */}
      <NewModal
        show={show}
        handleClose={handleClose}
        addNewItem={addNewCategory}
        modalTitle="Add New Category"
      >
        <Input
          type={"text"}
          value={categoryName}
          placeholder={"Category Name"}
          onChange={(e) => {
            setCategoryName(e.target.value);
          }}
        />
        <Input
          as="textarea"
          rows={3}
          value={categoryDescription}
          placeholder={"Category Description"}
          onChange={(e) => {
            setCategoryDescription(e.target.value);
          }}
        />
        <div className="input-group mb-3">
          <label className="input-group-text" htmlFor="inputGroupFile01">
            Upload Category Image
          </label>
          <input
            type="file"
            name="categoryImage"
            className="form-control"
            id="inputGroupFile01"
            onChange={handleCategoryImage}
          />
        </div>
      </NewModal>

      {/* Edit category modal */}
      <NewModal
        show={updateCategoryModal}
        handleClose={() => {
          setUpdateCategoryModal(false);
        }}
        addNewItem={() => {
          updateCategory();
        }}
        modalTitle="Edit Category"
        size="lg"
      >
        <Input
          type={"text"}
          value={categoryNameUpdate}
          placeholder={"Category Name"}
          onChange={(e) => {
            setCategoryNameUpdate(e.target.value);
          }}
        />
        <Input
          as="textarea"
          rows={3}
          value={categoryDescriptionUpdate}
          placeholder={"Category Description"}
          onChange={(e) => {
            setCategoryDescriptionUpdate(e.target.value);
          }}
        />
        <div className="input-group mb-3">
          <label className="input-group-text" htmlFor="inputGroupFile01">
            Upload Category Image
          </label>
          <input
            type="file"
            name="categoryImageUpdate"
            className="form-control"
            id="inputGroupFile01"
            onChange={handleCategoryImageUpdate}
          />
        </div>
        <div>
          {typeof categoryImageUpdate === "string" ? (
            <Row>
              <Col>
                <label style={{ color: "#333" }}>
                  Current Image Name: <br></br> {categoryImageUpdate}
                </label>
              </Col>
              <Col>
                <label style={{ color: "#333" }}>Current Image Preview:</label>
                <br></br>
                <img
                  style={{ maxWidth: "100px" }}
                  src={generatePublicUrl(categoryImageUpdate)}
                  alt="Category"
                />
              </Col>
            </Row>
          ) : null}
        </div>
      </NewModal>
    </Layout>
  );
}

export default Category;
