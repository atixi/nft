import { fetch } from "Utils/strapiApi";

const apiEndpoint = "/nfts";

export function getExplores(start, limit) {
  return fetch(`${apiEndpoint}?_start=${start}&_limit=${limit}`);
}
export function getExploreByFilter(start, limit, category, onSale, hasOffer) {
  return fetch(
    `${apiEndpoint}?_start=${start}&_limit=${limit}&categories.id=${category}&onSale=${onSale}&hasOffer=${hasOffer}`
  );
}
