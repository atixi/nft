import * as Web3 from "web3";
import { OpenSeaPort, Network } from "opensea-js";
import client from "./openSeaClient";
import _, { reject } from "lodash";
const provider = new Web3.providers.HttpProvider("https://mainnet.infura.io");
const seaport = new OpenSeaPort(provider, {
  networkName: Network.Main,
  // apiKey: "7ca37bed6f77481eb889a45bc8520e6c",
});
async function getAccount() {
  let error = null;
  let accountAddress = null;
  const web3 = await seaport.web3;
  const result = await web3.eth.getAccounts((e, res) => {
    // accountAddress = res[0];
  });
  return { accountAddress, error };
}
/// handled and checked functions //////////////////////////////////////////////////////////////////////
async function getBundles() {
  return new Promise(async (resolve, reject) => {
    try {
      const { bundles } = await seaport.api.getBundles({
        on_sale: true,
        limit: 50,
      });
      resolve(bundles);
    } catch (e) {
      reject(e);
    }
  });
}
const getLiveAuctions = () => {
  return new Promise(async (resolve, reject) => {
    try {
      const { orders } = await seaport.api.getOrders({
        bundled: false,
        saleKind: 1,
        is_expired: false,
        limit: 50,
        on_sale: true,
      });
      resolve(orders);
    } catch (e) {
      reject(e);
    }
  });
};
const getCollections = async () => {
  return new Promise(async (resolve, reject) => {
    try {
      const { assets } = await seaport.api.getAssets({
        limit: 50,
      });
      resolve(assets);
    } catch (e) {
      reject(e);
    }
  });
};
const getExplores = async () => {
  return new Promise(async (resolve, reject) => {
    try {
      const { data } = await client.get("assets?limit=50");
      resolve(data?.assets);
    } catch (e) {
      reject(e);
    }
  });
};
const getTopSellers = async () => {
  return new Promise(async (resolve, reject) => {
    try {
      const { orders } = await seaport.api.getOrders({
        bundled: false,
        is_expired: false,
        sale_kind: 1,
        include_invalid: false,
        limit: 50,
      });
      resolve(orders);
    } catch (e) {
      reject(e);
    }
  });
};
// not checket functions
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
async function getAssets(onSale = true) {
  return await client.get(`assets?on_sale=${onSale}&limit=50`);
}
async function getAssetDetails(tokenAddress, tokenId) {
  const asset = await seaport.api.getAsset({
    tokenAddress, // string
    tokenId, // string | number | null
  });
  const { orders } = await seaport.api.getOrders({
    asset_contract_address: asset.assetContract?.address,
    token_id: tokenId,
  });
  return { asset, orders };
}
async function getBundlesByOwner(owner, onSale = false) {
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
// hellper functions
// this is helper method to reproduct the topseller data (changes are required)
function getTopSellersDatails(assets) {
  let topSellers = [];
  const groupByCreator = _.groupBy(assets, "makerAccount[user[username]]");
  const keys = Object.keys(groupByCreator);
  keys.map((item) =>
    topSellers.push({
      talent: item,
      profile_img_url: groupByCreator[item][0].makerAccount?.profile_img_url,
      number_of_assets: groupByCreator[item].length,
      created: groupByCreator[item],
      totalSell: _.sum(groupByCreator[item].basePrice),
      address: groupByCreator[item][0].makerAccount?.address,
    })
  );
  // topSellers = [...topSellers].filter(
  //   (item) => item.talent !== "undefined" && item.talent !== "null"
  // );
  return topSellers;
}
const getCollectionDetails = (collections) => {
  let groubByCollection = _.groupBy(collections, "collection[name]");
  // let groubByCollection = _.groupBy(collections, "tokenAddress");
  let cols = [];
  let collectionNames = Object.keys(groubByCollection);
  for (let i = 0; i < collectionNames.length; i++) {
    cols.push({
      collection: collectionNames[i],
      imagePreviewUrl:
        groubByCollection[collectionNames[i]][0].collection.imageUrl,
      totalAssets: groubByCollection[collectionNames[i]].length,
    });
  }
  cols = cols.filter((col) => col.imagePreviewUrl != null);
  cols = _.orderBy(cols, "totalAssets", "desc");
  return cols;
};
const getExploresDetails = (assets) => {
  let exps = assets.filter(
    (exp) =>
      exp.image_preview_url !== null && exp.image_preview_url != undefined
  );
  return exps;
};
export default {
  //api methods checked
  getAccount,
  getBundles,
  getLiveAuctions,
  getCollections,
  getExplores,
  getTopSellers,
  getAssetsByTokenIds,
  getAssetsListByOwner,
  getSingleAsset,
  getAssetDetails,
  getAssets,
  getAssetsInCollection,
  getCollectionsDetailsBySlugs,
  //hellper methods checked
  getTopSellersDatails,
  getCollectionDetails,
  getExploresDetails,
};