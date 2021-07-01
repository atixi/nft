import React, { useEffect, useState } from "react";
import "react-multi-carousel/lib/styles.css";
import OpenSeaAPI from "/Utils/openseaApi";
import { SectionHeading } from "./StyledComponents/globalStyledComponents";
import {
  ListCounter,
  SellerPrice,
  SellerName,
  TopSellerContainer,
  TopSellerItem,
  AvatarContainer,
  SellerDetails,
} from "./StyledComponents/topSeller-styledComponents";
import Link from "next/link";
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
          <div className="pt-3">
            <SectionHeading>{"Top Sellers in 1 Day"}</SectionHeading>
          </div>
          <TopSellerContainer>
            {data &&
              data.map((seller, index) => (
                <Link
                  key={seller.address}
                  href={{
                    // pathname: "/profile/index",
                    pathname: `/profile/${seller.talent}`,
                    // query: {
                    //   address: seller.address,
                    //   talent: seller.talent,
                    //   avatar: seller.profile_img_url,
                    // },
                  }}
                  // href={`/profile/index?address=${seller.address}&talent=${seller.talent}&avatar=${seller.profile_img_url}`}
                >
                  <a>
                    <TopSellerItem
                      key={seller.name}
                      onClick={() => topSellerDetails(seller)}
                    >
                      <ListCounter>{index + 1}</ListCounter>
                      <AvatarContainer>
                        <img src={seller.profile_img_url} />
                      </AvatarContainer>
                      <SellerDetails>
                        <SellerName key={seller.talent + seller.talent}>
                          {seller.talent}
                        </SellerName>
                        <SellerPrice>
                          {/* {seller.stats?.average_price} */}
                          {seller.number_of_assets + " assets"}
                        </SellerPrice>
                      </SellerDetails>
                    </TopSellerItem>
                  </a>
                </Link>
              ))}
          </TopSellerContainer>
        </>
      )}
    </>
  );
}

export default TopSellers;
