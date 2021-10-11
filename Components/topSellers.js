import React from "react";
import Link from "next/link";
function TopSellers({ talents }) {
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
                        <img className="lazy" src={talent?.talentAvatar?.url} alt="" />
                        <i className="fa fa-check"></i>
                      </a>
                    </Link>
                  </div>
                  <div className="author_list_info">
                    <Link href={`/talent/${talent.walletAddress}`}>
                      <a>{talent?.talentName}</a>
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
