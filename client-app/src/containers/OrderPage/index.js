import React, { useEffect, useState } from "react";
import { Row, Col, Container, Card, Button } from "react-bootstrap";
import Header from "../../components/Header";
import Footer from "../../components/Footer";
import { useDispatch, useSelector } from "react-redux";
import { getOrders, addFeedback } from "../../actions";
import { generatePublicUrl } from "../../urlConfig";
import CurrencyFormat from "react-currency-format";
import { Link } from "react-router-dom";
import NewModal from "../../components/Modal";
import Input from "../../components/Input";
import StarRatings from "react-star-ratings";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function OrderPage(props) {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user);
  const auth = useSelector((state) => state.auth);

  const [feedbackDes, setFeedbackDes] = useState("");
  const [ratingVal, setRatingVal] = useState(0);
  const [currentProduct, setCurrentProduct] = useState("");

  const [show, setShow] = useState(false);

  useEffect(() => {
    dispatch(getOrders());
  }, []);

  console.log(user);

  const addNewFeedback = () => {
    if (feedbackDes === "") {
      alert("Feedback description can't be empty!");
      return;
    }

    if (ratingVal === 0) {
      alert("Rating can't be empty!");
      return;
    }

    const feedbackObj = {
      userId: auth.user._id,
      productId: currentProduct,
      feedback: feedbackDes,
      rating: ratingVal,
    };

    dispatch(addFeedback(feedbackObj));

    setRatingVal(0);
    setFeedbackDes("");
  };

  const handleClose = () => {
    setShow(false);
  };
  const handleShow = () => setShow(true);

  const renderAddFeedbackModal = () => {
    return (
      <NewModal
        show={show}
        handleClose={handleClose}
        action={addNewFeedback}
        modalTitle="Give Rating And Feedback"
        hideFooter={true}
      >
        <Input
          lable="Feedback"
          as={"textarea"}
          rows={3}
          value={feedbackDes}
          placeholder={"Enter Feedback Description"}
          onChange={(e) => {
            setFeedbackDes(e.target.value);
          }}
        />
        <div className="text-center">
          <p>Please Give Your Rating</p>
          <StarRatings
            rating={ratingVal}
            starDimension="25px"
            starSpacing="5px"
            starRatedColor="orange"
            name="rating"
            changeRating={changeRating}
            numberOfStars={5}
          />
        </div>
      </NewModal>
    );
  };

  const changeRating = (newRating, name) => {
    setRatingVal(newRating);
    console.log(ratingVal);
  };

  return (
    <div>
      <Header></Header>
      <ToastContainer />
      <Container
        style={{ marginTop: "120px", minHeight: "calc(100vh - 180px)" }}
      >
        <div style={{ marginBottom: "50px" }} className="text-center">
          <h2>My Orders!</h2>
        </div>
        <div>
          {user.orders && user.orders.length ? (
            <>
              {user.orders.map((order) => {
                return order.items.map((item) => (
                  <Card style={{ width: "100%" }}>
                    <Row>
                      <Col sm={3}>
                        <Card.Img
                          variant="top"
                          src={generatePublicUrl(
                            item.productId.productImages[0].img
                          )}
                        />
                      </Col>
                      <Col sm={9}>
                        <Row>
                          <Col>
                            <Card.Title>{item.productId.name}</Card.Title>
                            <Card.Text>
                              Price:{" "}
                              <CurrencyFormat
                                value={item.payablePrice}
                                displayType={"text"}
                                thousandSeparator={true}
                                prefix={"Rs. "}
                              />{" "}
                            </Card.Text>
                            {item.offer ? (
                              <Card.Text>
                                Offer:{" "}
                                <CurrencyFormat
                                  style={{ color: "red", fontWeight: "bold" }}
                                  value={item.offer}
                                  displayType={"text"}
                                  thousandSeparator={true}
                                  prefix={"Rs. "}
                                />{" "}
                              </Card.Text>
                            ) : null}
                            <Card.Text>
                              Purchased Qty: {item.purchasedQty}
                            </Card.Text>
                          </Col>
                          <Col>
                            <Card.Text>
                              Grand Total:{" "}
                              <CurrencyFormat
                                style={{ color: "green", fontWeight: "bold" }}
                                value={
                                  item.payablePrice * item.purchasedQty -
                                  item.purchasedQty * item.offer
                                }
                                displayType={"text"}
                                thousandSeparator={true}
                                prefix={"Rs. "}
                              />
                            </Card.Text>
                            <Button
                              variant="primary"
                              onClick={() => {
                                setCurrentProduct(item.productId._id);
                                handleShow();
                              }}
                            >
                              Rate &amp; Feedback
                            </Button>
                            <br></br>
                            <Link
                              className="btn btn-success"
                              to={`orderDetails/${order._id}`}
                            >
                              Check Order Status
                            </Link>
                          </Col>
                        </Row>
                        <Card.Body></Card.Body>
                      </Col>
                    </Row>
                  </Card>
                ));
              })}
            </>
          ) : (
            <div className="text-center" style={{ padding: "10vh" }}>
              <div class="alert alert-danger" role="alert">
                <h5>You Have Not Placed Any Orders!!</h5>
              </div>
            </div>
          )}
        </div>
      </Container>
      {renderAddFeedbackModal()}
      <Footer></Footer>
    </div>
  );
}
