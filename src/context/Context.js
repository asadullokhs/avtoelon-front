// InfoContext.js
import { createContext, useContext, useEffect, useState } from "react";
import { getAll, addCategoryAPI, deleteCategoryAPI, updateCategoryAPI } from "../api/categoryRequests";
import { getAllCars } from "../api/carRequests";

const InfoContext = createContext();

export const useInfoContext = () => useContext(InfoContext);

export const InfoProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(
    JSON.parse(localStorage.getItem("profile") || null)
  );

  const serverUrl = process.env.REACT_APP_SERVER_URL;

  const exit = () => {
    localStorage.clear();
    setCurrentUser(null);
  };

  const [categories, setCategories] = useState([]);
  const [cars, setCars] = useState([]);
  const [homeReload, setHomeReload] = useState(false);

  useEffect(() => {
    const getAllCategory = async () => {
      const res = await getAll();
      setCategories(res?.data.category);
    };

    const getCars = async () => {
      const res = await getAllCars();
      setCars(res?.data.cars);
    };

    getAllCategory();
    getCars();
  }, [currentUser, homeReload]);


  const deleteCategory = async (categoryId) => {
    try {
      await deleteCategoryAPI(categoryId);
      setCategories(prevCategories =>
        prevCategories.filter(category => category._id !== categoryId)
      );
    } catch (error) {
      console.error("Error deleting category:", error);
    }
  };

  const updateCategory = async (categoryId, updatedData) => {
    try {
      const response = await updateCategoryAPI(categoryId, updatedData);
      setCategories(prevCategories =>
        prevCategories.map(category =>
          category._id === categoryId ? response.data.updatedCategory : category
        )
      );
    } catch (error) {
      console.error("Error updating category:", error);
    }
  };

  const addCategory = async (newCategoryData) => {
    try {
      const response = await addCategoryAPI(newCategoryData);
      setCategories(prevCategories => [...prevCategories, response.data.newCategory]);
    } catch (error) {
      console.error("Error adding category:", error);
    }
  };

  const deleteCarCon = (carId) => {
    setCars(prevCars => prevCars.filter(car => car._id !== carId));
    setHomeReload(prev => !prev);
  };

  const value = {
    currentUser,
    setCurrentUser,
    exit,
    categories,
    setCategories,
    cars,
    setCars,
    serverUrl,
    homeReload,
    setHomeReload,
    deleteCarCon,
    updateCategory,
    deleteCategory,
    addCategory,
  };

  return (
    <InfoContext.Provider value={value}>
      <InfoContext.Consumer>{() => children}</InfoContext.Consumer>
    </InfoContext.Provider>
  );
};
