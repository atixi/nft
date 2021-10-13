import { useState, useEffect } from "react";
import request from "../../Utils/axios";
import dynamic from "next/dynamic";
import Link from "next/link";
import { prevImage } from "../../Utils/utils"
const OwlCarousel = dynamic(import("react-owl-carousel"), { ssr: false });

function Slide({ assets }) {
  const responsive = {
    0: {
      items: 1,
    },
    600: {
      items: 2,
    },
    1000: {
      items: 3,
    },
  };
  return (
    <>
      <section
        id="section-hero "
        className="no-bottom topCarouselSection"
        aria-label="section"
      >
        <div className="d-carousel">
          {assets && assets?.length > 0 && (
            <OwlCarousel
              responsive={responsive}
              margin={15}
              dots={false}
              id="item-carousel-big"
              className="owl-carousel"
              navClass={[
                "owl-prev topCarouselPrev",
                "owl-next topCarouselNext",
              ]}
              nav
            >
              {assets.map((asset, index) => {
                return (
                  <div className="nft_pic" key={index} style={{ maxWidth: "610px", maxHeight: "610px" }}>
                    <Link
                      href={`/nft/${asset?.tokenAddress}?tokenId=${asset?.tokenId}`}
                    >
                      <a>
                        <span className="nft_pic_info">
                          <span className="nft_pic_title">
                            {asset.asset?.collection?.name}
                          </span>
                          <span className="nft_pic_by">
                            {asset.asset?.name}
                          </span>
                        </span>
                      </a>
                    </Link>
                    <div className="nft_pic_wrap">
                      <img
                        src={asset.asset?.imageUrlOriginal ? asset.asset?.imageUrlOriginal : asset.asset?.imageUrl}
                        className="lazy img-fluid"
                        alt=""
                      />
                    </div>
                  </div>
                );
              })}
            </OwlCarousel>
          )}
        </div>
      </section>
    </>
  );
}
export default Slide;
