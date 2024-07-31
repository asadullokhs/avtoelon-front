// InfoContext.js
import { createContext, useContext, useEffect, useState } from "react";
import { getAll } from "../api/categoryRequests";
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
    deleteCarCon
  };

  return (
    <InfoContext.Provider value={value}>
      <InfoContext.Consumer>{() => children}</InfoContext.Consumer>
    </InfoContext.Provider>
  );
};
