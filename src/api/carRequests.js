import axios from "axios";

const serverUrl = process.env.REACT_APP_SERVER_URL;

const API = axios.create({ baseURL: serverUrl });

export const getAllCars = () => API.get(`/car`);

export const getOne = (id) => API.post(`/car/${id}`);

export const deleteCar = (id) => {
  const token = JSON.parse(localStorage.getItem("token"));
  return API.delete(`/car/:${id}`, { headers: { token } });
};
