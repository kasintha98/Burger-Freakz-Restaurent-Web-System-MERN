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
import {
  addCategory,
  getAllCategory,
  updateCategory,
  deleteCategory,
} from "../../actions";
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
  const [deleteCategoryModal, setDeleteCategoryModal] = useState(false);
  const [currentCategory, setCurrentCategory] = useState({});

  const [categoryIdUpdate, setCategoryIdUpdate] = useState("");
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
                  className="spinner-border text-center text-primary"
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
                  updateCategoryData(category);
                }}
                variant="success"
              >
                Edit
              </Button>
              <Button
                onClick={() => {
                  setDeleteCategoryModal(true);
                  setCurrentCategory(category);
                }}
                /* onClick={() => {
                  deleteCategoryData(category);
                }} */
                variant="danger"
              >
                Delete
              </Button>
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

  const updateCategoryData = (cat) => {
    setUpdateCategoryModal(true);

    console.log(cat._id);

    //updating state value according to selected category
    setCategoryIdUpdate(cat._id);
    setCategoryNameUpdate(cat.name);
    setCategoryDescriptionUpdate(cat.description);

    cat.categoryImages.map((picture) => setCategoryImageUpdate(picture.img));
  };

  const deleteCategoryData = (cat) => {
    //dispatching the action to delete selected category
    dispatch(deleteCategory(cat._id)).then((result) => {
      if (result) {
        dispatch(getAllCategory());
      }
    });
  };

  const renderDeleteCategoryModal = () => {
    return (
      <NewModal
        modalTitle="Please Confirm!"
        variant="danger"
        clsBtnName="No"
        saveBtnName="Yes"
        addNewItem={() => deleteCategoryData(currentCategory)}
        show={deleteCategoryModal}
        handleClose={() => {
          setDeleteCategoryModal(false);
        }}
      >{`Do you want to delete "${currentCategory.name}" category?`}</NewModal>
    );
  };

  const renderAddCategoriesModal = () => {
    return (
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
    );
  };

  const updateCategoryForm = () => {
    const form = new FormData();

    console.log(categoryNameUpdate);
    console.log(categoryIdUpdate);

    form.append("_id", categoryIdUpdate);
    form.append("name", categoryNameUpdate);
    form.append("description", categoryDescriptionUpdate);
    form.append("categoryImages", categoryImageUpdate);

    //updating the category with new form data and then updating the category list(getting the updated category list)
    dispatch(updateCategory(form)).then((result) => {
      if (result) {
        dispatch(getAllCategory());
      }
    });
  };

  const renderUpdateCategoriesModal = () => {
    return (
      <NewModal
        show={updateCategoryModal}
        handleClose={() => {
          setUpdateCategoryModal(false);
        }}
        addNewItem={updateCategoryForm}
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
    );
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
      {renderAddCategoriesModal()}
      {renderUpdateCategoriesModal()}
      {renderDeleteCategoryModal()}
    </Layout>
  );
}

export default Category;
