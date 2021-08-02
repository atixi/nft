import { Tabs } from "antd";
import React, { useEffect, useState } from "react";
import Products from "/Components/nfts";
import {
  LoadMoreButton,
  MainWrapper,
} from "/Components/StyledComponents/globalStyledComponents";
import CollectionLoader from "@/components/collectionLoader";
import Collections from "@/components/collections";
import { useRouter } from "next/router";
import TopSellers from "/Components/topSellers";
const { TabPane } = Tabs;
import api from "/Components/axiosRequest";

function CollectionDetails() {
  const router = useRouter();
  const { query } = router.query;
  const [isLoad, setLoad] = useState(false);
  const [loadMore, setLoadMore] = useState({
    assetsOffset: 10,
    collectionsOffset: 10,
    talentsOffset: 10,
    assetsLoad: true,
    collectionsLoad: true,
    talentsLoad: true,
    assetsMoreButtonLoading: false,
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
  const [data, setData] = useState({
    talents: [],
    assets: [],
    collections: [],
  });
  useEffect(() => {
    if (query != undefined) {
      async function fetchingData() {
        const data = await api.get(`/talents/search/${query}`);
        setData(await data.data);
        setLoad(true);
      }
      fetchingData();
    }
  }, [query]);

  return (
    <>
      <MainWrapper>
        <h4 className="mt-3">Search Result for &quot;{query}&quot;</h4>
        <Tabs defaultActiveKey="1" onChange={(e) => loadTabData(e)}>
          <TabPane tab="Assets" key="1">
            <Products data={data} />
            {isLoad === false ? <CollectionLoader /> : ""}
            <LoadMoreButton
              block
              shape={"round"}
              size={"large"}
            ></LoadMoreButton>
          </TabPane>
          <TabPane tab="Collections" key="2">
            <Collections data={data} />
          </TabPane>
          <TabPane tab="Talents" key="3">
            <TopSellers data={data.talents} />
          </TabPane>
        </Tabs>
      </MainWrapper>
    </>
  );
}

export default CollectionDetails;
