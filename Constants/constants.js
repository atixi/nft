import * as Web3 from "web3";
import BigNumber from "bignumber.js";
import moment from "moment";

import { InjectedConnector } from "@web3-react/injected-connector";
import WalletConnectProvider from "@walletconnect/web3-provider";
import { fetch } from "Utils/strapiApi";
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
};

export const providers = {
  "0x4": "Rinkeby Network",
  "0x1": "Ethereum Main Network (Mainnet)",
  "0x3": "Ropsten Test Network",
  "0x5": "Goerli Test Network",
  "0x2a": "Kovan Test Network",
};

export const getTalentAccount = async (account) => {
  const accountResult = await fetch(`/talents/talentexists/${account}`);
  if (!accountResult.data)
    return {
      success: false,
      message: "Servier is not available",
    };
  return accountResult.data;
};

export const allowedImageTypes =
  "image/png,image/gif,image/jpeg,image/jpeg,image/gif,image/svg+xml";
