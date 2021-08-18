import React, { useEffect, useState } from "react";
import "react-multi-carousel/lib/styles.css";
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
  const topSellerDetails = async (top) => {
    // const result = await OpenSeaAPI.getAssetsListByOwner(address);
  };

  return (
    <>
      <div className="pt-3">
        {data[0]?.assets?.length ? (
          <SectionHeading>{"Top Sellers"}</SectionHeading>
        ) : (
          ""
        )}
      </div>
      <TopSellerContainer>
        {data &&
          data.map((seller, index) => (
            <Link
              key={index}
              href={{
                pathname: `/profile/${seller.walletAddress}`,
              }}
            >
              <a>
                <TopSellerItem
                  key={seller.name}
                  onClick={() => topSellerDetails(seller)}
                >
                  <ListCounter>{index + 1}</ListCounter>
                  <AvatarContainer>
                    <img src={seller?.talentAvatar?.url} />
                  </AvatarContainer>
                  <SellerDetails>
                    <SellerName key={seller?.talentName + seller?.talentName}>
                      {seller.talentName ? seller.talentName : "Anonymous"}
                    </SellerName>
                    <SellerPrice>
                      {/* {seller.stats?.average_price} */}
                      {/* {seller.number_of_assets + " assets"} */}
                      {`${
                        seller?.assets?.length
                          ? seller?.assets?.length + " assets"
                          : ""
                      } `}
                    </SellerPrice>
                  </SellerDetails>
                </TopSellerItem>
              </a>
            </Link>
          ))}
      </TopSellerContainer>
    </>
  );
}

export default TopSellers;
