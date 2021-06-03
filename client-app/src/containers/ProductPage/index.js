import React, { useEffect, useState } from "react";
import Header from "../../components/Header";
import Footer from "../../components/Footer";
import { Row, Col, Container, Button } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { getSpecificProductBySlug } from "../../actions";
import { generatePublicUrl } from "../../urlConfig";
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { Carousel } from "react-responsive-carousel";
import { addToCart } from "../../actions";
import "./style.css";

export default function ProductPage(props) {
  const [isLoading, setLoading] = useState(true);

  const { product } = useSelector((state) => state.product);
  const dispatch = useDispatch();

  useEffect(() => {
    const { match } = props;

    dispatch(getSpecificProductBySlug(match.params.slug));

    setLoading(false);
  }, []);

  console.log(product);

  if (isLoading) {
    return <div className="spinner-border text-primary" role="status"></div>;
  }

  const renderProducts = (products) => {
    let images = product.productImages;

    //checking if the images are sent to backend or not. Bcz it is take time to send images
    while (images === undefined) {
      return <div className="spinner-border text-primary" role="status"></div>;
    }

    return (
      <>
        <div className="text-center">
          <h2>{product.name}</h2>
        </div>
        <br></br>
        <Row>
          <Col sm={4}>
            <Carousel>
              {images.map((picture) => (
                <div>
                  <img src={generatePublicUrl(picture.img)} alt="" />
                </div>
              ))}
            </Carousel>
            <br></br>
            <h4>Price: Rs. {product.price}</h4>
            <br></br>
            <h4>Rating: 5.0</h4>
            <br></br>
            <h4>Description: </h4>
            <p>{product.description}</p>
          </Col>
          <Col sm={5}>
            <div className="text-center">
              <h4>Feedbacks</h4>
            </div>
          </Col>
          <Col sm={3}>
            <h4>Quantity: </h4>
            <br></br>
            <h4>Delivery Charges: </h4>
            <br></br>
            <h4>Total: </h4>
            <br></br>
            <br></br>
            <h4>
              Offer:{" "}
              {product.offer > 0
                ? "Rs. " + product.offer + " Off!"
                : "No Offers Available"}
            </h4>
            <br></br>
            <Button
              style={{ width: "100%" }}
              variant="primary"
              onClick={() => {
                const { _id, name, price } = product;
                const img = product.productImages[0].img;
                dispatch(addToCart({ _id, name, price, img }));
                props.history.push("/cart");
              }}
            >
              Add To Cart
            </Button>
          </Col>
        </Row>
      </>
    );
  };

  if (product.loading) {
    return <div className="spinner-border text-primary" role="status"></div>;
  }

  return (
    <div>
      <Header></Header>
      <Container style={{ marginTop: "120px" }}>
        {renderProducts(product)}
      </Container>
      <Footer></Footer>
    </div>
  );
}
