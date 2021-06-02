import React from "react";
import { PRODUCTS } from "/Constants/constants";
import Carousel from "react-elastic-carousel";
import { Menu, Dropdown, Avatar, Tooltip } from "antd";
import Link from "next/link";
import CONSTANTS from "/Constants/liveActionsConstants";
import {
  Button,
  CardTitle,
  ProductPrice,
  BidsStatus,
  ProductCard,
  HeartIcon,
  NumberOfLikes,
  LikesContainer,
  ProductList,
  ProductCardHeader,
  ProductDescriptionBottom,
  ProductDescription,
  CountDownContainer,
  CountDown,
} from "./StyledComponents/liveActions-styledComponents";
import { SectionHeading } from "./StyledComponents/globalStyledComponents";
const breakPoints = [
  { width: 1, itemsToShow: 1 },
  { width: 550, itemsToShow: 2, itemsToScroll: 2 },
  { width: 768, itemsToShow: 3, itemsToScroll: 3 },
  { width: 1024, itemsToShow: 4, itemsToScroll: 4 },
  { width: 1200, itemsToShow: 5, itemsToScroll: 5 },
];
function LiveAuctions() {
  return (
    <>
      <div>
        <div className="pl-3">
          <SectionHeading>{CONSTANTS.liveActions}</SectionHeading>
        </div>

        <Carousel
          breakPoints={breakPoints}
          pagination={false}
          transitionMs={1000}
        >
          {PRODUCTS.map((product) => Product(product))}
        </Carousel>
      </div>
    </>
  );
}

function Product(product) {
  const menu = (
    <Menu>
      <Menu.Item key="1">
        <span>{CONSTANTS.purchaseNow}</span>
      </Menu.Item>
      <Menu.Item key="2">
        <span>{CONSTANTS.placeBid}</span>
      </Menu.Item>
      <Menu.Item key="3">
        <span>{CONSTANTS.viewOnOpenSea}</span>
      </Menu.Item>
      <Menu.Item key="4">
        <span>{CONSTANTS.share}</span>
      </Menu.Item>
    </Menu>
  );
  return (
    <ProductCard key={product.id} className={`p-2 p-lg-1 mr-3`}>   
      <ProductCardHeader className={`mt-3`}>
        <div className={"pl-3"}>
          <Avatar.Group>
            {PRODUCTS.map((m, index) => (
              <Tooltip title={m.id} placement="top">
                <Avatar key={index} icon={<img src={m.productImage} width={22} />} />
              </Tooltip>
            ))}
          </Avatar.Group>
        </div>
        <Dropdown trigger={["click"]} overlay={menu} placement="bottomRight">
          <Button>...</Button>
        </Dropdown>
      </ProductCardHeader>
      <div className={`col-md-12 p-3`}>
        <img src={product.productImage} className="w-100 rounded" />
      </div>
      <ProductDescription>
        <CountDownContainer>
          <CountDown>{"043h 34m 34s left"} 🔥</CountDown>
        </CountDownContainer>
        <a href={`/product-details?id=${product.id}`}>
          <CardTitle>{product.productTitle}</CardTitle>
        </a>
        <BidsStatus>{CONSTANTS.bidsStatus}</BidsStatus>
        <ProductDescriptionBottom>
          <ProductPrice>{product.price}</ProductPrice>
          <ProductList>
            {" " + product.currentQTY + " of " + product.totalQTY}
          </ProductList>
          <LikesContainer>
            <HeartIcon />
            <NumberOfLikes className={"mr-3"}>{product.likes}</NumberOfLikes>
          </LikesContainer>
        </ProductDescriptionBottom>
      </ProductDescription>
    </ProductCard>
  );
}
export default LiveAuctions;
