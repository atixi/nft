
import { Dropdown, Spin, Tabs, Statistic } from "antd";
const { Countdown } = Statistic
import {
  CountDownContainer
} from "../../Components/StyledComponents/explore-styledComponents";
import { getAuctionPriceDetails } from "/Constants/constants";
import { unixToMilSeconds } from "../../Utils/utils"
import Link from "next/link"
import {
  FacebookIcon,
  FacebookShareButton,
  TelegramIcon,
  TelegramShareButton,
  TwitterIcon,
  TwitterShareButton,
  WhatsappIcon,
  WhatsappShareButton,
} from "next-share";
import {
  LoadMoreButton,
  MainWrapper,
} from "/Components/StyledComponents/globalStyledComponents";
import React, { useEffect, useState } from "react";

import CollectionLoader from "@/components/collectionLoader";
import Products from "/Components/nfts";
import api from "/Components/axiosRequest";
import { displayAddress } from "/Utils/utils";
import { useRouter } from "next/router";
import request from "../../Utils/axios"
const { TabPane } = Tabs;

function CollectionDetails() {
  const router = useRouter();
  const { slug } = router.query;
  const [collect, setCollect] = useState({
    collectionName: "",
    collectionImageURL: {
      url: "",
    },
    collectionBanner: {
      url: "",
    },
    talent: { walletAddress: "" },
    assets: [],
  });
  const [loadMore, setLoadMore] = useState({
    onSales: 10,
    owned: 10,
  });
  const [isLoad, setLoad] = useState(false);
  const [loadMoreButton, setLoadMoreButton] = useState({
    onSalesLoad: true,
    ownedLoad: true,
    onsalesLoadMoreButtonLoading: false,
    ownedLoadMoreButtonLoading: false,
  });
  const [onSales, setOnsales] = useState({
    assets: [],
  });

  const loadTabData = async (e) => {
    if (e === "1") {
      //loadAssets(slug);
    } else if (e === "2") {
      //loadCollections(slug);
    }
  };
  async function LoadMoreOnsales() {
    setLoadMoreButton({
      ...loadMoreButton,
      onsalesLoadMoreButtonLoading: true,
    });
    const moreAssets = await api.get(
      `/collections/${collect.slug}?offset=${loadMore.onSales}`
    );
    const assetLength = await moreAssets.data.assets.length;
    assetLength === 0
      ? setLoadMoreButton({ ...loadMoreButton, onSalesLoad: false })
      : (() => {
        setOnsales({
          talent: {
            talentAvatar: { url: collect.talent.talentAvatar.url },
          },
          assets: [...onSales.assets, ...moreAssets.data.assets],
        });
        setLoadMore({
          ...loadMore,
          onSales: loadMore.onSales + 10,
        });
        setLoadMoreButton({
          ...loadMoreButton,
          onsalesLoadMoreButtonLoading: false,
        });
      })();
  }
  async function LoadMoreOwned() {
    setLoadMoreButton({ ...loadMoreButton, ownedLoadMoreButtonLoading: true });
    const moreAssets = await api.get(
      `/collections/${collect.slug}?offset=${loadMore.owned}`
    );
    const assetLength = await moreAssets.data.assets.length;
    assetLength === 0
      ? setLoadMoreButton({ ...loadMoreButton, ownedLoad: false })
      : (() => {
        setCollect({
          ...collect,
          assets: [...collect.assets, ...moreAssets.data.assets],
        });
        setLoadMore({
          ...loadMore,
          owned: loadMore.owned + 10,
        });
        setLoadMoreButton({
          ...loadMoreButton,
          ownedLoadMoreButtonLoading: false,
        });
      })();
  }

  const [collection, setCollection] = useState()
  const [assets, setAssets] = useState()
  const loadCollection = async () => {
    const col = await request(`collections/${slug}`, {
      method: "GET"
    });
    if (col.status === 200) {
      setCollection(col.data)
      setAssets(col.data.nfts)
    }
  }


















  useEffect(() => {
    slug != undefined
      ? loadCollection()
      : "";
  }, [slug]);

  return (
    <>
      <div className="no-bottom no-top" id="content">
        <div id="top"></div>

        {/* <!-- section begin --> */}
        <section id="profile_banner" aria-label="section" className="text-light" style={{ paddingBottom: "0px", width: "100%" }}>
          <img src={collection?.collectionBanner?.url} style={{ width: "100%", height: "250px" }} />
        </section>

        {/* <!-- section close --> */}


        <section aria-label="section" className="d_coll no-top">
          <div className="contentContainer">
            <div className="row">
              <div className="col-md-12">
                <div className="d_profile">
                  <div className="profile_avatar">
                    <div className="d_profile_img">
                      <img src={collection?.collectionImageURL?.url} alt="" />
                      <i className="fa fa-check"></i>
                    </div>

                    <div className="profile_name">
                      <h4>
                        {collection?.collectionName}
                        <div className="clearfix"></div>
                        <span id="wallet" className="profile_wallet">DdzFFzCqrhshMSxb9oW3mRo4MJrQkusV3fGFSTwaiu4wPBqMryA9DYVJCkW9n7twCffG5f5wX2sSkoDXGiZB1HPa7K7f865Kk4LqnrME</span>
                        <button id="btn_copy" title="Copy Text">Copy</button>
                      </h4>
                    </div>
                  </div>

                </div>
              </div>

              <div className="col-md-12">
                <div className="row">
                  {/* <!-- nft item begin --> */}
                  {assets && assets.map((item, index) => {
                    return <div key={index} className=" col-lg-3 col-md-6 col-sm-6 col-xs-12">
                      <div className="nft__item style-2" style={{ border: "1px solid #e6e2e2" }}>
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
                          <Link
                            href={
                              item?.asset?.assetContract
                                ? `/nft/${item?.tokenAddress}?tokenId=${item?.tokenId}`
                                : `/nft/${item?.asset?.assetBundle?.maker?.address}?slug=${item?.asset?.assetBundle?.slug}`
                            }
                          ><a>
                              <h4>{item?.asset?.name ? item?.asset?.name : item?.asset?.collection?.name}</h4>
                            </a></Link>

                          <div className="nft__item_price">
                            <span> {item?.asset?.sellOrders?.length > 0 ? `${getAuctionPriceDetails(item?.asset?.sellOrders[0]).priceBase} ${item?.asset?.sellOrders[0]?.paymentTokenContract.symbol}` : ""}

                            </span>
                          </div>
                        </div>
                      </div>
                    </div>
                  })}
                </div>
              </div>
            </div>
          </div>
        </section>


      </div>
    </>
  );
}

export default CollectionDetails;
