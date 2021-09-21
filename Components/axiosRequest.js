import axios from "axios";

const baseURL = process.env.HEROKU_BASE_URL;
// const baseURL = process.env.HEROKU_BASE_TNC;
// const baseURL = process.env.STRAPI_LOCAL_BASE_URL;
const api = axios.create({
  baseURL,
  headers: {
    Accept: "application/json",
    "Content-Type": "application/json",
    "Content-Type": `multipart/form-data`,
  },
});
export default api;
