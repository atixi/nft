import React, { useEffect, useState } from "react";
import {getAuctionPriceDetails } from "/Constants/constants";
import Carousel from "react-elastic-carousel";
import { Menu, Dropdown, Avatar, Tooltip, Statistic } from "antd";
import Link from "next/link";
import CONSTANTS from "/Constants/liveAuctionsConstants";
import {
  Button,
  CardTitle,
  ProductPrice,
  BidsStatus,
  ProductCard,
  ProductList,
  ProductCardHeader,
  ProductDescriptionBottom,
  ProductDescription,
  CountDownContainer,
  CountDown,
  ProductCardHeaderButton,
  ProductCardHeaderOwners,
  CardImage
} from "./StyledComponents/liveAuctions-styledComponents";
import { SectionHeading } from "./StyledComponents/globalStyledComponents";
import { fetch } from "/Utils/strapiApi";
import {unixToMilSeconds, checkName} from "/Utils/utils"
const breakPoints = [
  { width: 1, itemsToShow: 1 },
  { width: 550, itemsToShow: 2, itemsToScroll: 2 },
  { width: 768, itemsToShow: 3, itemsToScroll: 3 },
  { width: 1024, itemsToShow: 4, itemsToScroll: 4 },
  { width: 1200, itemsToShow: 5, itemsToScroll: 5 },
];
const deadline = Date.now() + 1000 * 60 * 60 * 24 * 2 + 1000 * 30;

const { Countdown } = Statistic;
function LiveAuctions() {

  const [auctions, setAuctions] = useState([]);
  const loadLiveAuction = async () =>
  {
    const nfts = await fetch("/nfts/auction");
    if(nfts.data)
    {
      console.log("auctions data", nfts.data)
      setAuctions(nfts.data) 
    }
  }
  useEffect(() => {
    loadLiveAuction()
  },[])
  return (
    auctions && <>
      <SectionHeading>{CONSTANTS.liveAuctions}</SectionHeading>
      <Carousel
        breakPoints={breakPoints}
        pagination={false}
        transitionMs={1000}
      >
        {auctions && auctions.map((product, index) => product.expirationTime && product.expirationTime !==  "0" && Product(product, index))}
      </Carousel>
    </>
  );
}

function Product(product, index) {
  const pr = getAuctionPriceDetails(product);
  const price = pr.priceBase;
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
    <ProductCard key={index} className={`p-2 p-lg-1 mr-3`}>
      <ProductCardHeader className={`mt-3`}>
        <ProductCardHeaderOwners>
          <Avatar.Group>
            <Tooltip title={`Owner: ${checkName(product?.asset?.owner?.user?.username)}`} placement="top">
              <Avatar
                key={product.asset?.owner.address}
                icon={
                  <img src={product.asset?.owner.profile_img_url} width={22} />
                }
              />
            </Tooltip>
            <Tooltip title={`Maker: ${checkName(product?.makerAccount.user?.username)}`} placement="top">
              <Avatar
                key={product?.makerAccount.address}
                icon={
                  <img src={product?.makerAccount.profile_img_url} width={22} />
                }
              />
            </Tooltip>
          </Avatar.Group>
        </ProductCardHeaderOwners>
        <ProductCardHeaderButton>
          <Dropdown trigger={["click"]} overlay={menu} placement="bottomRight">
            <Button>...</Button>
          </Dropdown>
        </ProductCardHeaderButton>
      </ProductCardHeader>
      <CardImage className={`p-3`}>
        <Link
          href={product?.asset ? `/nft/${product.asset?.tokenAddress}?tokenId=${product.asset?.tokenId}` : `/nft/${product?.assetBundle?.maker?.address}?bundle=1`}  >
          <a>
            {" "}
            <img
              src={product?.asset ? product.asset?.imageUrl : product?.assetBundle?.assets[0].imageUrl}
              className="rounded"
            />
          </a>
        </Link>
      </CardImage>
      <ProductDescription>
        <CountDownContainer>
          <CountDown>
            <Countdown value={product?.expirationTime >0  && unixToMilSeconds(product?.expirationTime)} format={`D[d] HH[h] mm[m] ss[s]`} />
            {" left"} 🔥
          </CountDown>
        </CountDownContainer>
        <Link
          href={product?.asset ? `/nft/${product.asset?.tokenAddress}?tokenId=${product.asset?.tokenId}` : `/nft/${product?.assetBundle?.maker?.address}?bundle=1`}  >
        <a>
          <CardTitle>{product?.asset ? (product.asset?.name ? product.asset?.name : product.asset?.collection?.name) : product?.assetBundle?.name}</CardTitle>
        </a>
        </Link>
        {/* <BidsStatus>{CONSTANTS.bidsStatus}</BidsStatus> */}
        <ProductDescriptionBottom>
          <ProductPrice>{`${price} ${product.paymentTokenContract.symbol}`}</ProductPrice>
          {/* <ProductList>
            {" " + "1" + " of " + "2"}
          </ProductList> */}
        </ProductDescriptionBottom>
      </ProductDescription>
    </ProductCard>
  );
}
export default LiveAuctions;
