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
import _ from "lodash";
import { useWeb3 } from "../../Providers/getWeb";

function Home() {
  const [bundles, setBundles] = useState([]);
  const [topSellers, setTopSellers] = useState();
  const [liveAuctions, setLiveAuctions] = useState();
  const [collections, setCollections] = useState();
  const [explorers, setExplorers] = useState();

  const account = null;
  const web3 = useWeb3();

  useEffect(() => {
    initData();
  }, []);

  const initData = () => {
    window.ethereum.on("accountsChanged", function (accounts) {
      console.log(accounts);
    });
    loadBundles();
    loadTopSellers();
    loadCollections();
    loadExplorers();
  };

  const loadBundles = async () => {
    const result = await OpenSeaAPI.getBundles(accountList[1]);

    if (result.ok) {
      const bundles = result.data?.bundles;
      setBundles(bundles);
    } else if (result.problem) {
      alert(result.problem);
    }
  };

  const loadTopSellers = async () => {
    const result = await OpenSeaAPI.getAssets();
    if (result.ok) {
      const assets = await result.data.assets;
      const tops = OpenSeaAPI.getTopSellers(assets);
      setTopSellers(tops);
    } else if (result.problem) {
      alert(result.problem);
    }
  };

  const loadCollections = async () => {
    let collections = [];
    const result = await OpenSeaAPI.getAssets(
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
    } else if (result.problem) {
      alert(result.problem);
    }
  };

  const loadExplorers = async () => {
    const result = await OpenSeaAPI.getAssets();
    if (result.ok) {
      let exp = await result.data.assets;
      if (exp.length > 20) exp = exp.slice(21);
      console.log(exp);
      setExplorers(exp);
    } else if (result.problem) {
      alert(result.problem);
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

      {/* <Header /> */}
      <div style={{ maxWidth: 1450, margin: "auto" }}>
        <Slide />
        <TopSellers data={topSellers} />
        <LiveAuctions data={bundles} />
        <HotCollections data={collections} />
        <Explore data={explorers} />
      </div>
      <Footer />
    </>
  );
}

export default Home;
