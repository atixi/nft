import styles from "/styles/Products.module.css";
import { Row, Col } from "antd";
import { Menu, Dropdown } from "antd";
import { HeartTwoTone } from "@ant-design/icons";
import Link from "next/link";
import React from "react";
import { PRODUCTS } from "/Constants/constants";

function Products() {
  function handleButtonClick(e) {
    message.info("Click on left button.");
    console.log("click left button", e);
  }
  function handleMenuClick(e) {
    message.info("Click on menu item.");
    console.log("click", e);
  }
  const menu = (
    <Menu onClick={handleMenuClick}>
      <Menu.Item key="1">Purchase now</Menu.Item>
      <Menu.Item key="2">Place a bid</Menu.Item>
      <Menu.Item key="3">View on OpenSea</Menu.Item>
      <Menu.Item key="3">Share</Menu.Item>
    </Menu>
  );
  return (
    <>
      <div>
        <Row justify="space-around">
          {PRODUCTS.map((n) => (
            <Col
              key={n.id}
              lg={6}
              md={6}
              sm={8}
              xs={24}
              className="p-3 p-sm-2 p-md-2 p-lg-3"
            >
              <div className={`${styles.productItem} p-2 p-lg-1`}>
                <div className={`${styles.topOfProductImage} mt-3`}>
                  <div>
                    {PRODUCTS.map((m) => (
                      <img
                        key={n.id + m.id}
                        src={m.productImage}
                        width={22}
                        className={styles.ownImage}
                      />
                    ))}
                  </div>
                  <Dropdown.Button onClick={handleButtonClick} overlay={menu} />
                </div>
                <div className={`col-md-12 p-3`}>
                  <img src={n.productImage} className="w-100 rounded" />
                </div>
                <div className={styles.productDescriptionDiv}>
                  <h6>
                    <strong>
                      <Link href={`/product-details?id=${n.id}`}>
                        {n.productTitle}
                      </Link>
                    </strong>
                  </h6>
                  <h6>
                    {n.price}{" "}
                    <span className={styles.wareHouse}>
                      {n.currentQTY + " of " + n.totalQTY}
                    </span>
                  </h6>
                  <div className={styles.productDescriptionBottom}>
                    <h6 className={styles.placeBid}>{n.palceMessage}</h6>{" "}
                    <h6 className={styles.placeBid}>
                      {n.likes} <HeartTwoTone />
                    </h6>
                  </div>
                </div>
              </div>
            </Col>
          ))}
        </Row>
      </div>
    </>
  );
}

export default Products;
