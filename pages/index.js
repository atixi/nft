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

function Home({ topSellers, bundles, liveAuctions, collections }) {
  // const [explores, setExplores] = useState();

  // const initData = () => {
  //   // loadTopSellers();
  //   loadExplores();
  // };

  // const loadExplores = async () => {
  //   try {
  //     const { data } = await OpenSeaAPI.getExplores();
  //     const explores = data?.assets;
  //     const exps = OpenSeaAPI.getExploresDetails(explores);
  //     setExplores(exps);
  //   } catch (e) {
  //     HandleNotification("error", e.message, "Server Is Not Available");
  //   }
  // };
  // console.log(topSellers)
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
        {/* {explores && <Explore data={explores} />} */}
      </MainWrapper>
      <Footer />
    </>
  );
}
export const getServerSideProps = async () => {
  // const [orders, liveAuctions, bundles, assets] = await Promise.all([
  //   OpenSeaAPI.getOrders({}),
  //   OpenSeaAPI.getOrders({ "on_sale": true }),
  //   OpenSeaAPI.getBundles(),
  //   OpenSeaAPI.getCollections()
  // ])
  try {
    const orders = await OpenSeaAPI.getOrders({})

    const liveAuctions = await OpenSeaAPI.getOrders({ "on_sale": true })
    // const bundles = await OpenSeaAPI.getBundles()
    const assets = await OpenSeaAPI.getCollections()
    const topSellers = OpenSeaAPI.getTopSellersDetails(orders.orders);
    const collections = OpenSeaAPI.getCollectionDetails(assets.assets);
    return {
      props: {
        topSellers: JSON.parse(JSON.stringify(topSellers)),
        // bundles: JSON.parse(JSON.stringify(bundles.bundles)),
        liveAuctions: JSON.parse(JSON.stringify(liveAuctions.orders)),
        collections: JSON.parse(JSON.stringify(collections))
      }
    }
  } catch (error) {
    console.log(error)
  }


}
export default Home;
