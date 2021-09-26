import react from "react"

function AddAsset() {
    return <div className="no-bottom" id="content">
        {/* <div id="top"></div> */}
        <section id="subheader" className="text-light AssetSubheader" data-bgimage="url(images/background/subheader.jpg) top">
            <div className="center-y relative text-center">
                <div className="container">
                    <div className="row">
                        <div className="col-md-12 text-center">
                            <h1>Add Existing Asset</h1>
                        </div>
                        <div className="clearfix"></div>
                    </div>
                </div>
            </div>
        </section>
        <section aria-label="section">
            <div className="container">
                <div className="row">
                    <div className="col-lg-7 offset-lg-1">
                        <form id="form-create-item" className="form-border" method="post" action="email.php">
                            <div className="field-set">

                                <h5>Token ID</h5>

                                <input type="text" name="item_title" id="item_title" className="form-control" placeholder="e.g. 'Crypto Funk" />

                                <div className="spacer-10"></div>

                                <h5>Token Address</h5>
                                <input type="text" name="item_royalties" id="item_royalties" className="form-control" placeholder="suggested: 0, 10%, 20%, 30%. Maximum is 70%" />

                                <div className="spacer-single"></div>

                                <input type="button" id="submit" className="btn-main" value="Create Item" />
                                <div className="spacer-single"></div>
                            </div>
                        </form>
                    </div>

                    <div className="col-lg-3 col-sm-6 col-xs-12">
                        <h5>Preview item</h5>
                        <div className="nft__item">
                            <div className="de_countdown" data-year="2021" data-month="10" data-day="16" data-hour="8"></div>
                            <div className="author_list_pp">
                                <a href="#">
                                    <img className="lazy" src="images/author/author-1.jpg" alt="" />
                                    <i className="fa fa-check"></i>
                                </a>
                            </div>
                            <div className="nft__item_wrap">
                                <a href="#">
                                    <img src="images/collections/coll-item-3.jpg" id="get_file_2" className="lazy nft__item_preview" alt="" />
                                </a>
                            </div>
                            <div className="nft__item_info">
                                <a href="#">
                                    <h4>Pinky Ocean</h4>
                                </a>
                                <div className="nft__item_price">
                                    0.08 ETH<span>1/20</span>
                                </div>
                                <div className="nft__item_action">
                                    <a href="#">Place a bid</a>
                                </div>
                                <div className="nft__item_like">
                                    <i className="fa fa-heart"></i><span>50</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    </div>
}
export default AddAsset;