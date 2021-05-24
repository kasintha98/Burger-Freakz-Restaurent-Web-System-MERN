import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getProductsBySlug } from "../../actions";
import Header from "../../components/Header";
import { Row, Col, Card, Container, Carousel } from "react-bootstrap";
import { Link } from "react-router-dom";
import { generatePublicUrl } from "../../urlConfig";
import "./style.css";

export default function ProductListPage(props) {
  const product = useSelector((state) => state.product);
  const dispatch = useDispatch();

  useEffect(() => {
    const { match } = props;

    dispatch(getProductsBySlug(match.params.slug));
  }, []);

  //have to show all the details in the card (rating, price, etc...)

  const renderProducts = (products) => {
    let myProducts = [];
    for (let product of products) {
      myProducts.push(
        <Col sm={4} key={product._id}>
          <Link to={`/${product.slug}`}>
            <Card className="text-center" style={{ marginBottom: "15px" }}>
              <Carousel>
                {product.productImages.map((picture) => (
                  <Carousel.Item>
                    <div className="productImageContainer">
                      <Card.Img
                        className="imageHolder_img"
                        variant="top"
                        src={generatePublicUrl(picture.img)}
                        key={product._id}
                      />
                    </div>
                  </Carousel.Item>
                ))}
              </Carousel>
              <Card.Body>
                <Card.Title>{product.name}</Card.Title>
                <Card.Text>{product.description}</Card.Text>
              </Card.Body>
            </Card>
          </Link>
        </Col>
      );
    }

    return myProducts;
  };

  return (
    <div>
      <Header></Header>
      <Container style={{ marginTop: "80px" }}>
        <h2 className="text-center">{props.match.params.slug}</h2>
        <Row>
          {product.products.length > 0 ? (
            renderProducts(product.products)
          ) : (
            <h3 className="text-center">
              No Products Available In This Category!
            </h3>
          )}
        </Row>
      </Container>
    </div>
  );
}
