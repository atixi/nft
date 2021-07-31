import moment from "moment";
import { getAuctionPriceDetails } from "/Constants/constants";
import { differenceInSeconds, intervalToDuration, secondsToMilliseconds } from 'date-fns';
import fromUnix from "date-fns/fromUnixTime";
import * as Web3 from "web3";
import { OpenSeaPort, Network } from "opensea-js";
import { OrderSide } from 'opensea-js/lib/types';
import { useSelector } from "react-redux";
import { getAccountTokens, getWalletConnected, getMetaConnected } from "store/action/accountSlice";
export const seaportProvider = new Web3.providers.HttpProvider(
  "https://rinkeby.infura.io/v3/c2dde5d7c0a0465a8e994f711a3a3c31"
  // 'https://rinkeby-api.opensea.io/api/v1/'
);
const HDWalletProvider = require("@truffle/hdwallet-provider");
const mnemonicPhrase = "decrease lucky scare inherit trick soap snack smooth actress theory quote comic"
const pollingInterval = 500000;
const RINKEBY_NODE_URL = `https://rinkeby.infura.io/v3/c2dde5d7c0a0465a8e994f711a3a3c31`;
// const provider = new HDWalletProvider(mnemonicPhrase, RINKEBY_NODE_URL, pollingInterval);
const provider = new HDWalletProvider({
  mnemonic: {
    phrase: mnemonicPhrase
  },
  providerOrUrl: RINKEBY_NODE_URL,
  pollingInterval: 200000
});
const web3 = new Web3(provider);
web3.setProvider(provider)
const seaport = new OpenSeaPort(provider, {
  networkName: Network.Rinkeby,
  apiKey: "c2dde5d7c0a0465a8e994f711a3a3c31",
});
export async function makeOffer(offerData, asset, accountAddress)
{
  const {tokenId, tokenAddress} = asset;
  const schemaName = "ERC721";
  let err = false 
  return await seaport.createBuyOrder({
    asset: {
      tokenId, 
      tokenAddress,
      schemaName // WyvernSchemaName. If omitted, defaults to 'ERC721'. Other options include 'ERC20' and 'ERC1155'
    },
    accountAddress,
    // Value of the offer, in units of the payment token (or wrapped ETH if none is specified):
    startAmount: offerData.price.amount,
  })
}
export async function buyOrder(asset, accountAddress)
{
  const order = await seaport.api.getOrder({ 
    side: OrderSide.Sell,
    asset_contract_address: asset.tokenAddress,
    token_id: asset.tokenId,
   }).catch(()=> { return "Error getting order"})
  const transactionHash = await seaport.fulfillOrder({ order, accountAddress }).catch(() => {return "Error on buying the token"})
  return transactionHash;
}






















export function myBalance()
{
  
  const isWalletConnected = useSelector(getWalletConnected)
const isMetaConnected = useSelector(getMetaConnected)
const tokenAddresses = useSelector(getAccountTokens)
  if(isWalletConnected)
  {
    return tokenAddresses.walletBalance;
  }
  else if(isMetaConnected)
  {
    return tokenAddresses.metaBalance;
  }
  return null
}
export function unixToHumanDate(date, saleEndDate)
{
  if(saleEndDate)
  {
  return moment.unix(date).format("LLLL");
  }
  return moment.unix(date).format("DD-MM-YYYY HH:m:s A");
}
export function unixToMilSeconds(date)
{

  let duration = intervalToDuration({ start: 0,
    end: differenceInSeconds(new Date(), fromUnix(date)) * 1000,
  });
  let seconds = 0;
  seconds += duration.days * 24 * 60 * 60;
  seconds += duration.hours * 60 * 60;
  seconds += duration.minutes * 60;
  seconds += duration.seconds;
  return Date.now() + secondsToMilliseconds(seconds);
 
}
export function checkName(name)
{
    if (name != null && name != undefined && name != "NullAddress") return name;
    else return "Anonymous";
}
export function prevImage(url)
{
  return url.replace(url.substring(url.length - 3), "0");
}
export function convertToUsd(offer)
{
  let usd = null
  usd = (parseFloat(getAuctionPriceDetails(offer).priceBase ) * parseFloat(offer?.paymentTokenContract.usdPrice)) / (parseFloat(offer?.paymentTokenContract.ethPrice));
  return parseInt(usd);
}
export function findHighestOffer(orders)
  {
    let offer = null;
    let max = null;
     orders.length >0 & orders.map((order) => {
       let price = parseFloat(getAuctionPriceDetails(order).priceBase)
      if(max < price)
      {
        offer = order;
        max = price
      }
    });
    return offer;
  }
export function displayAddress(address){
  return address.toString().replace(address.toString().substring(10, address.length - 10), ".....");
}
export function detectVideo(url)
{
  const formats = ['mp4', 'mkv', 'mov', 'wmv', 'avi', 'flv', 'webm'];
  const format = url.split('.').pop()
  if(formats.includes(format))
  return true
  else 
  return false
}
