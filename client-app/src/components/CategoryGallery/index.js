import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getAllCategory } from "../../actions";
import { Row, Col, Card, Container } from "react-bootstrap";
import { generatePublicUrl } from "../../urlConfig";
import { Link } from "react-router-dom";
import "./style.css";

export default function CategoryGallery(props) {
  const category = useSelector((state) => state.category);
  const dispatch = useDispatch();

  //calling the action to get categories
  useEffect(() => {
    dispatch(getAllCategory());
  }, []);

  const renderCategories = (categories) => {
    let myCategories = [];
    for (let category of categories) {
      myCategories.push(
        <Col sm={4} key={category._id}>
          <Link to={`/category/${category.slug}`}>
            <Card className="text-center" style={{ marginBottom: "15px" }}>
              {category.categoryImages.map((picture) => (
                <Card.Img
                  className="imageHolder_img"
                  variant="top"
                  src={generatePublicUrl(picture.img)}
                  key={category._id}
                />
              ))}

              <Card.Body>
                <Card.Title>{category.name}</Card.Title>
                <Card.Text>{category.description}</Card.Text>
              </Card.Body>
            </Card>
          </Link>
        </Col>
      );
    }

    return myCategories;
  };

  return (
    <div>
      <Container>
        <h2 className="text-center">
          <br></br>
          <br></br>
          Our Menu
          <br></br>
          <br></br>
        </h2>
        <Row>
          {category.categories.length > 0
            ? renderCategories(category.categories)
            : null}
        </Row>
      </Container>
    </div>
  );
}
