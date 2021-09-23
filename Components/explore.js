import React, { useState, useEffect } from "react";
import Products from "/Components/nfts";
import Link from "next/link";
import { Spin, Statistic} from "antd";
const {Countdown} = Statistic
import EXPLORE_CONSTANTS from "/Constants/exploreConstants";
import {
  CategoriesListContainer,
  CategoriesListScroll,
  CategoriesList,
  CountDownContainer
} from "./StyledComponents/explore-styledComponents";
import {
  SectionHeading,
  LoadingContainer,
  LoadMoreButton,
} from "./StyledComponents/globalStyledComponents";
import { useRouter } from "next/router";
import api from "/Components/axiosRequest";
const deadline = Date.now() + 1000 * 60 * 60 * 24 * 2 + 1000 * 30; // Moment is also OK

function Explore() {
  const [isLoad, setLoad] = useState(false);
  const [categories, setCategories] = useState([]);
  const [explores, setExplores] = useState({ assets: [] });
  const [loadMore, setLoadMore] = useState({
    dataLimit: 2,
    dataStart: 0,
    countBy: 2,
    dataLoad: true,
    dataLoadMoreButtonLoading: false,
  });
  async function LoadMoreData(slug) {
    setLoadMore({
      ...loadMore,
      dataLoadMoreButtonLoading: true,
    });
    const fetchedData = await api.get(
      `/categories/${slug}?limit=${loadMore.dataLimit}&offset=${loadMore.dataStart}`
    );
    const assetLength = fetchedData.data.assets.length;
    assetLength === 0
      ? setLoadMore({ ...loadMore, dataLoad: false })
      : (() => {
          setExplores({
            ...explores,
            assets: [...explores.assets, ...fetchedData.data.assets],
          });
          setLoadMore({
            ...loadMore,
            dataStart: loadMore.dataStart + loadMore.countBy,
            dataLoadMoreButtonLoading: false,
          });
        })();
  }

  const router = useRouter();
  const { cat } = router.query;

  async function fetchingData(slug) {
    const fetchedData = await api.get(
      `/categories/${slug}?limit=${loadMore.dataLimit}&offset=0`
    );
    setExplores({
      ...fetchedData.data,
    });
    setLoadMore({
      ...loadMore,
      dataStart: loadMore.countBy,
      dataLoad: true,
    });
    setLoad(true);
  }
  useEffect(() => {
    async function fetchingCats() {
      const data = await api.get("/categories?_sort=id:ASC");
      setCategories(await data.data);
    }
    fetchingCats();

    if (cat != undefined) {
      fetchingData(cat);
    } else {
      fetchingData("all");
    }
  }, [cat]);
  return (
    <>

                            <div className="row  fadeIn"> 
                                <div className="col-lg-12">
                                    <h2 className="style-2">New Items</h2>
                                </div>

                                {/* <!-- nft item begin --> */}
                                <div className=" col-lg-3 col-md-6 col-sm-6 col-xs-12">
                                    <div className="nft__item style-2">
                                        <CountDownContainer>
                                            <Countdown
                                            value={deadline}
                                            format={`D[d] HH[h] mm[m] ss[s]`}
                                            valueStyle={{lineHeight: "1.1", color: "white"}}
                                            />
                                        </CountDownContainer>
                                        <div className="author_list_pp">
                                            <a href="author.html">                                    
                                                <img className="lazy" src="images/author/author-1.jpg" alt=""  />
                                                <i className="fa fa-check"></i>
                                            </a>
                                        </div>
                                        <div className="nft__item_wrap">
                                            <a href="item-details.html">
                                                <img src="images/items-alt/static-1.jpg" className="lazy nft__item_preview" alt=""  />
                                            </a>
                                        </div>
                                        <div className="nft__item_info">
                                            <a href="item-details.html">
                                                <h4>Sunny Day</h4>
                                            </a>
                                            <div className="nft__item_price">
                                                0.08 ETH<span>1/20</span>
                                            </div>
                                            <div className="nft__item_action">
                                                <a href="#">Place a bid</a>
                                            </div>
                                            <div className="nft__item_like">
                                                <i className="fa fa-heart"></i><span>50</span>
                                            </div>                            
                                        </div> 
                                    </div>
                                </div>                 
                                {/* <!-- nft item begin --> */}
                                <div className=" col-lg-3 col-md-6 col-sm-6 col-xs-12">
                                    <div className="nft__item style-2">
                                        <div className="author_list_pp">
                                            <a href="author.html">                                    
                                                <img className="lazy" src="images/author/author-10.jpg" alt=""  />
                                                <i className="fa fa-check"></i>
                                            </a>
                                        </div>
                                        <div className="nft__item_wrap">
                                            <a href="item-details.html">
                                                <img src="images/items-alt/static-2.jpg" className="lazy nft__item_preview" alt=""  />
                                            </a>
                                        </div>
                                        <div className="nft__item_info">
                                            <a href="item-details.html">
                                                <h4>Blue Planet</h4>
                                            </a>
                                            <div className="nft__item_price">
                                                0.06 ETH<span>1/22</span>
                                            </div>
                                            <div className="nft__item_action">
                                                <a href="#">Place a bid</a>
                                            </div>
                                            <div className="nft__item_like">
                                                <i className="fa fa-heart"></i><span>80</span>
                                            </div>                                 
                                        </div> 
                                    </div>
                                </div>
                                {/* <!-- nft item begin --> */}
                                <div className=" col-lg-3 col-md-6 col-sm-6 col-xs-12">
                                    <div className="nft__item style-2">
                                        <CountDownContainer>
                                            <Countdown
                                            value={deadline}
                                            format={`D[d] HH[h] mm[m] ss[s]`}
                                            valueStyle={{lineHeight: "1.1", color: "white"}}
                                            />
                                        </CountDownContainer>                                        <div className="author_list_pp">
                                            <a href="author.html">                                    
                                                <img className="lazy" src="images/author/author-11.jpg" alt=""  />
                                                <i className="fa fa-check"></i>
                                            </a>
                                        </div>
                                        <div className="nft__item_wrap">
                                            <a href="item-details.html">
                                                <img src="images/items-alt/static-3.jpg" className="lazy nft__item_preview" alt=""  />
                                            </a>
                                        </div>
                                        <div className="nft__item_info">
                                            <a href="item-details.html">
                                                <h4>Finally Free</h4>
                                            </a>
                                            <div className="nft__item_price">
                                                0.05 ETH<span>1/11</span>
                                            </div>
                                            <div className="nft__item_action">
                                                <a href="#">Place a bid</a>
                                            </div>
                                            <div className="nft__item_like">
                                                <i className="fa fa-heart"></i><span>97</span>
                                            </div>                                 
                                        </div> 
                                    </div>
                                </div>
                                {/* <!-- nft item begin --> */}
                                <div className=" col-lg-3 col-md-6 col-sm-6 col-xs-12">
                                    <div className="nft__item style-2">
                                        <div className="author_list_pp">
                                            <a href="author.html">                                    
                                                <img className="lazy" src="images/author/author-12.jpg" alt=""  />
                                                <i className="fa fa-check"></i>
                                            </a>
                                        </div>
                                        <div className="nft__item_wrap">
                                            <a href="item-details.html">
                                                <img src="images/items-alt/static-4.jpg" className="lazy nft__item_preview" alt=""  />
                                            </a>
                                        </div>
                                        <div className="nft__item_info">
                                            <a href="item-details.html">
                                                <h4>Work From Home</h4>
                                            </a>
                                            <div className="nft__item_price">
                                                0.02 ETH<span>1/15</span>
                                            </div>
                                            <div className="nft__item_action">
                                                <a href="#">Place a bid</a>
                                            </div>
                                            <div className="nft__item_like">
                                                <i className="fa fa-heart"></i><span>73</span>
                                            </div>                                 
                                        </div> 
                                    </div>
                                </div>
                                {/* <!-- nft item begin --> */}
                                <div className=" col-lg-3 col-md-6 col-sm-6 col-xs-12">
                                    <div className="nft__item style-2">
                                        <div className="author_list_pp">
                                            <a href="author.html">                                    
                                                <img className="lazy" src="images/author/author-9.jpg" alt=""  />
                                                <i className="fa fa-check"></i>
                                            </a>
                                        </div>
                                        <div className="nft__item_wrap">
                                            <a href="item-details.html">
                                                <img src="images/items/anim-4.webp" className="lazy nft__item_preview" alt=""  />
                                            </a>
                                        </div>
                                        <div className="nft__item_info">
                                            <a href="item-details.html">
                                                <h4>The Truth</h4>
                                            </a>
                                            <div className="nft__item_price">
                                                0.06 ETH<span>1/20</span>
                                            </div>
                                            <div className="nft__item_action">
                                                <a href="#">Place a bid</a>
                                            </div>
                                            <div className="nft__item_like">
                                                <i className="fa fa-heart"></i><span>26</span>
                                            </div>                                 
                                        </div>
                                    </div>
                                </div>
                                {/* <!-- nft item begin --> */}
                                <div className=" col-lg-3 col-md-6 col-sm-6 col-xs-12">
                                    <div className="nft__item style-2">
                                        <CountDownContainer>
                                            <Countdown
                                            value={deadline}
                                            format={`D[d] HH[h] mm[m] ss[s]`}
                                            valueStyle={{lineHeight: "1.1", color: "white"}}
                                            />
                                        </CountDownContainer>                                        <div className="author_list_pp">
                                            <a href="author.html">                                    
                                                <img className="lazy" src="images/author/author-2.jpg" alt=""  />
                                                <i className="fa fa-check"></i>
                                            </a>
                                        </div>
                                        <div className="nft__item_wrap">
                                            <a href="item-details.html">
                                                <img src="images/items-alt/static-5.jpg" className="lazy nft__item_preview" alt=""  />
                                            </a>
                                        </div>
                                        <div className="nft__item_info">
                                            <a href="item-details.html">
                                                <h4>Running Puppets</h4>
                                            </a>
                                            <div className="nft__item_price">
                                                0.03 ETH<span>1/24</span>
                                            </div>    
                                            <div className="nft__item_action">
                                                <a href="#">Place a bid</a>
                                            </div>
                                            <div className="nft__item_like">
                                                <i className="fa fa-heart"></i><span>45</span>
                                            </div>                                  
                                        </div> 
                                    </div>
                                </div>
                                {/* <!-- nft item begin --> */}
                                <div className=" col-lg-3 col-md-6 col-sm-6 col-xs-12">
                                    <div className="nft__item style-2">
                                        <div className="author_list_pp">
                                            <a href="author.html">                                    
                                                <img className="lazy" src="images/author/author-3.jpg" alt=""  />
                                                <i className="fa fa-check"></i>
                                            </a>
                                        </div>
                                        <div className="nft__item_wrap">
                                            <a href="item-details.html">
                                                <img src="images/items-alt/static-6.jpg" className="lazy nft__item_preview" alt=""  />
                                            </a>
                                        </div>
                                        <div className="nft__item_info">
                                            <a href="item-details.html">
                                                <h4>Green Frogman</h4>
                                            </a>
                                            <div className="nft__item_price">
                                                0.09 ETH<span>1/25</span>
                                            </div>
                                            <div className="nft__item_action">
                                                <a href="#">Place a bid</a>
                                            </div>
                                            <div className="nft__item_like">
                                                <i className="fa fa-heart"></i><span>76</span>
                                            </div>                                 
                                        </div> 
                                    </div>
                                </div>
                                {/* <!-- nft item begin --> */}
                                <div className=" col-lg-3 col-md-6 col-sm-6 col-xs-12">
                                    <div className="nft__item style-2">
                                        <CountDownContainer>
                                            <Countdown
                                            value={deadline}
                                            format={`D[d] HH[h] mm[m] ss[s]`}
                                            valueStyle={{lineHeight: "1.1", color: "white"}}
                                            />
                                        </CountDownContainer>                                        <div className="author_list_pp">
                                            <a href="author.html">                                    
                                                <img className="lazy" src="images/author/author-4.jpg" alt=""  />
                                                <i className="fa fa-check"></i>
                                            </a>
                                        </div>
                                        <div className="nft__item_wrap">
                                            <a href="item-details.html">
                                                <img src="images/items/anim-5.webp" className="lazy nft__item_preview" alt=""  />
                                            </a>
                                        </div>
                                        <div className="nft__item_info">
                                            <a href="item-details.html">
                                                <h4>Loop Donut</h4>
                                            </a>
                                            <div className="nft__item_price">
                                                0.09 ETH<span>1/14</span>
                                            </div>
                                            <div className="nft__item_action">
                                                <a href="#">Place a bid</a>
                                            </div>
                                            <div className="nft__item_like">
                                                <i className="fa fa-heart"></i><span>94</span>
                                            </div>                                 
                                        </div> 
                                    </div>
                                </div>
                            </div>

                                {/* <div className="spacer-single"></div> */}

                                <div className="spacer-single"></div>

                          
    </>
  );
}
export default Explore;
