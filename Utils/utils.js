import moment from "moment";
import { getAuctionPriceDetails } from "/Constants/constants";
import { differenceInSeconds, intervalToDuration, secondsToMilliseconds } from 'date-fns';
import fromUnix from "date-fns/fromUnixTime";

export function unixToHumanDate(date)
{
  return moment.unix(date).format("DD-MM-YYYY HH:m:s");
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
export function convertToUsd(bid)
{
  let usd = null
  usd = (parseFloat(getAuctionPriceDetails(bid).priceBase ) * parseFloat(bid?.paymentTokenContract.usdPrice)) / (parseFloat(bid?.paymentTokenContract.ethPrice));
  return parseInt(usd);
}
export function findHighestBid(orders)
  {
    let bid = null;
    let max = null;
     orders.length >0 & orders.map((order) => {
       let price = parseFloat(getAuctionPriceDetails(order).priceBase)
      if(max < price)
      {
        bid = order;
        max = price
      }
    });
    return bid;
  }
