import { Row, Col, Avatar, Image } from "antd";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import useApi from "./hooks/useApi";
import "react-multi-carousel/lib/styles.css";
import styles from "../styles/topSeller.module.css";
import { SELLERS } from "../Constants/constants";
import OpenSeaAPI from "../pages/api/openseaApi";
const breackCol = "<Col /> asdfsdf";
{
  /* <Markup content={breackCol} />; */
}
const check = (i) => {
  i++;
  if (i / 5 === 0) {
    //return <h1>asdf</h1>
    console.log("some thing" + i);
  }
};

function TopSellers({ data }) {
  const [selectedSeller, setSelectedSeller] = useState();

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
                <div
                  className={styles.topSellerItem}
                  key={seller.name}
                  onClick={() => topSellerDetails(seller)}
                >
                  <div>{index + 1}</div>
                  <div className={styles.iconContainer}>
                    <img className={styles.icon} src={seller.profile_img_url} />
                  </div>
                  <div className={styles.sellerDetails}>
                    <div key={seller.talent + seller.talent}>
                      {seller.talent}
                    </div>
                    <div className={styles.sellerPrice}>
                      {seller.stats?.average_price}
                    </div>
                  </div>
                </div>
              ))}
          </div>
        </div>
      )}
    </>
  );
}

export default TopSellers;
