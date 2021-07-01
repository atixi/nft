import * as Web3 from "web3";
import { OpenSeaPort, Network } from "opensea-js";
import client from "./openSeaClient";
import _ from "lodash";
const provider = new Web3.providers.HttpProvider(
  "https://mainnet.infura.io/"
  // `https://rinkeby-api.opensea.io/api/v1/`
);
const seaport = new OpenSeaPort(provider, {
  networkName: Network.Main,
  apiKey: "2e7ef0ac679f4860bbe49a34a98cf5ac",
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
const getAssets = (slug) => {
  return client.get("collections?limit=50");
};
const getCollectionBySlug = (slug, order_direction = `desc`) => {
  return client.get(
    `assets?order_direction=${order_direction}&offset=0&limit=50&collection=${slug}`
  );
};

//collection functions
const getCollectionByAssetOwner = (ownerAddress) => {
  return client.get(`collections?asset_owner=${ownerAddress}`);
};
const getAllCollectionByOwners = async (assetOwners) => {
  const promises = [];
  assetOwners.forEach((item) => promises.push(getCollectionByAssetOwner(item)));
  return Promise.all(promises);
};
const getCollectionAssetsBySlug = async () => {
  const slugs = [
    "reika-mandala-art",
    "atixi",
    "cosplay-made-in-japan",
    "unofficial-bayc-collectibles",
    "delorean-s-40th-anniversary-nft-collection",
    "glewme-city-master-of-permits-uriel",
    "plaguedoctor-1",
    "builsontheblock",
    "fnd",
    "uniswap-v3-positions",
    "penguin-dummy-club-1",
    "iconpunks",
    "airlord",
    "monalisa-art",
    "unique-one-v2",
    "slumdoge-billionaires",
  ];
  const promises = [];
  for (let i = 0; i < slugs.length; i++) {
    promises.push(getCollectionBySlug(slugs[i]));
  }
  return Promise.allSettled(promises);
};
const mapCollection = (results) => {
  const collections = [];
  results.map((result) =>
    result.value.data
      ? collections.push(result.value.data.assets)
      : collections.push(results)
  );
  return collections;
};
// const getAssets = () => {
//   return seaport.api.getBundle({ slug: `bitcoinphotos` });
// };
function getBundles() {
  return seaport.api.getBundles({
    on_sale: true,
    limit: 50,
  });
}
const getLiveAuctions = () => {
  return seaport.api.getOrders({
    bundled: false,
    sale_kind: 1,
    is_expired: false,
    limit: 50,
    on_sale: true,
  });
};
const getOrders = (params) => {
  return seaport.api.getOrders({
    bundled: false,
    sale_kind: 1,
    is_expired: false,
    limit: 50,
    on_sale: true,
    ...params,
  });
};
const getFixedAuctions = () => {
  return seaport.api.getOrders({
    saleKind: 0,
  });
};

const getAssetOrders = () => {};
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

const getExplores = () => {
  return client.get(`assets?limit=50`);
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
const getAsset = (address, id) => {
  return seaport.api.getAsset({
    tokenAddress: address,
    tokenId: id,
  });
};

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
async function getSingleAsset(accountId, assetId) {
  return await client.get(
    `https://api.opensea.io/api/v1/asset/${accountId}/${assetId}`
  );
}
// hellper functions
// this is helper method to reproduct the topseller data (changes are required)
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
const getExploresDetails = (assets) => {
  let exps = assets.filter(
    (exp) =>
      exp.image_preview_url !== null && exp.image_preview_url != undefined
  );
  return exps;
};
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
  getBundles,
  getLiveAuctions,
  getCollections,
  getExplores,
  getTopSellers,
  getAssetsByTokenIds,
  getAssetsListByOwner,
  //collection functions
  getCollectionByAssetOwner,
  getAllCollectionByOwners,
  getCollectionBySlug,
  getCollectionAssetsBySlug,
  mapCollection,
  getSingleAsset,
  getAssetDetails,
  getAssets,
  getAssetsInCollection,
  getCollectionsDetailsBySlugs,
  getOrders,
  //hellper methods checked
  getTopSellersDetails,
  getCollectionDetails,
  getExploresDetails,
  mockCollections,

  getAsset,
  getAssetBalance,
};
