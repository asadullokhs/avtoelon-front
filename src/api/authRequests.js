import axios from "axios";

const serverUrl = process.env.REACT_APP_SERVER_URL;

const API = axios.create({ baseURL: serverUrl });

export const register = (formData) => API.post(`/user/register`, formData);
export const login = (formData) => API.post(`/user/login`, formData);
