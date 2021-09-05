import React, { useEffect, useState } from "react";
import Header from "../../components/Header";
import Footer from "../../components/Footer";
import { Row, Col, Container, Button, Alert } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { getSpecificProductBySlug, getFeedbacks } from "../../actions";
import { generatePublicUrl } from "../../urlConfig";
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { Carousel } from "react-responsive-carousel";
import { addToCart } from "../../actions";
import "./style.css";
import CurrencyFormat from "react-currency-format";
import StarRatings from "react-star-ratings";
import Feedback from "../../components/Feedback";

export default function ProductPage(props) {
  const [isLoading, setLoading] = useState(true);
  const [qtyInput, setQtyInput] = useState(1);

  const { product } = useSelector((state) => state.product);
  const { feedback } = useSelector((state) => state.feedback);
  const dispatch = useDispatch();

  let allRate = 0;

  useEffect(() => {
    const { match } = props;

    dispatch(getSpecificProductBySlug(match.params.slug));

    setLoading(false);
  }, []);

  useEffect(() => {
    if (product._id !== undefined) {
      dispatch(getFeedbacks(product._id));
    }
  }, [product._id]);

  console.log(product._id);
  console.log(feedback);

  if (isLoading) {
    return <div className="spinner-border text-primary" role="status"></div>;
  }

  const renderProducts = (products) => {
    let images = product.productImages;

    //checking if the images are sent to backend or not. Bcz it is take time to send images
    while (images === undefined) {
      return <div className="spinner-border text-primary" role="status"></div>;
    }

    const onQuantityIncrement = () => {
      setQtyInput(qtyInput + 1);
      console.log(qtyInput);
    };

    const onQuantityDecrement = () => {
      if (qtyInput <= 1) {
        return;
      }

      setQtyInput(qtyInput - 1);
      console.log(qtyInput);
    };

    const calcOverallRate = () => {
      let ratings = [];
      if (feedback) {
        for (let i = 0; i < feedback.length; i++) {
          ratings.push(feedback[i].rating);
        }
        let rateO = ratings.reduce((a, b) => a + b, 0) / ratings.length;
        var rate = Math.round(rateO * 10) / 10;
        console.log(rate);
        allRate = rate;
        return rate;
      } else {
        return 0;
      }
    };

    return (
      <>
        {console.log(calcOverallRate())}
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
            <h4 style={{ color: "green", fontWeight: "bold" }}>
              Price:{" "}
              <CurrencyFormat
                value={product.price}
                displayType={"text"}
                thousandSeparator={true}
                prefix={"Rs. "}
                suffix={".00"}
              />
            </h4>
            <br></br>
            <h4>
              Rating:{" "}
              <StarRatings
                rating={allRate ? allRate : 0}
                starDimension="25px"
                starSpacing="5px"
                starRatedColor="orange"
              />{" "}
              {`(${feedback.length})`}
            </h4>
            <br></br>
            <h4>Description: </h4>
            <p>{product.description}</p>
          </Col>
          <Col sm={5}>
            <div className="text-center">
              <h4>Feedbacks</h4>
            </div>
            {feedback.length > 0 ? (
              <Feedback feedbacks={feedback}></Feedback>
            ) : (
              <Alert variant={"info"}>No Feedbacks Yet!</Alert>
            )}
          </Col>
          <Col sm={3}>
            <h4>
              Quantity:
              <br></br>
              <br></br>
              <div className="input-group mx-auto mb-2">
                <span className="input-group-text">
                  <button onClick={onQuantityDecrement} class="btn btn-primary">
                    <i className="fa fa-minus"></i>
                  </button>
                </span>
                <input
                  className="form-control"
                  value={qtyInput}
                  style={{ maxWidth: "50px", height: "55px" }}
                />
                <span className="input-group-text">
                  <button onClick={onQuantityIncrement} class="btn btn-primary">
                    <i className="fa fa-plus"></i>
                  </button>
                </span>
              </div>
            </h4>
            <br></br>
            <h4>
              Delivery Charges:
              <br></br>
              <br></br>
              <CurrencyFormat
                value={150}
                displayType={"text"}
                thousandSeparator={true}
                prefix={"Rs. "}
                suffix={".00"}
              />
            </h4>
            <br></br>
            <h4>
              Total:
              <br></br>
              <br></br>
              <CurrencyFormat
                value={product.price * qtyInput + 150}
                displayType={"text"}
                thousandSeparator={true}
                prefix={"Rs. "}
                suffix={".00"}
              />
            </h4>
            <br></br>
            <h4 style={{ color: "red", fontWeight: "bold" }}>
              Offer:{" "}
              {product.offer > 0 ? (
                <div>
                  <br></br>
                  <CurrencyFormat
                    value={product.offer}
                    displayType={"text"}
                    thousandSeparator={true}
                    prefix={"Rs. "}
                    suffix={".00"}
                  />{" "}
                  Off!
                </div>
              ) : (
                "No Offers Available"
              )}
            </h4>
            <br></br>
            <h4 style={{ color: "green", fontWeight: "bold" }}>
              Grand Total:
              <br></br>
              <br></br>
              {}
              <CurrencyFormat
                value={
                  Number(product.price) * Number(qtyInput) +
                  Number(150) -
                  Number(product.offer) * Number(qtyInput)
                }
                displayType={"text"}
                thousandSeparator={true}
                prefix={"Rs. "}
                suffix={".00"}
              />
            </h4>
            <br></br>

            <Button
              style={{ width: "100%" }}
              variant="primary"
              onClick={() => {
                const { _id, name, price, offer } = product;
                const img = product.productImages[0].img;
                dispatch(addToCart({ _id, name, price, img, offer }, qtyInput));
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
