import React from "react";
import Header from "../../components/Header";
import CategoryGallery from "../../components/CategoryGallery";
import MyCarousel from "../../components/Carousel";
import About from "../../components/About";
import Chef from "../../components/Chef";
import Contact from "../../components/Contact";
import Footer from "../../components/Footer";
import { Container } from "react-bootstrap";

export default function HomePage(props) {
  return (
    <div>
      <Header></Header>
      <MyCarousel></MyCarousel>
      <Container>
        <About></About>
        <Chef></Chef>
        <CategoryGallery></CategoryGallery>
        <Contact></Contact>
      </Container>
      <Footer></Footer>
    </div>
  );
}
