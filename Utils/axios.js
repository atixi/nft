import axios from 'axios';
const baseURL = process.env.BASE_URL;
console.log(baseURL)
const request = axios.create({
    baseURL: "http://localhost:1337",
    headers: {
        'Content-Type': 'application/json',
    },
});

export default request;