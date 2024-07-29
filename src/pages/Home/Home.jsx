import React from "react";
import "./Home.css";
import { useInfoContext } from "../../context/Context";
import CarouselComponent from "../../components/Carousel/Carousel";
import { Link } from "react-router-dom";
import Loading from "../../components/Loading/Loading";

const Home = () => {
  const { categories, cars } = useInfoContext();
  const sortCars = cars
    .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
    .slice(0, 4);


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
            <div className="d-flex">
          <Loading/>
          <Loading/>
          <Loading/>
          <Loading/>
          </div>
          )}
        </section>
        <section className="featured-cars">
          <h2>Recent cars</h2>
          <div className="car-list">
            {cars.length > 0 ? (
              sortCars.map((car) => {
                return (
                  <div key={car._id}  className="car-item">
                    <img src={car.image.url} alt="Car 1" />
                    <div className="car-details">
                      <h3>{car.title}</h3>
                      <p>{car.price + "$"}</p>
                    </div>
                  </div>
                );
              })
            ) : (
              <div className="d-flex">
              <Loading/>
              <Loading/>
              <Loading/>
              <Loading/>
              </div>
            )}
          </div>
        </section>
      </div>
    </>
  );
};

export default Home;
