import React, { useState, useEffect } from "react";
import Link from "next/link";
import Carousel from "react-elastic-carousel";
import { SectionHeading } from "./StyledComponents/globalStyledComponents";
import {
  CollectionCard,
  ProfileAvatarContainer,
  CardTitle,
  CardDescription,
  CardImageContainer,
} from "./StyledComponents/hotCollections-styledComponents";
import api from "/Components/axiosRequest";
import { socket } from "config/websocket";
import { fetch } from "Utils/strapiApi";
const breakPoints = [
  { width: 1, itemsToShow: 1 },
  { width: 550, itemsToShow: 2, itemsToScroll: 2 },
  { width: 768, itemsToShow: 3, itemsToScroll: 3 },
  { width: 1024, itemsToShow: 4, itemsToScroll: 4 },
  { width: 1200, itemsToShow: 5, itemsToScroll: 5 },
];

export default function HotCollections() {
  const [serverCollections, setServerCollections] = useState([]);

  const loadServerCollection = async () => {
    await fetch("/collections")
      .then((response) => {
        const cols = response.data;
        setServerCollections(cols);
      })
      .catch((e) => {
        console.log("error in loading collection", e);
      });
  };

  useEffect(async () => {
    socket.on("serverBroadCastNewCollection", (data) => {
      setServerCollections((prev) => [data, ...prev]);
    });

    loadServerCollection();
  }, []);
  return (
    <div className={"mt-5"}>
      <SectionHeading>{"Recent collections"} 💥</SectionHeading>
      <Carousel
        breakPoints={breakPoints}
        pagination={false}
        transitionMs={1000}
      >
        {serverCollections &&
          serverCollections?.map((item, index) => (
            <CollectionCard key={index}>
              <CardImageContainer>
                <Link
                  href={{
                    pathname: `/collection/${item?.slug}`,
                  }}
                >
                  <a>
                    <img
                      style={{ width: "auto" }}
                      src={item?.collectionBanner?.url}
                    />
                  </a>
                </Link>
              </CardImageContainer>
              <CardDescription style={{ borderTop: "1px solid #ccc" }}>
                <ProfileAvatarContainer>
                  <Link
                    href={{
                      pathname: `/collection/${item?.slug}`,
                    }}
                  >
                    <a>
                      <img
                        style={{ width: "auto" }}
                        src={item?.collectionImageURL?.url}
                      />
                    </a>
                  </Link>
                </ProfileAvatarContainer>
                <CardTitle style={{ padding: "0px 10px", marginTop: "-35px" }}>
                  <span>{item?.collectionName}</span>
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
