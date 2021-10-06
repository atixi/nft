// import {
//   FacebookIcon,
//   FacebookShareButton,
//   TelegramIcon,
//   TelegramShareButton,
//   TwitterIcon,
//   TwitterShareButton,
//   WhatsappIcon,
//   WhatsappShareButton,
// } from "next-share";
import React, { useEffect, useState } from "react";

import CollectionLoader from "@/components/collectionLoader";
import { displayAddress } from "/Utils/utils";
import { useRouter } from "next/router";
import request from "../../Utils/axios"
import AssetCard from "../../Components/assetCard"
function CollectionDetails() {
  const router = useRouter();
  const { slug } = router.query;
  const [collection, setCollection] = useState()
  const [assets, setAssets] = useState()
  const loadCollection = async () => {
    const col = await request(`collections/${slug}`, {
      method: "GET"
    });
    if (col.status === 200) {
      setCollection(col.data)
      setAssets(col.data.nfts)
    }
  }


  useEffect(() => {
    slug != undefined
      ? loadCollection()
      : "";
  }, [slug]);

  return (
    <>
      <div className="no-bottom no-top" id="content">
        <div id="top"></div>

        {/* <!-- section begin --> */}
        <section id="profile_banner" aria-label="section" className="text-light" style={{ paddingBottom: "0px", width: "100%" }}>
          <img src={collection?.collectionBanner?.url} style={{ width: "100%", height: "250px" }} />
        </section>
        {/* <!-- section close --> */}
        <section aria-label="section" className="d_coll no-top">
          <div className="contentContainer">
            <div className="row">
              <div className="col-md-12">
                <div className="d_profile">
                  <div className="profile_avatar">
                    <div className="d_profile_img">
                      <img src={collection?.collectionImageURL?.url} alt="" />
                      <i className="fa fa-check"></i>
                    </div>

                    <div className="profile_name">
                      <h4>
                        {collection?.collectionName}
                        <div className="clearfix"></div>
                        <span id="wallet" className="profile_wallet">DdzFFzCqrhshMSxb9oW3mRo4MJrQkusV3fGFSTwaiu4wPBqMryA9DYVJCkW9n7twCffG5f5wX2sSkoDXGiZB1HPa7K7f865Kk4LqnrME</span>
                        {/* <button id="btn_copy" title="Copy Text">Copy</button> */}
                      </h4>
                    </div>
                  </div>

                </div>
              </div>

              <div className="col-md-12">
                <div className="row">
                  {assets && assets.map((asset, index) => {
                    return <AssetCard asset={asset} key={index} />
                  })}
                </div>
              </div>
            </div>
          </div>
        </section>


      </div>
    </>
  );
}
export default CollectionDetails;
