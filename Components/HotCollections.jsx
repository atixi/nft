import React, { useState, useEffect } from "react";
import Link from "next/link";
import Carousel from "react-elastic-carousel";
import OpenSeaAPI from "/Utils/openseaApi";

import { SectionHeading } from "./StyledComponents/globalStyledComponents";
import {
  CollectionCard,
  ProfileAvatarContainer,
  CardTitle,
  CardDescription,
  CardImageContainer,
} from "./StyledComponents/hotCollections-styledComponents";
const breakPoints = [
  { width: 1, itemsToShow: 1 },
  { width: 550, itemsToShow: 2, itemsToScroll: 2 },
  { width: 768, itemsToShow: 3, itemsToScroll: 3 },
  { width: 1024, itemsToShow: 4, itemsToScroll: 4 },
  { width: 1200, itemsToShow: 5, itemsToScroll: 5 },
];

export default function HotCollections({ data }) {
  const collections = data;
  useEffect(() => {}, []);
  return (
    <div className={"mt-5"}>
      <SectionHeading>{"Hot collections"} 💥</SectionHeading>
      <Carousel
        breakPoints={breakPoints}
        pagination={false}
        transitionMs={1000}
      >
        {collections &&
          collections.map((item, index) => (
            <CollectionCard key={index}>
              <CardImageContainer>
                <Link
                  href={{
                    pathname: `/collection/${item.slug}`,
                    // query: {
                    //   slug: item.slug,
                    //   banner_image_url: item.banner_image_url,
                    //   image_url: item.image_url,
                    //   collection: item.collection,
                    // },
                  }}
                >
                  <a>
                    <img style={{ width: "auto" }} src={item.image_url} />
                  </a>
                </Link>
              </CardImageContainer>
              <CardDescription style={{ borderTop: "1px solid #ccc" }}>
                <ProfileAvatarContainer>
                  {/* <Profile
                    profile={item.data[0]?.owner.profile_img_url}
                    size={64}
                    tick={false}
                  /> */}
                </ProfileAvatarContainer>
                <CardTitle style={{ padding: "0px 10px", marginTop: "-35px" }}>
                  <span>{item.collection}</span>
                  <span>{`ERC-721`}</span>
                  {/* <span>{item.data[0]?.asset_contract.schema_name}</span> */}
                </CardTitle>
              </CardDescription>
            </CollectionCard>
          ))}
      </Carousel>
    </div>
  );
}
