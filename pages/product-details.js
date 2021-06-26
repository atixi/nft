import { Dropdown, Image, Menu, Statistic, Tabs, Avatar, Skeleton } from "antd";
import { useRouter } from "next/router";
import Link from "next/link";
import { useEffect, useState } from "react";
import {
  Auction, AuctionLabel, AuctionTimer, AvatarContainer, BidCountdown, BidOwner, BidOwnerContainer, BidOwnerProfile, BidPrice, BidPriceValue, ButtonContainer, Content, DropdownMenu, FooterButton, ImageCon, ItemDescriptionText, ItemDetails, ItemDetailsHeader, ItemFooter, ItemImageContainer, ItemInfo, ItemLink, ItemName, ItemTopButtonContainer, LastBidder, PriceInCryptoContainer,
  PriceInDollarContainer, Wrapper
} from "../Components/StyledComponents/productDetails-styledComponents";
import {
  getAuctionPriceDetails
} from "/Constants/constants";
import CONSTANTS from "/Constants/productDetailsConstants";
import OpenSeaAPI from "/Utils/openseaApi";

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
  </DropdownMenu>
);
function ProductPage() {
  const router = useRouter();
  const [asset, setAsset] = useState({});
  const {ta} = router.query;
  const {ti} = router.query;
  const [bids, setBids] = useState([]);

  useEffect(() => {
    ta && loadAsset(ta, ti);
  }, [ta]);

  const loadAsset = async (ta, ti) => {
    let asset = await OpenSeaAPI.getAssetDetails(ta, ti);
    console.log("assets", asset)
    setAsset(asset);
    setBids(asset.orders);
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
      <Wrapper>
        <Content className={`d-sm-flex`}>
          <ItemImageContainer className=" text-center">
            {/* <img className={"itemImage"} src={asset.asset?.imageUrl} /> */}
            <ImageCon>
              {asset.asset?.imageUrl ? <Image
                src={`${asset.asset?.imageUrl}?x-oss-process=image/blur,r_50,s_50/quality,q_1/resize,m_mfit,h_200,w_200`}
                preview={{
                  src: `${asset.asset?.imageUrl}`,
                }}
              /> : 
              <Skeleton.Image />
              }
            </ImageCon>
          </ItemImageContainer>
          <ItemInfo className={"float-none float-sm-left"}>
            <ItemDetails>
              <ItemDetailsHeader>
                <ItemName>{asset.asset?.collection?.name}</ItemName>
                <ItemTopButtonContainer>
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
              </div>
              <ItemDescriptionText>
                {asset.asset?.collection?.description}
              </ItemDescriptionText>
              <span style={{ color: "#ccc" }}>{CONSTANTS.owner}</span>
              <br />
              <Link 
               href = {{pathname: "/profile/index",
               query: {address: asset.asset?.owner?.address,
               talent: checkName(asset.asset?.owner?.user?.username),
               avatar: asset.asset?.owner?.profile_img_url}
               }} passHref><a>
              <AvatarContainer>
                <Avatar
                  size={"small"}
                  icon={<img src={asset.asset?.owner?.profile_img_url} />}
                />
                <span style={{ flex: "1" }}>
                  {checkName(asset.asset?.owner?.user?.username)}
                </span>
              </AvatarContainer>
              </a></Link>
              <Tabs defaultActiveKey="4">
                <TabPane key="1" tab={<span>{CONSTANTS.details}</span>}>
                  <span style={{ color: "#ccc" }}>{CONSTANTS.owner}</span>
                  <br />
                  <Link 
                    href = {{pathname: "/profile/index",
                    query: {address: asset.asset?.owner?.address,
                    talent: checkName(asset.asset?.owner?.user?.username),
                    avatar: asset.asset?.owner?.profile_img_url}
                    }} passHref><a>
                  <AvatarContainer>
                  <Avatar
                      size={"small"}
                      icon={<img src={asset.asset?.owner?.profile_img_url} />}
                    />

                    <span style={{ flex: "1" }}>
                    {checkName(asset.asset?.owner?.user?.username)}
                    </span>
                  </AvatarContainer> </a></Link>
                </TabPane>
                <TabPane key="2" tab={<span>{CONSTANTS.bids}</span>}>
                  {bids &&
                    bids.map((order, i) => (
                      <LastBidder key={i} id={order.owner?.address}>
                        <div className={"content"}>
                          <span className="avatarContainer">
                          <Link 
                            href = {{pathname: "/profile/index",
                            query: {address: order.makerAccount?.address,
                            talent: checkName(order.makerAccount?.user?.username),
                            avatar: order.makerAccount?.profile_img_url}
                            }} passHref><a>
                           <Avatar
                            size={"small"}
                            icon={<img src={order.makerAccount?.profile_img_url} />}
                            />
                            </a></Link>
                          </span>
                          <span className={"bidInfo"}>
                            <span className={"bidedPriceContainer"}>
                              <span className={"bidedPriceText"}>
                                <span className={"bidValue"}>{`${
                                  getAuctionPriceDetails(order).priceBase
                                } wETH`}</span>
                                {" by "}
                                <Link 
                                  href = {{pathname: "/profile/index",
                                  query: {address: order.makerAccount?.address,
                                  talent: checkName(order.makerAccount?.user?.username),
                                  avatar: order.makerAccount?.profile_img_url}
                                  }} passHref>
                                <a className={"bidderLink"}>
                                  {checkName(order.makerAccount?.user?.username)}
                                </a></Link>
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
                  <Link 
                    href = {{pathname: "/profile/index",
                    query: {address: asset.asset?.owner?.address,
                    talent: checkName(asset.asset?.owner?.user?.username),
                    avatar: asset.asset?.owner?.profile_img_url}
                    }} passHref><a>
                  <AvatarContainer>
                    <Avatar
                    size={"small"}
                    icon={<img src={asset.asset?.owner?.profile_img_url} />}
                    />
                    <span style={{ flex: "1" }}>
                    {checkName(asset.asset?.owner?.user?.username)}
                    </span>
                  </AvatarContainer>
                  </a></Link>
                </TabPane>
              </Tabs>
            </ItemDetails>
            <ItemFooter>
              <BidCountdown>
                <BidOwnerContainer className={"border-right pr-2 pl-2"}>
                  <BidOwner className={"float-left"}>
                    {CONSTANTS.highestBid}{" "}
                    <Link 
                    href = {{pathname: "/profile/index",
                    query: {address: asset.asset?.owner?.address,
                    talent: checkName(asset.asset?.owner?.user?.username),
                    avatar: asset.asset?.owner?.profile_img_url}
                    }} passHref><a>
                    {checkName(asset.asset?.owner?.user?.username)}
                    </a></Link>
                  </BidOwner>
                  <BidPrice>
                  <Link 
                    href = {{pathname: "/profile/index",
                    query: {address: asset.asset?.owner?.address,
                    talent: checkName(asset.asset?.owner?.user?.username),
                    avatar: asset.asset?.owner?.profile_img_url}
                    }} passHref><a>
                    <BidOwnerProfile className={"mr-3"}>
                    <Avatar
                    size={"large"}
                    icon={<img src={asset.asset?.owner?.profile_img_url} />}
                    />
                    </BidOwnerProfile>
                    </a></Link>
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
function checkName(name)
{
  if(name != null && name != undefined && name != "NullAddress")
  return name;
  else
  return "Anonymous";
}
export default ProductPage;
