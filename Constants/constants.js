import * as Web3 from "web3";
import BigNumber from "bignumber.js";

export const GOOGLE_ANALYTICS_ID = "UA-111688253-4";
export const OPENSEA_URL = "https://opensea.io";
export const OPENSEA_JS_URL = "https://github.com/ProjectOpenSea/opensea-js";
export const GITHUB_URL = "https://github.com/ProjectOpenSea/ships-log";
export const DEFAULT_DECIMALS = 18;
export let web3Provider =
  typeof web3 !== "undefined"
    ? window.ethereum
    : new Web3.providers.HttpProvider("https://mainnet.infura.io");

// Replace this with Redux for more complex logic
const networkCallbacks = [];
export const onNetworkUpdate = (callback) => {
  networkCallbacks.push(callback);
};

export async function connectWallet() {
  if (!window.web3) {
    // web3Provider = new PortisProvider({
    //   // Put your Portis API key here
    // });
    console.log("enly ethereum");
  } else if (window.ethereum) {
    window.ethereum.enable();
  } else {
    const errorMessage =
      "You need an Ethereum wallet to interact with this marketplace. Unlock your wallet, get MetaMask.io or Portis on desktop, or get Trust Wallet or Coinbase Wallet on mobile.";
    alert(errorMessage);
    throw new Error(errorMessage);
  }
  networkCallbacks.map((c) => c(web3Provider));
}

export function toUnitAmount(baseAmount, tokenContract = null) {
  const decimals =
    tokenContract && tokenContract.decimals != null
      ? tokenContract.decimals
      : DEFAULT_DECIMALS;

  const amountBN = new BigNumber(baseAmount.toString());
  return amountBN.div(new BigNumber(10).pow(decimals));
}

export function toBaseUnitAmount(unitAmount, tokenContract = null) {
  const decimals =
    tokenContract && tokenContract.decimals != null
      ? tokenContract.decimals
      : DEFAULT_DECIMALS;

  const amountBN = new BigNumber(unitAmount.toString());
  return amountBN.times(new BigNumber(10).pow(decimals));
}

export async function promisify(inner) {
  return new Promise((resolve, reject) =>
    inner((err, res) => {
      if (err) {
        reject(err);
      }
      resolve(res);
    })
  );
}

export const ACCOUNT_ADDRESS = "0x8ca35f878fd14992b58a18beb484f721b1d07a33";
export const ASSET_TOKEN = "0x06012c8cf97bead5deae237070f9587f8e7a266d";
export const ASSET_TOKEN2 = "0x7227e371540cf7b8e512544ba6871472031f3335";
export const MY_TOKEN_ADDRESS = "0x495f947276749ce646f68ac8c248420045cb7b5e";
export const MY_TOKEN_ID =
  "63612454193857669735992767605921166416679510491416240189969904957998854307841";

export const PRODUCTS = [
  {
    id: 1,
    productTitle: "product one",
    productImage: "/images/products/product1.jpg",
    price: "99 ETH",
    currentQTY: 90,
    totalQTY: 100,
    likes: 100,
    palceMessage: "Place a bid",
  },
  {
    id: 2,
    productTitle: "product one",
    productImage: "/images/products/product1.jpg",
    price: "99 ETH",
    currentQTY: 90,
    totalQTY: 100,
    likes: 100,
    palceMessage: "Place a bid",
  },
  {
    id: 3,
    productTitle: "product one",
    productImage: "/images/products/product1.jpg",
    price: "99 ETH",
    currentQTY: 90,
    totalQTY: 100,
    likes: 100,
    palceMessage: "Place a bid",
  },
  {
    id: 4,
    productTitle: "product one",
    productImage: "/images/products/product1.jpg",
    price: "99 ETH",
    currentQTY: 90,
    totalQTY: 100,
    likes: 100,
    palceMessage: "Place a bid",
  },
];

export const SELLERS = [
  {
    id: 1,
    productTitle: "product one",
    productImage: "/images/tops/image.png",
    price: "99 ETH",
    currentQTY: 90,
    totalQTY: 100,
    likes: 100,
    palceMessage: "Place a bid",
  },
  {
    id: 2,
    productTitle: "product one",
    productImage: "/images/tops/image-2.png",
    price: "99 ETH",
    currentQTY: 90,
    totalQTY: 100,
    likes: 100,
    palceMessage: "Place a bid",
  },
  {
    id: 3,
    productTitle: "product one",
    productImage: "/images/tops/image-3.png",
    price: "99 ETH",
    currentQTY: 90,
    totalQTY: 100,
    likes: 100,
    palceMessage: "Place a bid",
  },
  {
    id: 4,
    productTitle: "product one",
    productImage: "/images/tops/image-4.jpg",
    price: "99 ETH",
    currentQTY: 90,
    totalQTY: 100,
    likes: 100,
    palceMessage: "Place a bid",
  },
  {
    id: 5,
    productTitle: "product one",
    productImage: "/images/tops/image-5.png",
    price: "99 ETH",
    currentQTY: 90,
    totalQTY: 100,
    likes: 100,
    palceMessage: "Place a bid",
  },
  {
    id: 6,
    productTitle: "product one",
    productImage: "/images/tops/image-6.jpg",
    price: "99 ETH",
    currentQTY: 90,
    totalQTY: 100,
    likes: 100,
    palceMessage: "Place a bid",
  },
  {
    id: 7,
    productTitle: "product one",
    productImage: "/images/tops/image-7.png",
    price: "99 ETH",
    currentQTY: 90,
    totalQTY: 100,
    likes: 100,
    palceMessage: "Place a bid",
  },
  {
    id: 8,
    productTitle: "product one",
    productImage: "/images/tops/image-8.png",
    price: "99 ETH",
    currentQTY: 90,
    totalQTY: 100,
    likes: 100,
    palceMessage: "Place a bid",
  },
  {
    id: 9,
    productTitle: "product one",
    productImage: "/images/tops/image-9.jpg",
    price: "99 ETH",
    currentQTY: 90,
    totalQTY: 100,
    likes: 100,
    palceMessage: "Place a bid",
  },
  {
    id: 1,
    productTitle: "product one",
    productImage: "/images/tops/image-4.jpg",
    price: "99 ETH",
    currentQTY: 90,
    totalQTY: 100,
    likes: 100,
    palceMessage: "Place a bid",
  },
  {
    id: 1,
    productTitle: "product one",
    productImage: "/images/tops/image-4.jpg",
    price: "99 ETH",
    currentQTY: 90,
    totalQTY: 100,
    likes: 100,
    palceMessage: "Place a bid",
  },
  {
    id: 1,
    productTitle: "product one",
    productImage: "/images/tops/image-4.jpg",
    price: "99 ETH",
    currentQTY: 90,
    totalQTY: 100,
    likes: 100,
    palceMessage: "Place a bid",
  },
  {
    id: 1,
    productTitle: "product one",
    productImage: "/images/tops/image-4.jpg",
    price: "99 ETH",
    currentQTY: 90,
    totalQTY: 100,
    likes: 100,
    palceMessage: "Place a bid",
  },
  {
    id: 1,
    productTitle: "product one",
    productImage: "/images/tops/image-4.jpg",
    price: "99 ETH",
    currentQTY: 90,
    totalQTY: 100,
    likes: 100,
    palceMessage: "Place a bid",
  },
  {
    id: 1,
    productTitle: "product one",
    productImage: "/images/tops/image-4.jpg",
    price: "99 ETH",
    currentQTY: 90,
    totalQTY: 100,
    likes: 100,
    palceMessage: "Place a bid",
  },
];
