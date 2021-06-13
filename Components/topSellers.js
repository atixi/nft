import Link from "next/link";
import React, { useEffect, useState } from "react";
import useApi from "./hooks/useApi";
import "react-multi-carousel/lib/styles.css";
import { SELLERS } from "../Constants/constants";
import OpenSeaAPI from "../pages/api/openseaApi";
import {
  ListCounter,
  SellerPrice,
  SellerName,
  TopSellerContainer,
  TopSellerItem,
  AvatarContainer,
  SellerDetails,
} from "./StyledComponents/topSeller-styledComponents";

function TopSellers({ data }) {
  const [selectedSeller, setSelectedSeller] = useState([]);
  const topSellerDetails = async (top) => {
    const address = top.address;
    const talent = top.talent;
    let created = [];
    let collectibles = [];
    const result = await OpenSeaAPI.getAssetsListByOwner(address);
    if (result.ok) {
      created = result.data?.assets;
      collectibles = _.groupBy(created, "collection[name]");
      console.log(created);
      console.log(collectibles);
      console.log(address);
      console.log(talent);
    }
    setSelectedSeller({
      talent,
      address,
      created,
      collectibles,
    });
  };

  const topSellers = data;
  return (
    <>
      {topSellers && (
        <>
          <div className="p-3">
            <h3>Top Sellers in 1 Day</h3>
          </div>
          <TopSellerContainer>
            {data &&
              data.map((seller, index) => (
                //  <Link href='/profile/[id]' as={`/profile/${seller.address}`} >
                <a href={`/profile/index?address=${seller.address}&talent=${seller.talent}&avatar=${seller.profile_img_url}`}>
                <TopSellerItem
                    key={seller.name}
                    onClick={() => topSellerDetails(seller)}
                  >
                    <ListCounter>{index + 1}</ListCounter>
                    <AvatarContainer>
                      <img
                        
                        src={seller.profile_img_url}
                      />
                    </AvatarContainer>
                    <SellerDetails>
                      <SellerName key={seller.talent + seller.talent}>
                        {seller.talent}
                      </SellerName>
                      <SellerPrice>
                        {/* {seller.stats?.average_price} */}
                        {seller.number_of_assets+" assets"}
                      </SellerPrice>
                    </SellerDetails>
                  </TopSellerItem>
                </a>
                //  </Link>
              ))}
          </TopSellerContainer>
        </>
      )}
    </>
  );
}

export default TopSellers;
