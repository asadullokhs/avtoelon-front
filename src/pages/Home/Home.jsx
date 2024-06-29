import React from "react";
import "./Home.css";
import { useInfoContext } from "../../context/Context";
import CarouselComponent from "../../components/Carousel/Carousel";
import { Link } from "react-router-dom";

const Home = () => {
  const { currentUser, categories, cars } = useInfoContext();

  const sortCars = cars.slice(cars.length - 4, cars.length).reverse();

  console.log(cars);
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
            <p>There's no categories</p>
          )}
        </section>
        <section className="featured-cars">
          <h2>Recent cars</h2>
          <div className="car-list">
            {cars.length > 0 ? (
              sortCars.map((car) => {
                return (
                  <div className="car-item">
                    <img src={car.image.url} alt="Car 1" />
                    <div className="car-details">
                      <h3>{car.title}</h3>
                      <p>{car.price + "$"}</p>
                    </div>
                  </div>
                );
              })
            ) : (
              <p>Pashol naxuy</p>
            )}
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
