import AssetCard from "@/components/assetCard";
import copy from "copy-to-clipboard";
import Link from "next/link";
import React, { useRef, useState } from "react";
import { fetch } from "Utils/strapiApi";
import { ellipseAddress } from "Utils/utils";
import styles from "/styles/talent.module.css";
const offset = 20;
function TalentPage({ collectedAsset, onSaleAsset, talent, accountAddress }) {
  const [start, setStart] = useState(offset);
  const [onSaleStart, setOnSaleStart] = useState(offset);
  const [assets, setAssets] = useState(collectedAsset);
  const [onSales, setOnSales] = useState(onSaleAsset);

  const [selectedTab, setSelectedTab] = useState(1);
  const [displayOnSaleButton, setDisplayOnSaleButton] = useState(true);
  const [displayCollectedButton, setDisplayCollectedButton] = useState(true);

  const addressRef = useRef(null);

  const loadMoreAsset = async () => {
    const assetResult = await fetch(
      `nfts?_start=${start}&_limit=${offset}&talent.walletAddress=${accountAddress}`
    );
    const assets = await assetResult.data;
    if (assets.length > 0) {
      setStart(start + offset);
    } else {
      setDisplayCollectedButton(false);
    }
    setAssets((prev) => [...prev, ...assets]);
  };
  const loadMoreOnSale = async () => {
    const assetResult = await fetch(
      `nfts?_start=${onSaleStart}&_limit=${offset}&talent.walletAddress=${accountAddress}&onSale=${true}`
    );
    const assets = await assetResult.data;
    if (assets.length > 0) {
      setOnSaleStart(onSaleStart + offset);
    } else {
      setDisplayOnSaleButton(false);
    }
    setOnSales((prev) => [...prev, ...assets]);
  };

  const loadOnSale = async () => {
    setSelectedTab(0);
    setDisplayOnSaleButton(true);
  };
  const loadCollected = async () => {
    setSelectedTab(1);
    setDisplayCollectedButton(true);
  };

  const copyAddress = () => {
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
        <img width="100%" height="300px" src={talent.talentBanner?.formats?.large?.url} alt="" />
      </section>
      {/* <!-- section close --> */}

      <section aria-label="section">
        <div className="container">
          <div className="row">
            <div className="col-md-12">
              <div className="d_profile de-flex">
                <div className="de-flex-col">
                  <div className="profile_avatar">
                    <img src={talent.talentAvatar?.formats?.small?.url} alt="" />
                    <i className="fa fa-check"></i>
                    <div className="profile_name">
                      <h4>
                        {talent?.talentName}
                        <span className="profile_username">@{talent.userName}</span>
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
                          <AssetCard key={item.id} asset={item} />
                        ))}
                      </div>
                    </div>
                  )}
                  {selectedTab == 1 && (
                    <div className="collectedTab">
                      <div className="row">
                        {/* <!-- nft item begin --> */}
                        {assets.map((item) => (
                          <AssetCard key={item.id} asset={item} />
                        ))}
                      </div>
                    </div>
                  )}
                  {selectedTab == 0 && displayOnSaleButton && (
                    <div className={`row ${styles.loadMoreAssetButtonContainer}`}>
                      <button
                        className={styles.loadMoreAssetButton}
                        onClick={loadMoreOnSale}
                      >{`Load More`}</button>
                    </div>
                  )}
                  {selectedTab == 1 && displayCollectedButton && (
                    <div className={`row ${styles.loadMoreAssetButtonContainer}`}>
                      <button
                        className={styles.loadMoreAssetButton}
                        onClick={loadMoreAsset}
                      >{`Load More`}</button>
                    </div>
                  )}
                </div>
                {/* <div className={`row ${styles.loadMoreAssetButtonContainer}`}>
                  <button
                    className={styles.loadMoreAssetButton}
                    onClick={loadMoreAsset}
                  >{`Load More`}</button>
                </div> */}
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

export default TalentPage;

export const getServerSideProps = async ({ query }) => {
  const [collectedAsset, onSaleAsset, talent] = await Promise.all([
    fetch(`nfts?_start=${0}&_limit=${offset}&talent.walletAddress=${query.accountAddress}`),
    fetch(
      `nfts?_start=${0}&_limit=${offset}&talent.walletAddress=${
        query.accountAddress
      }&onSale=${true}`
    ),
    fetch(`talents?walletAddress=${query.accountAddress}`),
  ]);
  return {
    props: {
      collectedAsset: collectedAsset.data,
      onSaleAsset: onSaleAsset.data,
      talent: talent.data[0],
      accountAddress: query.accountAddress,
    },
  };
};
