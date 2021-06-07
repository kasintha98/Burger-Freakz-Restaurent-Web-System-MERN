import React from "react";
import Header from "../../components/Header";
import CategoryGallery from "../../components/CategoryGallery";
import MyCarousel from "../../components/Carousel";
import About from "../../components/About";
import Chef from "../../components/Chef";
import Contact from "../../components/Contact";
import Footer from "../../components/Footer";
import { Container } from "react-bootstrap";
import { ScrollingProvider, Section } from "react-scroll-section";

export default function HomePage(props) {
  return (
    <div>
      <ScrollingProvider>
        <Header></Header>
        <Section id="home">
          <MyCarousel></MyCarousel>
        </Section>
        <Container>
          <Section id="about">
            <About></About>
          </Section>
          <Section id="chef">
            <Chef></Chef>
          </Section>
          <Section id="menu">
            <CategoryGallery></CategoryGallery>
          </Section>
          <Section id="contact">
            <Contact></Contact>
          </Section>
        </Container>
        <Footer></Footer>
      </ScrollingProvider>
    </div>
  );
}
