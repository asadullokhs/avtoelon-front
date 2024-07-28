import axios from "axios";

const serverUrl = process.env.REACT_APP_SERVER_URL;

const API = axios.create({ baseURL: serverUrl });

export const getOne = (id) => API.get(`/user/${id}`);

export const updateUser = (id, formDate) => {
    const token = JSON.parse(localStorage.getItem("token"));
    return API.put(`/user/${id}`, formDate , { headers: { token } });
};
  