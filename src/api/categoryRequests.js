import axios from "axios";

const serverUrl = process.env.REACT_APP_SERVER_URL;

const API = axios.create({ baseURL: serverUrl });

export const getAll = () => API.get(`/category`);

export const getOne = (id) => API.get(`/category/${id}`);


export const addCategoryAPI = (formData) => {
  const token = JSON.parse(localStorage.getItem("token"));
  return API.post(`/category`,formData, { headers: { token } });
};  
export const deleteCategoryAPI = (id) => {
  const token = JSON.parse(localStorage.getItem("token"));
  return API.delete(`/category/:${id}`, { headers: { token } });
};
export const updateCategoryAPI = (id, formDate) => {
  const token = JSON.parse(localStorage.getItem("token"));
  return API.put(`/category/${id}`, formDate , { headers: { token } });
};

