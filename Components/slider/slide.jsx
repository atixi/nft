import { useState, useEffect } from "react";
import request from "../../Utils/axios";
import dynamic from "next/dynamic";
import Link from "next/link";
const OwlCarousel = dynamic(import("react-owl-carousel"), { ssr: false });

function Slide({ assets }) {
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
              {assets.map((asset) => {
                return (
                  <div className="nft_pic">
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
                        src={asset.asset?.imageUrlOriginal}
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
