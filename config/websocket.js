// import openSocket from "socket.io-client";
// const socket = openSocket("http://localhost:1337");

// function addNCollection(cb) {
//   socket.on("new_collection", (res) => cb(null, res.name));
// }

// export { addNCollection };

import io from "socket.io-client";

const STRAPI_BASE_URL = process.env.HEROKU_BASE_URL;
// const STRAPI_BASE_URL = process.env.HEROKU_BASE_TNC;
// const STRAPI_BASE_URL = process.env.STRAPI_LOCAL_BASE_URL;

export const socket = io(STRAPI_BASE_URL);
