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
import { isMobileDevice } from "../../Constants/constants";
import HandleNotification from "/Components/commons/handleNotification";
import { MainWrapper } from "/Components/StyledComponents/globalStyledComponents";
import {
  bundlesAPI,
  collectionsAPI,
  exploresAPI,
  liveAuctionsAPI,
  topSellersAPI,
} from "../../Constants/lists";
function Home() {
  const [bundles, setBundles] = useState([]);
  const [topSellers, setTopSellers] = useState([]);
  const [liveAuctions, setLiveAuctions] = useState([]);
  const [collections, setCollections] = useState([]);
  const [explores, setExplores] = useState([]);
  useEffect(() => {
    // initData();
  }, []);
  const initData = () => {
    if (!isMobileDevice())
      window.ethereum.on("accountsChanged", function (accounts) {
        console.log(accounts);
      });

    loadBundles();
    loadLiveAuctions();
    loadTopSellers();
    loadCollections();
    loadExplores();
  };
  const loadBundles = async () => {
    try {
      let { bundles } = await OpenSeaAPI.getBundles();
      setBundles(bundles);
    } catch (e) {
      HandleNotification("error", e.message, "Server Is Not Available");
    }
  };
  const loadLiveAuctions = async () => {
    try {
      const { orders } = await OpenSeaAPI.getLiveAuctions();
      setLiveAuctions(orders);
    } catch (e) {
      HandleNotification("error", e.message, "Server Is Not Available");
    }
  };
  const loadTopSellers = async () => {
    try {
      const { orders } = await OpenSeaAPI.getTopSellers();
      const topSellers = OpenSeaAPI.getTopSellersDetails(orders);
      console.log("Top sellers : ", topSellers);
      setTopSellers(topSellers);
    } catch (e) {
      HandleNotification("error", e.message, "Server Is Not Available");
    }
  };
  const loadCollections = async () => {
    try {
      const { assets } = await OpenSeaAPI.getCollections();
      let cols = OpenSeaAPI.getCollectionDetails(assets);
      setCollections(cols);
    } catch (e) {
      HandleNotification("error", e.message, "Server Is Not Available");
    }
  };

  const loadExplores = async () => {
    try {
      const { data } = await OpenSeaAPI.getExplores();
      const explores = data?.assets;
      const exps = OpenSeaAPI.getExploresDetails(explores);
      setExplores(exps);
    } catch (e) {
      HandleNotification("error", e.message, "Server Is Not Available");
    }
  };
  return (
    <>
      <Head>
        <title>Rim Entertainment</title>
        <meta name="description" content="Generated by create next app" />
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
export default Home;
