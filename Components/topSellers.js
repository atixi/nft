import React from "react";

function TopSellers({ talents }) {
    return (
        <div className="row">
            <div className="col-lg-12">
                <h2 className="style-2">Talents</h2>
            </div>
            <div className="col-md-12  fadeIn">
                <ol className="author_list">
                    {talents?.length > 0 && talents.map((seller) => {
                        return (
                            <li>
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
                        )
                    })}
                </ol>
            </div>
        </div>

    );
}

export default TopSellers;
