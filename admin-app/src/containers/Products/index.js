import React, { useState } from "react";
import Layout from "../../components/Layouts";
import {
  Container,
  Row,
  Col,
  Button,
  Table,
  Carousel,
  ButtonGroup,
} from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import Input from "../../components/UI/Input";
import { addProduct } from "../../actions";
import NewModal from "../../components/UI/Modal";
import { generatePublicUrl } from "../../urlConfig";
import "./style.css";

function Products(props) {
  const [productName, setProductName] = useState("");
  const [productPrice, setProductPrice] = useState("");
  const [productQty, setProductQty] = useState("");
  const [productDescription, setProductDescription] = useState("");
  const [productOffer, setProductOffer] = useState("");
  const [productCategory, setProductCategory] = useState("");
  const [productImage, setProductImage] = useState([]);
  const [productDetailsModal, setProductDetailsModal] = useState(false);
  const [productDetails, setProductDetails] = useState(null);

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
        <thead className="text-center">
          <tr>
            <th>Image</th>
            <th>Name</th>
            <th>Description</th>
            <th>Price</th>
            <th>Rating</th>
            <th>Category</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody className="text-center">
          {product.products.length > 0
            ? product.products.map((product) => (
                <tr key={product._id}>
                  <td>
                    <div style={{ maxWidth: "100px" }}>
                      <Carousel fade>
                        {product.productImages.map((picture) => (
                          <Carousel.Item>
                            <div className="productImageContainer">
                              <img
                                src={generatePublicUrl(picture.img)}
                                alt=""
                              />
                            </div>
                          </Carousel.Item>
                        ))}
                      </Carousel>
                    </div>
                  </td>
                  <td>{product.name}</td>
                  <td>{product.description}</td>
                  <td>{product.price}</td>
                  <td>{"rating"}</td>
                  <td>{product.category.name}</td>
                  <td>
                    <ButtonGroup style={{ width: "100%" }}>
                      <Button variant="success">Edit</Button>
                      <Button variant="danger">Delete</Button>
                    </ButtonGroup>
                    <Button
                      style={{ width: "100%" }}
                      size="sm"
                      onClick={() => {
                        showProductDetailsModal(product);
                      }}
                    >
                      Show Full Details
                    </Button>
                  </td>
                </tr>
              ))
            : null}
        </tbody>
      </Table>
    );
  };

  const renderAddProductModal = () => {
    return (
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
    );
  };

  const handleCloseProductDetailsModal = () => {
    setProductDetailsModal(false);
  };

  const showProductDetailsModal = (product) => {
    setProductDetails(product);
    setProductDetailsModal(true);
    //console.log(product);
  };

  const renderProductDetailsModal = () => {
    if (!productDetails) {
      return null;
    }

    return (
      <NewModal
        modalTitle={"Product Details"}
        show={productDetailsModal}
        handleClose={handleCloseProductDetailsModal}
        size="lg"
        hiddenAddBtn={true}
      >
        <Row>
          <Col md="6">
            <lable className="key">Id</lable>
            <p className="value">{productDetails._id}</p>
          </Col>
          <Col md="6">
            <lable className="key">Name</lable>
            <p className="value">{productDetails.name}</p>
          </Col>
          <Col md="6">
            <lable className="key">Price</lable>
            <p className="value">{productDetails.price}</p>
          </Col>
          <Col md="6">
            <lable className="key">Quantity</lable>
            <p className="value">{productDetails.quantity}</p>
          </Col>
          <Col md="6">
            <lable className="key">Description</lable>
            <p className="value">{productDetails.description}</p>
          </Col>
          <Col md="6">
            <lable className="key">Offer</lable>
            <p className="value">{productDetails.offer}</p>
          </Col>
          <Col md="6">
            <lable className="key">Category</lable>
            <p className="value">{productDetails.category.name}</p>
          </Col>
          <Col md="6">
            <lable className="key">Added By</lable>
            <p className="value">
              {productDetails.createdBy.firstName}&nbsp;
              {productDetails.createdBy.lastName}
            </p>
          </Col>
          <Col md="6">
            <lable className="key">Images</lable>
            <div style={{ display: "flex" }}>
              {productDetails.productImages.map((picture) => (
                <div className="productImageContainer">
                  <img src={generatePublicUrl(picture.img)} alt="" />
                </div>
              ))}
            </div>
          </Col>
        </Row>
      </NewModal>
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
      {renderAddProductModal()}
      {renderProductDetailsModal()}
    </Layout>
  );
}

export default Products;
