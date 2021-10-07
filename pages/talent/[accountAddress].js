import React, { useRef, useState } from "react";
import Image from "next/image";
import styles from "/styles/talent.module.css";
import { Button } from "antd";
import { fetch } from "Utils/strapiApi";
import Link from "next/link";
import copy from "copy-to-clipboard";
import { ellipseAddress } from "Utils/utils";

function TalentPage({ serverAssets, query, talentData }) {
  const { accountAddress } = query;
  const [start, setStart] = useState(2);
  const [assets, setAssets] = useState(serverAssets);
  const [onSales, setOnSales] = useState([]);

  const [selectedTab, setSelectedTab] = useState(1);

  const addressRef = useRef(null);

  const loadMoreAsset = async () => {
    const assetResult = await fetch(
      `nfts?_start=${start}&_limit=2&talent.walletAddress=${accountAddress}`
    );
    const assets = await assetResult.data;
    if (assets.length > 0) {
      setStart(start + 2);
    }
    setAssets((prev) => [...prev, ...assets]);
  };
  const loadOnSale = async () => {
    setSelectedTab(0);
    let onSales = assets.filter((item) => item.asset.sellOrders?.length > 0);
    setOnSales(onSales);
  };
  const loadCollected = async () => {
    setSelectedTab(1);
  };

  const copyAddress = () => {
    console.log("start copying...");
    copy(accountAddress, {
      debug: true,
      message: "Press #{key} to copy",
    });
  };
  return (
    <div className="no-bottom " id="content">
      <div id="top"></div>

      {/* <!-- section begin --> */}
      <section id="profile_banner" aria-label="section" className="text-light">
        <img
          width="100%"
          height="300px"
          src={talentData.talentBanner?.formats?.large?.url}
          alt=""
        />
      </section>
      {/* <!-- section close --> */}

      <section aria-label="section">
        <div className="container">
          <div className="row">
            <div className="col-md-12">
              <div className="d_profile de-flex">
                <div className="de-flex-col">
                  <div className="profile_avatar">
                    <img src={talentData.talentAvatar?.formats?.small?.url} alt="" />
                    <i className="fa fa-check"></i>
                    <div className="profile_name">
                      <h4>
                        {talentData?.talentName}
                        <span className="profile_username">@{talentData.userName}</span>
                        <span
                          id="wallet"
                          className={`profile_wallet ${styles.cursorPointer}`}
                          ref={addressRef}
                          onClick={copyAddress}
                        >
                          {ellipseAddress(accountAddress)}
                        </span>
                      </h4>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="col-md-12">
              <div className="de_tab tab_simple">
                <ul className="de_nav">
                  <li className={selectedTab == 0 ? "active" : ""} onClick={loadOnSale}>
                    <span>On Sale</span>
                  </li>
                  <li className={selectedTab == 1 ? "active" : ""} onClick={loadCollected}>
                    <span>Collected</span>
                  </li>
                </ul>
                <div className="de_tab_content">
                  {selectedTab == 0 && (
                    <div className="onSaleTab">
                      <div className="row">
                        {/* <!-- nft item begin --> */}
                        {onSales.map((item) => (
                          <div key={item.id} className="col-lg-3 col-md-6 col-sm-6 col-xs-12">
                            <div className="nft__item">
                              {/* <div
                                className="de_countdown"
                                data-year="2021"
                                data-month="10"
                                data-day="16"
                                data-hour="8"
                              ></div> */}
                              <div className="author_list_pp">
                                <a href="author.html">
                                  <img
                                    className="lazy"
                                    src="http://lorempixel.com/200/200/"
                                    alt=""
                                  />
                                  <i className="fa fa-check"></i>
                                </a>
                              </div>
                              <div className="nft__item_wrap">
                                <a href="item-details.html">
                                  <img
                                    src={item.asset.imageUrl}
                                    className="lazy nft__item_preview"
                                    alt=""
                                  />
                                </a>
                              </div>
                              <div className="nft__item_info">
                                <a href="item-details.html">
                                  <h4>Pinky Ocean</h4>
                                </a>
                                <div className="nft__item_price">
                                  0.08 ETH<span>1/20</span>
                                </div>
                                <div className="nft__item_action">
                                  <a href="#">Place a bid</a>
                                </div>
                                {/* <div className="nft__item_like">
                                  <i className="fa fa-heart"></i>
                                  <span>50</span>
                                </div> */}
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                  {selectedTab == 1 && (
                    <div className="collectedTab">
                      <div className="row">
                        {/* <!-- nft item begin --> */}
                        {assets.map((item) => (
                          <div key={item.id} className="col-lg-3 col-md-6 col-sm-6 col-xs-12">
                            <div className="nft__item">
                              {/* <div
                                className="de_countdown"
                                data-year="2021"
                                data-month="10"
                                data-day="16"
                                data-hour="8"
                              ></div> */}
                              <div className="author_list_pp">
                                <a href="author.html">
                                  <img
                                    className="lazy"
                                    src="http://lorempixel.com/200/200/"
                                    alt=""
                                  />
                                  <i className="fa fa-check"></i>
                                </a>
                              </div>
                              <div className="nft__item_wrap">
                                <Link href={`/nft/${item.tokenAddress}?tokenId=${item.tokenId}`}>
                                  <a>
                                    <img
                                      src={item.asset.imageUrl}
                                      className="lazy nft__item_preview"
                                      alt=""
                                    />
                                  </a>
                                </Link>
                              </div>
                              <div className="nft__item_info">
                                <a href="item-details.html">
                                  <h4>Pinky Ocean</h4>
                                </a>
                                <div className="nft__item_price">
                                  0.08 ETH<span>1/20</span>
                                </div>
                                <div className="nft__item_action">
                                  <a href="#">Place a bid</a>
                                </div>
                                {/* <div className="nft__item_like">
                                  <i className="fa fa-heart"></i>
                                  <span>50</span>
                                </div> */}
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                      {/* <div className={`row ${styles.loadMoreAssetButtonContainer}`}>
                        <button
                          className={styles.loadMoreAssetButton}
                          onClick={loadMoreAsset}
                        >{`Load More`}</button>
                      </div> */}
                    </div>
                  )}
                </div>
                <div className={`row ${styles.loadMoreAssetButtonContainer}`}>
                  <button
                    className={styles.loadMoreAssetButton}
                    onClick={loadMoreAsset}
                  >{`Load More`}</button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

export default TalentPage;

export const getServerSideProps = async (context) => {
  const query = context.query;
  const assetResult = await fetch(
    `nfts?_start=0&_limit=2&talent.walletAddress=${query.accountAddress}`
  );
  const talentResult = await fetch(`talents?walletAddress=${query.accountAddress}`);
  const talent = await talentResult.data[0];
  const nfts = await assetResult.data;
  return {
    props: {
      serverAssets: JSON.parse(JSON.stringify(nfts)),
      talentData: JSON.parse(JSON.stringify(talent)),
      query: JSON.parse(JSON.stringify(query)),
    },
  };
};
