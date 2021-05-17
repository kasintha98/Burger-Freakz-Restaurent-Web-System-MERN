import React from "react";
import Header from "../../components/Header";
import CategoryGallery from "../../components/CategoryGallery";
import MyCarousel from "../../components/Carousel";

export default function HomePage(props) {
  return (
    <div>
      <Header></Header>
      <MyCarousel></MyCarousel>
      <CategoryGallery></CategoryGallery>
    </div>
  );
}
