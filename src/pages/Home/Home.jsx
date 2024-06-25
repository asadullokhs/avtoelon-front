import React from "react";
import "./Home.css";
import { useInfoContext } from "../../context/Context";
import CarouselComponent from "../../components/Carousel/Carousel";
import { Link } from "react-router-dom";

const Home = () => {
  const { currentUser, categories } = useInfoContext();

  return (
    <>
      <div className="homepage">
        <section className="hero">
          <CarouselComponent />
        </section>
        <section className="search-bar">
          <input type="text" placeholder="Search for cars..." />
        </section>
        <section className="categories">
          {categories?.length > 0 ? (
            categories.map((categ) => {
              return (
                <Link className="card">
                  <img
                    src={categ.image.url}
                    alt="Card Image"
                    className="card-image"
                  />
                  <div className="card-title">{categ.title}</div>
                </Link>
              );
            })
          ) : (
            <p>Hhhhh</p>
          )}
        </section>
        <section className="featured-cars">
          <h2>Featured Cars</h2>
          <div className="car-list">
            <div className="car-item">
              <img src="https://via.placeholder.com/300x200" alt="Car 1" />
              <div className="car-details">
                <h3>Car Model 1</h3>
                <p>$30,000</p>
              </div>
            </div>
            <div className="car-item">
              <img src="https://via.placeholder.com/300x200" alt="Car 2" />
              <div className="car-details">
                <h3>Car Model 2</h3>
                <p>$40,000</p>
              </div>
            </div>
          </div>
        </section>
        <section className="testimonials">
          <h2>Customer Testimonials</h2>
          <p>"Great service and amazing cars!" - Customer A</p>
          <p>"I love my new car!" - Customer B</p>
        </section>
        <footer className="footer">
          <button>Contact Us</button>
          <button>View Inventory</button>
        </footer>
      </div>
    </>
  );
};

export default Home;
