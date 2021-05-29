import * as Web3 from "web3";
import { OpenSeaPort, Network } from "opensea-js";

export let web3Provider =
  typeof web3 !== "undefined"
    ? window.web3.currentProvider
    : new Web3.providers.HttpProvider("https://mainnet.infura.io");
const seaport = new OpenSeaPort(web3Provider, {
  networkName: Network.Main,
});

// const fetchAssets = async (tokenAddress, tokenId) => {
//   const asset = await seaport.api.getAsset({
//     tokenAddress: tokenAddress, // string
//     tokenId: tokenId, // string | number | null
//   });
//   return asset;
// };

// const getAssetBalance = async (address, as) => {
//   const balance = await seaport.getAssetBalance({
//     accountAddress: address, // string
//     asset: as, // Asset
//   });
//   return balance;
// };

// export default {
//   fetchAssets,
//   getAssetBalance,
// };

import client from "./openSeaClient";

async function getCollections(owner) {
  return await client.get(`collections?asset_owner=${owner}`);
}

async function getBundles(owner, onSale = false) {
  return client.get(`bundles?owner=${owner}&on_sale=${onSale}`);
}

async function getAssetsByTokenIds(
  tokenIds,
  orderDirection = "desc",
  orderBy = "token_id"
) {
  let query = `assets?&order_by=${orderBy}&order_direction=${orderDirection}&`;

  tokenIds.map((token_id) => {
    return (query += `token_ids=${token_id}&`);
  });

  return await client.get(query);
}

// order direction could be 'desc', 'asc'
// order by could be ['token_id', 'sale_date', 'sale_count', 'visitor_count', 'sale_price', 'total_price']
// Keep in mind that if you are using orderBy if the attribute you are ordering by is not available the reponse will return null
async function getAssetsListByOwner(
  owner,
  orderDirection = "desc",
  orderBy = "token_id"
) {
  return await client.get(
    `assets?owner=${owner}&order_by=${orderBy}&order_direction=${orderDirection}`
  );
}

async function getSingleAsset(accountId, assetId) {
  return await client.get(
    `https://api.opensea.io/api/v1/asset/${accountId}/${assetId}`
  );
}

export default {
  getCollections,
  getBundles,
  getAssetsByTokenIds,
  getAssetsListByOwner,
  getSingleAsset,
};
