import moment from "moment";
import { getAuctionPriceDetails } from "/Constants/constants";
import {
  differenceInSeconds,
  intervalToDuration,
  secondsToMilliseconds,
} from "date-fns";
import fromUnix from "date-fns/fromUnixTime";
import * as Web3 from "web3";
import { OpenSeaPort, Network, EventType } from "opensea-js";
import { OrderSide } from "opensea-js/lib/types";
import { isMobileDevice } from "Constants/constants";
import detectEthereumProvider from "@metamask/detect-provider";

export const seaportProvider = new Web3.providers.HttpProvider(
  "https://rinkeby.infura.io/v3/c2dde5d7c0a0465a8e994f711a3a3c31"
  // 'https://rinkeby-api.opensea.io/api/v1/'
);
export function seaport()
{
  const provider = window.ethereum;
  const seaport = new OpenSeaPort(provider, {
    networkName: Network.Rinkeby,
    // apiKey: "c2dde5d7c0a0465a8e994f711a3a3c31",
  });
  return seaport;
}
export async function makeOffer(
  offerData,
  asset,
  isBundle,
  assets,
  accountAddress
) {
  const { tokenId, tokenAddress } = asset;
  const schemaName = "ERC721";
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
        Date.now() / 1000 + (offerData.dateTime.days * 24 * 60 * 60 + timme)
      );
    }
    return await seaport().createBundleBuyOrder({
      assets,
      accountAddress,
      startAmount: offerData.price.amount,
      expirationTime: parseInt(expirationTime),
    });
  } else {
    const referrerAddress = "0xe897B93557fb7D5B4dcA627a55181E52152cF035";
    return await seaport().createBuyOrder({
      asset: {
        tokenId,
        tokenAddress,
        schemaName, // WyvernSchemaName. If omitted, defaults to 'ERC721'. Other options include 'ERC20' and 'ERC1155'
      },
      accountAddress,
      // Value of the offer, in units of the payment token (or wrapped ETH if none is specified):
      startAmount: offerData.price.amount,
      referrerAddress,
    });
  }
}
export async function buyOrder(asset, isBundle, order, accountAddress) {
  try {
    if (isBundle) {
      const transactionHash = await seaport()
        .fulfillOrder({ order, accountAddress })
        .catch(() => {
          return "Error on buying the bundle";
        });
      return transactionHash;
    } else {
      const order = await seaport().api
        .getOrder({
          side: OrderSide.Sell,
          asset_contract_address: asset.tokenAddress,
          token_id: asset.tokenId,
        })
        .catch(() => {
          return "Error getting order";
        });
      const transactionHash = await seaport()
        .fulfillOrder({ order, accountAddress })
        .catch(() => {
          return "Error on buying the token";
        });
      return transactionHash;
    }
  } catch (e) {
    return e;
  }
}
export async function acceptThisOffer(order, address)
{
  try{
    const accountAddress = address // The owner's wallet address, also the taker
    return await seaport().fulfillOrder({ order, accountAddress })
  }
  catch(e)
  {
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
        });
        provider.engine.stop();
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
        });
        provider.engine.stop();
        return result;
      } else {
        const result = await seaport().createSellOrder({
          asset: {
            tokenId,
            tokenAddress,
          },
          accountAddress: address,
          startAmount: orderValue.price.amount,
        });
        provider.engine.stop();
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
      });
      provider.engine.stop();
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
  return address
    .toString()
    .replace(address.toString().substring(10, address.length - 10), ".....");
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
