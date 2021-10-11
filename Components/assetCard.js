import React from "react";
import { Statistic } from "antd";
const { Countdown } = Statistic;
import { CountDownContainer } from "./StyledComponents/explore-styledComponents";
import { getAuctionPriceDetails } from "../Constants/constants";
import { unixToMilSeconds } from "../Utils/utils";
import Link from "next/link";
import UserAvatar from "./userAvatar";

function AssetCard({ asset }) {
  return (
    <div className=" col-lg-3 col-md-6 col-sm-6 col-xs-12">
      <div className="nft__item style-2" style={{ border: "1px solid #e6e2e2" }}>
        {asset?.asset?.sellOrders &&
          asset?.asset?.sellOrders?.length > 0 &&
          asset?.asset?.sellOrders[0].expirationTime !== "0" && (
            <CountDownContainer>
              <Countdown
                value={unixToMilSeconds(asset?.asset?.sellOrders[0].expirationTime)}
                format={`D[d] HH[h] mm[m] ss[s]`}
                valueStyle={{ lineHeight: "1.1", color: "white" }}
              />
            </CountDownContainer>
          )}
        <UserAvatar
          user={{
            userName: asset?.talent?.userName,
            avatar: asset?.asset?.owner?.profile_img_url,
            verified: asset?.isInternal,
          }}
        />
        <div className="nft__item_wrap itemImageCard">
          <Link
            href={
              asset?.asset?.assetContract
                ? `/nft/${asset?.tokenAddress}?tokenId=${asset?.tokenId}`
                : `/nft/${asset?.asset?.assetBundle?.maker?.address}?slug=${asset?.asset?.assetBundle?.slug}`
            }
          >
            <a>
              <img src={asset?.asset?.imageUrl} className="lazy nft__item_preview" alt="" />
            </a>
          </Link>
        </div>
        <div className="nft__item_info">
          <Link
            href={
              asset?.asset?.assetContract
                ? `/nft/${asset?.tokenAddress}?tokenId=${asset?.tokenId}`
                : `/nft/${asset?.asset?.assetBundle?.maker?.address}?slug=${asset?.asset?.assetBundle?.slug}`
            }
          >
            <a>
              <h4>{asset?.asset?.name ? asset?.asset?.name : asset?.asset?.collection?.name}</h4>
            </a>
          </Link>

          <div className="nft__item_price">
            <span>
              {" "}
              {asset?.asset?.sellOrders?.length > 0
                ? `${getAuctionPriceDetails(asset?.asset?.sellOrders[0]).priceBase} ${
                    asset?.asset?.sellOrders[0]?.paymentTokenContract.symbol
                  }`
                : ""}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AssetCard;
