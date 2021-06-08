import * as Web3 from "web3";
import BigNumber from "bignumber.js";
import moment from "moment";

export const GOOGLE_ANALYTICS_ID = "UA-111688253-4";
export const OPENSEA_URL = "https://opensea.io";
export const OPENSEA_JS_URL = "https://github.com/ProjectOpenSea/opensea-js";
export const GITHUB_URL = "https://github.com/ProjectOpenSea/ships-log";
export const DEFAULT_DECIMALS = 18;
const MAX_ADDR_LEN = 4;

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
  } else if (window.ethereum) {
    window.ethereum.enable();
  } else {
    const errorMessage =
      "You need an Ethereum wallet to interact with this marketplace. Unlock your wallet, get MetaMask.io or Portis on desktop, or get Trust Wallet or Coinbase Wallet on mobile.";
    alert("error in connect wallet: ",errorMessage);
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

export const getAuctionPriceDetails = (order) => {
  const { currentPrice, basePrice, paymentTokenContract } = order;
  const cp = toUnitAmount(currentPrice, paymentTokenContract);

  const priceCurrent = parseFloat(cp).toLocaleString(undefined, {
    minimumSignificantDigits: 1,
  });

  const bp = toUnitAmount(basePrice, paymentTokenContract);

  const priceBase = parseFloat(bp).toLocaleString(undefined, {
    minimumSignificantDigits: 1,
  });

  return { priceCurrent, priceBase };
};

export const getAuctionTimeDetails = (order) => {
  const { listingTime, createdTime, expirationTime } = order;

  const lt = listingTime.toNumber() * 1000;
  const timeListed = moment(lt).format();

  const ct = createdTime.toNumber() * 1000;
  const timeCreated = moment(ct).format();

  const exp = parseFloat(expirationTime);
  if (exp <= 0) {
    timeLeft = null;
  }
  const timeLeft = moment.duration(moment.unix(exp).diff(moment()))._data;

  return { timeListed, timeCreated, timeLeft };
};

export const getAuctionUserDetails = (order) => {
  const { makerAccount } = order;
  const _username = makerAccount.user ? makerAccount.user.username : null;
  const _address = makerAccount.address;

  const displayName = _username
    ? _username
    : _address.substring(0, MAX_ADDR_LEN).toUpperCase() +
      "..." +
      _address.substring(_address.length - MAX_ADDR_LEN).toUpperCase();

  return displayName;
};

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
    productImage:
      "https://lh3.googleusercontent.com/7O9TM4--FDArfDp2BD7hKC20Fw3ROnDSbQSmr3MWS10v3icIsrvF_7T8g9-FgPO0_R56qqMg-1RAml3pgJZafVzskylaTosRGaka5g",
    price: "99 ETH",
    currentQTY: 90,
    totalQTY: 100,
    likes: 100,
    palceMessage: "Place a bid",
  },
  {
    id: 2,
    productTitle: "product one",
    productImage:
      "https://lh3.googleusercontent.com/7O9TM4--FDArfDp2BD7hKC20Fw3ROnDSbQSmr3MWS10v3icIsrvF_7T8g9-FgPO0_R56qqMg-1RAml3pgJZafVzskylaTosRGaka5g",
    price: "99 ETH",
    currentQTY: 90,
    totalQTY: 100,
    likes: 100,
    palceMessage: "Place a bid",
  },
  {
    id: 3,
    productTitle: "product one",
    productImage:
      "https://lh3.googleusercontent.com/7O9TM4--FDArfDp2BD7hKC20Fw3ROnDSbQSmr3MWS10v3icIsrvF_7T8g9-FgPO0_R56qqMg-1RAml3pgJZafVzskylaTosRGaka5g",
    price: "99 ETH",
    currentQTY: 90,
    totalQTY: 100,
    likes: 100,
    palceMessage: "Place a bid",
  },
  {
    id: 4,
    productTitle: "product one",
    productImage:
      "https://lh3.googleusercontent.com/7O9TM4--FDArfDp2BD7hKC20Fw3ROnDSbQSmr3MWS10v3icIsrvF_7T8g9-FgPO0_R56qqMg-1RAml3pgJZafVzskylaTosRGaka5g",
    price: "99 ETH",
    currentQTY: 90,
    totalQTY: 100,
    likes: 100,
    palceMessage: "Place a bid",
  },
  {
    id: 5,
    productTitle: "product one",
    productImage:
      "https://lh3.googleusercontent.com/7O9TM4--FDArfDp2BD7hKC20Fw3ROnDSbQSmr3MWS10v3icIsrvF_7T8g9-FgPO0_R56qqMg-1RAml3pgJZafVzskylaTosRGaka5g",
    price: "99 ETH",
    currentQTY: 90,
    totalQTY: 100,
    likes: 100,
    palceMessage: "Place a bid",
  },
  {
    id: 6,
    productTitle: "product one",
    productImage:
      "https://lh3.googleusercontent.com/7O9TM4--FDArfDp2BD7hKC20Fw3ROnDSbQSmr3MWS10v3icIsrvF_7T8g9-FgPO0_R56qqMg-1RAml3pgJZafVzskylaTosRGaka5g",
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

export const assetTokens = [
  "63612454193857669735992767605921166416679510491416240189969904965695435702273",
  "63612454193857669735992767605921166416679510491416240189969904962396900818945",
  "63612454193857669735992767605921166416679510491416240189969904961297389191169",
];

export const accountList = [
  "0x8CA35f878fD14992b58a18bEB484f721b1d07A33",
  "0x579b52c84cd88e4ab4f5558131dfbe01143b96b0",
];

export const tallents = [
  "0x921bc202ae9b1273e0b3f58c0e808d6eb373f4c0",
  "0xbdddd277583dcae0b501046ba86714feea71b03f",
  "0x8CA35f878fD14992b58a18bEB484f721b1d07A33",
  "0x9048d24577d4c4bbf14f1020f20640b334f8c762",
  "0xf090e06a38ac643c4b29571b2184543bacdd4ff8",
  "0x9f9fb9af3add5caf7f73816a0535083da89ec0ff",
  "0x198c46f639357ac2b288dafb81ed46f3d745bb31",
  "0xf0fc645b8655340055109ba7236a352abd45d853",
  "0x23b10b746895924eb182d55e56521be16fb1cc10",
  "0x17c0c33437116d8961204dcd9fb55244cfd8f580",
  "0xdedb02b1a0e2c302536e3fb1e19a581727035ee1",
  "0xf185ddf160ffbc1fa59571cc5065ae16f3b0f9c8",
  "0x1cc9ffee54d1eac3fcd3be42c6e9d3f13086b075",
  "0xdd2aa6999e1f685349b2b3c5f6ba58e015ce89d0",
  "0x74bdc8660ce23d312964dc9dfe3beee03a36bc3e",
  "0x23b10b746895924eb182d55e56521be16fb1cc10",
  "0xe42c71135fb7b6c98eec92334d68f73cb1e702db",
  "0x908ebbc43e40a6f5dd3179b83753f58217d63a62",
  "0x83d72b8c0769c92a0e39ae976d88a1d55e5d647b",
];
