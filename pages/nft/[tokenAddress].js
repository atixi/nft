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
  seaportProvider
} from "/Utils/utils";
import { fetchBundle, fetchOne } from "/Utils/strapiApi";
import { getAccountTokens, getMetaConnected, getWalletConnected } from "store/action/accountSlice";
import { useEffect, useState } from "react";
import UserAvatar from "../../Components/userAvatar"
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

const web3 = new Web3(seaportProvider)
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
      const bundle = await fetchBundle(queryParam.tokenAddress, queryParam.slug);
      if (bundle) {
        setLoading(false);
      }

      if (bundle.status == 200) {
        setOrder(bundle.data);
        const nft = bundle.data;
        setAssets(nft.assetBundle.assets);
        let owner = nft?.assetBundle?.maker;
        owner.makerAccount.address = web3.utils.toChecksumAddress(owner.makerAccount.address);
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
    } else if (queryParam.tokenAddress != undefined && queryParam.tokenId != undefined) {
      const data = await fetchOne(queryParam?.tokenAddress, queryParam?.tokenId);
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
      if (typeof window !== "undefined") {
        router.replace({
          pathname: router.pathname,
          query: {
            tokenAddress: queryParam?.tokenAddress,
            tokenId: queryParam?.tokenId,
          },
        });
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
      {/* <!-- content begin --> */}
      <div className="no-bottom" id="content">
        <div id="top"></div>
        {loading ? (
          <div style={{ margin: "auto" }}>
            <Spin style={{ marginTop: "200px", marginBottom: "259px", width: "100%" }} />
          </div>
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
              <section aria-label="section" className=" sm-mt-0">
                <Content className="container">
                  <div className="row">
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
                    <div className="col-md-6">
                      <div className="item_info">
                        {sellOrders?.length > 0 &&
                          sellOrders[0].waitingForBestCounterOrder &&
                          sellOrders[0].expirationTime !== "0" && (
                            <>
                              <span>{`Auctions ends in `}</span>
                              <span style={{ display: "inline" }}>
                                <Countdown
                                  value={unixToMilSeconds(sellOrders[0].expirationTime)}
                                  format={`D[d] HH[h] mm[m] ss[s]`}
                                />
                              </span>
                            </>
                          )}
                        <h2>{asset.name ? asset.name : asset.collection?.name}</h2>
                        {/* <div className="item_info_counts">
                          <div className="item_info_type"><i className="fa fa-image"></i>Art</div>
                          <div className="item_info_views"><i className="fa fa-eye"></i>250</div>
                          <div className="item_info_like"><i className="fa fa-heart"></i>18</div>
                        </div> */}
                        <p>{asset?.description}</p>

                        <h6>Owner</h6>
                        <div className="item_author">
                          <UserAvatar user={{ avatar: asset?.owner?.profile_img_url, isVerified: false }} />
                          <span className="author_list_info pl-5">
                            <a href="author.html">{checkName(asset?.owner?.user?.username)}</a>
                          </span>
                        </div>

                        <div className="spacer-40"></div>
                        <Tabs
                          defaultActiveKey="2"
                          className={"ordersTab"}
                          tabBarGutter={10}
                          tabBarExtraContent={
                            <ButtonContainer>
                              {address && asset?.owner?.address == address ? (
                                <Link
                                  href={`/sell/${queryParam?.tokenAddress}?tokenId=${queryParam?.tokenId}`}
                                  passHref
                                >
                                  <a style={{ display: "flex", flex: "1" }}>
                                    <button className={"btn-main"}>{"Sell"}</button>
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
                          }
                        >
                          <TabPane key="1" tab={<span>{"Listing"}</span>}>
                            <div className={"listContainer"}>
                              {sellOrders &&
                                sellOrders.map((order, i) => (
                                  <div className="p_list mt-3" key={i}>
                                    <UserAvatar user={{ address: order?.makerAccount?.address, isVerified: false, avatar: order.makerAccount?.profile_img_url }} />
                                    <div className="p_list_info orderInfo">
                                      Listed{" "}
                                      <b>{`${getAuctionPriceDetails(order).priceBase} ${order?.paymentTokenContract?.symbol
                                        }`}</b>
                                      <span>
                                        by <b>{checkName(order.makerAccount?.user?.username)}</b>
                                        {` at ${unixToHumanDate(order?.createdTime)}`}
                                      </span>
                                      <span>
                                        {web3.utils.toChecksumAddress(order.makerAccount.address) === address ? (
                                          <Button
                                            onClick={() => cancelOffer(order, address)}
                                            shape="round"
                                            size="small"
                                          >
                                            {"Cancel"}
                                          </Button>
                                        ) : (
                                            ""
                                          )}
                                      </span>
                                    </div>
                                  </div>
                                ))}
                            </div>
                          </TabPane>
                          <TabPane key="2" tab={<span>{"Bids"}</span>}>
                            <div className={"listContainer"}>
                              {offers &&
                                offers.map((order, i) => (
                                  <div className="p_list mt-3" key={i}>
                                    <UserAvatar user={{ address: order?.makerAccount?.address, isVerified: false, avatar: order.makerAccount?.profile_img_url }} />
                                    <div className="p_list_info orderInfo">
                                      Bid{" "}
                                      <b>{`${getAuctionPriceDetails(order).priceBase} ${order?.paymentTokenContract?.symbol
                                        }`}</b>
                                      <span>
                                        by <b>{checkName(order.makerAccount?.user?.username)}</b>
                                        {` at ${unixToHumanDate(order?.createdTime)}`}
                                      </span>
                                      <span>
                                        {web3.utils.toChecksumAddress(order.makerAccount.address) === address ? (
                                          <Button
                                            onClick={() => cancelOffer(order, address)}
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
                                        {web3.utils.toChecksumAddress(asset?.owner.address) === address ? (
                                          <Button
                                            onClick={() => acceptOffer(order, address)}
                                            shape="round"
                                            size="small"
                                          >
                                            {"Accept"}
                                          </Button>
                                        ) : (
                                            ""
                                          )}
                                      </span>
                                    </div>
                                  </div>
                                ))}
                            </div>
                          </TabPane>
                        </Tabs>
                      </div>
                    </div>
                  </div>
                </Content>
              </section>
            )}
      </div>
      {/* <!-- content close --> */}
    </>
  );
}

export default ProductPage;
