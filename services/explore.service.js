import { fetch } from "Utils/strapiApi";

const apiEndpoint = "/nfts";

export function getExplores(start, limit) {
  return fetch(`${apiEndpoint}?_start=${start}&_limit=${limit}`);
}
export function queryExplore(query, start, limit) {
  console.log(
    "serach query in serivce is ",
    `${apiEndpoint}?_start=${start}&_limit=${limit}&${query}`
  );
  return fetch(`${apiEndpoint}?_start=${start}&_limit=${limit}&${query}`);
}
