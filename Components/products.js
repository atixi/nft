import { Menu, Dropdown, Avatar, Tooltip, Image} from "antd";
import Link from "next/link";
import React, { useEffect, useState } from "react";
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
  CardImage
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
  const [products, setProducts] = useState([]);
  useEffect(() => {
    setProducts(props.data);
  });
  return (
    <>
      <CardsContainer>
        {products.length > 0 &&
          products.map((n, index) =>
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
                                src={n.owner.profile_img_url}
                                width={12}
                                height={12}
                              />
                            }
                          />
                        </Tooltip>
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
                  <CardImage className={`p-1 text-center`}>
                    <Link
                      href={`/nft/${n?.assetContract?.address}?tokenId=${n?.tokenId}`}
                    >
                      <a>
                        {" "}
                        <Image
                          src={n.imageUrl}
                          className="rounded"
                          preview={false}
                        />
                      </a>
                    </Link>
                  </CardImage>
                  <ProductDescription>
                    <Link
                      href={`/nft/${n?.assetContract?.address}?tokenId=${n?.tokenId}`}
                    >
                      <a>
                        <CardTitle>{n?.name}</CardTitle>
                      </a>
                    </Link>
                    <ProductPrice>{n.price}</ProductPrice>
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
