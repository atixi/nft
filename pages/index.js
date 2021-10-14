import request from "../Utils/axios";
import Explore from "/Components/explore";
import HotCollections from "/Components/HotCollections";
import Slide from "/Components/slider/slide";
import TopSellers from "/Components/topSellers";
import { fetch } from "Utils/strapiApi";
import CreateSellNow from "@/components/createSellNow";

function Home({ featuredAsset, exploreAssets, talents, collections }) {
  return (
    <div className="no-bottom" id="content">
      <div id="top"></div>
      <Slide assets={featuredAsset} />
      <div id={"section-collections"} className={"mb-5 pt-30"}>
        <div className={"container mb-5"}>
          <div className="spacer-single" />
          <Explore assets={exploreAssets} />
          <div className="spacer-single"></div>
          <HotCollections collections={collections} />
          <div className="spacer-single" />
          <TopSellers talents={talents} />
          {/* <div className="spacer-single" /> */}
          {/* <CreateSellNow /> */}
        </div>
      </div>
    </div>
  );
}

export const getServerSideProps = async () => {
  const [featuredAsset, exploreAssets, collections, talents] = await Promise.all([
    request("nfts/featured", {
      method: "GET",
    }),
    request("nfts?_limit=8", {
      method: "GET",
    }),
    fetch("/collections"),
    fetch("/talents"),
  ]);
  return {
    props: {
      featuredAsset: featuredAsset.data,
      exploreAssets: exploreAssets.data,
      collections: collections.data,
      talents: talents.data,
    },
  };
};
export default Home;
