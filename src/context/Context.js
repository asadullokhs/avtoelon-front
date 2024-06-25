import { createContext, useContext, useEffect, useState } from "react";
import { getAll } from "../api/categoryRequests";

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

  useEffect(() => {
    const getAllCategory = async () => {
      const res = await getAll();
      setCategories(res?.data.category);
    };

    getAllCategory();
  }, [currentUser]);

  const value = {
    currentUser,
    setCurrentUser,
    exit,
    categories,
    setCategories,
    serverUrl,
  };

  return (
    <InfoContext.Provider value={value}>
      <InfoContext.Consumer>{() => children}</InfoContext.Consumer>
    </InfoContext.Provider>
  );
};
