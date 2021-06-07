import { Row, Col } from "antd";
import { Menu, Dropdown, Avatar, Tooltip } from "antd";
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
} from "./StyledComponents/liveAuctions-styledComponents";

function Products(props) {
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
  const [products, setProducts] = useState([])

  useEffect(() =>{
  console.log("products: ", props.data);
    setProducts(props.data)
  });
  return (
    <>
      <CardsContainer>
          {products && products.map((n, index) => (
            <ProductCardContainer className={"p-1"}>
            <ProductCard
              key={index}
              // style={{ width: "280px" }}
              className="p-3 p-sm-2 p-md-2 p-lg-3"
            >
              <ProductCardHeader className={`mt-1 float-right mb-2`}>
                {/* <div className={"pl-3"}>
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
                  </div> */}
                  <Dropdown
                    trigger={["click"]}
                    overlay={menu}
                    placement="bottomRight"
                  >
                    <Button>...</Button>
                  </Dropdown>
                </ProductCardHeader>
                <div className={`col-md-12 p-3`}>
              <a href={`/product-details?id=${n.id}`}>
                  <img style={{height: "200px"}} src={n.image_preview_url} className="w-100 img-fluid" />
                </a>
                </div>
                <ProductDescription>
                  <a href={`/product-details?id=${n.id}`}>
                    <CardTitle>{n.name}</CardTitle>
                  </a>
                  <ProductPrice>{n.price}</ProductPrice>
                  <ProductList>
                    {/* {" " + n.currentQTY + " of " + n.totalQTY} */}
                  </ProductList>
                  <br />
                  {/* <ProductPrice fontSize={"12px"}>{n.price}</ProductPrice> */}
                </ProductDescription>
              </ProductCard>
              </ProductCardContainer>
          ))}
      </CardsContainer>
    </>
  );
}

export default Products;
