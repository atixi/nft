import { Menu, Dropdown, Avatar, Tooltip, Image } from "antd";
import Link from "next/link";
import React from "react";
import {
  Button,
  CardTitle,
  ProductPrice,
  ProductCard,
  ProductList,
  ProductCardHeader,
  ProductDescription,
  CardsContainer,
  ProductCardContainer,
  NFTImage,
  CardImage,
} from "./StyledComponents/liveAuctions-styledComponents";

function Products(props) {
  const menu = (
    <Menu>
      <Menu.Item key="1">Purchase now</Menu.Item>
      <Menu.Item key="2">Place a bid</Menu.Item>
      <Menu.Item key="3">View on OpenSea</Menu.Item>
      <Menu.Item key="3">Share</Menu.Item>
    </Menu>
  );

  return (
    <>
      <CardsContainer>
        {props.data &&
          props.data.assets.map((n, index) =>
            n.name != null ? (
              <ProductCardContainer key={index} className={"p-1"}>
                <ProductCard
                  // style={{ width: "280px" }}
                  className="p-3 p-sm-2 p-md-2 p-lg-3"
                >
                  <ProductCardHeader className={`mt-1`}>
                    <div className={"pl-3 float-left"}>
                      <Avatar.Group>
                        <Tooltip title={"Owner"} placement="top">
                          <Avatar
                            icon={
                              <img
                                src={
                                  props.data.talent
                                    ? props.data.talent.talentAvatar?.url
                                    : props.data.talentAvatar?.url
                                    ? props.data.talentAvatar?.url
                                    : n.talent?.talentAvatar?.url
                                    ? n.talent?.talentAvatar?.url
                                    : n.owner?.profile_img_url
                                }
                                width={12}
                                height={12}
                                alt={n.talentName}
                              />
                            }
                          />
                        </Tooltip>
                      </Avatar.Group>
                    </div>
                    <Dropdown
                      trigger={["click"]}
                      overlay={
                        <Menu>
                          <Menu.Item key={n.tokenId}>
                            <Link
                              href={`/nft/${n.tokenAddress}?tokenId=${n?.tokenId}`}
                            >
                              Buy/Bid
                            </Link>
                          </Menu.Item>
                          <Menu.Item key={n.tokenAddress}>
                            <Link
                              href={`https://opensea.io/assets/${n.tokenAddress}/${n?.tokenId}`}
                              passHref
                            >
                              <a target="_blank">View on OpenSea</a>
                            </Link>
                          </Menu.Item>
                          <Menu.Item key="3">Share</Menu.Item>
                        </Menu>
                      }
                      placement="bottomRight"
                    >
                      <Button>...</Button>
                    </Dropdown>
                  </ProductCardHeader>

                  <CardImage className={`p-1 text-center`}>
                    <Link
                      href={`/nft/${
                        n?.assetContract?.address
                          ? n?.assetContract?.address
                          : n.tokenAddress
                      }?tokenId=${n?.tokenId}`}
                    >
                      <a>
                        <NFTImage>
                          <Image
                            src={n.imageUrl}
                            className="rounded"
                            preview={false}
                            alt=""
                          />
                        </NFTImage>
                      </a>
                    </Link>
                  </CardImage>
                  <ProductDescription>
                    <Link
                      href={`/nft/${
                        n?.assetContract?.address
                          ? n?.assetContract?.address
                          : n.tokenAddress
                      }?tokenId=${n?.tokenId}`}
                    >
                      <a>
                        <CardTitle>{n?.name}</CardTitle>
                      </a>
                    </Link>
                    <ProductPrice>
                      <br />
                      {/* {(n.currentPrice
                        ? n.currentPrice
                        : n?.sellOrders[0]?.currentPrice) /
                        1000000000000000000}{" "} */}
                      Eth
                    </ProductPrice>
                    <ProductList>
                      {/* {" " + n.currentQTY + " of " + n.totalQTY} */}
                    </ProductList>
                    <br />
                    {/* <ProductPrice fontSize={"12px"}>{n.price}</ProductPrice> */}
                  </ProductDescription>
                </ProductCard>
              </ProductCardContainer>
            ) : (
              ""
            )
          )}
      </CardsContainer>
    </>
  );
}

export default Products;
