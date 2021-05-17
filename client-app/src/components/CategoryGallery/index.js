import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getAllCategory } from "../../actions";
import { Row, Col, Card, Container } from "react-bootstrap";
import { generatePublicUrl } from "../../urlConfig";
import "./style.css";

export default function CategoryGallery(props) {
  const category = useSelector((state) => state.category);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getAllCategory());
  }, []);

  const renderCategories = (categories) => {
    let myCategories = [];
    for (let category of categories) {
      myCategories.push(
        <Col sm={4} key={category._id}>
          <Card className="text-center" style={{ marginBottom: "15px" }}>
            {category.categoryImages.map((picture) => (
              <Card.Img
                className="imageHolder_img"
                variant="top"
                src={generatePublicUrl(picture.img)}
              />
            ))}

            <Card.Body>
              <Card.Title>{category.name}</Card.Title>
              <Card.Text>{category.description}</Card.Text>
            </Card.Body>
          </Card>
        </Col>
      );
    }

    return myCategories;
  };

  return (
    <div>
      <Container>
        <Row>
          {category.categories.length > 0
            ? renderCategories(category.categories)
            : null}
        </Row>
      </Container>
    </div>
  );
}
