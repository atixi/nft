import React, { useState, useEffect } from "react";
import Link from "next/link";
import Carousel from "react-elastic-carousel";
import axios from "axios";
import { SectionHeading } from "./StyledComponents/globalStyledComponents";
import {
  CollectionCard,
  ProfileAvatarContainer,
  CardTitle,
  CardDescription,
  CardImageContainer,
} from "./StyledComponents/hotCollections-styledComponents";

export default function Collections({ data }) {
  return (
    <div className={"mt-1"}>
      {data.collections &&
        data.collections.map((item, index) => (
          <div key={index} className="col-md-3 mb-4 float-left">
            <CollectionCard>
              <CardImageContainer>
                <Link
                  href={{
                    pathname: `/collection/${item.slug}`,
                  }}
                >
                  <a>
                    <img
                      style={{ width: "100%" }}
                      src={item.collectionBanner.url}
                    />
                  </a>
                </Link>
              </CardImageContainer>
              <CardDescription style={{ borderTop: "1px solid #ccc" }}>
                <ProfileAvatarContainer>
                  <Link
                    href={{
                      pathname: `/collection/${item.slug}`,
                    }}
                  >
                    <a>
                      <img
                        style={{ width: "auto" }}
                        src={item.collectionImageURL.url}
                      />
                    </a>
                  </Link>
                </ProfileAvatarContainer>
                <CardTitle style={{ padding: "0px 10px", marginTop: "-35px" }}>
                  <span>{item.collectionName}</span>
                  <span>{`ERC-721`}</span>
                  {/* <span>{item.data[0]?.asset_contract.schema_name}</span> */}
                </CardTitle>
              </CardDescription>
            </CollectionCard>
          </div>
        ))}
    </div>
  );
}
