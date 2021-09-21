import * as Web3 from "web3";

import { Network, OpenSeaPort } from "opensea-js";

import _ from "lodash";
import client from "./openSeaClient";

export const seaportProvider = new Web3.providers.HttpProvider(
  "https://mainnet.infura.io/v3/c2dde5d7c0a0465a8e994f711a3a3c31"
  // 'https://rinkeby-api.opensea.io/api/v1/'
);

const seaport = new OpenSeaPort(seaportProvider, {
  networkName: Network.Rinkeby,
  // apiKey: "2e7ef0ac679f4860bbe49a34a98cf5ac",
});
export const getAccount = async () => {
  let error = null;
  let accountAddress = null;
  const web3 = await seaport.web3;
  const result = await web3.eth.getAccounts((e, res) => {
    accountAddress = res[0];
  });
  return { accountAddress, error };
};
/// handled and checked functions //////////////////////////////////////////////////////////////////////
// asset functions

/**
 * Fetch the talent addresses from strapi, throwing if none is found
 */

const getTalentAddresses = async () => {
  const owners = [
    "0xff6539f953eb682d442c70ae0a9e186dd9668ca2", //0xff6539f953eb682d442c70ae0a9e186dd9668ca2
    "0xe5609a6984ece86cb5ab48b13c3ba5a55d173da8", // Yuji-Susaki
  ];

  return owners;
};
/**
 * Fetch an asset from the API, throwing if none is found
 * @param tokenAddress Address of the asset's contract
 * @param tokenId The asset's token ID, or null if ERC-20
 */
const getAsset = (address, id) => {
  return seaport.api.getAsset({
    tokenAddress: address,
    tokenId: id,
  });
};

/**
 * Fetch the assets from the API, throwing if none is found
 * @param owner The asset's owner account address
 */
const getAssetsByOwner = (owner) => {
  return seaport.api.getAssets({
    owner,
    limit: 500,
  });
};

const getCreatedAsset = async () => {
  const owners = [
    "0xff6539f953eb682d442c70ae0a9e186dd9668ca2", //0xff6539f953eb682d442c70ae0a9e186dd9668ca2
    "0xe5609a6984ece86cb5ab48b13c3ba5a55d173da8", // Yuji-Susaki
  ];

  let data = [];
  for (let i = 0; i < owners.length; i++) {
    const { assets } = await seaport.api.getAssets({ asset_owner: owners[i] });
    data = [...data, ...assets];
  }
  console.log("data is : ", data);
};
/**
 * Return the assets of the owners from the API, throwing if none is found
 * @param owners The list of asset's owner account addresses
 */
const getAssetsByOwners = async (owners) => {
  const assetsByOwners = [];
  for (let i = 0; i < owners.length; i++) {
    const { assets } = await getAssetsByOwner(owners[i]);
    if (assets) {
      assetsByOwners.push({ owner: owners[i], assets: assets });
    }
  }
  return assetsByOwners;
};

/**
 * Return the the list of all assets of all talents (explorer) from the API, throwing if none is found
 * @param data The array contains a list of objects, which constains the assets and it's account addresses
 */
const getExplores = async () => {
  const owners = [
    "0xff6539f953eb682d442c70ae0a9e186dd9668ca2", //0xff6539f953eb682d442c70ae0a9e186dd9668ca2
    "0xe5609a6984ece86cb5ab48b13c3ba5a55d173da8", // Yuji-Susaki
  ];
  const data = await getAssetsByOwners(owners);
  let assets = [];
  for (let i = 0; i < data.length; i++) {
    assets = [...assets, ...data[i].assets];
  }
  return assets;
};

/**
 * Fetch orders of an asset from the API, throwing if none is found
 * @param tokenAddress Address of the asset's contract
 * @param tokenId The asset's token ID, or null if ERC-20
 */
const getAssetOrders = async (tokenAddress, tokenId) => {
  const asset = await seaport.api.getAsset({
    tokenAddress, // string
    tokenId, // string | number | null
  });
  const { orders } = await seaport.api.getOrders({
    asset_contract_address: asset.assetContract?.address,
    token_id: tokenId,
  });
  return { asset, orders };
};
//collection functions

/**
 * A wallet address. If specified, will return collections where the owner owns
 * at least one asset belonging to smart contracts in the collection.
 * The number of assets the account owns is shown as owned_asset_count for each collection.
 * Throwing if none is found
 * @param asset_owner The owners' wallet address
 * @param offset used for pagination of result
 * @param limit used for number of result in each page
 */
const getCollectionsByOwner = (asset_owner, offset = 0, limit = 300) => {
  return seaport.api.get("/collections", {
    asset_owner,
    offset,
    limit,
  });
};

/**
 * Return the an array which contains wallet address of collections owners and
 * the collection of each owner from the API, throwing if none is found
 * @param owners The wallet addresses of collections owners
 */
const getCollectionsByOwners = async (owners) => {
  const ownersCollections = [];
  for (let i = 0; i < owners.length; i++) {
    const data = await getCollectionsByOwner(owners[i]);
    ownersCollections.push({ owner: owners[i], collections: data });
  }
  return ownersCollections;
};

/**
 * Return the merged array of collections of givent list of owners.
 * the collection of each owner from the API, throwing if none is found
 * @param data The array which contains the collections of owners
 */
const mergeCollections = (data) => {
  let collections = [];
  for (let i = 0; i < data.length; i++) {
    if (collections.indexOf(...data[i].collections) == -1) {
      collections = [...collections, ...data[i].collections];
    }
  }
  return collections;
};

/**
 * Will return all assets in a collection.
 * @param slug Case sensitive and must match the collection slug exactly.
 */
const getCollectionAssetsBySlug = async (
  slug,
  limit = Number.MAX_SAFE_INTEGER
) => {
  return await seaport.api.getAssets({
    collection: slug,
    limit,
  });
};

/**
 * Will return all assets from a collection which has successful sale
 * @param slug Case sensitive and must match the collection slug exactly.
 */
const getCollectionAssetsOnSale = async (slug) => {
  try {
    let { assets } = await getCollectionAssetsBySlug(slug);
    return assets.filter((asset) => asset.sellOrders != null);
  } catch (e) {
    throw e;
  }
};

// Bundle functions
function getBundles() {
  return seaport.api.getBundles({
    on_sale: true,
    limit: 50,
  });
}

// not checked must be nft not ft
const getLiveAuctions = async () => {
  const assets = await getExplores();
  const token_ids = assets.map((asset) => asset.tokenId);
  console.log(token_ids);
  return seaport.api.getOrders({
    sale_kind: 1,
    is_expired: false,
    limit: 500,
    // token_ids,
  });
};

const getOrders = (params) => {
  return seaport.api.getOrders({
    bundled: false,
    sale_kind: 1,
    is_expired: false,
    limit: 500,
    on_sale: true,
    ...params,
  });
};

const getFixedAuctions = () => {
  return seaport.api.getOrders({
    saleKind: 0,
  });
};

const getTopSellers = () => {
  return seaport.api.getOrders({
    bundled: false,
    is_expired: false,
    sale_kind: 1,
    include_invalid: false,
    limit: 50,
  });
};
const getCollections = () => {
  return seaport.api.getAssets({
    limit: 50,
  });
};

// not checket functions
//topsellers

async function getBundlesByOwner(owner, onSale = false) {
  return client.get(`bundles?owner=${owner}&on_sale=${onSale}&limit=50`);
}

const getAssetBalance = (accountAddress, asset) => {
  return seaport.getAssetBalance({
    accountAddress, // string
    asset, // Asset
  });
};
async function getAssetsByTokenIds(
  tokenIds,
  orderDirection = `desc`,
  orderBy = `token_id`
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
  orderDirection = `desc`,
  orderBy = `token_id`
) {
  return await client.get(
    `assets?owner=${owner}&order_direction=${orderDirection}&order_by=${orderBy}`
  );
}
// hellper functions
// this is helper method to reproduct the topseller data (changes are required)
/**
 * return the Merged the asset's of owners in one list
 * @param data Address of the asset's contract
 */

// ==================== not checked

function getTopSellersDetails(assets) {
  let topSellers = [];
  const groupByCreator = _.groupBy(assets, `makerAccount[user[username]]`);
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
  topSellers = [...topSellers].filter(
    (item) => item.talent !== `undefined` && item.talent !== `null`
  );
  return topSellers;
}
const getCollectionDetails = (collections) => {
  console.log(`in collection details`);
  let groubByCollection = _.groupBy(collections, `collection[name]`);
  let groubBySlug = _.groupBy(collections, `collection[slug]`);
  console.log(`group By Collection`, groubByCollection);
  // let groubByCollection = _.groupBy(collections, `tokenAddress`);
  let cols = [];
  let slugs = Object.keys(groubByCollection);
  for (let i = 0; i < slugs.length; i++) {
    cols.push({
      collection: groubByCollection[slugs[i]][0].collection.name,
      imagePreviewUrl: groubByCollection[slugs[i]][0].collection.imageUrl,
      slug: groubByCollection[slugs[i]][0].collection.slug,
      totalAssets: groubByCollection[slugs[i]].length,
    });
  }
  cols = cols.filter((col) => col.imagePreviewUrl != null);
  cols = _.orderBy(cols, `totalAssets`, `desc`);
  return cols;
};

// ==================== not checked
const mockCollections = (cols) => {
  const slugs = Object.keys(cols);
  const collections = [];
  for (let i = 0; i < slugs.length; i++) {
    collections.push({
      slug: slugs[i],
      assets: cols[slugs[i]].length,
      collection: cols[slugs[i]][0].collection.name,
      banner_image_url: cols[slugs[i]][0].collection?.banner_image_url
        ? cols[slugs[i]][0].collection?.banner_image_url
        : "https://picsum.photos/1000/400",
      image_url: cols[slugs[i]][0].collection?.image_url,
    });
  }
  return collections;
};
export default {
  //api methods checked
  getAccount,
  getTalentAddresses,
  // asset functions
  getAsset,
  getAssetsByOwner,
  getAssetsByOwners,
  getAssetOrders,
  getExplores,
  // Bundle Functions
  getBundles,
  getLiveAuctions,
  getCollections,
  getTopSellers,
  getAssetsByTokenIds,
  getAssetsListByOwner,
  //collection functions
  getCollectionAssetsBySlug,
  getCollectionAssetsOnSale,
  getCollectionsByOwner,
  getCollectionsByOwners,
  mergeCollections,
  getOrders,
  //hellper methods checked
  getTopSellersDetails,
  getCollectionDetails,
  mockCollections,

  getAsset,
  getAssetBalance,

  getCreatedAsset,
};
