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
import axios from "axios";

const api = axios.create({
  baseURL: process.env.HEROKU_BASE_URL,
  headers: {
    Accept: "application/json",
    "Content-Type": "application/json",
  },
});
import { GET_SINGLE_CATEGORY } from "/graphql/queries";
import { gqlClient } from "/lib/graphql-client";
const { TabPane } = Tabs;
function Profile() {
  const [isLoad, setLoad] = useState(false);
  const [data, setData] = useState({
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
  const { slug } = router.query;

  async function LoadMoreOnsales() {
    setLoadMore({
      ...loadMore,
      onsalesLoadMoreButtonLoading: true,
    });
    const moreAssets = await api.get(
      `/talents/${slug}?offset=${loadMore.onSalesOffset}`
    );
    const assetLength = await moreAssets.data.assets.length;
    assetLength === 0
      ? setLoadMore({ ...loadMore, onSalesLoad: false })
      : (() => {
          setOnsales({
            ...onSales,
            assets: [...onSales.assets, ...moreAssets.data.assets],
          });
          setLoadMore({
            ...loadMore,
            onSalesOffset: loadMore.onSalesOffset + 10,
            onsalesLoadMoreButtonLoading: false,
          });
        })();
  }
  async function fetCategories(slug) {
    const fetchedData = await gqlClient.query({
      query: GET_SINGLE_CATEGORY,
      variables: {
        slug: slug,
      },
    });
    setData({
      ...fetchedData.data.categories[0],
      assets: [...fetchedData.data.categories[0].nfts],
    });s
    setLoad(true);
  }
  useEffect(() => {
    (async function fetchingTalent() {
      if (slug != undefined) {
        fetCategories(slug);
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
        </Tabs>
      </MainWrapper>
    </>
  );
}

export default Profile;
