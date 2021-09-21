import * as Web3 from "web3";

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
  DetailTabDiv,
  DropdownMenu,
  FooterButton,
  ImageCon,
  ImageListContainer,
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
  SaleEnd,
  Wrapper,
} from "../../Components/StyledComponents/productDetails-styledComponents";
import {
  Avatar,
  Button,
  Dropdown,
  Image,
  Menu,
  Modal,
  Result,
  Spin,
  Statistic,
  Tabs,
  message,
} from "antd";
import {
  acceptThisOffer,
  buyOrder,
  cancelThisOffer,
  checkName,
  convertToUsd,
  detectVideo,
  displayAddress,
  findHighestOffer,
  prevImage,
  unixToHumanDate,
  unixToMilSeconds,
} from "/Utils/utils";
import { fetchBundle, fetchOne } from "/Utils/strapiApi";
import {
  getAccountTokens,
  getMetaConnected,
  getWalletConnected,
} from "store/action/accountSlice";
import { useEffect, useState } from "react";

import BuyNftModal from "/Components/buyNftModal";
import CONSTANTS from "/Constants/productDetailsConstants";
import { FieldTimeOutlined } from "@ant-design/icons";
import Link from "next/link";
import MakeOfferModal from "/Components/makeOfferModal";
import ReactPlayer from "react-player";
import { getAuctionPriceDetails } from "/Constants/constants";
import { socket } from "config/websocket";
import { useQueryParam } from "/Components/hooks/useQueryParam";
import { useRouter } from "next/router";
import { useSelector } from "react-redux";

const { TabPane } = Tabs;








const { Countdown } = Statistic;
function ProductPage() {
  const { ethereum } = window;
  let web3 = new Web3(ethereum);
  const router = useRouter();
  const queryParam = useQueryParam();
  const [asset, setAsset] = useState({});
  const [offers, setOffers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [notFound, setNotFound] = useState(false);
  const [priceDetails, setPriceDetails] = useState(null);
  const [highestOffer, setHighestOffer] = useState(null);
  const [previewImage, setPreviewImage] = useState(null);
  const [sellOrders, setSellOrders] = useState(null);
  const [isVideo, setIsVideo] = useState(false);
  const [refresh, setRefresh] = useState(true);

  const isWalletConnected = useSelector(getWalletConnected);
  const isMetaConnected = useSelector(getMetaConnected);
  const tokenAddresses = useSelector(getAccountTokens);
  const [address, setAddress] = useState(null);
  const [balance, setBalance] = useState(null);
  const [imageList, setImageList] = useState(null);
  const [isBundle, setIsBundle] = useState(false);
  const [mainImage, setMainImage] = useState(null);
  const [assets, setAssets] = useState(null);
  const [order, setOrder] = useState(null);

  const loadAgain = () => {
    setLoading(true);
    loadNft();
  };
  const loadNft = async () => {
    if (queryParam.slug) {
      setIsBundle(true);
      const bundle = await fetchBundle(
        queryParam.tokenAddress,
        queryParam.slug
      );
      if (bundle) {
        setLoading(false);
      }

      if (bundle.status == 200) {
        setOrder(bundle.data);
        const nft = bundle.data;
        setAssets(nft.assetBundle.assets);
        let owner = nft?.assetBundle?.maker;
        owner.makerAccount.address = web3.utils.toChecksumAddress(
          owner.makerAccount.address
        );
        let imgUrl = [nft.assetBundle.assets];
        nft.assetBundle.assets.map((asset, index) => {
          imgUrl[index] = {
            thumbnail: asset.imageUrlThumbnail,
            imageUrl: asset.imageUrl,
          };
        });
        setImageList(imgUrl);
        setAsset({
          name: nft?.assetBundle.name,
          slug: nft?.assetBundle.slug,
          description: nft?.assetBundle.description,
          owner: owner,
          creator: owner, // this part needs to be changed
          image: nft.assetBundle?.assets[0].imageUrl,
          contractAddress: nft?.assetBundle?.assetContract?.address,
          tokenId: nft?.tokenId,
          tokenAddress: nft?.tokenAddress,
          collection: nft?.collection,
          isPresale: nft?.isPresale,
          thumbnail: nft.assetBundle?.assets[0].imageUrlThumbnail,
          sellOrder: nft,
          numOfSales: nft?.numSales,
        });
        setIsVideo(detectVideo(nft.assetBundle?.assets[0].imageUrl));
        nft.assetBundle?.assets[0].imageUrl &&
          setPreviewImage(prevImage(nft.assetBundle?.assets[0].imageUrl));
        setMainImage(nft.assetBundle?.assets[0].imageUrl);
        setOffers(nft?.buyOrders);
        nft?.buyOrders && setHighestOffer(findHighestOffer(nft?.buyOrders));
        setSellOrders(nft?.sellOrders);
      } else if (bundle == "error") {
        setNotFound(true);
      }
    } else if (
      queryParam.tokenAddress != undefined &&
      queryParam.tokenId != undefined
    ) {
      const data = await fetchOne(
        queryParam?.tokenAddress,
        queryParam?.tokenId
      );
      if (data) {
        setLoading(false);
      }

      if (data.status == 200) {
        const nft = data.data;
        nft.owner.address = web3.utils.toChecksumAddress(nft.owner.address);
        setAsset({
          name: nft.name,
          description: nft.description,
          owner: nft.owner,
          creator: nft?.creator,
          image: nft.imageUrl,
          contractAddress: nft?.assetContract?.address,
          tokenId: nft.tokenId,
          tokenAddress: nft.tokenAddress,
          collection: nft.collection,
          isPresale: nft.isPresale,
          thumbnail: nft.imageUrlThumbnail,
          sellOrder: nft.sellOrder,
          numOfSales: nft.numSales,
        });
        setIsVideo(detectVideo(nft.imageUrl));
        setMainImage(nft.imageUrl);
        nft.imageUrl && setPreviewImage(prevImage(nft.imageUrl));
        setOffers(nft?.buyOrders);
        nft?.buyOrders && setHighestOffer(findHighestOffer(nft?.buyOrders));
        setSellOrders(nft?.sellOrders);
      } else if (data == "error") {
        setNotFound(true);
      }
    }
  };
  async function cancelOffer(order, address) {
    const cancel = await cancelThisOffer(order, address);
    if (cancel == undefined) {
      message.success("Offer Canceled");
      loadAgain();
    } else {
      message.error("Offer not canceled");
    }
  }
  async function acceptOffer(order, address) {
    const accept = await acceptThisOffer(order, address);
    if (accept != undefined) {
      message.success("Offer is accepted");
      loadAgain();
    } else {
      message.error("Offer is not accepted");
      message.error("accept");
    }
  }

  const refreshData = () => {
    socket.on("serverBroadCaseNewFixedPriceSell", (data) => {
      console.log("user receive new sell from server", data);
      if (typeof window !== "undefined") {
        router.replace({
          pathname: router.pathname,
          query: {
            tokenAddress: queryParam?.tokenAddress,
            tokenId: queryParam?.tokenId,
          },
        });
        console.log("router is ", router);
      }
    });
  };
  useEffect(() => {
    if (!queryParam) {
      return null;
    }
    refreshData();
    if (isWalletConnected) {
      setAddress(tokenAddresses.walletToken[0]);
      setBalance(tokenAddresses.walletBalance);
    } else if (isMetaConnected) {
      setAddress(tokenAddresses.metaToken[0]);
      setBalance(tokenAddresses.metaBalance);
    }

    refresh && loadNft();
  }, [queryParam]);

  function changeImage(url) {
    setIsVideo(detectVideo(url));
    if (!isVideo) {
      setMainImage(url);
      setPreviewImage(url);
    }
  }

  return (
    <>
      <Wrapper>
        {loading ? (
          <Spin style={{ marginTop: "200px" }} />
        ) : notFound ? (
          <Result
            status="500"
            title="Error!"
            subTitle="Please try again!"
            extra={[
              <Link key={"goBack"} href={"/"}>
                <a>
                  <Button key="buy">{"Back to home"}</Button>
                </a>
              </Link>,
            ]}
          />
        ) : (
          <Content className={`d-sm-flex`}>
            <ItemImageContainer className=" text-center">
              <ImageCon>
                {isVideo ? (
                  <ReactPlayer
                    url={asset?.image}
                    playing={true}
                    width={"auto"}
                    loop={true}
                    controls={true}
                  />
                ) : (
                  <Image
                    src={mainImage}
                    preview={{
                      src: `${previewImage}`,
                    }}
                  />
                )}
              </ImageCon>{" "}
              <br />
              <ImageListContainer>
                {imageList &&
                  imageList.map((image, index) => {
                    return (
                      <div key={index}>
                        <img
                          src={image.thumbnail}
                          onClick={() => changeImage(image.imageUrl)}
                        />
                      </div>
                    );
                  })}
              </ImageListContainer>
            </ItemImageContainer>
            <ItemInfo className={"float-none float-sm-left"}>
              <ItemDetails>
                <ItemDetailsHeader>
                  <ItemName>
                    {asset.name ? asset.name : asset.collection?.name}
                  </ItemName>
                </ItemDetailsHeader>
                <div>
                  <span className="text-gradient">
                    {asset?.sellOrder &&
                      getAuctionPriceDetails(asset?.sellOrder).priceBase}
                    {asset?.sellOrder &&
                      asset?.sellOrder.paymentTokenContract &&
                      asset?.sellOrder?.paymentTokenContract.symbol}
                  </span>
                  <span style={{ color: "#ccc" }}>
                    {/* {isBundle && ` 1 of  ${assets.length()}`} */}
                  </span>
                </div>
                {/* <div>
                <button>{item.category}</button>
              </div> */}
                <ItemDescriptionText>{asset?.description}</ItemDescriptionText>
                {sellOrders &&
                  sellOrders.length > 0 &&
                  sellOrders[0].expirationTime !== "0" && (
                    <SaleEnd>
                      <FieldTimeOutlined style={{ marginRight: "5px" }} />
                      {`Sale ends on ${unixToHumanDate(
                        sellOrders[0].expirationTime,
                        true
                      )}`}
                    </SaleEnd>
                  )}
                <span style={{ color: "#ccc" }}>{CONSTANTS.owner}</span>
                <br />
                <Link href={`/profile/${asset?.owner?.address}`} passHref>
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
                    <DetailTabDiv>
                      <span>{"Contract Address"}</span>
                      <span className="float-right">
                        {asset?.contractAddress &&
                          displayAddress(asset?.contractAddress)}
                      </span>
                    </DetailTabDiv>
                    <DetailTabDiv>
                      <span>{"Token ID"}</span>
                      <span className="float-right">
                        {asset?.tokenId && asset.tokenId.length > 15
                          ? displayAddress(asset?.tokenId)
                          : asset?.tokenId}
                      </span>
                    </DetailTabDiv>
                    <DetailTabDiv>
                      <span>{"Blockchain"}</span>
                      <span className="float-right">
                        {sellOrders && sellOrders[0]?.paymentTokenContract.name}
                      </span>
                    </DetailTabDiv>
                  </TabPane>
                  <TabPane key="2" tab={<span>{CONSTANTS.offers}</span>}>
                    {offers &&
                      offers.map((order, i) => (
                        <LastBidder key={i} id={order.owner?.address}>
                          <div className={"content"}>
                            <span className="avatarContainer">
                              <Link
                                href={`/profile/${order?.makerAccount?.address}`}
                                passHref
                              >
                                <a>
                                  <Avatar
                                    size={"small"}
                                    icon={
                                      <img
                                        src={
                                          order.makerAccount?.profile_img_url
                                        }
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
                                  } ${
                                    order?.paymentTokenContract?.symbol
                                  }`}</span>
                                  {" by "}
                                  <Link
                                    href={`/profile/${order?.makerAccount?.address}`}
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
                                <span>
                                  {order.makerAccount.address == address ? (
                                    <Button
                                      onClick={() =>
                                        cancelOffer(order, address)
                                      }
                                      shape="round"
                                      size="small"
                                    >
                                      {"Cancel"}
                                    </Button>
                                  ) : (
                                    ""
                                  )}
                                </span>
                                <span>
                                  {asset?.owner.address == address ? (
                                    <Button
                                      onClick={() =>
                                        acceptOffer(order, address)
                                      }
                                      shape="round"
                                      size="small"
                                    >
                                      {"Accept"}
                                    </Button>
                                  ) : (
                                    ""
                                  )}
                                </span>
                              </span>
                            </span>
                          </div>
                        </LastBidder>
                      ))}
                  </TabPane>
                  <TabPane key="4" tab={<span>{"Listing"}</span>}>
                    {sellOrders &&
                      sellOrders.map((order, i) => (
                        <LastBidder key={i} id={order.owner?.address}>
                          <div className={"content"}>
                            <span className="avatarContainer">
                              <Link
                                href={`/profile/${order?.makerAccount?.address}`}
                                passHref
                              >
                                <a>
                                  <Avatar
                                    size={"small"}
                                    icon={
                                      <img
                                        src={
                                          order.makerAccount?.profile_img_url
                                        }
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
                                  } ${
                                    order?.paymentTokenContract?.symbol
                                  }`}</span>
                                  {" by "}
                                  <Link
                                    href={`/profile/${order?.makerAccount?.address}`}
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
                                <span>
                                  {order.makerAccount.address == address ? (
                                    <Button
                                      onClick={() =>
                                        cancelOffer(order, address)
                                      }
                                      shape="round"
                                      size="small"
                                    >
                                      {"Cancel"}
                                    </Button>
                                  ) : (
                                    ""
                                  )}
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
                    <Link href={`/profile/${asset?.owner?.address}`} passHref>
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
                  </TabPane>
                </Tabs>
              </ItemDetails>
              <ItemFooter>
                {sellOrders && (
                  <BidCountdown>
                    {highestOffer && (
                      <BidOwnerContainer className={"border-right pr-2 pl-2"}>
                        <BidOwner className={"float-left"}>
                          {CONSTANTS.highestOffer}{" "}
                          <Link
                            href={`/profile/${highestOffer?.makerAccount?.address}`}
                            passHref
                          >
                            <a>
                              {checkName(
                                highestOffer?.makerAccount?.user?.username
                              )}
                            </a>
                          </Link>
                        </BidOwner>
                        <BidPrice>
                          <Link
                            href={`/profile/${highestOffer?.makerAccount?.address}`}
                            passHref
                          >
                            <a>
                              <BidOwnerProfile className={"mr-3"}>
                                <Avatar
                                  size={"large"}
                                  icon={
                                    <img
                                      src={
                                        highestOffer?.makerAccount
                                          ?.profile_img_url
                                      }
                                    />
                                  }
                                />
                              </BidOwnerProfile>
                            </a>
                          </Link>
                          <BidPriceValue>
                            <PriceInCryptoContainer>
                              <span className={"bidValue"}>{`${
                                getAuctionPriceDetails(highestOffer).priceBase
                              } ${
                                highestOffer?.paymentTokenContract?.symbol
                              }`}</span>
                            </PriceInCryptoContainer>
                            <PriceInDollarContainer>
                              {/* <span>{`~$ ${convertToUsd(highestOffer)}`}</span> */}
                            </PriceInDollarContainer>
                          </BidPriceValue>
                        </BidPrice>
                      </BidOwnerContainer>
                    )}
                    {sellOrders !== undefined &&
                      sellOrders[0]?.expirationTime !== "0" &&
                      sellOrders[0]?.expirationTime != undefined && (
                        <Auction>
                          <div className={"auctionDiv"}>
                            <AuctionLabel>
                              {CONSTANTS.auctionLabel}
                            </AuctionLabel>
                            <AuctionTimer>
                              <Countdown
                                value={unixToMilSeconds(
                                  sellOrders[0]?.expirationTime
                                )}
                                format={`D[d] HH[h] mm[m] ss[s]`}
                              />
                            </AuctionTimer>
                          </div>
                        </Auction>
                      )}
                  </BidCountdown>
                )}
                <ButtonContainer>
                  {address && asset?.owner?.address == address ? (
                    <Link
                      href={`/sell/${queryParam?.tokenAddress}?tokenId=${queryParam?.tokenId}`}
                      passHref
                    >
                      <a style={{ display: "flex", flex: "1" }}>
                        <FooterButton
                          color={"white"}
                          style={{ background: "#0066ff" }}
                        >
                          {"Sell"}
                        </FooterButton>
                      </a>
                    </Link>
                  ) : (
                    <>
                      {sellOrders &&
                        sellOrders[0] != null &&
                        !sellOrders[0]?.waitingForBestCounterOrder && (
                          <BuyNftModal
                            asset={asset}
                            isBundle={isBundle}
                            loadAgain={loadAgain}
                          />
                        )}
                      <MakeOfferModal
                        asset={asset}
                        assets={assets}
                        isBundle={isBundle}
                        loadAgain={loadAgain}
                      />
                    </>
                  )}
                </ButtonContainer>
              </ItemFooter>
            </ItemInfo>
          </Content>
        )}
      </Wrapper>
    </>
  );
}

export default ProductPage;
