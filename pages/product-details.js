import { Component, useEffect, useState } from "react";
import Header from "/Components/header";
import { Tabs, Menu, Dropdown, Image, Statistic, Col } from "antd";
import Profile from "/Components/profileAvatar";
import CONSTANTS from "/Constants/productDetailsConstants";
import OpenSeaAPI from "/Utils/openseaApi";
import {
  Wrapper,
  Content,
  ItemTopButtonContainer,
  ItemDetailsHeader,
  Auction,
  BidOwnerContainer,
  Counter,
  BidPriceValue,
  BidOwnerProfile,
  AuctionTimer,
  BidCountdown,
  LastBidder,
  AuctionLabel,
  PriceInCryptoContainer,
  PriceInDollarContainer,
  BidOwner,
  BidPrice,
  FooterButton,
  AvatarContainer,
  ButtonContainer,
  OwnerProfitContainer,
  ItemImageContainer,
  ItemDescriptionText,
  DropdownMenu,
  ItemLink,
  ItemInfo,
  ItemDetails,
  ItemFooter,
  ItemName,
  ImageCon,
  CounterLarge,
} from "../Components/StyledComponents/productDetails-styledComponents";
import {
  getAuctionPriceDetails,
  getAuctionTimeDetails,
} from "/Constants/constants";

const { TabPane } = Tabs;
const { Countdown } = Statistic;
const menu = (
  <DropdownMenu className={"mt-3"}>
    <Menu.Item>
      <ItemLink>
        <span>{"New bid"}</span>
      </ItemLink>
    </Menu.Item>
    <Menu.Item>
      <ItemLink>
        <span>{"View on OpenSea"}</span>
      </ItemLink>
    </Menu.Item>
    <Menu.Item>
      <ItemLink>
        <span>{"Share"}</span>
      </ItemLink>
    </Menu.Item>
    <Menu.Item>
      <ItemLink>
        <span>{"Report"}</span>
      </ItemLink>
    </Menu.Item>
  </DropdownMenu>
);
function ProductPage() {
  const [asset, setAsset] = useState({});
  const tokenAddress = new URLSearchParams(window.location.search).getAll("ta");
  const tokenId = new URLSearchParams(window.location.search).getAll("ti");
  const [bids, setBids] = useState([]);

  useEffect(() => {
    loadAsset(tokenAddress, tokenId);
  }, []);

  const loadAsset = async (tokenAddress, tokenId) => {
    let asset = await OpenSeaAPI.getAssetDetails(tokenAddress, tokenId);
    setAsset(asset);
    setBids(asset.asset.buyOrders);
  };
  const item = {
    image: "/images/p1.jpeg",
    name: "CoinBae #1",
    favorite: 62,
    category: "🌈 Art",
    description: `There are only 3. 1 of them in Saltbae's collection, 2 of them are mine. If you buy it, you will have the PSD file. You can edit it as you wish and be the creator of the project. This rare work is a project I've been working on since...`,
    owner: {
      avatar: "/images/profpics/1.jpg",
      name: "Saltbae Nusret",
    },
  };
  const deadline = Date.now() + 1000 * 60 * 60 * 24 * 2 + 1000 * 30;
  return (
    <>
      <Header />
      <Wrapper>
        <Content className={`d-sm-flex`}>
          <ItemImageContainer className=" text-center">
            {/* <img className={"itemImage"} src={asset.asset?.imageUrl} /> */}
            <ImageCon>
              <Image
                src={`${asset.asset?.imageUrl}?x-oss-process=image/blur,r_50,s_50/quality,q_1/resize,m_mfit,h_200,w_200`}
                preview={{
                  src: `${asset.asset?.imageUrl}`,
                }}
              />
            </ImageCon>
          </ItemImageContainer>
          <ItemInfo className={"float-none float-sm-left"}>
            <ItemDetails>
              <ItemDetailsHeader>
                <ItemName>{asset.asset?.collection?.name}</ItemName>
                <ItemTopButtonContainer>
                  {/* <button style={{ flex: "none" }}>
                    <svg
                      viewBox="0 0 17 16"
                      fill="none"
                      width="16"
                      height="16"
                      xlmns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M8.2112 14L12.1056 9.69231L14.1853 7.39185C15.2497 6.21455 15.3683 4.46116 14.4723 3.15121V3.15121C13.3207 1.46757 10.9637 1.15351 9.41139 2.47685L8.2112 3.5L6.95566 2.42966C5.40738 1.10976 3.06841 1.3603 1.83482 2.97819V2.97819C0.777858 4.36443 0.885104 6.31329 2.08779 7.57518L8.2112 14Z"
                        stroke="rgba(4, 4, 5, 1)"
                        strokeWidth="2"
                      ></path>
                    </svg>
                    {" " + item.favorite}
                  </button> */}
                  <button
                    style={{
                      flex: "none",
                      padding: "0px !important",
                      width: "35px",
                    }}
                  >
                    <Dropdown
                      overlay={menu}
                      placement="bottomLeft"
                      trigger={["click"]}
                    >
                      <svg
                        style={{ marginLeft: "-5px", color: "gray" }}
                        viewBox="1 2 14 4"
                        fill="none"
                        width="13.200000000000001"
                        height="13.200000000000001"
                        xlmns="http://www.w3.org/2000/svg"
                      >
                        <path
                          fillRule="evenodd"
                          clipRule="evenodd"
                          d="M3.5 2C3.5 2.82843 2.82843 3.5 2 3.5C1.17157 3.5 0.5 2.82843 0.5 2C0.5 1.17157 1.17157 0.5 2 0.5C2.82843 0.5 3.5 1.17157 3.5 2ZM8.5 2C8.5 2.82843 7.82843 3.5 7 3.5C6.17157 3.5 5.5 2.82843 5.5 2C5.5 1.17157 6.17157 0.5 7 0.5C7.82843 0.5 8.5 1.17157 8.5 2ZM11.999 3.5C12.8274 3.5 13.499 2.82843 13.499 2C13.499 1.17157 12.8274 0.5 11.999 0.5C11.1706 0.5 10.499 1.17157 10.499 2C10.499 2.82843 11.1706 3.5 11.999 3.5Z"
                          fill="currentColor"
                        ></path>
                      </svg>
                    </Dropdown>
                  </button>
                </ItemTopButtonContainer>
              </ItemDetailsHeader>
              <div>
                <span className="text-gradient">{"1 ETH"}</span>
                <span style={{ color: "#ccc" }}> / 1 of 3</span>
              </div>
              <div>
                <button>{item.category}</button>
                <button>
                  <span className="text-gradient">Unlockable</span>
                </button>
              </div>
              <ItemDescriptionText>
                {asset.asset?.collection?.description}
              </ItemDescriptionText>
              <span style={{ color: "#ccc" }}>{CONSTANTS.owner}</span>
              <br />
              <AvatarContainer>
                <Profile
                  profile={asset.asset?.owner?.profile_img_url}
                  size={"medium"}
                  tick={false}
                />

                <span style={{ flex: "1" }}>
                  {asset.asset?.owner?.user.username}
                </span>
              </AvatarContainer>
              <OwnerProfitContainer>
                <small>{"10% of sales will go to creator"}</small>
              </OwnerProfitContainer>
              <Tabs defaultActiveKey="4">
                <TabPane key="1" tab={<span>{CONSTANTS.details}</span>}>
                  <span style={{ color: "#ccc" }}>{CONSTANTS.owner}</span>
                  <br />
                  <AvatarContainer>
                    <Profile
                      profile={asset.asset?.owner?.profile_img_url}
                      size={"medium"}
                      tick={false}
                    />

                    <span style={{ flex: "1" }}>
                      {asset.asset?.owner?.user.username}
                    </span>
                  </AvatarContainer>
                </TabPane>
                <TabPane key="2" tab={<span>{CONSTANTS.bids}</span>}>
                  {bids &&
                    bids.map((order) => (
                      <LastBidder id={order.owner?.address}>
                        <div className={"content"}>
                          <span className="avatarContainer">
                            <Profile
                              profile={order.makerAccount?.profile_img_url}
                              size={"medium"}
                              tick={false}
                            />
                          </span>
                          <span className={"bidInfo"}>
                            <span className={"bidedPriceContainer"}>
                              <span className={"bidedPriceText"}>
                                <span className={"bidValue"}>{`${
                                  getAuctionPriceDetails(order).priceBase
                                } wETH`}</span>
                                {" by "}
                                <a className={"bidderLink"}>
                                  {order.makerAccount?.user?.username}
                                </a>
                              </span>
                            </span>
                            <span className={"bidOwnerAndDateContainer"}>
                              <span className={"bidDate"}>
                                {"6/2/2021, 11:50 PM"}
                              </span>
                            </span>
                          </span>
                        </div>
                      </LastBidder>
                    ))}
                </TabPane>
                <TabPane key="3" tab={<span>{CONSTANTS.owners}</span>}>
                  <span style={{ color: "#ccc" }}>{CONSTANTS.owner}</span>
                  <br />
                  <AvatarContainer>
                    <Profile
                      profile={asset.asset?.owner?.profile_img_url}
                      size={"medium"}
                      tick={false}
                    />

                    <span style={{ flex: "1" }}>
                      {asset.asset?.owner?.user.username}
                    </span>
                  </AvatarContainer>
                </TabPane>
                <TabPane key="4" tab={<span>{CONSTANTS.history}</span>}>
                  <LastBidder>
                    <div className={"content"}>
                      <span className="avatarContainer">
                        <Profile
                          profile={item.owner.avatar}
                          size={"medium"}
                          tick={false}
                        />
                      </span>
                      <span className={"bidInfo"}>
                        <span className={"bidedPriceContainer"}>
                          <span className={"bidedPriceText"}>
                            {CONSTANTS.bid + " "}
                            <span className={"bidValue"}>{"0.01 wETH"}</span>
                          </span>
                        </span>
                        <span className={"bidOwnerAndDateContainer"}>
                          {"by "}
                          <a className={"bidderLink"}>kandee</a>
                          {" at "}
                          <span className={"bidDate"}>
                            {"6/2/2021, 11:50 PM"}
                          </span>
                        </span>
                      </span>
                    </div>
                  </LastBidder>
                </TabPane>
              </Tabs>
            </ItemDetails>
            <ItemFooter>
              <BidCountdown>
                <BidOwnerContainer className={"border-right pr-2 pl-2"}>
                  <BidOwner className={"float-left"}>
                    {CONSTANTS.highestBid}{" "}
                    <a>{asset.asset?.owner?.user?.username}</a>
                  </BidOwner>
                  <BidPrice>
                    <BidOwnerProfile className={"mr-3"}>
                      <Profile
                        profile={asset.asset?.owner?.profile_img_url}
                        size={"large"}
                        tick={false}
                      />
                    </BidOwnerProfile>
                    <BidPriceValue>
                      <PriceInCryptoContainer>
                        <span>{`0.02 eth`}</span>
                        {/* <span>{`${getAuctionPriceDetails(asset.asset?.orders[0]).priceBase} eth`}</span> */}
                      </PriceInCryptoContainer>
                      <PriceInDollarContainer>
                        <span>{"~$32"}</span>
                      </PriceInDollarContainer>
                    </BidPriceValue>
                  </BidPrice>
                </BidOwnerContainer>
                <Auction>
                  <div className={"auctionDiv"}>
                    <AuctionLabel>{CONSTANTS.auctionLabel}</AuctionLabel>
                    <AuctionTimer>
                      <Countdown
                        value={deadline}
                        valueStyle={{
                          color: "red",
                          fontSize: "30px !important",
                        }}
                        format={`D[d] HH[h] mm[m] ss[s]`}
                      />
                    </AuctionTimer>
                  </div>
                </Auction>
              </BidCountdown>
              <ButtonContainer>
                <FooterButton
                  color={"#ffffff"}
                  style={{ background: "#0066ff" }}
                >
                  Buy
                </FooterButton>
                <FooterButton
                  color={"#0066ff"}
                  style={{ background: "#0066ff26" }}
                >
                  Place a bid
                </FooterButton>
              </ButtonContainer>
              <center>Service fee 2.5%. 1.025 ETH (~$4,383.71)</center>
            </ItemFooter>
          </ItemInfo>
        </Content>
      </Wrapper>
    </>
  );
}

export default ProductPage;
