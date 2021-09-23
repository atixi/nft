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
                <div class="d-carousel">
                    <OwlCarousel margin={15} dots={false} id="item-carousel-big" className="owl-carousel" navClass={["owl-prev topCarouselPrev", "owl-next topCarouselNext"]} nav>
                        <div class="nft_pic">                            
                            <a href="item-details.html">
                                <span class="nft_pic_info">
                                    <span class="nft_pic_title">Glass Cube</span>
                                    <span class="nft_pic_by">Mamie Barnett</span>
                                </span>
                            </a>
                            <div class="nft_pic_wrap">
                                <img src="images/carousel/crs-1.jpg" class="lazy img-fluid" alt=""/>
                            </div>
                        </div>

                        <div class="nft_pic">                            
                            <a href="item-details.html">
                                <span class="nft_pic_info">
                                    <span class="nft_pic_title">Purple Ocean</span>
                                    <span class="nft_pic_by">Monica Lucas</span>
                                </span>
                            </a>
                            <div class="nft_pic_wrap">
                                <img src="images/carousel/crs-2.jpg" class="lazy img-fluid" alt=""/>
                            </div>
                        </div>

                        <div class="nft_pic">                            
                            <a href="item-details.html">
                                <span class="nft_pic_info">
                                    <span class="nft_pic_title">Hot Lava</span>
                                    <span class="nft_pic_by">Nicholas Daniels</span>
                                </span>
                            </a>
                            <div class="nft_pic_wrap">
                                <img src="images/carousel/crs-3.jpg" class="lazy img-fluid" alt=""/>
                            </div>
                        </div>                        


                        <div class="nft_pic">                            
                            <a href="item-details.html">
                                <span class="nft_pic_info">
                                    <span class="nft_pic_title">Loop Donut</span>
                                    <span class="nft_pic_by">Lori Hart</span>
                                </span>
                            </a>
                            <div class="nft_pic_wrap">
                                <img src="images/items/anim-5.webp" class="lazy img-fluid" alt=""/>
                            </div>
                        </div>

                        <div class="nft_pic">                            
                            <a href="item-details.html">
                                <span class="nft_pic_info">
                                    <span class="nft_pic_title">I Believe I Can Fly</span>
                                    <span class="nft_pic_by">Fred Ryan</span>
                                </span>
                            </a>
                            <div class="nft_pic_wrap">
                                <img src="images/items/anim-8.webp" class="lazy img-fluid" alt=""/>
                            </div>
                        </div>
                    </OwlCarousel>
                        <div class="d-arrow-left"><i class="fa fa-angle-left"></i></div>
                        <div class="d-arrow-right"><i class="fa fa-angle-right"></i></div>
                </div>
            </section> </>
  );
}
