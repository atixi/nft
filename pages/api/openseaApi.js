import * as Web3 from "web3";
import { OpenSeaPort, Network } from "opensea-js";

const provider = new Web3.providers.HttpProvider("https://mainnet.infura.io");
const seaport = new OpenSeaPort(provider, {
  networkName: Network.Main,
});

const fetchAssets = async (tokenAddress, tokenId) => {
  const asset = await seaport.api.getAsset({
    tokenAddress: tokenAddress, // string
    tokenId: tokenId, // string | number | null
  });
  return asset;
};

const getAssetBalance = async (address, as) => {
  const balance = await seaport.getAssetBalance({
    accountAddress: address, // string
    asset: as, // Asset
  });
  return balance;
};

export default {
  fetchAssets,
  getAssetBalance,
};
