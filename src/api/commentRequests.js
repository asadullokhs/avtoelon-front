import axios from "axios";

const serverUrl = process.env.REACT_APP_SERVER_URL;

const API = axios.create({ baseURL: serverUrl });

export const addComment = (formData) => {
    const token = JSON.parse(localStorage.getItem("token"));
    return API.post(`/comment`,formData, { headers: { token } });
};  

export const getOne = (id) => API.get(`/comment/${id}`);

export const deleteComment = (id) => {
  const token = JSON.parse(localStorage.getItem("token"));
  return API.delete(`/comment/${id}`, { headers: { token } });
};

export const updateComment = (id, formDate) => {
    const token = JSON.parse(localStorage.getItem("token"));
    return API.put(`/comment/${id}`, formDate , { headers: { token } });
};
