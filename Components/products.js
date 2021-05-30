import { Row, Col } from "antd";
import { Menu, Dropdown, Avatar, Tooltip } from "antd";
import Link from "next/link";
import React from "react";
import { PRODUCTS } from "/Constants/constants";
import {
  Button,
  CardTitle,
  ProductPrice,
  ProductCard,
  HeartIcon,
  NumberOfLikes,
  LikesContainer,
  ProductList,
  ProductCardHeader,
  ProductDescription,
} from "./StyledComponents/liveActions-styledComponents";

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
        <Row>
          {PRODUCTS.map((n, index) => (
            <Col
              key={index}
              style={{ width: "280px" }}
              className="p-3 p-sm-2 p-md-2 p-lg-3"
            >
              <ProductCard className={`p-2 p-lg-1`}>
                <ProductCardHeader className={`mt-3`}>
                  <div className={"pl-3"}>
                    <Avatar.Group>
                      {PRODUCTS.map((m, index) => (
                        <Tooltip title={m.id} placement="top">
                          <Avatar
                            icon={
                              <img
                                src={m.productImage}
                                width={12}
                                height={12}
                              />
                            }
                          />
                        </Tooltip>
                      ))}
                    </Avatar.Group>
                  </div>
                  <Dropdown
                    trigger={["click"]}
                    overlay={menu}
                    placement="bottomRight"
                  >
                    <Button>...</Button>
                  </Dropdown>
                </ProductCardHeader>
                <div className={`col-md-12 p-3`}>
                  <img src={n.productImage} className="w-100 rounded" />
                </div>
                <ProductDescription>
                  <Link href={`/product-details?id=${n.id}`}>
                    <CardTitle>{n.productTitle}</CardTitle>
                  </Link>
                  <ProductPrice>{n.price}</ProductPrice>
                  <ProductList>
                    {" " + n.currentQTY + " of " + n.totalQTY}
                  </ProductList>{" "}
                  <br />
                  <ProductPrice fontSize={"12px"}>{n.price}</ProductPrice>
                  <LikesContainer>
                    <HeartIcon right={"-125px"} />
                    <NumberOfLikes className={"mr-3"}>{n.likes}</NumberOfLikes>
                  </LikesContainer>
                </ProductDescription>
              </ProductCard>
            </Col>
          ))}
        </Row>
      </div>
    </>
  );
}

export default Products;
