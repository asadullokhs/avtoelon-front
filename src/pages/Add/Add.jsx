// src/pages/AddCar/AddCar.js
import React, { useRef } from "react";
import "./Add.css";
import { useInfoContext } from "../../context/Context";
import { addCar } from "../../api/carRequests";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

const Add = () => {
  const { categories, currentUser,setHomeReload } = useInfoContext();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    formData.append("author", currentUser._id);

    try {
      toast.loading("Please wait...");
      await addCar(formData);
      toast.dismiss();
      toast.success("Succesfully added");
      e.target.reset();
      setHomeReload(true);
      navigate("/");
    } catch (error) {
      toast.dismiss();
      console.error("Error:", error);
      toast.error("An error occurred while adding the car.");
    }
  };

  return (
    <div className="add-car-container">
      <h2>Add a New Car</h2>
      <form onSubmit={handleSubmit} className="add-car-form">
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
          <label htmlFor="class">Class</label>
          <input type="text" id="class" name="class" required />
        </div>
        <div className="form-group">
          <label htmlFor="location">Location</label>
          <input type="text" id="location" name="location" required />
        </div>
        <div className="form-group">
          <label htmlFor="description">Description</label>
          <textarea id="description" name="description" required></textarea>
        </div>
        <div className="form-group">
          <label htmlFor="image">Image</label>
          <input type="file" id="image" name="image" required />
        </div>
        <div className="form-group">
          <label htmlFor="categoryId">Category</label>
          <select id="categoryId" name="category" required>
            <option id="categoryId">Choose one category...</option>
            {categories.map((category) => (
              <option key={category._id} value={category._id}>
                <img src={category} alt="" />
                {category.title}
              </option>
            ))}
          </select>
        </div>
        <button type="submit" className="submit-btn">
          Add Car
        </button>
      </form>
    </div>
  );
};

export default Add;
