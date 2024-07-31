import React, { useEffect, useRef } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getOne, updateCar, deleteCar } from "../../api/carRequests";
import { toast } from "react-toastify";
import Loading from "../../components/Loading/Loading";
import "./CarEditPage.css";
import { useInfoContext } from "../../context/Context";

const CarEditPage = () => {
  const { id } = useParams();
  const {deleteCarCon} = useInfoContext();
  const navigate = useNavigate();
  const formRef = useRef(null);

  useEffect(() => {
    const fetchCar = async () => {
      try {
        const response = await getOne(id);
        const carData = response.data.car[0];
        if (formRef.current) {
          formRef.current.title.value = carData.title;
          formRef.current.year.value = carData.year;
          formRef.current.price.value = carData.price;
          formRef.current.location.value = carData.location;
          formRef.current.description.value = carData.description;
          formRef.current.currentImage.src = carData.image?.url || "";
        }
      } catch (error) {
        console.error("Error fetching car:", error);
        toast.error("Failed to load car data.");
      }
    };

    fetchCar();
  }, [id]);

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData(formRef.current);

    try {
      await updateCar(id, formData);
      toast.success("Car updated successfully!");
      navigate(`/car/${id}`);
    } catch (error) {
      console.error("Error updating car:", error);
      toast.error("Failed to update car.");
    }
  };

  const handleDeleteCar = async () => {
    if (window.confirm("Are you sure you want to delete this car?")) {
      try {
        await deleteCar(id);
        toast.success("Car deleted successfully!");
        navigate("/");
        deleteCarCon(id);
      } catch (error) {
        console.error("Error deleting car:", error);
        toast.error("Failed to delete car.");
      }
    }
  };

  return (
    <div className="car-edit-page">
      <h2>Edit Car</h2>
     {formRef ? <form ref={formRef} onSubmit={handleFormSubmit} className="car-edit-form">
        <div className="form-group">
          <label htmlFor="title">Title</label>
          <input type="text" id="title" name="title" required />
        </div>
        <div className="form-group">
          <label htmlFor="year">Year</label>
          <input type="number" id="year" name="year" required />
        </div>
        <div className="form-group">
          <label htmlFor="price">Price</label>
          <input type="number" id="price" name="price" required />
        </div>
        <div className="form-group">
          <label htmlFor="location">Location</label>
          <input type="text" id="location" name="location" required />
        </div>
        <div className="form-group">
          <label htmlFor="description">Description</label>
          <textarea id="description" name="description" required />
        </div>
        <div className="form-group">
          <label htmlFor="currentImage">Current Image</label>
          <img id="currentImage" alt="Current car"className="current-image" />
        </div>
        <div className="form-group">
          <label htmlFor="newImage">New Image</label>
          <input type="file" id="newImage" name="image" accept="image/*" />
        </div>
        <div className="form-actions">
          <button type="submit" className="save-button">
            Save Changes
          </button>
          <button
            type="button"
            className="delete-button"
            onClick={handleDeleteCar}
          >
            Delete Car
          </button>
        </div>
      </form> : <Loading/>}
    </div>
  );
};

export default CarEditPage;
