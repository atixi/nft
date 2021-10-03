import React, { useState, useEffect } from "react";
import Products from "/Components/nfts";
import Link from "next/link";
import { Statistic } from "antd";
const { Countdown } = Statistic
import EXPLORE_CONSTANTS from "/Constants/exploreConstants";
import {
    CountDownContainer
} from "./StyledComponents/explore-styledComponents";
import { getAuctionPriceDetails } from "/Constants/constants";
import { useRouter } from "next/router";
import api from "/Components/axiosRequest";
import request from "../Utils/axios"
import { unixToMilSeconds } from "../Utils/utils"
const deadline = Date.now() + 1000 * 60 * 60 * 24 * 2 + 1000 * 30; // Moment is also OK

function Explore() {
    const [items, setItems] = useState();
    const loadItems = async () => {
        try {
            const data = await request("nfts?_limit=8", {
                method: "GET"
            });
            console.log("data is", data)
            if (data.status === 200) {
                setItems(data.data)
            }
        }
        catch (e) {

        }
    }
    useEffect(() => {
        loadItems()
    }, []);
    return (
        <>
            <div className="row  fadeIn">
                <div className="col-lg-12">
                    <h2 className="style-2">New Items</h2>
                </div>
                {/* <!-- nft item begin --> */}
                {items && items.map((item) => {
                    return <div className=" col-lg-3 col-md-6 col-sm-6 col-xs-12">
                        <div className="nft__item style-2">
                            {item?.asset?.sellOrders && item?.asset?.sellOrders?.length > 0 && item?.asset?.sellOrders[0].expirationTime !== "0" &&
                                <CountDownContainer>
                                    <Countdown
                                        value={unixToMilSeconds(item?.asset?.sellOrders[0].expirationTime)}
                                        format={`D[d] HH[h] mm[m] ss[s]`}
                                        valueStyle={{ lineHeight: "1.1", color: "white" }}
                                    />
                                </CountDownContainer>}
                            <div className="author_list_pp">
                                <a href="author.html">
                                    <img className="lazy" src={item?.asset?.owner?.profile_img_url} alt="" />
                                    <i className="fa fa-check"></i>
                                </a>
                            </div>
                            <div className="nft__item_wrap itemImageCard">
                                <Link
                                    href={
                                        item?.asset?.assetContract
                                            ? `/nft/${item?.tokenAddress}?tokenId=${item?.tokenId}`
                                            : `/nft/${item?.asset?.assetBundle?.maker?.address}?slug=${item?.asset?.assetBundle?.slug}`
                                    }
                                ><a>
                                        <img src={item?.asset?.imageUrl} className="lazy nft__item_preview" alt="" />
                                    </a>
                                </Link>
                            </div>
                            <div className="nft__item_info">
                                <a href="item-details.html">
                                    <h4>{item?.asset?.name}</h4>
                                </a>
                                <div className="nft__item_price">
                                    <span> {item?.asset?.sellOrders?.length > 0 ? `${getAuctionPriceDetails(item?.asset?.sellOrders[0]).priceBase} ${item?.asset?.sellOrders[0]?.paymentTokenContract.symbol}` : ""}

                                    </span>
                                </div>
                                <div className="nft__item_action">
                                    <a href="#">Place a bid</a>
                                </div>
                            </div>
                        </div>
                    </div>
                })}
            </div>

            {/* <div className="spacer-single"></div> */}

            <div className="spacer-single"></div>


        </>
    );
}
export default Explore;
