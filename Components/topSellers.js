import { Row, Col, Avatar, Image } from "antd";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import useApi from "./hooks/useApi";
import "react-multi-carousel/lib/styles.css";
import styles from "../styles/topSeller.module.css";
import { SELLERS } from "../Constants/constants";
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
                <div className={styles.topSellerItem} key={seller.name}>
                  <div>{index + 1}</div>
                  <div className={styles.iconContainer}>
                    <img className={styles.icon} src={seller.image_url} />
                  </div>
                  <div className={styles.sellerDetails}>
                    <div key={seller.name + seller.name}>{seller.name}</div>
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
