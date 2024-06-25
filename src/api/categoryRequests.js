import axios from "axios";

const serverUrl = process.env.REACT_APP_SERVER_URL;

const API = axios.create({ baseURL: serverUrl });

export const getAll = () => API.get(`/category`);

export const getOne = (id) => API.post(`/category/${id}`);

export const deleteCategory = (id) => {
  const token = JSON.parse(localStorage.getItem("token"));
  return API.delete(`/category/:${id}`, { headers: { token } });
};
