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
import { addProduct, updateProduct, deleteProduct } from "../../actions";
import CurrencyFormat from "react-currency-format";
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
  const [deleteProductModal, setDeleteProductModal] = useState(false);
  const [currentProduct, setCurrentProduct] = useState({});
  const [updateProductModal, setUpdateProductModal] = useState(false);

  const [productIdUpdate, setProductIdUpdate] = useState("");
  const [productNameUpdate, setProductNameUpdate] = useState("");
  const [productPriceUpdate, setProductPriceUpdate] = useState("");
  const [productQtyUpdate, setProductQtyUpdate] = useState("");
  const [productDescriptionUpdate, setProductDescriptionUpdate] = useState("");
  const [productOfferUpdate, setProductOfferUpdate] = useState("");
  const [productCategoryUpdate, setProductCategoryUpdate] = useState({});
  const [productImageUpdate, setProductImageUpdate] = useState([]);

  const category = useSelector((state) => state.category);
  const product = useSelector((state) => state.product);

  const dispatch = useDispatch();

  /*  useEffect(() => {
    dispatch(getAllCategory());
  }, []); */

  const [show, setShow] = useState(false);

  //product is loading display loading spinner
  if (product.loading) {
    return <div className="spinner-border text-primary" role="status"></div>;
  }

  const addNewProduct = () => {
    const form = new FormData();

    //validations of data
    if (productName === "") {
      alert("Name can't be empty!");
      return;
    }
    if (productPrice === "") {
      alert("Price can't be empty!");
      return;
    }
    if (isNaN(productPrice)) {
      alert("Price must be a number!");
      return;
    }
    if (productQty === "") {
      alert("Quantity can't be empty!");
      return;
    }
    if (isNaN(productQty)) {
      alert("Quantity must be a number!");
      return;
    }
    if (productDescription === "") {
      alert("Description can't be empty!");
      return;
    }
    if (productOffer === "") {
      alert("Offer can't be empty!");
      return;
    }
    if (isNaN(productOffer)) {
      alert("Offer must be a number!");
      return;
    }
    if (!productCategory) {
      alert("Category can't be empty!");
      return;
    }
    if (productImage.length < 0) {
      alert("Product images can't be empty!");
      return;
    }

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

    //window.location.reload();
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

  //handling selected product image in product updating
  const handleProductImageUpdate = (e) => {
    setProductImageUpdate(e.target.files[0]);
  };

  //updating the state after selecting product data to update
  const updateProductData = (prod) => {
    setUpdateProductModal(true);

    console.log(prod._id);

    //updating state value according to selected Product
    setProductIdUpdate(prod._id);
    setProductNameUpdate(prod.name);
    setProductDescriptionUpdate(prod.description);
    setProductQtyUpdate(prod.quantity);
    setProductOfferUpdate(prod.offer);
    setProductPriceUpdate(prod.price);
    setProductOfferUpdate(prod.offer);
    setProductCategoryUpdate(prod.category);

    prod.productImages.map((picture) => setProductImageUpdate(picture.img));
  };

  //handling the data added to form when updating the Product and passing them to updateProduct() in actions
  const updateProductForm = () => {
    const form = new FormData();

    console.log(productNameUpdate);
    console.log(productIdUpdate);

    form.append("_id", productIdUpdate);
    form.append("name", productNameUpdate);
    form.append("description", productDescriptionUpdate);
    form.append("productImages", productImageUpdate);
    form.append("offer", productOfferUpdate);
    form.append("quantity", productQtyUpdate);
    form.append("price", productPriceUpdate);
    form.append("category", productCategoryUpdate._id);

    //updating the product with new form data and then updating the product list(getting the updated product list)
    dispatch(updateProduct(form));
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
                  <td>
                    {
                      <CurrencyFormat
                        value={product.price}
                        displayType={"text"}
                        thousandSeparator={true}
                        prefix={"Rs. "}
                        suffix={".00"}
                      />
                    }
                  </td>
                  <td>{"rating"}</td>
                  <td>{product.category.name}</td>
                  <td>
                    <ButtonGroup style={{ width: "100%" }}>
                      <Button
                        variant="success"
                        onClick={() => {
                          updateProductData(product);
                        }}
                        variant="success"
                      >
                        Edit
                      </Button>
                      <Button
                        variant="danger"
                        onClick={() => {
                          setDeleteProductModal(true);
                          setCurrentProduct(product);
                        }}
                      >
                        Delete
                      </Button>
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

  //showing updateproduct modal popup
  const renderUpdateProductsModal = () => {
    return (
      <NewModal
        show={updateProductModal}
        handleClose={() => {
          setUpdateProductModal(false);
        }}
        addNewItem={updateProductForm}
        modalTitle="Edit Product"
        size="lg"
      >
        <Input
          lable="Product Name"
          type={"text"}
          value={productNameUpdate}
          placeholder={"Product Name"}
          onChange={(e) => {
            setProductNameUpdate(e.target.value);
          }}
        />
        <Input
          lable="Product Price"
          type={"text"}
          value={productPriceUpdate}
          placeholder={"Product Price"}
          onChange={(e) => {
            setProductPriceUpdate(e.target.value);
          }}
        />
        <Input
          lable="Product Quantity"
          type={"text"}
          value={productQtyUpdate}
          placeholder={"Product Quantity"}
          onChange={(e) => {
            setProductQtyUpdate(e.target.value);
          }}
        />
        <Input
          lable="Product Description"
          as="textarea"
          rows={3}
          value={productDescriptionUpdate}
          placeholder={"Product Description"}
          onChange={(e) => {
            setProductDescriptionUpdate(e.target.value);
          }}
        />
        <Input
          lable="Product Offer"
          type={"text"}
          value={productOfferUpdate}
          placeholder={"Product Offer"}
          onChange={(e) => {
            setProductOfferUpdate(e.target.value);
          }}
        />
        <label>Product Category</label>
        <select
          className="form-control"
          value={productCategoryUpdate._id}
          onChange={(e) => {
            setProductCategoryUpdate(e.target.value);
          }}
        >
          <option>{productCategoryUpdate.name}</option>
          {createCategoryList(category.categories).map((option) => (
            <option key={option.value} value={option.value}>
              {option.name}
            </option>
          ))}
        </select>
        <br></br>
        <div className="input-group mb-3">
          <label className="input-group-text" htmlFor="inputGroupFile01">
            Upload Product Image
          </label>
          <input
            type="file"
            name="productImageUpdate"
            className="form-control"
            id="inputGroupFile01"
            onChange={handleProductImageUpdate}
          />
        </div>
        <div>
          {typeof productImageUpdate === "string" ? (
            <Row>
              <Col>
                <label style={{ color: "#333" }}>
                  Current Image Name: <br></br> {productImageUpdate}
                </label>
              </Col>
              <Col>
                <label style={{ color: "#333" }}>Current Image Preview:</label>
                <br></br>
                <img
                  style={{ maxWidth: "100px" }}
                  src={generatePublicUrl(productImageUpdate)}
                  alt="Category"
                />
              </Col>
            </Row>
          ) : null}
        </div>
      </NewModal>
    );
  };

  //fuction to delete product. dispatching the deleteproduct() from actions
  const deleteProductData = (pro) => {
    //dispatching the action to delete selected Product
    dispatch(deleteProduct(pro._id));
  };

  //popup modal to delete product
  const renderDeleteProductModal = () => {
    return (
      <NewModal
        modalTitle="Please Confirm!"
        variant="danger"
        clsBtnName="No"
        saveBtnName="Yes"
        addNewItem={() => deleteProductData(currentProduct)}
        show={deleteProductModal}
        handleClose={() => {
          setDeleteProductModal(false);
        }}
      >{`Do you want to delete "${currentProduct.name}" product?`}</NewModal>
    );
  };

  const renderAddProductModal = () => {
    return (
      <NewModal
        modalTitle={"Add New Product"}
        show={show}
        handleClose={handleClose}
        addNewItem={addNewProduct}
        size="lg"
      >
        <Input
          lable="Product Name"
          type={"text"}
          value={productName}
          placeholder={"Product Name"}
          onChange={(e) => {
            setProductName(e.target.value);
          }}
        />
        <Input
          lable="Product Price"
          type={"text"}
          value={productPrice}
          placeholder={"Product Price"}
          onChange={(e) => {
            setProductPrice(e.target.value);
          }}
        />
        <Input
          lable="Product Quantity"
          type={"text"}
          value={productQty}
          placeholder={"Product Quantity"}
          onChange={(e) => {
            setProductQty(e.target.value);
          }}
        />
        <Input
          lable="Product Description"
          as="textarea"
          rows={3}
          value={productDescription}
          placeholder={"Product Description"}
          onChange={(e) => {
            setProductDescription(e.target.value);
          }}
        />
        <Input
          lable="Product Offer"
          type={"text"}
          value={productOffer}
          placeholder={"Product Offer"}
          onChange={(e) => {
            setProductOffer(e.target.value);
          }}
        />
        <label>Product Category</label>
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
        <br></br>
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
      {renderDeleteProductModal()}
      {renderUpdateProductsModal()}
    </Layout>
  );
}

export default Products;
