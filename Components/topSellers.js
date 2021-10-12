import React, { useEffect, useState } from "react";
import Link from "next/link";
import gradients from "/styles/gradients.module.css";

function TopSellers({ talents }) {
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
        <h2 className="style-2">Talents</h2>
      </div>
      <div className="col-md-12  fadeIn">
        <ol className="author_list">
          {talents?.length > 0 &&
            talents.map((talent) => {
              return (
                <li key={talent.id}>
                  <div className="author_list_pp">
                    <Link href={`/talent/${talent.walletAddress}`}>
                      <a>
                        {talent?.talentAvatar?.url ? (
                          <img
                            className={`lazy  ${gradients.topSellerAvatarBox} talentListAvatar`}
                            src={talent?.talentAvatar?.url}
                            alt=""
                          />
                        ) : (
                            <div
                              className={`lazy ${gradients[backgroundAvatar]} ${gradients.topSellerAvatarBox}`}
                            ></div>
                          )}
                        <i className="fa fa-check"></i>
                      </a>
                    </Link>
                  </div>
                  <div className="author_list_info">
                    <Link href={`/talent/${talent.walletAddress}`}>
                      <a>{talent?.talentName ? talent?.talentName : "Anonymous"}</a>
                    </Link>
                    {/* <span>3.2 ETH</span> */}
                  </div>
                </li>
              );
            })}
        </ol>
      </div>
    </div>
  );
}

export default TopSellers;
