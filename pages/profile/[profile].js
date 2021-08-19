import { Tabs, Spin, Menu, Dropdown } from "antd";
import React, { useEffect, useState } from "react";
import {
  ProfileContainer,
  ShareButton,
  BiographyContainer,
  BioDescription,
  ProfileButton,
  ShareProfile,
  EditProfile,
} from "/Components/StyledComponents/talentPage-styledComponents";
import Products from "/Components/nfts";
import Link from "next/link";
import {
  LoadMoreButton,
  MainWrapper,
} from "/Components/StyledComponents/globalStyledComponents";
import CollectionLoader from "@/components/collectionLoader";
import { useRouter } from "next/router";
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
import { displayAddress, randomAvatar } from "/Utils/utils";
import api from "/Components/axiosRequest";
import {
  setAccountTokens,
  setMetaToken,
  setWalletToken,
  setWalletBalance,
  setMetaConnected,
  setWalletConnected,
  getAccountTokens,
  getMetaToken,
  getWalletToken,
  getMetaConnected,
  getWalletConnected,
} from "/store/action/accountSlice";
import { useDispatch, useSelector } from "react-redux";

const { TabPane } = Tabs;
function Profile() {
  const accountTokens = useSelector(getAccountTokens);
  const [isLoad, setLoad] = useState(false);
  const [editProfile, setEditProfile] = useState(false);
  const [talent, setTalent] = useState({
    talentAvatar: {
      url: "/images/talentCover.png",
    },
    talentBanner: {
      url: "",
    },
    talentName: "",
    assets: [],
  });
  const [onSales, setOnsales] = useState({
    assets: [],
  });
  const [owned, setOwned] = useState({
    assets: [],
  });
  const [loadMore, setLoadMore] = useState({
    onSalesOffset: 10,
    ownedOffset: 10,
    createdOffset: 10,
    onSalesLoad: true,
    ownedLoad: true,
    createdLoad: true,
    onsalesLoadMoreButtonLoading: false,
    ownedLoadMoreButtonLoading: false,
    createdLoadMoreButtonLoading: false,
  });
  const router = useRouter();
  const { profile } = router.query;

  async function LoadMoreOnsales() {
    setLoadMore({
      ...loadMore,
      onsalesLoadMoreButtonLoading: true,
    });
    const moreAssets = await api.get(
      `/talents/${profile}?offset=${loadMore.onSalesOffset}`
    );
    const assetLength = await moreAssets.data.assets.length;
    assetLength === 0
      ? setLoadMore({ ...loadMore, onSalesLoad: false })
      : (() => {
          const sellOrders = moreAssets.data.assets.filter(
            (asset) => asset.sellOrders != null
          );
          setOnsales({
            ...onSales,
            assets: [...onSales.assets, sellOrders],
          });
          setLoadMore({
            ...loadMore,
            onSalesOffset: loadMore.onSalesOffset + 10,
            onsalesLoadMoreButtonLoading: false,
          });
        })();
  }

  async function LoadMoreCreated() {
    setLoadMore({
      ...loadMore,
      createdLoadMoreButtonLoading: true,
    });
    const moreAssets = await api.get(
      `/talents/${profile}?offset=${loadMore.createdOffset}`
    );
    const assetLength = await moreAssets.data.assets.length;
    assetLength === 0
      ? setLoadMore({ ...loadMore, createdLoad: false })
      : (() => {
          setTalent({
            ...talent,
            assets: [...talent.assets, ...moreAssets.data.assets],
          });
          setLoadMore({
            ...loadMore,
            createdOffset: loadMore.createdOffset + 10,
            createdLoadMoreButtonLoading: false,
          });
        })();
  }
  function editProfileButton() {
    accountTokens.metaToken[0] === profile
      ? setEditProfile(true)
      : setEditProfile(false);
  }

  useEffect(() => {
    (async function fetchingTalent() {
      if (profile != undefined) {
        const data = await api.get(`/talents/${profile}`);
        setTalent(await data.data);
        const sellOrders = await data.data.assets.filter(
          (asset) => asset.sellOrders != null
        );
        setOnsales({
          talent: { talentAvatar: { url: data.data?.talentAvatar?.url } },
          assets: sellOrders,
        });
        const owneds = await data.data.assets.filter(
          (asset) => asset.owner.address === data.data.walletAddress
        );
        setOwned({
          talent: { talentAvatar: { url: data.data?.talentAvatar?.url } },
          assets: owneds,
        });
        setLoad(true);
        editProfileButton();
      }
    })();
  }, [profile]);
  return (
    <>
      <MainWrapper>
        {isLoad === false ? <CollectionLoader /> : ""}
        {isLoad ? (
          <ProfileContainer>
            <img src={talent.talentBanner?.url} />
            <BiographyContainer>
              <div className={"avatar"}>
                <img
                  alt="userAvatar"
                  src={
                    talent.talentAvatar?.url
                      ? talent.talentAvatar?.url
                      : randomAvatar()
                  }
                  loading="lazy"
                />
              </div>
              <BioDescription>
                <h3>
                  <strong>{talent.talentName}</strong>
                </h3>
                <h6>
                  <strong>{displayAddress(talent.walletAddress)}</strong>
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
                                url={`${process.env.BASE_URL}/profile/${profile}`}
                                quote={`${talent.talentName} in Rim Entertainment. find, buy or sell your NFTs (Non Fungible Tokens) in Rim Entertainment`}
                                hashtag={"#rimentertainment"}
                              >
                                <FacebookIcon size={32} round />
                              </FacebookShareButton>
                            </div>
                            <div>
                              <TwitterShareButton
                                url={`${process.env.BASE_URL}/profile/${profile}`}
                                title={`${talent.talentName} in Rim Entertainment. find, buy or sell your NFTs (Non Fungible Tokens) in Rim Entertainment`}
                              >
                                <TwitterIcon size={32} round />
                              </TwitterShareButton>
                            </div>
                            <div>
                              <TelegramShareButton
                                url={`${process.env.BASE_URL}/profile/${profile}`}
                                title={`${talent.talentName} in Rim Entertainment. find, buy or sell your NFTs (Non Fungible Tokens) in Rim Entertainment`}
                              >
                                <TelegramIcon size={32} round />
                              </TelegramShareButton>
                            </div>
                            <div>
                              <WhatsappShareButton
                                url={`${process.env.BASE_URL}/profile/${profile}`}
                                title={`${talent.talentName} in Rim Entertainment. find, buy or sell your NFTs (Non Fungible Tokens) in Rim Entertainment`}
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
                  {editProfile ? (
                    <EditProfile>
                      <Link href="/settings">{"Edit Profile"}</Link>
                    </EditProfile>
                  ) : (
                    ""
                  )}
                </div>
              </BioDescription>
            </BiographyContainer>
          </ProfileContainer>
        ) : (
          ""
        )}
        <Tabs defaultActiveKey="1">
          <TabPane tab="On Sale" key="1">
            <>
              <Products data={onSales} />
              {isLoad ? (
                loadMore.onSalesLoad ? (
                  loadMore.onsalesLoadMoreButtonLoading ? (
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
                ) : null
              ) : null}
            </>
          </TabPane>

          <TabPane tab="Owned" key="2">
            <>
              <Products data={owned} />
              <LoadMoreButton block shape={"round"} size={"large"}>
                {"Load More"}
              </LoadMoreButton>{" "}
            </>
          </TabPane>

          <TabPane tab="Created" key="3">
            <Products data={talent} />
            {isLoad ? (
              loadMore.createdLoad ? (
                loadMore.createdLoadMoreButtonLoading ? (
                  <LoadMoreButton block shape={"round"} size={"large"}>
                    <Spin></Spin>
                  </LoadMoreButton>
                ) : (
                  <LoadMoreButton
                    block
                    shape={"round"}
                    size={"large"}
                    onClick={() => LoadMoreCreated()}
                  >
                    Load More
                  </LoadMoreButton>
                )
              ) : null
            ) : null}
          </TabPane>
        </Tabs>
      </MainWrapper>
    </>
  );
}

export default Profile;
