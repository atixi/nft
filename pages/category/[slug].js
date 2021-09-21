import { Tabs, Spin } from "antd";
import React, { useEffect, useState } from "react";
import {
  ProfileContainer,
  ShareButton,
  BiographyContainer,
  BioDescription,
  ProfileButton,
} from "/Components/StyledComponents/talentPage-styledComponents";
import Products from "/Components/nfts";
import {
  LoadingContainer,
  LoadMoreButton,
  MainWrapper,
} from "/Components/StyledComponents/globalStyledComponents";
import CollectionLoader from "@/components/collectionLoader";
import { useRouter } from "next/router";
import api from "/Components/axiosRequest";

const { TabPane } = Tabs;
function Profile() {
  const [isLoad, setLoad] = useState(false);
  const [data, setData] = useState({
    assets: [],
  });
  const [loadMore, setLoadMore] = useState({
    dataLimit: 2,
    dataStart: 0,
    countBy: 2,
    dataLoad: true,
    dataLoadMoreButtonLoading: false,
  });
  const router = useRouter();
  const { slug } = router.query;

  async function fetchCategories(slug) {
    const fetchedData = await api.get(
      `/categories/${slug}?limit=${loadMore.dataLimit}&offset=${loadMore.dataStart}`
    );
    setData({
      ...fetchedData.data,
    });
    setLoadMore({
      ...loadMore,
      dataStart: loadMore.dataStart + loadMore.countBy,
    });
    setLoad(true);
  }
  async function LoadMoreData(slug) {
    setLoadMore({
      ...loadMore,
      dataLoadMoreButtonLoading: true,
    });
    const fetchedData = await api.get(
      `/categories/${slug}?limit=${loadMore.dataLimit}&offset=${loadMore.dataStart}`
    );
    const assetLength = fetchedData.data.assets.length;
    assetLength === 0
      ? setLoadMore({ ...loadMore, dataLoad: false })
      : (() => {
          setData({
            ...data,
            assets: [...data.assets, ...fetchedData.data.assets],
          });
          setLoadMore({
            ...loadMore,
            dataStart: loadMore.dataStart + loadMore.countBy,
            dataLoadMoreButtonLoading: false,
          });
        })();
  }
  useEffect(() => {
    (async function fetchingTalent() {
      if (slug != undefined) {
        fetchCategories(slug);
      }
    })();
  }, [slug]);

  return (
    <>
      <MainWrapper>
        {isLoad === false ? <CollectionLoader /> : ""}
        {isLoad ? (
          <ProfileContainer>
            <img src={data.categoryBanner?.url} />
            <BiographyContainer>
              <div className={"avatar"}>
                <img
                  alt="userAvatar"
                  src={data.categoryImage?.url}
                  loading="lazy"
                />
              </div>
              <BioDescription>
                <h3>
                  <strong>Category ({data.categoryName})</strong>
                </h3>
              </BioDescription>
            </BiographyContainer>
          </ProfileContainer>
        ) : (
          ""
        )}
        <Tabs defaultActiveKey="1">
          <TabPane tab="Assets" key="1">
            <>
              <Products data={data} />
              {isLoad ? (
                loadMore.dataLoad ? (
                  loadMore.dataLoadMoreButtonLoading ? (
                    <LoadMoreButton block shape={"round"} size={"large"}>
                      <Spin></Spin>
                    </LoadMoreButton>
                  ) : (
                    <LoadMoreButton
                      block
                      shape={"round"}
                      size={"large"}
                      onClick={() => LoadMoreData(slug)}
                    >
                      Load More
                    </LoadMoreButton>
                  )
                ) : null
              ) : null}
            </>
          </TabPane>
        </Tabs>
      </MainWrapper>
    </>
  );
}

export default Profile;
