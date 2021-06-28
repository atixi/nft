import Head from "next/head";
import openseaApi from "../Utils/openseaApi";
import Explore from "/Components/explore";
import HotCollections from "/Components/HotCollections";
import LiveAuctions from "/Components/liveAuctions";
import Slide from "/Components/slider/slide";
import { MainWrapper } from "/Components/StyledComponents/globalStyledComponents";
import TopSellers from "/Components/topSellers";
import OpenSeaAPI from "/Utils/openseaApi";
import { useEffect, useState } from "react";
import { topSellersAPI } from "/Constants/mockApi/topSellerApi";
import { liveAuctionsAPI } from "/Constants/mockApi/liveAuctionApi";
import {
  collectionsAPI,
  clientCollections,
} from "/Constants/mockApi/collectionApi";
import { exploresAPI } from "/Constants/mockApi/exploreApi";
function Home({ topSellers, liveAuctions, collections, explores, assets }) {
  const [clientCols, setClientCols] = useState();

  useEffect(() => {
    getCollections();
  }, []);
  const getCollections = () => {
    const cols = OpenSeaAPI.mockCollections(clientCollections);
    setClientCols(cols);
  };
  return (
    <MainWrapper>
      <Slide />
      <TopSellers data={topSellersAPI} />
      <LiveAuctions data={liveAuctionsAPI} />
      <HotCollections data={clientCols} />
      <Explore data={exploresAPI} />
    </MainWrapper>
  );
}

export const getServerSideProps = async () => {
  // const orders = await OpenSeaAPI.getOrders({});
  // const liveAuctions = await OpenSeaAPI.getOrders({ on_sale: true });
  // // const bundles = await OpenSeaAPI.getBundles()
  // const assets = await OpenSeaAPI.getCollections();
  // const topSellers = OpenSeaAPI.getTopSellersDetails(orders.orders);
  // const collections = OpenSeaAPI.getCollectionDetails(assets.assets);
  // const { data } = await openseaApi.getExplores();
  // const explores = OpenSeaAPI.getExploresDetails(data?.assets);
  return {
    props: {
      // topSellers: JSON.parse(JSON.stringify(topSellers)),
      // liveAuctions: JSON.parse(JSON.stringify(liveAuctions.orders)),
      // collections: JSON.parse(JSON.stringify(collections)),
      // assets: JSON.parse(JSON.stringify(assets)),
      // explores: JSON.parse(JSON.stringify(explores)),
    },
  };
};
export default Home;
