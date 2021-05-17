import React, { useState } from "react";
import { Container, Row, Col, Button, Table } from "react-bootstrap";
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

  const dispatch = useDispatch();

  const [show, setShow] = useState(false);

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
              {category.categoryImages.map((picture) => (
                <div className="categoryImageContainer">
                  <img src={generatePublicUrl(picture.img)} alt="" />
                </div>
              ))}
            </div>
          </td>
          <td>{category.name}</td>
          <td>{category.description}</td>
        </tr>
      );
    }

    return myCategories;
  };

  const handleCategoryImage = (e) => {
    setCategoryImage(e.target.files[0]);
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
    </Layout>
  );
}

export default Category;
