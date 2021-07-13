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
    ? window.web3.currentProvider
    : new Web3.providers.HttpProvider(
        "https://mainnet.infura.io/v3/c2dde5d7c0a0465a8e994f711a3a3c31"
      );

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

  const priceCurrent = parseFloat(cp).toFixed(4).toLocaleString(undefined, {
    minimumSignificantDigits: 1,
  });

  const bp = toUnitAmount(basePrice, paymentTokenContract);

  const priceBase = parseFloat(bp).toFixed(4).toLocaleString(undefined, {
    minimumSignificantDigits: 1,
  });

  return { priceCurrent, priceBase };
};

export const toDeciamlAmount = (number) => {
  const value = toUnitAmount(number, null);

  const result = parseFloat(value).toFixed(4).toLocaleString(undefined, {
    minimumSignificantDigits: 1,
  });

  return result;
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

export const localCols = [
  {
    id: 1,
    slug: "cosplay-made-in-japan",
    name: null,
    published_at: "2021-07-03T12:12:04.108Z",
    created_at: "2021-07-03T12:12:00.809Z",
    updated_at: "2021-07-05T07:33:21.413Z",
    collectionName: "cosplay made in japan",
    talent: {
      id: 1,
      address: null,
      user: null,
      published_at: "2021-07-03T11:36:34.709Z",
      created_at: "2021-07-03T11:36:25.645Z",
      updated_at: "2021-07-05T07:07:24.934Z",
      userName: "Yuji-Susaki",
      talentName: "Yuji Susaki",
      bio: "Yuji-Susaki Yuji-Susaki Yuji-Susaki",
      isVisible: true,
      isVerified: true,
      walletAddress: "0xe5609a6984ece86cb5ab48b13c3ba5a55d173da8",
      talentAvatar: {
        id: 35,
        name: "unnamed.png",
        alternativeText: "",
        caption: "",
        width: 480,
        height: 512,
        formats: {
          small: {
            ext: ".png",
            url: "https://res.cloudinary.com/the-code-giant/image/upload/v1625312088/small_unnamed_a77f571594.png",
            hash: "small_unnamed_a77f571594",
            mime: "image/png",
            name: "small_unnamed.png",
            path: null,
            size: 303.92,
            width: 469,
            height: 500,
            provider_metadata: {
              public_id: "small_unnamed_a77f571594",
              resource_type: "image",
            },
          },
          thumbnail: {
            ext: ".png",
            url: "https://res.cloudinary.com/the-code-giant/image/upload/v1625312087/thumbnail_unnamed_a77f571594.png",
            hash: "thumbnail_unnamed_a77f571594",
            mime: "image/png",
            name: "thumbnail_unnamed.png",
            path: null,
            size: 35.3,
            width: 146,
            height: 156,
            provider_metadata: {
              public_id: "thumbnail_unnamed_a77f571594",
              resource_type: "image",
            },
          },
        },
        hash: "unnamed_a77f571594",
        ext: ".png",
        mime: "image/png",
        size: 273.35,
        url: "https://res.cloudinary.com/the-code-giant/image/upload/v1625312087/unnamed_a77f571594.png",
        previewUrl: null,
        provider: "cloudinary",
        provider_metadata: {
          public_id: "unnamed_a77f571594",
          resource_type: "image",
        },
        created_at: "2021-07-03T11:34:48.802Z",
        updated_at: "2021-07-03T11:34:48.847Z",
      },
      talentBanner: {
        id: 36,
        name: "unnamed.jpg",
        alternativeText: "",
        caption: "",
        width: 1400,
        height: 400,
        formats: {
          large: {
            ext: ".jpg",
            url: "https://res.cloudinary.com/the-code-giant/image/upload/v1625312177/large_unnamed_a4e76dce70.jpg",
            hash: "large_unnamed_a4e76dce70",
            mime: "image/jpeg",
            name: "large_unnamed.jpg",
            path: null,
            size: 48.35,
            width: 1000,
            height: 286,
            provider_metadata: {
              public_id: "large_unnamed_a4e76dce70",
              resource_type: "image",
            },
          },
          small: {
            ext: ".jpg",
            url: "https://res.cloudinary.com/the-code-giant/image/upload/v1625312178/small_unnamed_a4e76dce70.jpg",
            hash: "small_unnamed_a4e76dce70",
            mime: "image/jpeg",
            name: "small_unnamed.jpg",
            path: null,
            size: 16.55,
            width: 500,
            height: 143,
            provider_metadata: {
              public_id: "small_unnamed_a4e76dce70",
              resource_type: "image",
            },
          },
          medium: {
            ext: ".jpg",
            url: "https://res.cloudinary.com/the-code-giant/image/upload/v1625312178/medium_unnamed_a4e76dce70.jpg",
            hash: "medium_unnamed_a4e76dce70",
            mime: "image/jpeg",
            name: "medium_unnamed.jpg",
            path: null,
            size: 30.95,
            width: 750,
            height: 214,
            provider_metadata: {
              public_id: "medium_unnamed_a4e76dce70",
              resource_type: "image",
            },
          },
          thumbnail: {
            ext: ".jpg",
            url: "https://res.cloudinary.com/the-code-giant/image/upload/v1625312176/thumbnail_unnamed_a4e76dce70.jpg",
            hash: "thumbnail_unnamed_a4e76dce70",
            mime: "image/jpeg",
            name: "thumbnail_unnamed.jpg",
            path: null,
            size: 5.84,
            width: 245,
            height: 70,
            provider_metadata: {
              public_id: "thumbnail_unnamed_a4e76dce70",
              resource_type: "image",
            },
          },
        },
        hash: "unnamed_a4e76dce70",
        ext: ".jpg",
        mime: "image/jpeg",
        size: 80.5,
        url: "https://res.cloudinary.com/the-code-giant/image/upload/v1625312176/unnamed_a4e76dce70.jpg",
        previewUrl: null,
        provider: "cloudinary",
        provider_metadata: {
          public_id: "unnamed_a4e76dce70",
          resource_type: "image",
        },
        created_at: "2021-07-03T11:36:18.755Z",
        updated_at: "2021-07-03T11:36:18.800Z",
      },
    },
    collectionImageURL: {
      id: 37,
      name: "unnamed (1).png",
      alternativeText: "",
      caption: "",
      width: 350,
      height: 350,
      formats: {
        thumbnail: {
          ext: ".png",
          url: "https://res.cloudinary.com/the-code-giant/image/upload/v1625314199/thumbnail_unnamed_1_cd056e6a7e.png",
          hash: "thumbnail_unnamed_1_cd056e6a7e",
          mime: "image/png",
          name: "thumbnail_unnamed (1).png",
          path: null,
          size: 45.08,
          width: 156,
          height: 156,
          provider_metadata: {
            public_id: "thumbnail_unnamed_1_cd056e6a7e",
            resource_type: "image",
          },
        },
      },
      hash: "unnamed_1_cd056e6a7e",
      ext: ".png",
      mime: "image/png",
      size: 151.2,
      url: "https://res.cloudinary.com/the-code-giant/image/upload/v1625314198/unnamed_1_cd056e6a7e.png",
      previewUrl: null,
      provider: "cloudinary",
      provider_metadata: {
        public_id: "unnamed_1_cd056e6a7e",
        resource_type: "image",
      },
      created_at: "2021-07-03T12:09:59.548Z",
      updated_at: "2021-07-03T12:09:59.578Z",
    },
    collectionBanner: {
      id: 36,
      name: "unnamed.jpg",
      alternativeText: "",
      caption: "",
      width: 1400,
      height: 400,
      formats: {
        large: {
          ext: ".jpg",
          url: "https://res.cloudinary.com/the-code-giant/image/upload/v1625312177/large_unnamed_a4e76dce70.jpg",
          hash: "large_unnamed_a4e76dce70",
          mime: "image/jpeg",
          name: "large_unnamed.jpg",
          path: null,
          size: 48.35,
          width: 1000,
          height: 286,
          provider_metadata: {
            public_id: "large_unnamed_a4e76dce70",
            resource_type: "image",
          },
        },
        small: {
          ext: ".jpg",
          url: "https://res.cloudinary.com/the-code-giant/image/upload/v1625312178/small_unnamed_a4e76dce70.jpg",
          hash: "small_unnamed_a4e76dce70",
          mime: "image/jpeg",
          name: "small_unnamed.jpg",
          path: null,
          size: 16.55,
          width: 500,
          height: 143,
          provider_metadata: {
            public_id: "small_unnamed_a4e76dce70",
            resource_type: "image",
          },
        },
        medium: {
          ext: ".jpg",
          url: "https://res.cloudinary.com/the-code-giant/image/upload/v1625312178/medium_unnamed_a4e76dce70.jpg",
          hash: "medium_unnamed_a4e76dce70",
          mime: "image/jpeg",
          name: "medium_unnamed.jpg",
          path: null,
          size: 30.95,
          width: 750,
          height: 214,
          provider_metadata: {
            public_id: "medium_unnamed_a4e76dce70",
            resource_type: "image",
          },
        },
        thumbnail: {
          ext: ".jpg",
          url: "https://res.cloudinary.com/the-code-giant/image/upload/v1625312176/thumbnail_unnamed_a4e76dce70.jpg",
          hash: "thumbnail_unnamed_a4e76dce70",
          mime: "image/jpeg",
          name: "thumbnail_unnamed.jpg",
          path: null,
          size: 5.84,
          width: 245,
          height: 70,
          provider_metadata: {
            public_id: "thumbnail_unnamed_a4e76dce70",
            resource_type: "image",
          },
        },
      },
      hash: "unnamed_a4e76dce70",
      ext: ".jpg",
      mime: "image/jpeg",
      size: 80.5,
      url: "https://res.cloudinary.com/the-code-giant/image/upload/v1625312176/unnamed_a4e76dce70.jpg",
      previewUrl: null,
      provider: "cloudinary",
      provider_metadata: {
        public_id: "unnamed_a4e76dce70",
        resource_type: "image",
      },
      created_at: "2021-07-03T11:36:18.755Z",
      updated_at: "2021-07-03T11:36:18.800Z",
    },
  },
  {
    id: 4,
    slug: "unofficial-bayc-collectibles",
    name: null,
    published_at: "2021-07-04T12:14:10.031Z",
    created_at: "2021-07-04T12:14:05.943Z",
    updated_at: "2021-07-08T00:59:39.823Z",
    collectionName: "BAYC Collector's Card #8576",
    talent: {
      id: 1,
      address: null,
      user: null,
      published_at: "2021-07-03T11:36:34.709Z",
      created_at: "2021-07-03T11:36:25.645Z",
      updated_at: "2021-07-05T07:07:24.934Z",
      userName: "Yuji-Susaki",
      talentName: "Yuji Susaki",
      bio: "Yuji-Susaki Yuji-Susaki Yuji-Susaki",
      isVisible: true,
      isVerified: true,
      walletAddress: "0xe5609a6984ece86cb5ab48b13c3ba5a55d173da8",
      talentAvatar: {
        id: 35,
        name: "unnamed.png",
        alternativeText: "",
        caption: "",
        width: 480,
        height: 512,
        formats: {
          small: {
            ext: ".png",
            url: "https://res.cloudinary.com/the-code-giant/image/upload/v1625312088/small_unnamed_a77f571594.png",
            hash: "small_unnamed_a77f571594",
            mime: "image/png",
            name: "small_unnamed.png",
            path: null,
            size: 303.92,
            width: 469,
            height: 500,
            provider_metadata: {
              public_id: "small_unnamed_a77f571594",
              resource_type: "image",
            },
          },
          thumbnail: {
            ext: ".png",
            url: "https://res.cloudinary.com/the-code-giant/image/upload/v1625312087/thumbnail_unnamed_a77f571594.png",
            hash: "thumbnail_unnamed_a77f571594",
            mime: "image/png",
            name: "thumbnail_unnamed.png",
            path: null,
            size: 35.3,
            width: 146,
            height: 156,
            provider_metadata: {
              public_id: "thumbnail_unnamed_a77f571594",
              resource_type: "image",
            },
          },
        },
        hash: "unnamed_a77f571594",
        ext: ".png",
        mime: "image/png",
        size: 273.35,
        url: "https://res.cloudinary.com/the-code-giant/image/upload/v1625312087/unnamed_a77f571594.png",
        previewUrl: null,
        provider: "cloudinary",
        provider_metadata: {
          public_id: "unnamed_a77f571594",
          resource_type: "image",
        },
        created_at: "2021-07-03T11:34:48.802Z",
        updated_at: "2021-07-03T11:34:48.847Z",
      },
      talentBanner: {
        id: 36,
        name: "unnamed.jpg",
        alternativeText: "",
        caption: "",
        width: 1400,
        height: 400,
        formats: {
          large: {
            ext: ".jpg",
            url: "https://res.cloudinary.com/the-code-giant/image/upload/v1625312177/large_unnamed_a4e76dce70.jpg",
            hash: "large_unnamed_a4e76dce70",
            mime: "image/jpeg",
            name: "large_unnamed.jpg",
            path: null,
            size: 48.35,
            width: 1000,
            height: 286,
            provider_metadata: {
              public_id: "large_unnamed_a4e76dce70",
              resource_type: "image",
            },
          },
          small: {
            ext: ".jpg",
            url: "https://res.cloudinary.com/the-code-giant/image/upload/v1625312178/small_unnamed_a4e76dce70.jpg",
            hash: "small_unnamed_a4e76dce70",
            mime: "image/jpeg",
            name: "small_unnamed.jpg",
            path: null,
            size: 16.55,
            width: 500,
            height: 143,
            provider_metadata: {
              public_id: "small_unnamed_a4e76dce70",
              resource_type: "image",
            },
          },
          medium: {
            ext: ".jpg",
            url: "https://res.cloudinary.com/the-code-giant/image/upload/v1625312178/medium_unnamed_a4e76dce70.jpg",
            hash: "medium_unnamed_a4e76dce70",
            mime: "image/jpeg",
            name: "medium_unnamed.jpg",
            path: null,
            size: 30.95,
            width: 750,
            height: 214,
            provider_metadata: {
              public_id: "medium_unnamed_a4e76dce70",
              resource_type: "image",
            },
          },
          thumbnail: {
            ext: ".jpg",
            url: "https://res.cloudinary.com/the-code-giant/image/upload/v1625312176/thumbnail_unnamed_a4e76dce70.jpg",
            hash: "thumbnail_unnamed_a4e76dce70",
            mime: "image/jpeg",
            name: "thumbnail_unnamed.jpg",
            path: null,
            size: 5.84,
            width: 245,
            height: 70,
            provider_metadata: {
              public_id: "thumbnail_unnamed_a4e76dce70",
              resource_type: "image",
            },
          },
        },
        hash: "unnamed_a4e76dce70",
        ext: ".jpg",
        mime: "image/jpeg",
        size: 80.5,
        url: "https://res.cloudinary.com/the-code-giant/image/upload/v1625312176/unnamed_a4e76dce70.jpg",
        previewUrl: null,
        provider: "cloudinary",
        provider_metadata: {
          public_id: "unnamed_a4e76dce70",
          resource_type: "image",
        },
        created_at: "2021-07-03T11:36:18.755Z",
        updated_at: "2021-07-03T11:36:18.800Z",
      },
    },
    collectionImageURL: {
      id: 52,
      name: "unnamed (4).png",
      alternativeText: "",
      caption: "",
      width: 300,
      height: 200,
      formats: {
        thumbnail: {
          ext: ".png",
          url: "https://res.cloudinary.com/the-code-giant/image/upload/v1625400838/thumbnail_unnamed_4_5477b61577.png",
          hash: "thumbnail_unnamed_4_5477b61577",
          mime: "image/png",
          name: "thumbnail_unnamed (4).png",
          path: null,
          size: 61.9,
          width: 234,
          height: 156,
          provider_metadata: {
            public_id: "thumbnail_unnamed_4_5477b61577",
            resource_type: "image",
          },
        },
      },
      hash: "unnamed_4_5477b61577",
      ext: ".png",
      mime: "image/png",
      size: 71.95,
      url: "https://res.cloudinary.com/the-code-giant/image/upload/v1625400838/unnamed_4_5477b61577.png",
      previewUrl: null,
      provider: "cloudinary",
      provider_metadata: {
        public_id: "unnamed_4_5477b61577",
        resource_type: "image",
      },
      created_at: "2021-07-04T12:13:59.243Z",
      updated_at: "2021-07-04T12:13:59.285Z",
    },
    collectionBanner: {
      id: 51,
      name: "unnamed (3).png",
      alternativeText: "",
      caption: "",
      width: 1400,
      height: 400,
      formats: {
        large: {
          ext: ".png",
          url: "https://res.cloudinary.com/the-code-giant/image/upload/v1625400719/large_unnamed_3_edf8acd02e.png",
          hash: "large_unnamed_3_edf8acd02e",
          mime: "image/png",
          name: "large_unnamed (3).png",
          path: null,
          size: 352.7,
          width: 1000,
          height: 286,
          provider_metadata: {
            public_id: "large_unnamed_3_edf8acd02e",
            resource_type: "image",
          },
        },
        small: {
          ext: ".png",
          url: "https://res.cloudinary.com/the-code-giant/image/upload/v1625400720/small_unnamed_3_edf8acd02e.png",
          hash: "small_unnamed_3_edf8acd02e",
          mime: "image/png",
          name: "small_unnamed (3).png",
          path: null,
          size: 95.79,
          width: 500,
          height: 143,
          provider_metadata: {
            public_id: "small_unnamed_3_edf8acd02e",
            resource_type: "image",
          },
        },
        medium: {
          ext: ".png",
          url: "https://res.cloudinary.com/the-code-giant/image/upload/v1625400720/medium_unnamed_3_edf8acd02e.png",
          hash: "medium_unnamed_3_edf8acd02e",
          mime: "image/png",
          name: "medium_unnamed (3).png",
          path: null,
          size: 199.86,
          width: 750,
          height: 214,
          provider_metadata: {
            public_id: "medium_unnamed_3_edf8acd02e",
            resource_type: "image",
          },
        },
        thumbnail: {
          ext: ".png",
          url: "https://res.cloudinary.com/the-code-giant/image/upload/v1625400719/thumbnail_unnamed_3_edf8acd02e.png",
          hash: "thumbnail_unnamed_3_edf8acd02e",
          mime: "image/png",
          name: "thumbnail_unnamed (3).png",
          path: null,
          size: 30.04,
          width: 245,
          height: 70,
          provider_metadata: {
            public_id: "thumbnail_unnamed_3_edf8acd02e",
            resource_type: "image",
          },
        },
      },
      hash: "unnamed_3_edf8acd02e",
      ext: ".png",
      mime: "image/png",
      size: 558.82,
      url: "https://res.cloudinary.com/the-code-giant/image/upload/v1625400718/unnamed_3_edf8acd02e.png",
      previewUrl: null,
      provider: "cloudinary",
      provider_metadata: {
        public_id: "unnamed_3_edf8acd02e",
        resource_type: "image",
      },
      created_at: "2021-07-04T12:12:01.002Z",
      updated_at: "2021-07-04T12:12:01.048Z",
    },
  },
  {
    id: 3,
    slug: "reika-mandala-art",
    name: null,
    published_at: "2021-07-04T11:08:48.200Z",
    created_at: "2021-07-04T11:08:42.974Z",
    updated_at: "2021-07-08T09:45:40.874Z",
    collectionName: "reika mandala art",
    talent: {
      id: 2,
      address: null,
      user: null,
      published_at: "2021-07-08T09:38:41.767Z",
      created_at: "2021-07-08T09:38:38.441Z",
      updated_at: "2021-07-08T09:45:40.882Z",
      userName: "atixi",
      talentName: "atixi",
      bio: "asdf",
      isVisible: true,
      isVerified: true,
      walletAddress: "0xff6539f953eb682d442c70ae0a9e186dd9668ca2",
      talentAvatar: {
        id: 54,
        name: "unnamed.png",
        alternativeText: "",
        caption: "",
        width: 512,
        height: 512,
        formats: {
          small: {
            ext: ".png",
            url: "https://res.cloudinary.com/the-code-giant/image/upload/v1625737043/small_unnamed_1ab6b17238.png",
            hash: "small_unnamed_1ab6b17238",
            mime: "image/png",
            name: "small_unnamed.png",
            path: null,
            size: 94.34,
            width: 500,
            height: 500,
            provider_metadata: {
              public_id: "small_unnamed_1ab6b17238",
              resource_type: "image",
            },
          },
          thumbnail: {
            ext: ".png",
            url: "https://res.cloudinary.com/the-code-giant/image/upload/v1625737042/thumbnail_unnamed_1ab6b17238.png",
            hash: "thumbnail_unnamed_1ab6b17238",
            mime: "image/png",
            name: "thumbnail_unnamed.png",
            path: null,
            size: 11.42,
            width: 156,
            height: 156,
            provider_metadata: {
              public_id: "thumbnail_unnamed_1ab6b17238",
              resource_type: "image",
            },
          },
        },
        hash: "unnamed_1ab6b17238",
        ext: ".png",
        mime: "image/png",
        size: 85,
        url: "https://res.cloudinary.com/the-code-giant/image/upload/v1625737042/unnamed_1ab6b17238.png",
        previewUrl: null,
        provider: "cloudinary",
        provider_metadata: {
          public_id: "unnamed_1ab6b17238",
          resource_type: "image",
        },
        created_at: "2021-07-08T09:37:23.602Z",
        updated_at: "2021-07-08T09:37:23.619Z",
      },
      talentBanner: {
        id: 55,
        name: "https://lh3.googleusercontent.com/qGjgp-nABsR6kmX9srGD5N70Oxlyw5ispIvp7aP6kAorGA4D2jLFqUSmzwL3SMrwzySuPS56piq9KMT-9Iufi2q6xahEaB9qDcI7WJo=h600",
        alternativeText: "",
        caption: "",
        width: 933,
        height: 600,
        formats: {
          small: {
            ext: "",
            url: "https://res.cloudinary.com/the-code-giant/image/upload/v1625737090/small_q_Gjgp_n_A_Bs_R6km_X9sr_GD_5_N70_Oxlyw5isp_Ivp7a_P6k_Aor_GA_4_D2j_L_Fq_U_Smzw_L3_S_Mrwzy_Su_PS_56piq9_KMT_9_Iufi2q6xah_Ea_B9q_Dc_I7_W_Jo_h600_d4dc2c2fa3.jpg",
            hash: "small_q_Gjgp_n_A_Bs_R6km_X9sr_GD_5_N70_Oxlyw5isp_Ivp7a_P6k_Aor_GA_4_D2j_L_Fq_U_Smzw_L3_S_Mrwzy_Su_PS_56piq9_KMT_9_Iufi2q6xah_Ea_B9q_Dc_I7_W_Jo_h600_d4dc2c2fa3",
            mime: "image/jpeg",
            name: "small_https://lh3.googleusercontent.com/qGjgp-nABsR6kmX9srGD5N70Oxlyw5ispIvp7aP6kAorGA4D2jLFqUSmzwL3SMrwzySuPS56piq9KMT-9Iufi2q6xahEaB9qDcI7WJo=h600",
            path: null,
            size: 62.48,
            width: 500,
            height: 322,
            provider_metadata: {
              public_id:
                "small_q_Gjgp_n_A_Bs_R6km_X9sr_GD_5_N70_Oxlyw5isp_Ivp7a_P6k_Aor_GA_4_D2j_L_Fq_U_Smzw_L3_S_Mrwzy_Su_PS_56piq9_KMT_9_Iufi2q6xah_Ea_B9q_Dc_I7_W_Jo_h600_d4dc2c2fa3",
              resource_type: "image",
            },
          },
          medium: {
            ext: "",
            url: "https://res.cloudinary.com/the-code-giant/image/upload/v1625737090/medium_q_Gjgp_n_A_Bs_R6km_X9sr_GD_5_N70_Oxlyw5isp_Ivp7a_P6k_Aor_GA_4_D2j_L_Fq_U_Smzw_L3_S_Mrwzy_Su_PS_56piq9_KMT_9_Iufi2q6xah_Ea_B9q_Dc_I7_W_Jo_h600_d4dc2c2fa3.jpg",
            hash: "medium_q_Gjgp_n_A_Bs_R6km_X9sr_GD_5_N70_Oxlyw5isp_Ivp7a_P6k_Aor_GA_4_D2j_L_Fq_U_Smzw_L3_S_Mrwzy_Su_PS_56piq9_KMT_9_Iufi2q6xah_Ea_B9q_Dc_I7_W_Jo_h600_d4dc2c2fa3",
            mime: "image/jpeg",
            name: "medium_https://lh3.googleusercontent.com/qGjgp-nABsR6kmX9srGD5N70Oxlyw5ispIvp7aP6kAorGA4D2jLFqUSmzwL3SMrwzySuPS56piq9KMT-9Iufi2q6xahEaB9qDcI7WJo=h600",
            path: null,
            size: 115.08,
            width: 750,
            height: 482,
            provider_metadata: {
              public_id:
                "medium_q_Gjgp_n_A_Bs_R6km_X9sr_GD_5_N70_Oxlyw5isp_Ivp7a_P6k_Aor_GA_4_D2j_L_Fq_U_Smzw_L3_S_Mrwzy_Su_PS_56piq9_KMT_9_Iufi2q6xah_Ea_B9q_Dc_I7_W_Jo_h600_d4dc2c2fa3",
              resource_type: "image",
            },
          },
          thumbnail: {
            ext: "",
            url: "https://res.cloudinary.com/the-code-giant/image/upload/v1625737089/thumbnail_q_Gjgp_n_A_Bs_R6km_X9sr_GD_5_N70_Oxlyw5isp_Ivp7a_P6k_Aor_GA_4_D2j_L_Fq_U_Smzw_L3_S_Mrwzy_Su_PS_56piq9_KMT_9_Iufi2q6xah_Ea_B9q_Dc_I7_W_Jo_h600_d4dc2c2fa3.jpg",
            hash: "thumbnail_q_Gjgp_n_A_Bs_R6km_X9sr_GD_5_N70_Oxlyw5isp_Ivp7a_P6k_Aor_GA_4_D2j_L_Fq_U_Smzw_L3_S_Mrwzy_Su_PS_56piq9_KMT_9_Iufi2q6xah_Ea_B9q_Dc_I7_W_Jo_h600_d4dc2c2fa3",
            mime: "image/jpeg",
            name: "thumbnail_https://lh3.googleusercontent.com/qGjgp-nABsR6kmX9srGD5N70Oxlyw5ispIvp7aP6kAorGA4D2jLFqUSmzwL3SMrwzySuPS56piq9KMT-9Iufi2q6xahEaB9qDcI7WJo=h600",
            path: null,
            size: 18.82,
            width: 243,
            height: 156,
            provider_metadata: {
              public_id:
                "thumbnail_q_Gjgp_n_A_Bs_R6km_X9sr_GD_5_N70_Oxlyw5isp_Ivp7a_P6k_Aor_GA_4_D2j_L_Fq_U_Smzw_L3_S_Mrwzy_Su_PS_56piq9_KMT_9_Iufi2q6xah_Ea_B9q_Dc_I7_W_Jo_h600_d4dc2c2fa3",
              resource_type: "image",
            },
          },
        },
        hash: "q_Gjgp_n_A_Bs_R6km_X9sr_GD_5_N70_Oxlyw5isp_Ivp7a_P6k_Aor_GA_4_D2j_L_Fq_U_Smzw_L3_S_Mrwzy_Su_PS_56piq9_KMT_9_Iufi2q6xah_Ea_B9q_Dc_I7_W_Jo_h600_d4dc2c2fa3",
        ext: "",
        mime: "image/jpeg",
        size: 159.6,
        url: "https://res.cloudinary.com/the-code-giant/image/upload/v1625737089/q_Gjgp_n_A_Bs_R6km_X9sr_GD_5_N70_Oxlyw5isp_Ivp7a_P6k_Aor_GA_4_D2j_L_Fq_U_Smzw_L3_S_Mrwzy_Su_PS_56piq9_KMT_9_Iufi2q6xah_Ea_B9q_Dc_I7_W_Jo_h600_d4dc2c2fa3.jpg",
        previewUrl: null,
        provider: "cloudinary",
        provider_metadata: {
          public_id:
            "q_Gjgp_n_A_Bs_R6km_X9sr_GD_5_N70_Oxlyw5isp_Ivp7a_P6k_Aor_GA_4_D2j_L_Fq_U_Smzw_L3_S_Mrwzy_Su_PS_56piq9_KMT_9_Iufi2q6xah_Ea_B9q_Dc_I7_W_Jo_h600_d4dc2c2fa3",
          resource_type: "image",
        },
        created_at: "2021-07-08T09:38:11.085Z",
        updated_at: "2021-07-08T09:38:11.195Z",
      },
    },
    collectionImageURL: {
      id: 50,
      name: "unnamed (2).png",
      alternativeText: "",
      caption: "",
      width: 120,
      height: 120,
      formats: null,
      hash: "unnamed_2_2683685bc2",
      ext: ".png",
      mime: "image/png",
      size: 25.65,
      url: "https://res.cloudinary.com/the-code-giant/image/upload/v1625396805/unnamed_2_2683685bc2.png",
      previewUrl: null,
      provider: "cloudinary",
      provider_metadata: {
        public_id: "unnamed_2_2683685bc2",
        resource_type: "image",
      },
      created_at: "2021-07-04T11:06:46.012Z",
      updated_at: "2021-07-04T11:06:46.062Z",
    },
    collectionBanner: {
      id: 50,
      name: "unnamed (2).png",
      alternativeText: "",
      caption: "",
      width: 120,
      height: 120,
      formats: null,
      hash: "unnamed_2_2683685bc2",
      ext: ".png",
      mime: "image/png",
      size: 25.65,
      url: "https://res.cloudinary.com/the-code-giant/image/upload/v1625396805/unnamed_2_2683685bc2.png",
      previewUrl: null,
      provider: "cloudinary",
      provider_metadata: {
        public_id: "unnamed_2_2683685bc2",
        resource_type: "image",
      },
      created_at: "2021-07-04T11:06:46.012Z",
      updated_at: "2021-07-04T11:06:46.062Z",
    },
  },
  {
    id: 6,
    slug: "atixi",
    name: null,
    published_at: "2021-07-08T09:42:59.346Z",
    created_at: "2021-07-08T09:42:56.255Z",
    updated_at: "2021-07-08T09:45:40.874Z",
    collectionName: "atixi",
    talent: {
      id: 2,
      address: null,
      user: null,
      published_at: "2021-07-08T09:38:41.767Z",
      created_at: "2021-07-08T09:38:38.441Z",
      updated_at: "2021-07-08T09:45:40.882Z",
      userName: "atixi",
      talentName: "atixi",
      bio: "asdf",
      isVisible: true,
      isVerified: true,
      walletAddress: "0xff6539f953eb682d442c70ae0a9e186dd9668ca2",
      talentAvatar: {
        id: 54,
        name: "unnamed.png",
        alternativeText: "",
        caption: "",
        width: 512,
        height: 512,
        formats: {
          small: {
            ext: ".png",
            url: "https://res.cloudinary.com/the-code-giant/image/upload/v1625737043/small_unnamed_1ab6b17238.png",
            hash: "small_unnamed_1ab6b17238",
            mime: "image/png",
            name: "small_unnamed.png",
            path: null,
            size: 94.34,
            width: 500,
            height: 500,
            provider_metadata: {
              public_id: "small_unnamed_1ab6b17238",
              resource_type: "image",
            },
          },
          thumbnail: {
            ext: ".png",
            url: "https://res.cloudinary.com/the-code-giant/image/upload/v1625737042/thumbnail_unnamed_1ab6b17238.png",
            hash: "thumbnail_unnamed_1ab6b17238",
            mime: "image/png",
            name: "thumbnail_unnamed.png",
            path: null,
            size: 11.42,
            width: 156,
            height: 156,
            provider_metadata: {
              public_id: "thumbnail_unnamed_1ab6b17238",
              resource_type: "image",
            },
          },
        },
        hash: "unnamed_1ab6b17238",
        ext: ".png",
        mime: "image/png",
        size: 85,
        url: "https://res.cloudinary.com/the-code-giant/image/upload/v1625737042/unnamed_1ab6b17238.png",
        previewUrl: null,
        provider: "cloudinary",
        provider_metadata: {
          public_id: "unnamed_1ab6b17238",
          resource_type: "image",
        },
        created_at: "2021-07-08T09:37:23.602Z",
        updated_at: "2021-07-08T09:37:23.619Z",
      },
      talentBanner: {
        id: 55,
        name: "https://lh3.googleusercontent.com/qGjgp-nABsR6kmX9srGD5N70Oxlyw5ispIvp7aP6kAorGA4D2jLFqUSmzwL3SMrwzySuPS56piq9KMT-9Iufi2q6xahEaB9qDcI7WJo=h600",
        alternativeText: "",
        caption: "",
        width: 933,
        height: 600,
        formats: {
          small: {
            ext: "",
            url: "https://res.cloudinary.com/the-code-giant/image/upload/v1625737090/small_q_Gjgp_n_A_Bs_R6km_X9sr_GD_5_N70_Oxlyw5isp_Ivp7a_P6k_Aor_GA_4_D2j_L_Fq_U_Smzw_L3_S_Mrwzy_Su_PS_56piq9_KMT_9_Iufi2q6xah_Ea_B9q_Dc_I7_W_Jo_h600_d4dc2c2fa3.jpg",
            hash: "small_q_Gjgp_n_A_Bs_R6km_X9sr_GD_5_N70_Oxlyw5isp_Ivp7a_P6k_Aor_GA_4_D2j_L_Fq_U_Smzw_L3_S_Mrwzy_Su_PS_56piq9_KMT_9_Iufi2q6xah_Ea_B9q_Dc_I7_W_Jo_h600_d4dc2c2fa3",
            mime: "image/jpeg",
            name: "small_https://lh3.googleusercontent.com/qGjgp-nABsR6kmX9srGD5N70Oxlyw5ispIvp7aP6kAorGA4D2jLFqUSmzwL3SMrwzySuPS56piq9KMT-9Iufi2q6xahEaB9qDcI7WJo=h600",
            path: null,
            size: 62.48,
            width: 500,
            height: 322,
            provider_metadata: {
              public_id:
                "small_q_Gjgp_n_A_Bs_R6km_X9sr_GD_5_N70_Oxlyw5isp_Ivp7a_P6k_Aor_GA_4_D2j_L_Fq_U_Smzw_L3_S_Mrwzy_Su_PS_56piq9_KMT_9_Iufi2q6xah_Ea_B9q_Dc_I7_W_Jo_h600_d4dc2c2fa3",
              resource_type: "image",
            },
          },
          medium: {
            ext: "",
            url: "https://res.cloudinary.com/the-code-giant/image/upload/v1625737090/medium_q_Gjgp_n_A_Bs_R6km_X9sr_GD_5_N70_Oxlyw5isp_Ivp7a_P6k_Aor_GA_4_D2j_L_Fq_U_Smzw_L3_S_Mrwzy_Su_PS_56piq9_KMT_9_Iufi2q6xah_Ea_B9q_Dc_I7_W_Jo_h600_d4dc2c2fa3.jpg",
            hash: "medium_q_Gjgp_n_A_Bs_R6km_X9sr_GD_5_N70_Oxlyw5isp_Ivp7a_P6k_Aor_GA_4_D2j_L_Fq_U_Smzw_L3_S_Mrwzy_Su_PS_56piq9_KMT_9_Iufi2q6xah_Ea_B9q_Dc_I7_W_Jo_h600_d4dc2c2fa3",
            mime: "image/jpeg",
            name: "medium_https://lh3.googleusercontent.com/qGjgp-nABsR6kmX9srGD5N70Oxlyw5ispIvp7aP6kAorGA4D2jLFqUSmzwL3SMrwzySuPS56piq9KMT-9Iufi2q6xahEaB9qDcI7WJo=h600",
            path: null,
            size: 115.08,
            width: 750,
            height: 482,
            provider_metadata: {
              public_id:
                "medium_q_Gjgp_n_A_Bs_R6km_X9sr_GD_5_N70_Oxlyw5isp_Ivp7a_P6k_Aor_GA_4_D2j_L_Fq_U_Smzw_L3_S_Mrwzy_Su_PS_56piq9_KMT_9_Iufi2q6xah_Ea_B9q_Dc_I7_W_Jo_h600_d4dc2c2fa3",
              resource_type: "image",
            },
          },
          thumbnail: {
            ext: "",
            url: "https://res.cloudinary.com/the-code-giant/image/upload/v1625737089/thumbnail_q_Gjgp_n_A_Bs_R6km_X9sr_GD_5_N70_Oxlyw5isp_Ivp7a_P6k_Aor_GA_4_D2j_L_Fq_U_Smzw_L3_S_Mrwzy_Su_PS_56piq9_KMT_9_Iufi2q6xah_Ea_B9q_Dc_I7_W_Jo_h600_d4dc2c2fa3.jpg",
            hash: "thumbnail_q_Gjgp_n_A_Bs_R6km_X9sr_GD_5_N70_Oxlyw5isp_Ivp7a_P6k_Aor_GA_4_D2j_L_Fq_U_Smzw_L3_S_Mrwzy_Su_PS_56piq9_KMT_9_Iufi2q6xah_Ea_B9q_Dc_I7_W_Jo_h600_d4dc2c2fa3",
            mime: "image/jpeg",
            name: "thumbnail_https://lh3.googleusercontent.com/qGjgp-nABsR6kmX9srGD5N70Oxlyw5ispIvp7aP6kAorGA4D2jLFqUSmzwL3SMrwzySuPS56piq9KMT-9Iufi2q6xahEaB9qDcI7WJo=h600",
            path: null,
            size: 18.82,
            width: 243,
            height: 156,
            provider_metadata: {
              public_id:
                "thumbnail_q_Gjgp_n_A_Bs_R6km_X9sr_GD_5_N70_Oxlyw5isp_Ivp7a_P6k_Aor_GA_4_D2j_L_Fq_U_Smzw_L3_S_Mrwzy_Su_PS_56piq9_KMT_9_Iufi2q6xah_Ea_B9q_Dc_I7_W_Jo_h600_d4dc2c2fa3",
              resource_type: "image",
            },
          },
        },
        hash: "q_Gjgp_n_A_Bs_R6km_X9sr_GD_5_N70_Oxlyw5isp_Ivp7a_P6k_Aor_GA_4_D2j_L_Fq_U_Smzw_L3_S_Mrwzy_Su_PS_56piq9_KMT_9_Iufi2q6xah_Ea_B9q_Dc_I7_W_Jo_h600_d4dc2c2fa3",
        ext: "",
        mime: "image/jpeg",
        size: 159.6,
        url: "https://res.cloudinary.com/the-code-giant/image/upload/v1625737089/q_Gjgp_n_A_Bs_R6km_X9sr_GD_5_N70_Oxlyw5isp_Ivp7a_P6k_Aor_GA_4_D2j_L_Fq_U_Smzw_L3_S_Mrwzy_Su_PS_56piq9_KMT_9_Iufi2q6xah_Ea_B9q_Dc_I7_W_Jo_h600_d4dc2c2fa3.jpg",
        previewUrl: null,
        provider: "cloudinary",
        provider_metadata: {
          public_id:
            "q_Gjgp_n_A_Bs_R6km_X9sr_GD_5_N70_Oxlyw5isp_Ivp7a_P6k_Aor_GA_4_D2j_L_Fq_U_Smzw_L3_S_Mrwzy_Su_PS_56piq9_KMT_9_Iufi2q6xah_Ea_B9q_Dc_I7_W_Jo_h600_d4dc2c2fa3",
          resource_type: "image",
        },
        created_at: "2021-07-08T09:38:11.085Z",
        updated_at: "2021-07-08T09:38:11.195Z",
      },
    },
    collectionImageURL: {
      id: 54,
      name: "unnamed.png",
      alternativeText: "",
      caption: "",
      width: 512,
      height: 512,
      formats: {
        small: {
          ext: ".png",
          url: "https://res.cloudinary.com/the-code-giant/image/upload/v1625737043/small_unnamed_1ab6b17238.png",
          hash: "small_unnamed_1ab6b17238",
          mime: "image/png",
          name: "small_unnamed.png",
          path: null,
          size: 94.34,
          width: 500,
          height: 500,
          provider_metadata: {
            public_id: "small_unnamed_1ab6b17238",
            resource_type: "image",
          },
        },
        thumbnail: {
          ext: ".png",
          url: "https://res.cloudinary.com/the-code-giant/image/upload/v1625737042/thumbnail_unnamed_1ab6b17238.png",
          hash: "thumbnail_unnamed_1ab6b17238",
          mime: "image/png",
          name: "thumbnail_unnamed.png",
          path: null,
          size: 11.42,
          width: 156,
          height: 156,
          provider_metadata: {
            public_id: "thumbnail_unnamed_1ab6b17238",
            resource_type: "image",
          },
        },
      },
      hash: "unnamed_1ab6b17238",
      ext: ".png",
      mime: "image/png",
      size: 85,
      url: "https://res.cloudinary.com/the-code-giant/image/upload/v1625737042/unnamed_1ab6b17238.png",
      previewUrl: null,
      provider: "cloudinary",
      provider_metadata: {
        public_id: "unnamed_1ab6b17238",
        resource_type: "image",
      },
      created_at: "2021-07-08T09:37:23.602Z",
      updated_at: "2021-07-08T09:37:23.619Z",
    },
    collectionBanner: {
      id: 56,
      name: "tokyo-japan-chureito-red-pagoda-and-mount-fuji.jpg",
      alternativeText: "",
      caption: "",
      width: 750,
      height: 320,
      formats: {
        small: {
          ext: ".jpg",
          url: "https://res.cloudinary.com/the-code-giant/image/upload/v1625737360/small_tokyo_japan_chureito_red_pagoda_and_mount_fuji_db4def195a.jpg",
          hash: "small_tokyo_japan_chureito_red_pagoda_and_mount_fuji_db4def195a",
          mime: "image/jpeg",
          name: "small_tokyo-japan-chureito-red-pagoda-and-mount-fuji.jpg",
          path: null,
          size: 24.97,
          width: 500,
          height: 213,
          provider_metadata: {
            public_id:
              "small_tokyo_japan_chureito_red_pagoda_and_mount_fuji_db4def195a",
            resource_type: "image",
          },
        },
        thumbnail: {
          ext: ".jpg",
          url: "https://res.cloudinary.com/the-code-giant/image/upload/v1625737360/thumbnail_tokyo_japan_chureito_red_pagoda_and_mount_fuji_db4def195a.jpg",
          hash: "thumbnail_tokyo_japan_chureito_red_pagoda_and_mount_fuji_db4def195a",
          mime: "image/jpeg",
          name: "thumbnail_tokyo-japan-chureito-red-pagoda-and-mount-fuji.jpg",
          path: null,
          size: 6.47,
          width: 245,
          height: 105,
          provider_metadata: {
            public_id:
              "thumbnail_tokyo_japan_chureito_red_pagoda_and_mount_fuji_db4def195a",
            resource_type: "image",
          },
        },
      },
      hash: "tokyo_japan_chureito_red_pagoda_and_mount_fuji_db4def195a",
      ext: ".jpg",
      mime: "image/jpeg",
      size: 58.91,
      url: "https://res.cloudinary.com/the-code-giant/image/upload/v1625737360/tokyo_japan_chureito_red_pagoda_and_mount_fuji_db4def195a.jpg",
      previewUrl: null,
      provider: "cloudinary",
      provider_metadata: {
        public_id: "tokyo_japan_chureito_red_pagoda_and_mount_fuji_db4def195a",
        resource_type: "image",
      },
      created_at: "2021-07-08T09:42:41.239Z",
      updated_at: "2021-07-08T09:42:41.261Z",
    },
  },
];

export const localCategories = [
  {
    id: 2,
    name: null,
    icon: "🌈",
    none_fungible_token: null,
    published_at: "2021-07-07T05:03:30.419Z",
    created_at: "2021-07-07T05:03:27.399Z",
    updated_at: "2021-07-08T12:30:13.251Z",
    nft_cat: null,
    nftIds: null,
    nftCatId: null,
    categoryName: "Art",
    slug: "art",
  },
  {
    id: 8,
    name: null,
    icon: "💰",
    none_fungible_token: null,
    published_at: "2021-07-07T05:08:49.563Z",
    created_at: "2021-07-07T05:08:46.827Z",
    updated_at: "2021-07-08T12:48:29.405Z",
    nft_cat: null,
    nftIds: null,
    nftCatId: null,
    categoryName: "DeFi",
    slug: "DeFi",
    categoryImage: {
      id: 58,
      name: "https://worldfinancialreview.com/wp-content/uploads/2021/01/defieth.jpg",
      alternativeText: "",
      caption: "",
      width: 800,
      height: 600,
      formats: {
        small: {
          ext: ".jpg",
          url: "https://res.cloudinary.com/the-code-giant/image/upload/v1625748500/small_defieth_7e356b3a36.jpg",
          hash: "small_defieth_7e356b3a36",
          mime: "image/jpeg",
          name: "small_https://worldfinancialreview.com/wp-content/uploads/2021/01/defieth.jpg",
          path: null,
          size: 41.2,
          width: 500,
          height: 375,
          provider_metadata: {
            public_id: "small_defieth_7e356b3a36",
            resource_type: "image",
          },
        },
        medium: {
          ext: ".jpg",
          url: "https://res.cloudinary.com/the-code-giant/image/upload/v1625748499/medium_defieth_7e356b3a36.jpg",
          hash: "medium_defieth_7e356b3a36",
          mime: "image/jpeg",
          name: "medium_https://worldfinancialreview.com/wp-content/uploads/2021/01/defieth.jpg",
          path: null,
          size: 74.43,
          width: 750,
          height: 563,
          provider_metadata: {
            public_id: "medium_defieth_7e356b3a36",
            resource_type: "image",
          },
        },
        thumbnail: {
          ext: ".jpg",
          url: "https://res.cloudinary.com/the-code-giant/image/upload/v1625748499/thumbnail_defieth_7e356b3a36.jpg",
          hash: "thumbnail_defieth_7e356b3a36",
          mime: "image/jpeg",
          name: "thumbnail_https://worldfinancialreview.com/wp-content/uploads/2021/01/defieth.jpg",
          path: null,
          size: 8.93,
          width: 208,
          height: 156,
          provider_metadata: {
            public_id: "thumbnail_defieth_7e356b3a36",
            resource_type: "image",
          },
        },
      },
      hash: "defieth_7e356b3a36",
      ext: ".jpg",
      mime: "image/jpeg",
      size: 83.02,
      url: "https://res.cloudinary.com/the-code-giant/image/upload/v1625748499/defieth_7e356b3a36.jpg",
      previewUrl: null,
      provider: "cloudinary",
      provider_metadata: {
        public_id: "defieth_7e356b3a36",
        resource_type: "image",
      },
      created_at: "2021-07-08T12:48:21.077Z",
      updated_at: "2021-07-08T12:48:21.102Z",
    },
    nfts: [],
  },
  {
    id: 7,
    name: null,
    icon: "🏷",
    none_fungible_token: null,
    published_at: "2021-07-07T05:08:18.329Z",
    created_at: "2021-07-07T05:07:42.261Z",
    updated_at: "2021-07-08T12:50:29.547Z",
    nft_cat: null,
    nftIds: null,
    nftCatId: null,
    categoryName: "Domains",
    slug: "domains",
    categoryImage: {
      id: 59,
      name: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRgcn8__P7vZ0Y8gNp-04piMsjk4W1YIpfOTGkc9JBPYVLMcqlk3YkDRr32rX1XRJfQDXA&usqp=CAU",
      alternativeText: "",
      caption: "",
      width: 270,
      height: 187,
      formats: {
        thumbnail: {
          ext: "",
          url: "https://res.cloudinary.com/the-code-giant/image/upload/v1625748622/thumbnail_images_q_tbn_A_Nd9_Gc_Rgcn8_P7v_Z0_Y8g_Np_04pi_Msjk4_W1_Y_Ipf_OT_Gkc9_JBPYVL_Mcqlk3_Yk_D_Rr32r_X1_XR_Jf_QDXA_and_usqp_CAU_a0ecbb3713.jpg",
          hash: "thumbnail_images_q_tbn_A_Nd9_Gc_Rgcn8_P7v_Z0_Y8g_Np_04pi_Msjk4_W1_Y_Ipf_OT_Gkc9_JBPYVL_Mcqlk3_Yk_D_Rr32r_X1_XR_Jf_QDXA_and_usqp_CAU_a0ecbb3713",
          mime: "image/jpeg",
          name: "thumbnail_https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRgcn8__P7vZ0Y8gNp-04piMsjk4W1YIpfOTGkc9JBPYVLMcqlk3YkDRr32rX1XRJfQDXA&usqp=CAU",
          path: null,
          size: 8.87,
          width: 225,
          height: 156,
          provider_metadata: {
            public_id:
              "thumbnail_images_q_tbn_A_Nd9_Gc_Rgcn8_P7v_Z0_Y8g_Np_04pi_Msjk4_W1_Y_Ipf_OT_Gkc9_JBPYVL_Mcqlk3_Yk_D_Rr32r_X1_XR_Jf_QDXA_and_usqp_CAU_a0ecbb3713",
            resource_type: "image",
          },
        },
      },
      hash: "images_q_tbn_A_Nd9_Gc_Rgcn8_P7v_Z0_Y8g_Np_04pi_Msjk4_W1_Y_Ipf_OT_Gkc9_JBPYVL_Mcqlk3_Yk_D_Rr32r_X1_XR_Jf_QDXA_and_usqp_CAU_a0ecbb3713",
      ext: "",
      mime: "image/jpeg",
      size: 7.82,
      url: "https://res.cloudinary.com/the-code-giant/image/upload/v1625748621/images_q_tbn_A_Nd9_Gc_Rgcn8_P7v_Z0_Y8g_Np_04pi_Msjk4_W1_Y_Ipf_OT_Gkc9_JBPYVL_Mcqlk3_Yk_D_Rr32r_X1_XR_Jf_QDXA_and_usqp_CAU_a0ecbb3713.jpg",
      previewUrl: null,
      provider: "cloudinary",
      provider_metadata: {
        public_id:
          "images_q_tbn_A_Nd9_Gc_Rgcn8_P7v_Z0_Y8g_Np_04pi_Msjk4_W1_Y_Ipf_OT_Gkc9_JBPYVL_Mcqlk3_Yk_D_Rr32r_X1_XR_Jf_QDXA_and_usqp_CAU_a0ecbb3713",
        resource_type: "image",
      },
      created_at: "2021-07-08T12:50:22.867Z",
      updated_at: "2021-07-08T12:50:22.886Z",
    },
    nfts: [],
  },
  {
    id: 4,
    name: null,
    icon: "🕹",
    none_fungible_token: null,
    published_at: "2021-07-07T05:05:50.634Z",
    created_at: "2021-07-07T05:05:47.811Z",
    updated_at: "2021-07-08T12:54:39.835Z",
    nft_cat: null,
    nftIds: null,
    nftCatId: null,
    categoryName: "Games",
    slug: "games",
    categoryImage: {
      id: 60,
      name: "107576477-photo-closeup-of-teenage-gamer-guy-playing-video-games-online-on-computer-in-dark-room-wearing-headp.jpg",
      alternativeText: "",
      caption: "",
      width: 450,
      height: 300,
      formats: {
        thumbnail: {
          ext: ".jpg",
          url: "https://res.cloudinary.com/the-code-giant/image/upload/v1625748874/thumbnail_107576477_photo_closeup_of_teenage_gamer_guy_playing_video_games_online_on_computer_in_dark_room_wearing_headp_cf9d47de2e.jpg",
          hash: "thumbnail_107576477_photo_closeup_of_teenage_gamer_guy_playing_video_games_online_on_computer_in_dark_room_wearing_headp_cf9d47de2e",
          mime: "image/jpeg",
          name: "thumbnail_107576477-photo-closeup-of-teenage-gamer-guy-playing-video-games-online-on-computer-in-dark-room-wearing-headp.jpg",
          path: null,
          size: 9.03,
          width: 234,
          height: 156,
          provider_metadata: {
            public_id:
              "thumbnail_107576477_photo_closeup_of_teenage_gamer_guy_playing_video_games_online_on_computer_in_dark_room_wearing_headp_cf9d47de2e",
            resource_type: "image",
          },
        },
      },
      hash: "107576477_photo_closeup_of_teenage_gamer_guy_playing_video_games_online_on_computer_in_dark_room_wearing_headp_cf9d47de2e",
      ext: ".jpg",
      mime: "image/jpeg",
      size: 21.72,
      url: "https://res.cloudinary.com/the-code-giant/image/upload/v1625748873/107576477_photo_closeup_of_teenage_gamer_guy_playing_video_games_online_on_computer_in_dark_room_wearing_headp_cf9d47de2e.jpg",
      previewUrl: null,
      provider: "cloudinary",
      provider_metadata: {
        public_id:
          "107576477_photo_closeup_of_teenage_gamer_guy_playing_video_games_online_on_computer_in_dark_room_wearing_headp_cf9d47de2e",
        resource_type: "image",
      },
      created_at: "2021-07-08T12:54:34.524Z",
      updated_at: "2021-07-08T12:54:34.538Z",
    },
    nfts: [],
  },
  {
    id: 9,
    name: null,
    icon: "🤡",
    none_fungible_token: null,
    published_at: "2021-07-07T05:09:17.104Z",
    created_at: "2021-07-07T05:09:14.976Z",
    updated_at: "2021-07-08T12:56:21.703Z",
    nft_cat: null,
    nftIds: null,
    nftCatId: null,
    categoryName: "Memes",
    slug: "memes",
  },
  {
    id: 5,
    name: null,
    icon: "👾",
    none_fungible_token: null,
    published_at: "2021-07-07T05:06:43.174Z",
    created_at: "2021-07-07T05:06:40.684Z",
    updated_at: "2021-07-08T12:59:15.477Z",
    nft_cat: null,
    nftIds: null,
    nftCatId: null,
    categoryName: "Metaverses",
    slug: "metaverses",
  },
  {
    id: 6,
    name: null,
    icon: "🎵",
    none_fungible_token: null,
    published_at: "2021-07-07T05:07:12.469Z",
    created_at: "2021-07-07T05:07:10.160Z",
    updated_at: "2021-07-08T13:02:28.468Z",
    nft_cat: null,
    nftIds: null,
    nftCatId: null,
    categoryName: "Music",
    slug: "music",
  },
  {
    id: 3,
    name: null,
    icon: "📸",
    none_fungible_token: null,
    published_at: "2021-07-07T05:04:17.961Z",
    created_at: "2021-07-07T05:04:15.300Z",
    updated_at: "2021-07-08T13:04:52.572Z",
    nft_cat: null,
    nftIds: null,
    nftCatId: null,
    categoryName: "Photography",
    slug: "photography",
  },
  {
    id: 10,
    name: null,
    icon: "🤘",
    none_fungible_token: null,
    published_at: "2021-07-07T05:09:45.438Z",
    created_at: "2021-07-07T05:09:42.631Z",
    updated_at: "2021-07-08T13:07:34.298Z",
    nft_cat: null,
    nftIds: null,
    nftCatId: null,
    categoryName: "Punks",
    slug: "punks",
  },
  {
    id: 1,
    name: null,
    icon: null,
    none_fungible_token: null,
    published_at: "2021-07-07T05:02:38.496Z",
    created_at: "2021-07-07T05:02:32.774Z",
    updated_at: "2021-07-08T13:11:58.203Z",
    nft_cat: null,
    nftIds: null,
    nftCatId: null,
    categoryName: "All",
    slug: "all",
  },
];
