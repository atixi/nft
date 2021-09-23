import { useEffect, useState } from "react";

import Explore from "/Components/explore";
import FixedSells from "@/components/fixedSells";
import HotCollections from "/Components/HotCollections";
import LiveAuctions from "/Components/liveAuctions";
import { MainWrapper } from "/Components/StyledComponents/globalStyledComponents";
import Slide from "/Components/slider/slide";
import TopSellers from "/Components/topSellers";
import { fetch } from "Utils/strapiApi";

function Home({ fixPricesData, acutionPricesData }) {
  return (
    <div class="no-bottom" id="content">
      <div id="top"></div>
      <Slide />
      {/* <TopSellers />
      <LiveAuctions />
      <FixedSells />*/}
      <div id={"section-collections"} className={"pt-30"}>
        <div className={"container"}>
        <div className="spacer-single"></div>
        <HotCollections />
        <div className="spacer-single"></div>
        <Explore /> 
        </div>
      </div>
    </div>
  );
}

export const getServerSideProps = async () => {
  // const auctionResult = await fetch("/auctions");
  // const fixedResult = await fetch("/fixeds");
  // const acutions = auctionResult.data[0].data;
  // const fixeds = fixedResult.data[0].data;
  return {
    props: {
      // fixPricesData: JSON.parse(JSON.stringify(fixeds)),
      // acutionPricesData: JSON.parse(JSON.stringify(acutions)),
    },
  };
};
export default Home;
