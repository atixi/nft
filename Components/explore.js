import React, { useState, useEffect } from "react";
import request from "../Utils/axios"
import AssetCard from "../Components/assetCard"
function Explore() {
    const [items, setItems] = useState();
    const loadItems = async () => {
        try {
            const data = await request("nfts?_limit=8", {
                method: "GET"
            });
            if (data.status === 200) {
                setItems(data.data)
            }
        }
        catch (e) {

        }
    }
    useEffect(() => {
        loadItems()
    }, []);
    return (
        <>
            <div className="row  fadeIn">
                <div className="col-lg-12">
                    <h2 className="style-2">New Items</h2>
                </div>
                {items && items.map((item, index) => {
                    return <AssetCard asset={item} key={index} />
                })}
            </div>
            <div className="spacer-single"></div>


        </>
    );
}
export default Explore;
