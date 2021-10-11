import React from "react";
import AssetCard from "../Components/assetCard";
function Explore({ assets }) {
    return (
        <>
            <div className="row  fadeIn">
                <div className="col-lg-12">
                    <h2 className="style-2">New Items</h2>
                </div>
                {assets && assets.map((item, index) => {
                    return <AssetCard asset={item} key={index} />
                })}
            </div>
            <div className="spacer-single"></div>
        </>
    );
}
export default Explore;
