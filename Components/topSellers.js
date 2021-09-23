import "react-multi-carousel/lib/styles.css";

import {
    AvatarContainer,
    ListCounter,
    SellerDetails,
    SellerName,
    SellerPrice,
    TopSellerContainer,
    TopSellerItem,
} from "./StyledComponents/topSeller-styledComponents";
import React, { useEffect, useState } from "react";

import Link from "next/link";
import { SectionHeading } from "./StyledComponents/globalStyledComponents";
import { fetch } from "Utils/strapiApi";
import { randomAvatar } from "Utils/utils";

function TopSellers() {
    const [topSelers, setTopSellers] = useState();

    const loadTopSellers = async () => {
        const topResult = await fetch("/talents");
        if (topResult) {
            const tops = await topResult.data;
            setTopSellers(tops);
        }
    };
    const topSellerDetails = async (top) => {
        // const result = await OpenSeaAPI.getAssetsListByOwner(address);
    };

    useEffect(() => {
        loadTopSellers();
    }, []);

    return (
        <div className="row">
            <div className="col-lg-12">
                <h2 className="style-2">Top Sellers</h2>
            </div>
            <div className="col-md-12  fadeIn">
                <ol className="author_list">
                    <li>
                        <div className="author_list_pp">
                            <a href="author.html">
                                <img className="lazy" src="images/author/author-1.jpg" alt="" />
                                <i className="fa fa-check"></i>
                            </a>
                        </div>
                        <div className="author_list_info">
                            <a href="author.html">Monica Lucas</a>
                            <span>3.2 ETH</span>
                        </div>
                    </li>
                    <li>
                        <div className="author_list_pp">
                            <a href="author.html">
                                <img className="lazy" src="images/author/author-2.jpg" alt="" />
                                <i className="fa fa-check"></i>
                            </a>
                        </div>
                        <div className="author_list_info">
                            <a href="author.html">Mamie Barnett</a>
                            <span>2.8 ETH</span>
                        </div>
                    </li>
                    <li>
                        <div className="author_list_pp">
                            <a href="author.html">
                                <img className="lazy" src="images/author/author-3.jpg" alt="" />
                                <i className="fa fa-check"></i>
                            </a>
                        </div>
                        <div className="author_list_info">
                            <a href="author.html">Nicholas Daniels</a>
                            <span>2.5 ETH</span>
                        </div>
                    </li>
                    <li>
                        <div className="author_list_pp">
                            <a href="author.html">
                                <img className="lazy" src="images/author/author-4.jpg" alt="" />
                                <i className="fa fa-check"></i>
                            </a>
                        </div>
                        <div className="author_list_info">
                            <a href="author.html">Lori Hart</a>
                            <span>2.2 ETH</span>
                        </div>
                    </li>
                    <li>
                        <div className="author_list_pp">
                            <a href="author.html">
                                <img className="lazy" src="images/author/author-5.jpg" alt="" />
                                <i className="fa fa-check"></i>
                            </a>
                        </div>
                        <div className="author_list_info">
                            <a href="author.html">Jimmy Wright</a>
                            <span>1.9 ETH</span>
                        </div>
                    </li>
                    <li>
                        <div className="author_list_pp">
                            <a href="author.html">
                                <img className="lazy" src="images/author/author-6.jpg" alt="" />
                                <i className="fa fa-check"></i>
                            </a>
                        </div>
                        <div className="author_list_info">
                            <a href="author.html">Karla Sharp</a>
                            <span>1.6 ETH</span>
                        </div>
                    </li>
                    <li>
                        <div className="author_list_pp">
                            <a href="author.html">
                                <img className="lazy" src="images/author/author-7.jpg" alt="" />
                                <i className="fa fa-check"></i>
                            </a>
                        </div>
                        <div className="author_list_info">
                            <a href="author.html">Gayle Hicks</a>
                            <span>1.5 ETH</span>
                        </div>
                    </li>
                    <li>
                        <div className="author_list_pp">
                            <a href="author.html">
                                <img className="lazy" src="images/author/author-8.jpg" alt="" />
                                <i className="fa fa-check"></i>
                            </a>
                        </div>
                        <div className="author_list_info">
                            <a href="author.html">Claude Banks</a>
                            <span>1.3 ETH</span>
                        </div>
                    </li>
                    <li>
                        <div className="author_list_pp">
                            <a href="author.html">
                                <img className="lazy" src="images/author/author-9.jpg" alt="" />
                                <i className="fa fa-check"></i>
                            </a>
                        </div>
                        <div className="author_list_info">
                            <a href="author.html">Franklin Greer</a>
                            <span>0.9 ETH</span>
                        </div>
                    </li>
                    <li>
                        <div className="author_list_pp">
                            <a href="author.html">
                                <img className="lazy" src="images/author/author-10.jpg" alt="" />
                                <i className="fa fa-check"></i>
                            </a>
                        </div>
                        <div className="author_list_info">
                            <a href="author.html">Stacy Long</a>
                            <span>0.8 ETH</span>
                        </div>
                    </li>
                    <li>
                        <div className="author_list_pp">
                            <a href="author.html">
                                <img className="lazy" src="images/author/author-11.jpg" alt="" />
                                <i className="fa fa-check"></i>
                            </a>
                        </div>
                        <div className="author_list_info">
                            <a href="author.html">Ida Chapman</a>
                            <span>0.6 ETH</span>
                        </div>
                    </li>
                    <li>
                        <div className="author_list_pp">
                            <a href="author.html">
                                <img className="lazy" src="images/author/author-12.jpg" alt="" />
                                <i className="fa fa-check"></i>
                            </a>
                        </div>
                        <div className="author_list_info">
                            <a href="author.html">Fred Ryan</a>
                            <span>0.5 eth</span>
                        </div>
                    </li>
                </ol>
            </div>
        </div>

    );
}

export default TopSellers;
