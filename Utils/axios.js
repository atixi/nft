import axios from "axios";
const baseURL = "http://localhost:1337";
const request = axios.create({
  // url will be updated and will be received from .env file
  baseURL: baseURL,
  headers: {
    "Content-Type": "application/json",
  },
});

export default request;
