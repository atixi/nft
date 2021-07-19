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
  LoadMoreButton,
  MainWrapper,
} from "/Components/StyledComponents/globalStyledComponents";
import axios from "axios";
import CollectionLoader from "@/components/collectionLoader";
import { useRouter } from "next/router";
const { TabPane } = Tabs;
const api = axios.create({
  baseURL: "https://rim-entertainment.herokuapp.com",
  headers: {
    Accept: "application/json",
    "Content-Type": "application/json",
  },
});

function CollectionDetails({ collection }) {
  const router = useRouter();
  const { query } = router.query;
  const [isLoad, setLoad] = useState(false);
  const [loadMore, setLoadMore] = useState({
    itemsOffset: 10,
    collectionsOffset: 10,
    talentsOffset: 10,
    itemsLoad: true,
    collectionsLoad: true,
    talentsLoad: true,
    itemsMoreButtonLoading: false,
    collectionsLoadMoreButtonLoading: false,
    talentsLoadMoreButtonLoading: false,
  });
  const loadTabData = async (e) => {
    if (e === "1") {
      //loadAssets(slug);
    } else if (e === "2") {
      //loadCollections(slug);
    }
  };

  useEffect(() => {
    // setLoad(true);
  }, []);

  return (
    <>
      <MainWrapper>
        <Tabs defaultActiveKey="1" onChange={(e) => loadTabData(e)}>
          <TabPane tab="Items" key="1">
            {isLoad === false ? <CollectionLoader /> : ""}
            {/* <Products data={onSales} /> */}
            {isLoad ? (
              loadMore.itemsLoad ? (
                loadMore.itemsLoadMoreButtonLoading ? (
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
          </TabPane>
          <TabPane tab="Collections" key="2">
            {/* <Products data={collect} /> */}
            {isLoad ? (
              loadMore.collectionsLoad ? (
                loadMore.collectionsLoadMoreButtonLoading ? (
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
          </TabPane>
          <TabPane tab="Talents" key="3">
            {/* <Products data={collect} /> */}
            {isLoad ? (
              loadMore.talentsLoad ? (
                loadMore.talentsLoadMoreButtonLoading ? (
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
          </TabPane>
        </Tabs>
      </MainWrapper>
    </>
  );
}

export default CollectionDetails;
