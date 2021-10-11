import { fetch } from "Utils/strapiApi";

const apiEndpoint = "/nfts";

export function getExplores(start, limit) {
  return fetch(`${apiEndpoint}?_start=${start}&_limit=${limit}`);
}
/**
 * filter data function by combobox value
 * @param query query that includ the condition of filter
 * @param start from wich row start to filter
 * @param limit how maney row should filter
 */
export function queryExplore(query, start, limit) {
  console.log(
    "serach query in serivce is ",
    `${apiEndpoint}?_start=${start}&_limit=${limit}&${query}`
  );
  return fetch(`${apiEndpoint}?_start=${start}&_limit=${limit}&${query}`);
}

/**
 * filter data function by combobox value
 * @param query query that search by name
 */
export function querySearch(query, start, limit) {
  console.log(
    "serach filter data in serivce is ",
    `${apiEndpoint}?_start=${start}&_limit=${limit}&${query}`
  );
  return fetch(`${apiEndpoint}?_start=${start}&_limit=${limit}&${query}`);
}
