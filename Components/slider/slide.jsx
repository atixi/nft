import SlideItem from "./slideItem";
import { SliderWrapper } from "../StyledComponents/slider-styledComponents";
import { useState, useEffect } from "react";
import api from "/Components/axiosRequest";
import dynamic from "next/dynamic"
import Carousel from "react-elastic-carousel";
const OwlCarousel = dynamic(import("react-owl-carousel"), {ssr: false});

const breakPoints = [
  { width: 1, itemsToShow: 1 },
  { width: 550, itemsToShow: 2, itemsToScroll: 2 },
  { width: 768, itemsToShow: 3, itemsToScroll: 3 },
  { width: 1024, itemsToShow: 4, itemsToScroll: 4 },
  { width: 1200, itemsToShow: 5, itemsToScroll: 5 },
];
export default function Slide(props) {
  const [categories, setCategories] = useState([]);
  useEffect(() => {
    async function fetchingCats() {
      const data = await api.get("/categories?_sort=id:ASC");
      setCategories(await data.data);
    }
    fetchingCats();
  }, []);
  return ( <>
    <section id="section-hero " className="no-bottom topCarouselSection" aria-label="section">
                <div className="d-carousel">
                    <OwlCarousel margin={15} dots={false} id="item-carousel-big" className="owl-carousel" navClass={["owl-prev topCarouselPrev", "owl-next topCarouselNext"]} nav>
                        <div className="nft_pic">                            
                            <a href="item-details.html">
                                <span className="nft_pic_info">
                                    <span className="nft_pic_title">Glass Cube</span>
                                    <span className="nft_pic_by">Mamie Barnett</span>
                                </span>
                            </a>
                            <div className="nft_pic_wrap">
                                <img src="images/carousel/crs-1.jpg" className="lazy img-fluid" alt=""/>
                            </div>
                        </div>

                        <div className="nft_pic">                            
                            <a href="item-details.html">
                                <span className="nft_pic_info">
                                    <span className="nft_pic_title">Purple Ocean</span>
                                    <span className="nft_pic_by">Monica Lucas</span>
                                </span>
                            </a>
                            <div className="nft_pic_wrap">
                                <img src="images/carousel/crs-2.jpg" className="lazy img-fluid" alt=""/>
                            </div>
                        </div>

                        <div className="nft_pic">                            
                            <a href="item-details.html">
                                <span className="nft_pic_info">
                                    <span className="nft_pic_title">Hot Lava</span>
                                    <span className="nft_pic_by">Nicholas Daniels</span>
                                </span>
                            </a>
                            <div className="nft_pic_wrap">
                                <img src="images/carousel/crs-3.jpg" className="lazy img-fluid" alt=""/>
                            </div>
                        </div>                        


                        <div className="nft_pic">                            
                            <a href="item-details.html">
                                <span className="nft_pic_info">
                                    <span className="nft_pic_title">Loop Donut</span>
                                    <span className="nft_pic_by">Lori Hart</span>
                                </span>
                            </a>
                            <div className="nft_pic_wrap">
                                <img src="images/items/anim-5.webp" className="lazy img-fluid" alt=""/>
                            </div>
                        </div>

                        <div className="nft_pic">                            
                            <a href="item-details.html">
                                <span className="nft_pic_info">
                                    <span className="nft_pic_title">I Believe I Can Fly</span>
                                    <span className="nft_pic_by">Fred Ryan</span>
                                </span>
                            </a>
                            <div className="nft_pic_wrap">
                                <img src="images/items/anim-8.webp" className="lazy img-fluid" alt=""/>
                            </div>
                        </div>
                    </OwlCarousel>
                        {/* <div className="d-arrow-left"><i className="fa fa-angle-left"></i></div>
                        <div className="d-arrow-right"><i className="fa fa-angle-right"></i></div> */}
                </div>
            </section> </>
  );
}
