import React, { useState, useEffect } from "react";
import Link from "next/link";
import Carousel from "react-elastic-carousel";
import { SectionHeading } from "./StyledComponents/globalStyledComponents";
import api from "/Components/axiosRequest";
import { socket } from "config/websocket";
import { fetch } from "Utils/strapiApi";
import dynamic from "next/dynamic"
const OwlCarousel = dynamic(import("react-owl-carousel"), {ssr: false});
const breakPoints = [
  { width: 1, itemsToShow: 1 },
  { width: 550, itemsToShow: 2, itemsToScroll: 2 },
  { width: 768, itemsToShow: 3, itemsToScroll: 3 },
  { width: 1024, itemsToShow: 4, itemsToScroll: 4 },
  { width: 1200, itemsToShow: 5, itemsToScroll: 5 },
];

export default function HotCollections() {
  const [serverCollections, setServerCollections] = useState([]);
  const responsive ={
    0:{
        items:1
    },
    400:{
        items: 2
    },
    600:{
        items:3
    },
    1000:{
        items:5
    }
    }
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
    
    <div className="row">
    <div className="col-lg-12">
        <h2 className="style-2">Hot Collections</h2>
    </div>
    <OwlCarousel className='owl-theme  fadeIn' responsive={responsive} responsiveClass={"-"} dots={false} items={5} navClass={["owl-prev carouselPrev", "owl-next carouselNext"]} loop margin={15} nav>

            <div className="nft_coll style-2">
                <div className="nft_wrap">
                    <a href="collection.html"><img src="images/collections/coll-1.jpg" className="lazy img-fluid" alt=""  /></a>
                </div>
                <div className="nft_coll_pp">
                    <a href="collection.html"><img className="lazy" src="images/author/author-1.jpg" alt=""  /></a>
                    <i className="fa fa-check"></i>
                </div>
                <div className="nft_coll_info">
                    <a href="collection.html"><h4>Abstraction</h4></a>
                    <span>ERC-192</span>
                </div>
            </div>
        
            <div className="nft_coll style-2">
                <div className="nft_wrap">
                    <a href="collection.html"><img src="images/collections/coll-2.jpg" className="lazy img-fluid" alt=""  /></a>
                </div>
                <div className="nft_coll_pp">
                    <a href="collection.html"><img className="lazy" src="images/author/author-2.jpg" alt=""  /></a>
                    <i className="fa fa-check"></i>
                </div>
                <div className="nft_coll_info">
                    <a href="collection.html"><h4>Patternlicious</h4></a>
                    <span>ERC-61</span>
                </div>
            </div>
        
            <div className="nft_coll style-2">
                <div className="nft_wrap">
                    <a href="collection.html"><img src="images/collections/coll-3.jpg" className="lazy img-fluid" alt=""  /></a>
                </div>
                <div className="nft_coll_pp">
                    <a href="collection.html"><img className="lazy" src="images/author/author-3.jpg" alt=""  /></a>
                    <i className="fa fa-check"></i>
                </div>
                <div className="nft_coll_info">
                    <a href="collection.html"><h4>Skecthify</h4></a>
                    <span>ERC-126</span>
                </div>
            </div>
        
            <div className="nft_coll style-2">
                <div className="nft_wrap">
                    <a href="collection.html"><img src="images/collections/coll-4.jpg" className="lazy img-fluid" alt=""  /></a>
                </div>
                <div className="nft_coll_pp">
                    <a href="collection.html"><img className="lazy" src="images/author/author-4.jpg" alt=""  /></a>
                    <i className="fa fa-check"></i>
                </div>
                <div className="nft_coll_info">
                    <a href="collection.html"><h4>Cartoonism</h4></a>
                    <span>ERC-73</span>
                </div>
            </div>
        
            <div className="nft_coll style-2">
                <div className="nft_wrap">
                    <a href="collection.html"><img src="images/collections/coll-5.jpg" className="lazy img-fluid" alt=""  /></a>
                </div>
                <div className="nft_coll_pp">
                    <a href="collection.html"><img className="lazy" src="images/author/author-5.jpg" alt=""  /></a>
                    <i className="fa fa-check"></i>
                </div>
                <div className="nft_coll_info">
                    <a href="collection.html"><h4>Virtuland</h4></a>
                    <span>ERC-85</span>
                </div>
            </div>
        
            <div className="nft_coll style-2">
                <div className="nft_wrap">
                    <a href="collection.html"><img src="images/collections/coll-6.jpg" className="lazy img-fluid" alt=""  /></a>
                </div>
                <div className="nft_coll_pp">
                    <a href="collection.html"><img className="lazy" src="images/author/author-6.jpg" alt=""  /></a>
                    <i className="fa fa-check"></i>
                </div>
                <div className="nft_coll_info">
                    <a href="collection.html"><h4>Papercut</h4></a>
                    <span>ERC-42</span>
                </div>
            </div>
            
        </OwlCarousel>
    </div>

  );
}
