import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';

import Loading from '../../components/Loading/Loading';
import './CategoryPage.css';
import rasm from "../../images/360_F_517798849_WuXhHTpg2djTbfNf0FQAjzFEoluHpnct.jpg"
import { getOne } from '../../api/categoryRequests';

const CategoryPage = () => {
  const { id } = useParams();
  const [category, setCategory] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCategory = async () => {
      try {
        const response = await getOne(id);
        setCategory(response.data.category[0]);
      } catch (error) {
        console.error('Error fetching category:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchCategory();
  }, [id, getOne]);

  if (loading) {
    return (
      <div className="loading-container">
        <Loading />
        <Loading />
        <Loading />
        <Loading />
      </div>
    );
  }

  if (!category) {
    return <div>Category not found</div>;
  }


  return (
    <div className="category-page">
      <div className="category-banner">
        <img src={category.image.url} alt={category.title} className="category-banner-image" />
        <h1 className="category-banner-title">{category.title}</h1>
      </div>
      <div className="category-car-list">
        {category?.cars.length > 0 ? (
          category?.cars.map(car => (
            <Link style={{textDecoration:"none"}} to={`/car/${car._id}`} key={car._id} className="car-card">
              <div className="car-image-wrapper">
                <img src={car.image.url} alt={car.title} className="car-image" />
              </div>
              <div className="car-info">
                <h3 className="car-title_set">{car.title}</h3>
                <p className="car-price_set">{car.price + "$"}</p>
                <p className="car-year_set">{car.year}</p>
                <p className="car-location_set">{car.location}</p>
                <div className="car-author">
                  <img src={car?.author?.avatar?.url ? car?.author?.avatar?.url : rasm} alt={`${car.author.firstname} ${car.author.lastname}`} className="car-author-avatar" />
                  <div className="car-author-info">
                    <p>{car.author.firstname} {car.author.lastname}</p>
                    <p>{car.author.email}</p>
                  </div>
                </div>
              </div>
            </Link>
          ))
        ) : (
          <div className="loading-container">
            <Loading />
            <Loading />
            <Loading />
            <Loading />
          </div>
        )}
      </div>
    </div>
  );
};

export default CategoryPage;
