import React, { useState } from "react";
import Layout from "../../components/Layouts";
import { Container, Row, Col, Button, Table } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import Input from "../../components/UI/Input";
import { addProduct } from "../../actions";
import NewModal from "../../components/UI/Modal";

function Products(props) {
  const [productName, setProductName] = useState("");
  const [productPrice, setProductPrice] = useState("");
  const [productQty, setProductQty] = useState("");
  const [productDescription, setProductDescription] = useState("");
  const [productOffer, setProductOffer] = useState("");
  const [productCategory, setProductCategory] = useState("");
  const [productImage, setProductImage] = useState([]);

  const category = useSelector((state) => state.category);
  const product = useSelector((state) => state.product);

  const dispatch = useDispatch();

  /*  useEffect(() => {
    dispatch(getAllCategory());
  }, []); */

  const [show, setShow] = useState(false);

  const addNewProduct = () => {
    const form = new FormData();

    form.append("name", productName);
    form.append("price", productPrice);
    form.append("offer", productOffer);
    form.append("category", productCategory);
    form.append("quantity", productQty);
    form.append("description", productDescription);

    for (let pic of productImage) {
      form.append("productImages", pic);
    }

    dispatch(addProduct(form));
  };

  const handleClose = () => {
    setShow(false);
  };
  const handleShow = () => setShow(true);

  /*   const renderCategories = (categories) => {
    let myCategories = [];
    for (let category of categories) {
      myCategories.push(<li key={category._id}>{category.name}</li>);
    }

    return myCategories;
  }; */

  const handleProductImage = (e) => {
    setProductImage([...productImage, e.target.files[0]]);
  };

  console.log(productImage);

  const createCategoryList = (categories, options = []) => {
    for (let category of categories) {
      options.push({ value: category._id, name: category.name });
    }
    return options;
  };

  const renderProducts = () => {
    return (
      <Table responsive="sm">
        <thead>
          <tr>
            <th>Image</th>
            <th>Name</th>
            <th>Description</th>
            <th>Price</th>
            <th>Offer</th>
            <th>Rating</th>
            <th>Quantity</th>
            <th>Category</th>
            <th>Added By</th>
          </tr>
        </thead>
        <tbody>
          {product.products.length > 0
            ? product.products.map((product) => (
                <tr key={product._id}>
                  <td>{"image"}</td>
                  <td>{product.name}</td>
                  <td>{product.description}</td>
                  <td>{product.price}</td>
                  <td>{product.offer}</td>
                  <td>{"rating"}</td>
                  <td>{product.quantity}</td>
                  <td>{"--"}</td>
                  <td>{"--"}</td>
                </tr>
              ))
            : null}
        </tbody>
      </Table>
    );
  };

  return (
    <Layout sidebar>
      <Container>
        <Row>
          <Col md={12}>
            <div style={{ display: "flex", justifyContent: "space-between" }}>
              <h3>Products</h3>
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
          <Col md={12}>{renderProducts()}</Col>
        </Row>
      </Container>

      <NewModal
        modalTitle={"Add New Product"}
        show={show}
        handleClose={handleClose}
        addNewItem={addNewProduct}
      >
        <Input
          type={"text"}
          value={productName}
          placeholder={"Product Name"}
          onChange={(e) => {
            setProductName(e.target.value);
          }}
        />
        <Input
          type={"text"}
          value={productPrice}
          placeholder={"Product Price"}
          onChange={(e) => {
            setProductPrice(e.target.value);
          }}
        />
        <Input
          type={"text"}
          value={productQty}
          placeholder={"Product Quantity"}
          onChange={(e) => {
            setProductQty(e.target.value);
          }}
        />
        <Input
          as="textarea"
          rows={3}
          value={productDescription}
          placeholder={"Product Description"}
          onChange={(e) => {
            setProductDescription(e.target.value);
          }}
        />
        <Input
          type={"text"}
          value={productOffer}
          placeholder={"Product Offer"}
          onChange={(e) => {
            setProductOffer(e.target.value);
          }}
        />
        <select
          className="form-control"
          value={productCategory}
          onChange={(e) => {
            setProductCategory(e.target.value);
          }}
        >
          <option>Select Category</option>
          {createCategoryList(category.categories).map((option) => (
            <option key={option.value} value={option.value}>
              {option.name}
            </option>
          ))}
        </select>

        {productImage.length > 0
          ? productImage.map((pic, index) => <div key={index}>{pic.name}</div>)
          : null}

        <div className="input-group mb-3">
          <label className="input-group-text" htmlFor="inputGroupFile01">
            Upload Product Images
          </label>
          <input
            type="file"
            name="productImage"
            className="form-control"
            id="inputGroupFile01"
            onChange={handleProductImage}
          />
        </div>
      </NewModal>
    </Layout>
  );
}

export default Products;
