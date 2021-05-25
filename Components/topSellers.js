import { Row, Col, Avatar, Image } from "antd";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import useApi from "./hooks/useApi";
import productApi from "../helpers/productsApi";
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
  const topSellersApi = useApi(productApi.getTopSellers);

  const [topSellers, setTopSellers] = useState(null);
  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    const result = await topSellersApi.request();
    if (result.ok) {
      const data = await result.data;
      setTopSellers(data?.collections);
    }
  };
  return (
    <>
      <div className="">
        <div className="p-3">
          <h3>Top Sellers in 1 Day</h3>
        </div>
        <div className={styles.topSellerContainer}>
          {topSellers &&
            topSellers.map((seller, index) => (
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
    </>
  );
}

export default TopSellers;
