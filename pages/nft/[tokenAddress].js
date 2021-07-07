import { Dropdown, Image, Menu, Statistic, Tabs, Avatar, Result, Button, Spin } from "antd";
import Link from "next/link";
import { useEffect, useState } from "react";
import {
  Auction,
  AuctionLabel,
  AuctionTimer,
  AvatarContainer,
  BidCountdown,
  BidOwner,
  BidOwnerContainer,
  BidOwnerProfile,
  BidPrice,
  BidPriceValue,
  ButtonContainer,
  Content,
  DropdownMenu,
  FooterButton,
  ImageCon,
  ItemDescriptionText,
  ItemDetails,
  ItemDetailsHeader,
  ItemFooter,
  ItemImageContainer,
  ItemInfo,
  ItemLink,
  ItemName,
  ItemTopButtonContainer,
  LastBidder,
  PriceInCryptoContainer,
  PriceInDollarContainer,
  Wrapper,
} from "../../Components/StyledComponents/productDetails-styledComponents";
import { getAuctionPriceDetails } from "/Constants/constants";
import CONSTANTS from "/Constants/productDetailsConstants";
import { useQueryParam } from "/Components/hooks/useQueryParam";
import { fetchNft } from "/Utils/strapiApi";
import { unixToHumanDate, checkName, prevImage, findHighestBid, convertToUsd} from "/Utils/utils";
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
  const queryParam = useQueryParam();
  const [asset, setAsset] = useState({});
  const [bids, setBids] = useState([]);
  const [loading, setLoading] = useState(true);
  const [notFound, setNotFound] = useState(false)
  const [priceDetails, setPriceDetails] = useState(null);
  const [highestBid, setHighestBid] = useState(null)
  const [previewImage, setPreviewImage] = useState(null)
  const loadNft = async () => {
    if (queryParam.tokenAddress != undefined && queryParam.tokenId != undefined) {
      const data = await fetchNft(queryParam.tokenAddress,queryParam.tokenId);
      if(data)
      setLoading(false);

      if(data.status == 200)
      {
        const nft = data.data;
        setAsset({
          name: nft.name,
          description: nft.description,
          owner: nft.owner,
          creator: nft?.creator,
          image: nft.imageUrl,
        });
        nft.imageUrl && setPreviewImage(prevImage(nft.imageUrl))
      setBids(nft?.orders);
      nft?.orders && setHighestBid(findHighestBid(nft?.orders))
      }
      else if(data=="error")
      {
        setNotFound(true)
      }
    }
  }
  useEffect(() => {
    if (!queryParam) {
      return null;
    }
    loadNft();
  }, [queryParam]);

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
        {loading ? <Spin style={{marginTop: "200px"}} /> : 
        notFound
         ?  <Result
         status="500"
         title="Error!"
         subTitle="Please try again!"
         extra={[
          <Link key={"goBack"} href={"/"}><a><Button key="buy">{"Back to home"}</Button></a></Link>
         ]}
       /> :
        <Content className={`d-sm-flex`}>
          <ItemImageContainer className=" text-center">
            {/* <img className={"itemImage"} src={asset.asset?.imageUrl} /> */}
            <ImageCon>
              <Image
                src={`${asset?.image}`}
                preview={{
                  src: `${previewImage}`,
                }}
              />
            </ImageCon>
          </ItemImageContainer>
          <ItemInfo className={"float-none float-sm-left"}>
            <ItemDetails>
              <ItemDetailsHeader>
                <ItemName>{asset.name}</ItemName>
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
                <span className="text-gradient">
                  {asset?.currentPrice &&
                    getAuctionPriceDetails(asset).priceBase}
                  {asset?.paymentTokenContract &&
                    asset.paymentTokenContract.symbol}
                </span>
                <span style={{ color: "#ccc" }}>
                  1 of {bids ? bids.length : 1}
                </span>
              </div>
              <div>
                <button>{item.category}</button>
              </div>
              <ItemDescriptionText>
                {asset?.description}
              </ItemDescriptionText>
              <span style={{ color: "#ccc" }}>{CONSTANTS.owner}</span>
              <br />
              <Link
                href={`/profile/${asset?.owner?.address}`}
                passHref
              >
                <a>
                  <AvatarContainer>
                    <Avatar
                      size={"small"}
                      icon={<img src={asset?.owner?.profile_img_url} />}
                    />
                    <span style={{ flex: "1" }}>
                      {checkName(asset?.owner?.user?.username)}
                    </span>
                  </AvatarContainer>
                </a>
              </Link>
              <Tabs defaultActiveKey="4">
                <TabPane key="1" tab={<span>{CONSTANTS.details}</span>}>
                  <span style={{ color: "#ccc" }}>{CONSTANTS.owner}</span>
                  <br />
                  <Link
                    href={{
                      pathname: "/profile/talent",
                      query: {
                        address: asset?.owner?.address,
                        talent: checkName(asset?.owner?.user?.username),
                        avatar: asset?.owner?.profile_img_url,
                      },
                    }}
                    passHref
                  >
                    <a>
                      <AvatarContainer>
                        <Avatar
                          size={"small"}
                          icon={
                            <img src={asset?.owner?.profile_img_url} />
                          }
                        />

                        <span style={{ flex: "1" }}>
                          {checkName(asset?.owner?.user?.username)}
                        </span>
                      </AvatarContainer>{" "}
                    </a>
                  </Link>
                </TabPane>
                <TabPane key="2" tab={<span>{CONSTANTS.bids}</span>}>
                  {bids &&
                    bids.map((order, i) => (
                      <LastBidder key={i} id={order.owner?.address}>
                        <div className={"content"}>
                          <span className="avatarContainer">
                            <Link
                              href={{
                                pathname: "/profile/talent",
                                query: {
                                  address: order.makerAccount?.address,
                                  talent: checkName(
                                    order.makerAccount?.user?.username
                                  ),
                                  avatar: order.makerAccount?.profile_img_url,
                                },
                              }}
                              passHref
                            >
                              <a>
                                <Avatar
                                  size={"small"}
                                  icon={
                                    <img
                                      src={order.makerAccount?.profile_img_url}
                                    />
                                  }
                                />
                              </a>
                            </Link>
                          </span>
                          <span className={"bidInfo"}>
                            <span className={"bidedPriceContainer"}>
                              <span className={"bidedPriceText"}>
                                <span className={"bidValue"}>{`${
                                  getAuctionPriceDetails(order).priceBase
                                } ${order?.paymentTokenContract?.symbol}`}</span>
                                {" by "}
                                <Link
                                  href={{
                                    pathname: "/profile/talent",
                                    query: {
                                      address: order.makerAccount?.address,
                                      talent: checkName(
                                        order.makerAccount?.user?.username
                                      ),
                                      avatar:
                                        order.makerAccount?.profile_img_url,
                                    },
                                  }}
                                  passHref
                                >
                                  <a className={"bidderLink"}>
                                    {checkName(
                                      order.makerAccount?.user?.username
                                    )}
                                  </a>
                                </Link>
                              </span>
                            </span>
                            <span className={"bidOwnerAndDateContainer"}>
                              <span className={"bidDate"}>
                                {unixToHumanDate(order?.createdTime)}
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
                    href={{
                      pathname: "/profile/talent",
                      query: {
                        address: asset?.owner?.address,
                        talent: checkName(asset?.owner?.user?.username),
                        avatar: asset?.owner?.profile_img_url,
                      },
                    }}
                    passHref
                  >
                    <a>
                      <AvatarContainer>
                        <Avatar
                          size={"small"}
                          icon={
                            <img src={asset?.owner?.profile_img_url} />
                          }
                        />
                        <span style={{ flex: "1" }}>
                          {checkName(asset?.owner?.user?.username)}
                        </span>
                      </AvatarContainer>
                    </a>
                  </Link>
                </TabPane>
              </Tabs>
            </ItemDetails>
            <ItemFooter>
              {highestBid &&<BidCountdown>
                <BidOwnerContainer className={"border-right pr-2 pl-2"}>
                  <BidOwner className={"float-left"}>
                    {CONSTANTS.highestBid}{" "}
                    <Link
                      href={{
                        pathname: "/profile/talent",
                        query: {
                          address: highestBid?.makerAccount?.address,
                          talent: checkName(highestBid?.makerAccount?.user?.username),
                          avatar: highestBid?.makerAccount?.profile_img_url,
                        },
                      }}
                      passHref
                    >
                      <a>{checkName(highestBid?.makerAccount?.user?.username)}</a>
                    </Link>
                  </BidOwner>
                  <BidPrice>
                    <Link
                      href={{
                        pathname: "/profile/talent",
                        query: {
                          address: highestBid?.makerAccount?.address,
                          talent: checkName(highestBid?.makerAccount?.user?.username),
                          avatar: highestBid?.makerAccount?.profile_img_url,
                        },
                      }}
                      passHref
                    >
                      <a>
                        <BidOwnerProfile className={"mr-3"}>
                          <Avatar
                            size={"large"}
                            icon={
                              <img src={highestBid?.makerAccount?.profile_img_url} />
                            }
                          />
                        </BidOwnerProfile>
                      </a>
                    </Link>
                    <BidPriceValue>
                      <PriceInCryptoContainer>
                        {/* <span>{`0.02 eth`}</span> */}
                        <span className={"bidValue"}>{`${
                                  getAuctionPriceDetails(highestBid).priceBase
                                } ${highestBid?.paymentTokenContract?.symbol}`}</span>
                        {/* <span>{`${getAuctionPriceDetails(asset.asset?.orders[0]).priceBase} eth`}</span> */}
                      </PriceInCryptoContainer>
                      <PriceInDollarContainer>
                        <span>{`~$ ${convertToUsd(highestBid)}`}</span> 
                      </PriceInDollarContainer>
                    </BidPriceValue>
                  </BidPrice>
                </BidOwnerContainer>
                {asset?.saleKind && asset?.saleKind ? (
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
                ) : (
                  ""
                )}
              </BidCountdown>}
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
            </ItemFooter>
          </ItemInfo>
        </Content> }
      </Wrapper> 
    </>
  );
}
export default ProductPage;
        