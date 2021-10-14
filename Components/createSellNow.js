import React, { useEffect, useState } from "react";
import Link from "next/link";
import gradients from "/styles/gradients.module.css";

function CreateSellNow({ talents }) {
  const [backgroundAvatar, setBackgroundAvatar] = useState("");
  const getRandomAvatar = () => {
    let index = Math.floor(Math.random() * 10);
    setBackgroundAvatar(`gradientBackground_${index}`);
  };
  useEffect(() => {
    getRandomAvatar();
  }, []);

  return (
    <div className="row">
      <div className="col-lg-12">
        <h2 className="style-2">Create and Sell Now</h2>
      </div>

      <div className="col-lg-4 col-md-6 mb-sm-30">
        <div className="feature-box f-boxed style-3">
          <i className=" fadeInUp bg-color-2 i-boxed icon_wallet"></i>
          <div className="text">
            <h4 className=" fadeInUp">Set up your wallet</h4>
            <p className=" fadeInUp" data--delay=".25s">
              Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque
              laudantium, totam rem.
            </p>
          </div>
          <i className="wm icon_wallet"></i>
        </div>
      </div>
      <div className="col-lg-4 col-md-6 mb-sm-30">
        <div className="feature-box f-boxed style-3">
          <i className=" fadeInUp bg-color-2 i-boxed icon_cloud-upload_alt"></i>
          <div className="text">
            <h4 className=" fadeInUp">{`Add your NFT's`}</h4>
            <p className=" fadeInUp" data--delay=".25s">
              Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque
              laudantium, totam rem.
            </p>
          </div>
          <i className="wm icon_cloud-upload_alt"></i>
        </div>
      </div>
      <div className="col-lg-4 col-md-6 mb-sm-30">
        <div className="feature-box f-boxed style-3">
          <i className=" fadeInUp bg-color-2 i-boxed icon_tags_alt"></i>
          <div className="text">
            <h4 className=" fadeInUp">{`Sell your NFT's`}</h4>
            <p className=" fadeInUp" data--delay=".25s">
              Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque
              laudantium, totam rem.
            </p>
          </div>
          <i className="wm icon_tags_alt"></i>
        </div>
      </div>
    </div>
  );
}

export default CreateSellNow;
