import React from "react";
import Header from "../../components/Header";
import CategoryGallery from "../../components/CategoryGallery";
import MyCarousel from "../../components/Carousel";

export default function HomePage(props) {
  return (
    <div>
      <Header></Header>
      <MyCarousel></MyCarousel>
      <h2 className="text-center" style={{ padding: "0 250px 500px 250px" }}>
        About Section
      </h2>
      <h2 className="text-center" style={{ padding: "0 250px 500px 250px" }}>
        Chef Section
      </h2>
      <CategoryGallery></CategoryGallery>
      <h2 className="text-center" style={{ padding: "0 250px 500px 250px" }}>
        Contact Section
      </h2>
      <h2 className="text-center" style={{ padding: "0 250px 250px 250px" }}>
        Footer Section
      </h2>
    </div>
  );
}
