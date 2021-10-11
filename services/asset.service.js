import axios from "bnb-javascript-sdk-nobroadcast/node_modules/axios";
import { fetch } from "Utils/strapiApi";

const STRAPI_BASE_URL = process.env.HEROKU_BASE_URL;
const apiEndpoint = "/nfts";
/**
 * fetch asset from strapi, return null if not exists
 * @param tokenAddress tokenAddress of asset
 * @param tokenId tokenId of asset
 */
export async function getAsset(tokenAddress, tokenId) {
  console.log("fetcihng data from ...", tokenAddress, tokenId);
  console.log(`${apiEndpoint}?tokenAddress=${tokenAddress}&tokenId=${tokenId}`);
  return fetch(`${apiEndpoint}?tokenAddress=${tokenAddress}&tokenId=${tokenId}`);
}

/**
 * fetch asset from strapi, return null if not exists
 * @param tokenAddress tokenAddress of asset
 * @param tokenId tokenId of asset
 */
export async function updateAsset(id, data) {
  let formData = new FormData();
  formData.append("data", JSON.stringify(data));
  console.log("uploading to strapi...", `${STRAPI_BASE_URL}/nfts/${id}`);
  return axios.put(`${STRAPI_BASE_URL}/nfts/${id}`, formData, {
    headers: {
      "Content-Type": `multipart/form-data`,
    },
  });
}
