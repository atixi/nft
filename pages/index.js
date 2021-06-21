import Header from "/Components/header";
import Head from "next/head";
import LiveAuctions from "/Components/liveAuctions";
import Explore from "/Components/explore";
import Footer from "/Components/footer";
import TopSellers from "/Components/topSellers";
import Slide from "/Components/slider/slide";
import HotCollections from "/Components/HotCollections";
import { useEffect, useState } from "react";
import OpenSeaAPI from "/Utils/openseaApi";
import { isMobileDevice } from "/Constants/constants";
import HandleNotification from "/Components/commons/handleNotification";
import { MainWrapper } from "/Components/StyledComponents/globalStyledComponents";
import openseaApi from "../Utils/openseaApi";

function Home({ topSellers, liveAuctions, collections, explores }) {
  return (
    <>
      <Head>
        <title>Rim Entertainment</title>
        <meta name="description" content="Rim Entertainment inc" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Header />
      <MainWrapper>
        <Slide />
        <TopSellers data={topSellers} />
        <LiveAuctions data={liveAuctions} />
        <HotCollections data={collections} />
        <Explore data={explores} />
      </MainWrapper>
      <Footer />
    </>
  );
}
export const getServerSideProps = async () => {

  const orders = await OpenSeaAPI.getOrders({})

  const liveAuctions = await OpenSeaAPI.getOrders({ "on_sale": true })
  // const bundles = await OpenSeaAPI.getBundles()
  const assets = await OpenSeaAPI.getCollections()
  const topSellers = OpenSeaAPI.getTopSellersDetails(orders.orders);
  const collections = OpenSeaAPI.getCollectionDetails(assets.assets);
  const { data } = await openseaApi.getExplores()
  const explores = OpenSeaAPI.getExploresDetails(data?.assets)
  return {
    props: {
      topSellers: JSON.parse(JSON.stringify(topSellers)),
      liveAuctions: JSON.parse(JSON.stringify(liveAuctions.orders)),
      collections: JSON.parse(JSON.stringify(collections)),
      explores: JSON.parse(JSON.stringify(explores))
    }
  }
}
export default Home;
