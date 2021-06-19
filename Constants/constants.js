import * as Web3 from "web3";
import BigNumber from "bignumber.js";
import moment from "moment";

import { InjectedConnector } from "@web3-react/injected-connector";
import WalletConnectProvider from "@walletconnect/web3-provider";
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
  } else if (window.ethereum) {
    window.ethereum.enable();
  } else {
    const errorMessage =
      "You need an Ethereum wallet to interact with this marketplace. Unlock your wallet, get MetaMask.io or Portis on desktop, or get Trust Wallet or Coinbase Wallet on mobile.";
    alert("error in connect wallet: ", errorMessage);
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

export const isMobileDevice = () => {
  var check = false;
  (function (a) {
    if (
      /(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|iris|kindle|lge |maemo|midp|mmp|mobile.+firefox|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows ce|xda|xiino/i.test(
        a
      ) ||
      /1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(
        a.substr(0, 4)
      )
    )
      check = true;
  })(window.navigator.userAgent || navigator.vendor || window.opera);
  return check;
};

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

export const providerOptions = {
  // Example with injected providers
  injected: {
    display: {
      // logo: "data:image/gif;base64,INSERT_BASE64_STRING",
      name: InjectedConnector,
      description: "Connect with the provider in your Browser",
    },
    package: null,
  },
  // Example with WalletConnect provider
  // walletconnect: {
  //   display: {
  //     // logo: "data:image/gif;base64,INSERT_BASE64_STRING",
  //     name: "Mobile",
  //     description: "Scan qrcode with your mobile wallet",
  //   },
  //   package: WalletConnectProvider,
  //   options: {
  //     infuraId: "7ca37bed6f77481eb889a45bc8520e6c", // required
  //     qrcodeModalOptions: {
  //       mobileLinks: [
  //         "rainbow",
  //         "metamask",
  //         "argent",
  //         "trust",
  //         "imtoken",
  //         "pillar",
  //       ],
  //     },
  //   },
  // },
  walletconnect: {
    package: WalletConnectProvider,
    options: {
      infuraId: "7ca37bed6f77481eb889a45bc8520e6c", // required
      qrcode: true,
      qrcodeModalOptions: {
        mobileLinks: [
          "rainbow",
          "metamask",
          "argent",
          "trust",
          "imtoken",
          "pillar",
        ],
      },
    },
  },
  // fortmatic: {
  //   package: FortmaticConnector, // required
  //   options: {
  //     key: "pk_test_391E26A3B43A3350", // required
  //   },
  // },
  // torus: {
  //   package: TorusConnector, // required
  //   options: {
  //     key: "pk_test_391E26A3B43A3350", // required
  //   },
  // },
  // // credit card options
  // portis: {
  //   package: PortisConnector, // required
  //   options: {
  //     key: "350483bb-f1fd-4727-bfc7-d2c08e06b2f0", // required
  //   },
  // },
};
