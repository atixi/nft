import * as Web3 from "web3";

import { EventType, Network, OpenSeaPort } from "opensea-js";
import {
  differenceInSeconds,
  intervalToDuration,
  secondsToMilliseconds,
} from "date-fns";
import { fetch, post } from "./strapiApi";

import CustomNotification from "@/components/commons/customNotification";
import Onboard from "bnc-onboard";
import { OrderSide } from "opensea-js/lib/types";
import { capitalizeWord } from "./mintApi";
import fromUnix from "date-fns/fromUnixTime";
import { getAuctionPriceDetails } from "/Constants/constants";
import { isMobileDevice } from "Constants/constants";
import moment from "moment";

const STRAPI_BASE_URL = process.env.HEROKU_BASE_URL;
// const STRAPI_BASE_URL = process.env.HEROKU_BASE_TNC;
// const STRAPI_BASE_URL = process.env.STRAPI_LOCAL_BASE_URL;
const referrerAddress = process.env.REF_ADDRESS;
const NETWORK_NAME = process.env.NETWORK_NAME; //here
export const seaportProvider = new Web3.providers.HttpProvider(
  "https://mainnet.infura.io"
  // 'https://rinkeby-api.opensea.io/api/v1/'
);
export function seaport() {
  const provider = window.ethereum;
  return new OpenSeaPort(provider, {
    networkName: Network.Main,
    apiKey: "2e7ef0ac679f4860bbe49a34a98cf5ac",
  });
}
export async function makeOffer(
  offerData,
  asset,
  isBundle,
  assets,
  accountAddress
) {
  const { tokenId, tokenAddress } = asset;
  let err = false;
  if (isBundle) {
    var expirationTime = null;
    if (offerData.dateTime.days == "custom") {
      var date = new Date(offerData.dateTime.date);
      expirationTime = date.getTime() / 1000;
    } else {
      let time = moment(offerData.dateTime.time).format("HH:mm:ss");
      let timeInSeconds = moment(t, "HH:mm:ss:").diff(
        moment().startOf("day"),
        "seconds"
      );
      expirationTime = Math.round(
        Date.now() / 1000 + (offerData.dateTime.days * 24 * 60 * 60 + time)
      );
    }
    try {
      let bundleResult = await seaport().createBundleBuyOrder({
        assets,
        accountAddress,
        startAmount: offerData.price.amount,
        expirationTime: parseInt(expirationTime),
        referrerAddress,
      });
      return {
        success: true,
        message: "Offer is saved",
        transactionHash: bundleResult?.transactionHash,
      };
    } catch (e) {
      return {
        success: false,
        message: e.message,
      };
    }
  } else {
    try {
      let directOffer = await seaport().createBuyOrder({
        asset: {
          tokenId,
          tokenAddress,
        },
        accountAddress,
        startAmount: offerData.price.amount,
        referrerAddress,
      });
      return {
        success: true,
        message: "Offer is saved",
        transactionHash: directOffer.transactionHash,
      };
    } catch (e) {
      return {
        success: false,
        message: e.message,
      };
    }
  }
}
export async function buyOrder(asset, isBundle, order, accountAddress) {
  if (isBundle) {
    try {
      const transactionHash = await seaport().fulfillOrder({
        order,
        accountAddress,
        referrerAddress,
      });
      return {
        success: true,
        transactionHash,
      };
    } catch (e) {
      return {
        success: false,
        message: e.message,
      };
    }
  } else {
    try {
      const order = await seaport().api.getOrder({
        side: OrderSide.Sell,
        asset_contract_address: asset.tokenAddress,
        token_id: asset.tokenId,
      });
      const transactionHash = await seaport().fulfillOrder({
        order,
        accountAddress,
        referrerAddress,
      });
      return { success: true, transactionHash };
    } catch (e) {
      return {
        success: false,
        message: e.message,
      };
    }
  }
}
export async function acceptThisOffer(order, address) {
  try {
    const accountAddress = address; // The owner's wallet address, also the taker
    return await seaport().fulfillOrder({ order, accountAddress });
  } catch (e) {
    return e;
  }
}
export async function cancelThisOffer(order, accountAddress) {
  await seaport()._dispatch(EventType.CancelOrder, { order, accountAddress });

  const gasPrice = await seaport()._computeGasPrice();
  const transactionHash =
    await seaport()._wyvernProtocol.wyvernExchange.cancelOrder_.sendTransactionAsync(
      [
        order.exchange,
        order.maker,
        order.taker,
        order.feeRecipient,
        order.target,
        order.staticTarget,
        order.paymentToken,
      ],
      [
        order.makerRelayerFee,
        order.takerRelayerFee,
        order.makerProtocolFee,
        order.takerProtocolFee,
        order.basePrice,
        order.extra,
        order.listingTime,
        order.expirationTime,
        order.salt,
      ],
      order.feeMethod,
      order.side,
      order.saleKind,
      order.howToCall,
      order.calldata,
      order.replacementPattern,
      order.staticExtradata,
      order.v || 0,
      order.r || NULL_BLOCK_HASH,
      order.s || NULL_BLOCK_HASH,
      { from: accountAddress, gasPrice }
    );

  await seaport()._confirmTransaction(
    transactionHash.toString(),
    EventType.CancelOrder,
    "Cancelling order",
    async () => {
      const isOpen = await seaport()._validateOrder(order);
      return !isOpen;
    }
  );
}

export async function sellOrder(
  tokenAddress,
  tokenId,
  address,
  contractAddress,
  orderValue,
  fixed
) {
  let bounty = 0.0;
  if (orderValue.bounty.bounty !== undefined) {
    bounty = orderValue.bounty.bounty;
  }
  try {
    if (fixed) {
      if (orderValue.switch.includeEnd) {
        if (orderValue.date.expirationTime == undefined)
          return "Set the expiration time";
        var date = new Date(orderValue.date.expirationTime);
        var expirationTime = parseInt(date.getTime() / 1000);
        var result = await seaport().createSellOrder({
          asset: {
            tokenId,
            tokenAddress,
          },
          accountAddress: address,
          startAmount: orderValue.price.amount,
          endAmount: orderValue.price.endPrice,
          expirationTime,
          extraBountyBasisPoints: bounty * 100,
        });

        return result;
      } else if (orderValue.switch.futureTime) {
        var date = new Date(orderValue.date.futureTime);
        var listingTime = date.getTime() / 1000;
        const result = await seaport().createSellOrder({
          asset: {
            tokenId,
            tokenAddress,
          },
          accountAddress: address,
          startAmount: orderValue.price.amount,
          listingTime: listingTime,
          extraBountyBasisPoints: bounty * 100,
        });

        return result;
      } else {
        const result = await seaport().createSellOrder({
          asset: {
            tokenId,
            tokenAddress,
          },
          accountAddress: address,
          startAmount: orderValue.price.amount,
          extraBountyBasisPoints: bounty * 100,
        });

        return result;
      }
    } else {
      const paymentTokenAddress = "0xc778417e063141139fce010982780140aa0cd5ab";
      var date = new Date(orderValue.date.auctionExpirationTime);
      var expirationTime = parseInt(
        moment.duration(date).asMilliseconds() / 1000
      );
      console.log(expirationTime);

      const result = await seaport().createSellOrder({
        asset: {
          tokenId,
          tokenAddress,
        },
        accountAddress: address,
        startAmount: orderValue.price.minAmount,
        expirationTime,
        paymentTokenAddress,
        waitForHighestBid: true,
        extraBountyBasisPoints: bounty * 100,
      });

      return result;
    }
  } catch (e) {
    return e;
  }
}

export function unixToHumanDate(date, saleEndDate) {
  if (saleEndDate) {
    return moment.unix(date).format("LLLL");
  }
  return moment.unix(date).format("DD-MM-YYYY HH:m:s A");
}
export function unixToMilSeconds(date) {
  let duration = intervalToDuration({
    start: 0,
    end: differenceInSeconds(new Date(), fromUnix(date)) * 1000,
  });
  let seconds = 0;
  seconds += duration.days * 24 * 60 * 60;
  seconds += duration.hours * 60 * 60;
  seconds += duration.minutes * 60;
  seconds += duration.seconds;
  return Date.now() + secondsToMilliseconds(seconds);
}
export function checkName(name) {
  if (name != null && name != undefined && name != "NullAddress") return name;
  else return "Anonymous";
}
export function prevImage(url) {
  return url.replace(url.substring(url.length - 3), "0");
}
export function convertToUsd(offer) {
  let usd = null;
  usd =
    (parseFloat(getAuctionPriceDetails(offer).priceBase) *
      parseFloat(offer?.paymentTokenContract.usdPrice)) /
    parseFloat(offer?.paymentTokenContract.ethPrice);
  return parseInt(usd);
}
export function findHighestOffer(orders) {
  let offer = null;
  let max = null;
  (orders.length > 0) &
    orders.map((order) => {
      let price = parseFloat(getAuctionPriceDetails(order).priceBase);
      if (max < price) {
        offer = order;
        max = price;
      }
    });
  return offer;
}
export function displayAddress(address) {
  return (
    address &&
    address
      .toString()
      .replace(address.toString().substring(10, address.length - 10), ".....")
  );
}
export function detectVideo(url) {
  const formats = ["mp4", "mkv", "mov", "wmv", "avi", "flv", "webm"];
  const format = url.split(".").pop();
  if (formats.includes(format)) return true;
  else return false;
}

/**
 * this function is for generating slug for collection
 * @param string The name of collection
 */
export const slugify = (string) => {
  return string
    .trim()
    .toLowerCase()
    .replace(/^-+/g, "")
    .replace(/[^\w-]+/g, "-")
    .replace(/-+/g, "-")
    .replace(/-+$/g, "");
};

/**
 * this function checks if metamask is installed or not
 * return true or false
 */
export const isMetaMaskInstalled = () => {
  const { ethereum } = window;
  return Boolean(ethereum && ethereum.isMetaMask);
};

export const requestUnlockMetamask = async (action) => {
  if (isMobileDevice()) {
    console.log("mobie");
  } else {
    console.log("not mobile");
  }
  const { ethereum } = window;
  if (Boolean(ethereum)) {
    if (ethereum.isMetaMask) {
      const accounts = await ethereum.request({
        method: "eth_requestAccounts",
      });
      console.log("accounts are account", accounts);
      if (accounts.length > 0) {
        return {
          unlockAccepted: true,
          message: `You have to unlock your account ${action} `,
          action,
          account: accounts[0],
        };
      } else {
        return {
          unlockAccepted: false,
          message: `You Have Rejcted to unlock your Account ${action}`,
          account: null,
        };
      }
    }
  } else {
    alert("install metamask extension first");
  }
};

export function initOnboard(subscriptions) {
  const onboard = Onboard;
  return onboard({
    dappId: process.env.ONBOARD_API_KEY,
    hideBranding: false,
    networkId: 4,
    darkMode: true,
    subscriptions,
    walletSelect: {
      wallets: [
        {
          walletName: "metamask",
          rpcUrl:
            "https://rinkeby.infura.io/v3/c2dde5d7c0a0465a8e994f711a3a3c31",
        },
        // {
        //   walletName: 'walletConnect',
        //   infuraKey: 'cea9deb6467748b0b81b920b005c10c1'
        // },
      ],
    },
    walletCheck: [
      { checkName: "derivationPath" },
      { checkName: "connect" },
      { checkName: "accounts" },
      { checkName: "network" },
      { checkName: "balance", minimumBalance: "100000" },
    ],
  });
}

/**
 * Request the permission to get wallet addresses from metamask throwing error if window is not loaded
 */
export const getCurrentAccount = async () => {
  const web3 = new Web3(Web3.givenProvider);
  await window.ethereum.request({ method: "eth_requestAccounts" });
  const accounts = await web3.eth.getAccounts();
  let acts = accounts.map((account) => web3.utils.toChecksumAddress(account));
  return acts;
};

export function randomAvatar() {
  let randomNumber = Math.floor(Math.random() * 33 + 1);
  return (
    "https://storage.googleapis.com/opensea-static/opensea-profile/" +
    randomNumber +
    ".png"
  );
}

export const detectMetamaskInstalled = () => {
  if (typeof window.ethereum !== "undefined") {
    return false;
  } else {
    return true;
  }
};

export const checkTalentRegistered = async (wallet) => {
  try {
    return await fetch("/talents/talentexists", wallet);
  } catch (e) {
    return {
      success: false,
      message: "Server is not available",
    };
  }
};

export const registerTalent = async (account) => {
  const talentResult = await fetch(`/talents/talentexists/${account}`);
  if (talentResult.data) {
    const talentExists = await talentResult.data.success;
    if (!talentExists) {
      console.log("registreing user to backend", account);
      let talentData = new FormData();
      talentData.append("data", JSON.stringify({ walletAddress: account }));
      return post(`${STRAPI_BASE_URL}/talents`, talentData, {
        headers: {
          "Content-Type": `multipart/form-data`,
          "Content-Type": "application/json",
        },
      });
    }
  }
};

export const getBuyErrorMessage = (value) => {
  let errorMessage = "";

  if (value.includes("insufficient")) {
    errorMessage = value.split("err: ")[1].toString();
    errorMessage =
      capitalizeWord(errorMessage.substring(0, errorMessage.length - 4)) +
      " gas fees";
  } else if (
    value.includes(
      "401" ||
        value.includes("Invalid API key") ||
        value.includes("Unauthorized")
    )
  ) {
    return "Invalid API key";
  } else {
    errorMessage = value;
    console.log("error is ", value);
  }
  return errorMessage;
};

export const signTransaction = async (publicAddress, action, asset) => {
  try {
    const { ethereum } = window;
    let web3 = new Web3(ethereum);
    const signResult = await web3.eth.personal.sign(
      `${action} on: asset ${asset?.name}`,
      publicAddress
    );
    return {
      success: true,
      message: action,
      signResult,
    };
  } catch (e) {
    if (e.code == 4001) {
      CustomNotification("warning", "Metamask", e.message);
    } else {
      console.log("some shit error has happened");
    }
    return {
      success: false,
      message: e.message,
    };
  }
};
