import axios from "axios";

const baseURL = process.env.HEROKU_BASE_URL;
// const baseURL = process.env.HEROKU_BASE_TNC;
// const baseURL = process.env.STRAPI_LOCAL_BASE_URL;
const request = axios.create({
  baseURL: baseURL,
  headers: {
    "Content-Type": "application/json",
  },
});

export default request;
