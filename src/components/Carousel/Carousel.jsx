// CarouselComponent.js
import React from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "./Carousel.css";

const CarouselComponent = () => {
  const settings = {
    dots: true,
    infinite: true,
    speed: 1000,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
    arrows: true,
    nextArrow: <SampleNextArrow />,
    prevArrow: <SamplePrevArrow />,
    appendDots: (dots) => (
      <div
        style={{
          position: "absolute",
          bottom: "20px",
          display: "flex",
          justifyContent: "center",
          width: "100%",
        }}
      >
        <ul style={{ margin: "0px" }}> {dots} </ul>
      </div>
    ),
    customPaging: (i) => (
      <div
        style={{
          width: "10px",
          height: "10px",
          borderRadius: "50%",
          background: "white",
        }}
      ></div>
    ),
  };

  const images = [
    "https://via.placeholder.com/1920x600?text=Special+Offer+1",
    "https://via.placeholder.com/1920x600?text=New+Arrival+2",
    "https://via.placeholder.com/1920x600?text=Special+Offer+3",
    "https://via.placeholder.com/1920x600?text=New+Arrival+4",
  ];

  return (
    <div className="carousel-container">
      <Slider {...settings} className="slider">
        {images.map((url, index) => (
          <div key={index} className="slide">
            <img src={url} alt={`Slide ${index + 1}`} className="slide-image" />
            <div className="slide-caption">
              <h2>Special Offer {index + 1}</h2>
              <p>Discover the latest models and deals.</p>
            </div>
          </div>
        ))}
      </Slider>
    </div>
  );
};

const SampleNextArrow = (props) => {
  const { className, style, onClick } = props;
  return (
    <div
      className={className}
      style={{ ...style, display: "block", right: "30px", zIndex: 1 }}
      onClick={onClick}
    />
  );
};

const SamplePrevArrow = (props) => {
  const { className, style, onClick } = props;
  return (
    <div
      className={className}
      style={{ ...style, display: "block", left: "30px", zIndex: 1 }}
      onClick={onClick}
    />
  );
};

export default CarouselComponent;
