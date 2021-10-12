import React, { useState } from "react";
import AssetCard from "../../Components/assetCard";
import request from "../../Utils/axios";

function CollectionDetails({ collection, assets }) {
  return (
    <>
      <div className="no-bottom no-top" id="content">
        <div id="top"></div>
        <section id="profile_banner" aria-label="section" className="text-light" style={{ paddingBottom: "0px", width: "100%" }}>
          <img src={collection?.collectionBanner?.url} style={{ width: "100%", height: "250px" }} />
        </section>
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
                        {/* <span id="wallet" className="profile_wallet">DdzFFzCqrhshMSxb9oW3mRo4MJrQkusV3fGFSTwaiu4wPBqMryA9DYVJCkW9n7twCffG5f5wX2sSkoDXGiZB1HPa7K7f865Kk4LqnrME</span> */}
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
export const getServerSideProps = async ({ query }) => {
  const { data } = await request(`collections/${query.slug}`, {
    method: "GET"
  });
  return {
    props: {
      collection: data,
      assets: data.nfts
    }
  }
}
export default CollectionDetails;
