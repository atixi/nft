import Head from "next/head";
import openseaApi from "../Utils/openseaApi";
import Explore from "/Components/explore";
import HotCollections from "/Components/HotCollections";
import LiveAuctions from "/Components/liveAuctions";
import Slide from "/Components/slider/slide";
import { MainWrapper } from "/Components/StyledComponents/globalStyledComponents";
import TopSellers from "/Components/topSellers";
import OpenSeaAPI from "/Utils/openseaApi";
import { useEffect } from "react";
import { topSellersAPI } from "/Constants/mockApi/topSellerApi";
import { liveAuctionsAPI } from "/Constants/mockApi/liveAuctionApi";
import { collectionsAPI } from "/Constants/mockApi/collectionApi";
import { exploresAPI } from "/Constants/mockApi/exploreApi";

function Home({ topSellers, liveAuctions, collections, explores }) {
  return (
    <>
    <Head>
        <link rel="preconnect" href="https://fonts.googleapis.com"/>
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin/>
        <link href="https://fonts.googleapis.com/css2?family=Poppins:wght@600&display=swap" rel="stylesheet"/>
    </Head>
    <MainWrapper>
      <Slide />
      <TopSellers data={topSellersAPI} />
      <LiveAuctions data={liveAuctionsAPI} />
      <HotCollections data={collectionsAPI} />
      <Explore data={exploresAPI} />
    </MainWrapper>
    </>
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
      // explores: JSON.parse(JSON.stringify(explores)),
    },
  };
};
export default Home;
