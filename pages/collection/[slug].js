import { Tabs, Spin, Dropdown } from "antd";
import React, { useEffect, useState } from "react";
import {
  ProfileContainer,
  ShareButton,
  BiographyContainer,
  BioDescription,
  ProfileButton,
  ShareProfile,
} from "/Components/StyledComponents/talentPage-styledComponents";
import Products from "/Components/nfts";
import {
  LoadMoreButton,
  MainWrapper,
} from "/Components/StyledComponents/globalStyledComponents";
import CollectionLoader from "@/components/collectionLoader";
import { useRouter } from "next/router";
const { TabPane } = Tabs;
import {
  FacebookShareButton,
  FacebookIcon,
  TwitterShareButton,
  TwitterIcon,
  TelegramShareButton,
  TelegramIcon,
  WhatsappShareButton,
  WhatsappIcon,
} from "next-share";
import { displayAddress } from "/Utils/utils";
import api from "/Components/axiosRequest";
function CollectionDetails() {
  const router = useRouter();
  const { slug } = router.query;
  const [collect, setCollect] = useState({
    collectionName: "",
    collectionImageURL: {
      url: "",
    },
    collectionBanner: {
      url: "",
    },
    talent: { walletAddress: "" },
    assets: [],
  });
  const [loadMore, setLoadMore] = useState({
    onSales: 10,
    owned: 10,
  });
  const [isLoad, setLoad] = useState(false);
  const [loadMoreButton, setLoadMoreButton] = useState({
    onSalesLoad: true,
    ownedLoad: true,
    onsalesLoadMoreButtonLoading: false,
    ownedLoadMoreButtonLoading: false,
  });
  const [onSales, setOnsales] = useState({
    assets: [],
  });

  const loadTabData = async (e) => {
    if (e === "1") {
      //loadAssets(slug);
    } else if (e === "2") {
      //loadCollections(slug);
    }
  };
  async function LoadMoreOnsales() {
    setLoadMoreButton({
      ...loadMoreButton,
      onsalesLoadMoreButtonLoading: true,
    });
    const moreAssets = await api.get(
      `/collections/${collect.slug}?offset=${loadMore.onSales}`
    );
    const assetLength = await moreAssets.data.assets.length;
    assetLength === 0
      ? setLoadMoreButton({ ...loadMoreButton, onSalesLoad: false })
      : (() => {
          setOnsales({
            talent: {
              talentAvatar: { url: collect.talent.talentAvatar.url },
            },
            assets: [...onSales.assets, ...moreAssets.data.assets],
          });
          setLoadMore({
            ...loadMore,
            onSales: loadMore.onSales + 10,
          });
          setLoadMoreButton({
            ...loadMoreButton,
            onsalesLoadMoreButtonLoading: false,
          });
        })();
  }
  async function LoadMoreOwned() {
    setLoadMoreButton({ ...loadMoreButton, ownedLoadMoreButtonLoading: true });
    const moreAssets = await api.get(
      `/collections/${collect.slug}?offset=${loadMore.owned}`
    );
    const assetLength = await moreAssets.data.assets.length;
    assetLength === 0
      ? setLoadMoreButton({ ...loadMoreButton, ownedLoad: false })
      : (() => {
          setCollect({
            ...collect,
            assets: [...collect.assets, ...moreAssets.data.assets],
          });
          setLoadMore({
            ...loadMore,
            owned: loadMore.owned + 10,
          });
          setLoadMoreButton({
            ...loadMoreButton,
            ownedLoadMoreButtonLoading: false,
          });
        })();
  }
  useEffect(() => {
    slug != undefined
      ? (async function fetchCollection() {
          const { data } = await api.get(
            `${process.env.HEROKU_BASE_URL}/collections/${slug}`
          );
          console.log("came", await data);
          setCollect(await data);
          const sellOrders = await data.assets.filter(
            (asset) => asset.sellOrders != null
          );
          setOnsales({
            talent: {
              talentAvatar: { url: data?.talent?.talentAvatar?.url },
            },
            assets: sellOrders,
          });
        })()
      : "";
    setLoad(true);
  }, [slug]);

  return (
    <>
      <MainWrapper>
        {isLoad === false ? <CollectionLoader /> : ""}
        {isLoad ? (
          <ProfileContainer>
            <img src={collect.collectionBanner?.url} />
            <BiographyContainer>
              <div className={"avatar"}>
                <img
                  alt="userAvatar"
                  src={collect.collectionImageURL?.url}
                  loading="lazy"
                />
              </div>
              <BioDescription>
                <h3>
                  <strong>{collect.collectionName}</strong>
                </h3>
                <h6>
                  <strong>
                    {displayAddress(collect.talent?.walletAddress)}
                  </strong>
                </h6>
                <div className="mt-4">
                  <ProfileButton type="button">
                    <Dropdown
                      trigger={["click"]}
                      overlay={
                        <ShareProfile>
                          <h5>Share on social medias</h5>
                          <div>
                            <div>
                              <FacebookShareButton
                                url={`${process.env.BASE_URL}/collection/${collect.slug}`}
                                quote={`${collect.collectionName} in Rim Entertainment. find, buy or sell your NFTs (Non Fungible Tokens) in Rim Entertainment`}
                                hashtag={"#rimentertainment"}
                              >
                                <FacebookIcon size={32} round />
                              </FacebookShareButton>
                            </div>
                            <div>
                              <TwitterShareButton
                                url={`${process.env.BASE_URL}/collection/${collect.slug}`}
                                title={`${collect.collectionName} in Rim Entertainment. find, buy or sell your NFTs (Non Fungible Tokens) in Rim Entertainment`}
                              >
                                <TwitterIcon size={32} round />
                              </TwitterShareButton>
                            </div>
                            <div>
                              <TelegramShareButton
                                url={`${process.env.BASE_URL}/collection/${collect.slug}`}
                                title={`${collect.collectionName} in Rim Entertainment. find, buy or sell your NFTs (Non Fungible Tokens) in Rim Entertainment`}
                              >
                                <TelegramIcon size={32} round />
                              </TelegramShareButton>
                            </div>
                            <div>
                              <WhatsappShareButton
                                url={`${process.env.BASE_URL}/collection/${collect.slug}`}
                                title={`${collect.collectionName} in Rim Entertainment. find, buy or sell your NFTs (Non Fungible Tokens) in Rim Entertainment`}
                                separator=":: "
                              >
                                <WhatsappIcon size={32} round />
                              </WhatsappShareButton>
                            </div>
                          </div>
                        </ShareProfile>
                      }
                      placement="bottomRight"
                    >
                      <ShareButton />
                    </Dropdown>
                  </ProfileButton>
                  <ProfileButton type="button">{"..."}</ProfileButton>
                </div>
              </BioDescription>
            </BiographyContainer>
          </ProfileContainer>
        ) : (
          ""
        )}

        <Tabs defaultActiveKey="1" onChange={(e) => loadTabData(e)}>
          <TabPane tab="On Sale" key="1">
            <Products data={onSales} />
            {loadMoreButton.onSalesLoad ? (
              loadMoreButton.onsalesLoadMoreButtonLoading ? (
                <LoadMoreButton block shape={"round"} size={"large"}>
                  <Spin></Spin>
                </LoadMoreButton>
              ) : (
                <LoadMoreButton
                  block
                  shape={"round"}
                  size={"large"}
                  onClick={() => LoadMoreOnsales()}
                >
                  Load More
                </LoadMoreButton>
              )
            ) : null}
          </TabPane>
          <TabPane tab="Owned" key="2">
            <Products data={collect} />
            {loadMoreButton.ownedLoad ? (
              loadMoreButton.ownedLoadMoreButtonLoading ? (
                <LoadMoreButton block shape={"round"} size={"large"}>
                  <Spin></Spin>
                </LoadMoreButton>
              ) : (
                <LoadMoreButton
                  block
                  shape={"round"}
                  size={"large"}
                  onClick={() => LoadMoreOwned()}
                >
                  Load More
                </LoadMoreButton>
              )
            ) : null}
          </TabPane>
        </Tabs>
      </MainWrapper>
    </>
  );
}

export default CollectionDetails;
