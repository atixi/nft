import * as Web3 from "web3";
import { OpenSeaPort, Network } from "opensea-js";

import client from "./openSeaClient";

const provider = new Web3.providers.HttpProvider("https://mainnet.infura.io");

const seaport = new OpenSeaPort(provider, {
  networkName: Network.Main,
});

async function getAccount() {
  let error = null;
  let accountAddress = null;

  const web3 = await seaport.web3;

  const result = await web3.eth.getAccounts((e, res) => {
    console.log(res);
    // accountAddress = res[0];
  });

  return { accountAddress, error };
}

async function getCollections(owner) {
  return await client.get(`collections?asset_owner=${owner}`);
}

async function getAssetsInCollection(slug) {
  return client.get(`assets?collection=${slug}`);
}

async function getCollectionsDetailsBySlugs(slugs) {
  let urls = [];
  for (let i = 0; i < slugs.length; i++) {
    urls.push(`https://api.opensea.io/api/v1/assets?collection=${slugs[i]}`);
  }
  try {
    var data = await Promise.all(
      urls.map((url) => fetch(url).then((response) => response.json()))
    );
    return data;
  } catch (error) {
    console.log(error);

    throw error;
  }
}
//topsellers
async function getAssets() {
  return await client.get(`assets?limit=50`);
}
async function getBundles(owner, onSale = false) {
  return client.get(`bundles?owner=${owner}&on_sale=${onSale}&limit=50`);
}

async function getAssetsByOwner() {}
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
    `assets?owner=${owner}&order_direction=${orderDirection}&order_by=${orderBy}`
  );
}

async function getSingleAsset(accountId, assetId) {
  return await client.get(
    `https://api.opensea.io/api/v1/asset/${accountId}/${assetId}`
  );
}

async function getTopSellerDatails(address) {
  let assets = [];
  let collections = [];
  const assetResult = await client.get(`assets?owner=${address}&limit=50`);
  if (assetResult.ok) {
    assets = assetResult.data?.assets;
  }

  console.log(assets);
}
// this is helper method to reproduct the topseller data (changes are required)
function getTopSellers(assets) {
  let topSellers = [];
  const groupByCreator = _.groupBy(assets, "creator[user[username]]");
  const keys = Object.keys(groupByCreator);

  keys.map((item) =>
    topSellers.push({
      talent: item,
      profile_img_url: groupByCreator[item][0].creator?.profile_img_url,
      number_of_assets: groupByCreator[item].length,
      created: groupByCreator[item],
      address: groupByCreator[item][0].creator?.address,
    })
  );
  topSellers = [...topSellers].filter(
    (item) => item.talent !== "undefined" && item.talent !== "null"
  );

  return topSellers;
}

// hellper functions

export default {
  getAccount,
  getCollections,
  getBundles,
  getAssetsByTokenIds,
  getAssetsListByOwner,
  getSingleAsset,
  getAssets,
  getTopSellers,
  getTopSellerDatails,
  getAssetsInCollection,
  getCollectionsDetailsBySlugs,
};
