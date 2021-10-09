import React, { useEffect, useState } from "react";
import "react-multi-carousel/lib/styles.css";
import { fetch } from "Utils/strapiApi";

// import { randomAvatar } from "Utils/utils";

function TopSellers() {
    const [topSellers, setTopSellers] = useState();

    const loadTopSellers = async () => {
        try {
            const topResult = await fetch("/talents");
            if (topResult) {
                const tops = await topResult.data;
                setTopSellers(tops);
            }
        }
        catch (e) {
            console.log(e)
        }

    };
    useEffect(() => {
        loadTopSellers();
    }, []);
    return (
        <div className="row">
            <div className="col-lg-12">
                <h2 className="style-2">Talents</h2>
            </div>
            <div className="col-md-12  fadeIn">
                <ol className="author_list">
                    {topSellers?.length > 0 && topSellers.map((seller) => {
                        return <li>
                            <div className="author_list_pp">
                                <a href="author.html">
                                    <img className="lazy" src={seller?.talentAvatar?.url} alt="" />
                                    <i className="fa fa-check"></i>
                                </a>
                            </div>
                            <div className="author_list_info">
                                <a href="author.html">{seller?.talentName}</a>
                                {/* <span>3.2 ETH</span> */}
                            </div>
                        </li>
                    })}
                </ol>
            </div>
        </div>

    );
}

export default TopSellers;
