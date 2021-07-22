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
import axios from "axios";

function TopSellers({ data }) {
  const topSellerDetails = async (top) => {
    // const result = await OpenSeaAPI.getAssetsListByOwner(address);
  };

  return (
    <>
      <div className="pt-3">
        {data[0]?.assets?.length ? (
          <SectionHeading>{"Top Sellers in 1 Day"}</SectionHeading>
        ) : (
          ""
        )}
      </div>
      <TopSellerContainer>
        {data &&
          data.map((seller, index) => (
            <Link
              key={seller.userName}
              href={{
                pathname: `/profile/${seller.userName}`,
              }}
            >
              <a>
                <TopSellerItem
                  key={seller.name}
                  onClick={() => topSellerDetails(seller)}
                >
                  <ListCounter>{index + 1}</ListCounter>
                  <AvatarContainer>
                    <img src={seller.talentAvatar.url} />
                  </AvatarContainer>
                  <SellerDetails>
                    <SellerName key={seller.talentName + seller.talentName}>
                      {seller.talentName}
                    </SellerName>
                    <SellerPrice>
                      {/* {seller.stats?.average_price} */}
                      {/* {seller.number_of_assets + " assets"} */}
                      {`${
                        seller?.assets?.length
                          ? seller?.assets?.length + "assets"
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
