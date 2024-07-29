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

  let [categories, setCategories] = useState([]);
  let [cars, setCars] = useState([]);
  const [homeReaload, setHomeReload] = useState(0);

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
  }, [currentUser, homeReaload]);


  const value = {
    currentUser,
    setCurrentUser,
    exit,
    categories,
    setCategories,
    cars,
    setCars,
    serverUrl,
    homeReaload,
    setHomeReload
  };

  return (
    <InfoContext.Provider value={value}>
      <InfoContext.Consumer>{() => children}</InfoContext.Consumer>
    </InfoContext.Provider>
  );
};
