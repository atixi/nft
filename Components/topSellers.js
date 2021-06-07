import { Row, Col, Avatar, Image } from "antd";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import useApi from "./hooks/useApi";
import "react-multi-carousel/lib/styles.css";
import styles from "../styles/topSeller.module.css";
import { SELLERS } from "../Constants/constants";
import OpenSeaAPI from "../pages/api/openseaApi";
import {
  ListCounter,
  SellerPrice,
  SellerName,
} from "./StyledComponents/topSeller-styledComponents";

function TopSellers({ data }) {
  const [selectedSeller, setSelectedSeller] = useState([]);
  console.log("top seller: ", data);
  const topSellerDetails = async (top) => {
    const address = top.address;
    const talent = top.talent;
    let created = [];
    let collectibles = [];
    const result = await OpenSeaAPI.getAssetsListByOwner(address);
    if (result.ok) {
      created = result.data?.assets;
      collectibles = _.groupBy(created, "collection[name]");
      console.log(created);
      console.log(collectibles);
      console.log(address);
      console.log(talent);
    }
    setSelectedSeller({
      talent,
      address,
      created,
      collectibles,
    });
  };

  const topSellers = data;
  return (
    <>
      {topSellers && (
        <div className="">
          <div className="p-3">
            <h3>Top Sellers in 1 Day</h3>
          </div>
          <div className={styles.topSellerContainer}>
            {data &&
              data.map((seller, index) => (
                //  <Link href='/profile/[id]' as={`/profile/${seller.address}`} >
                <a href={`/profile/index?address=${seller.address}&talent=${seller.talent}&avatar=${seller.profile_img_url}`}>
                <div
                    className={styles.topSellerItem}
                    key={seller.name}
                    onClick={() => topSellerDetails(seller)}
                  >
                    <ListCounter>{index + 1}</ListCounter>
                    <div className={styles.iconContainer}>
                      <img
                        className={styles.icon}
                        src={seller.profile_img_url}
                      />
                    </div>
                    <div className={styles.sellerDetails}>
                      <SellerName key={seller.talent + seller.talent}>
                        {seller.talent}
                      </SellerName>
                      <SellerPrice>
                        {/* {seller.stats?.average_price} */}
                        {seller.number_of_assets+" assets"}
                      </SellerPrice>
                    </div>
                  </div>
                </a>
                //  </Link>
              ))}
          </div>
        </div>
      )}
    </>
  );
}

export default TopSellers;
