import Header from "/Components/header";
import Head from "next/head";
import LiveAuctions from "/Components/liveAuctions";
import Explore from "/Components/explore";
import Footer from "/Components/footer";
import TopSellers from "/Components/topSellers";
import Slide from "/Components/slider/slide";
import HotCollections from "/Components/HotCollections";
import { useEffect, useState } from "react";
import OpenSeaAPI from "../api/openseaApi";
import { accountList } from "../../Constants/constants";
import { useMetaMask } from "metamask-react";
import _ from "lodash";

function Home() {
  const [bundles, setBundles] = useState([]);
  const [topSellers, setTopSellers] = useState();
  const [liveAuctions, setLiveAuctions] = useState();
  const [collections, setCollections] = useState();
  const { account } = useMetaMask();

  useEffect(() => {
    initData();
  }, []);

  const initData = () => {
    window.ethereum.on("accountsChanged", function(accounts) {
      console.log(accounts);
    });
    loadBundles();
    loadTopSellers();
    loadCollections();
  };

  const loadBundles = async () => {
    const result = await OpenSeaAPI.getBundles(
      account ? account : accountList[1]
    );

    if (result.ok) {
      const bundles = result.data?.bundles;
      setBundles(bundles);
    }
  };

  // this function is not complete
  const loadTopSellers = async () => {
    const result = await OpenSeaAPI.getAssetsListByOwner(
      account ? account : accountList[0]
    );
    if (result.ok) {
      const assets = await result.data.assets;
      setTopSellers(assets);
    }
  };

  const loadCollections = async () => {
    let collections = [];
    const result = await OpenSeaAPI.getCollections(
      account ? account : accountList[0]
    );
    if (result.ok) {
      const assets = await result.data.assets;
      const data = _.groupBy(assets, "collection[name]");
      const keys = Object.keys(data);
      keys.map((item) =>
        collections.push({ collection: item, data: data[item] })
      );
      setCollections(collections);
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
      <div style={{ maxWidth: 1450, margin: "auto" }}>
        <Slide />
        <TopSellers data={topSellers} />
        <LiveAuctions data={topSellers} />
        <HotCollections data={collections} />
        <Explore data={bundles} />
      </div>
      <Footer />
    </>
  );
}

export default Home;
