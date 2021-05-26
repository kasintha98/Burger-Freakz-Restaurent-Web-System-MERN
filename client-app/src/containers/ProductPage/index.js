import React, { useEffect, useState } from "react";
import Header from "../../components/Header";
import { Row, Col, Card, Container, Carousel } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { getSpecificProductBySlug } from "../../actions";

export default function ProductPage(props) {
  const { product } = useSelector((state) => state.product);
  const dispatch = useDispatch();

  useEffect(() => {
    const { match } = props;

    dispatch(getSpecificProductBySlug(match.params.slug));
  }, []);

  const renderProduct = (product) => {};

  return (
    <div>
      <Header></Header>
      <Container style={{ marginTop: "80px" }}>{product.name}</Container>
    </div>
  );
}
