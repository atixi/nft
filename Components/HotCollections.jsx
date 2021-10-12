import React, { useState, useEffect } from "react";
import { socket } from "config/websocket";
import { fetch } from "Utils/strapiApi";
import dynamic from "next/dynamic";
import Link from "next/link";
const OwlCarousel = dynamic(import("react-owl-carousel"), { ssr: false });

function HotCollections({ collections }) {
  const [serverCollections, setServerCollections] = useState(collections);
  const responsive = {
    0: {
      items: 1,
    },
    400: {
      items: 2,
    },
    600: {
      items: 3,
    },
    1000: {
      items: 5,
    },
  };

  useEffect(() => {
    socket.on("serverBroadCastNewCollection", (data) => {
      setServerCollections((prev) => [data, ...prev]);
    });
  }, []);

  return (
    <div className="row">
      <div className="col-lg-12">
        <h2 className="style-2">Collections</h2>
      </div>
      {serverCollections && (
        <OwlCarousel
          className="owl-theme  fadeIn"
          responsive={responsive}
          responsiveClass={"-"}
          dots={false}
          items={5}
          navClass={["owl-prev carouselPrev", "owl-next carouselNext"]}
          loop={false}
          margin={15}
          nav
        >
          {serverCollections.map((collection, index) => {
            return (
              <Link href={`/collection/${collection?.slug}`} passHref>
                <a>
                  <div key={index} className="nft_coll style-2">
                    <div className="nft_wrap hotCollectionListDiv">
                      <img
                        src={collection?.collectionBanner?.url}
                        className="lazy img-fluid rounded hotCollectionListImg"
                        alt=""
                      />
                    </div>
                    <div className="nft_coll_pp">
                      <img
                        className="lazy img-fluid hotCollectionAvatar"
                        src={collection?.collectionImageURL?.url}
                        alt=""
                      />
                      <i className="fa fa-check"></i>
                    </div>
                    <div className="nft_coll_info">
                      <h4>{collection?.collectionName}</h4>
                      <span>{`${collection?.nfts?.length} assets`}</span>
                    </div>
                  </div>
                </a>
              </Link>
            );
          })}
        </OwlCarousel>
      )}
    </div>
  );
}
export default HotCollections;
