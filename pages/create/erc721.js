import { Button, Form, Input, Modal, Select, Spin } from "antd";
import React, { useEffect, useRef, useState } from "react";
import { capitalizeWord, checkAssetForDuplicate, uploadNft, validateImage } from "Utils/mintApi";
import { fetch, post } from "/Utils/strapiApi";
import { getMetaConnected, getMetaToken } from "store/action/accountSlice";

import CustomNotification from "@/components/commons/customNotification";
import Link from "next/link";
import ReactPlayer from "react-player";
import { socket } from "config/websocket";
import styles from "/styles/erc721.module.css";
import { useRouter } from "next/router";
import { useSelector } from "react-redux";

const initNft = {
  tokenId: null,
  tokenAddress: null,
  name: null,
  collections: null,
  categories: null,
  metadata: {
    external_link: null,
    description: null,
    name: null,
    image_url: null,
    preview_image_url: null,
  },
};

const ERC721 = ({ serverCollections, categories, serverNfts }) => {
  const [collections, setCollections] = useState(serverCollections);
  const [nfts, setNfts] = useState(serverNfts);
  const hiddenFileInput = useRef(null);
  const formRef = React.createRef();
  const [selectedCollection, setSelectedCollection] = useState();
  const [nftImageError, setNftImageError] = useState();
  const [duplicateNameError, setDuplicateNameError] = useState();
  const [selectedCategories, setSelectedCategories] = useState();
  const [nftTalent, setNftTalent] = useState();
  const [nftData, setNftData] = useState(initNft);
  const [uploadFileUrl, setUploadFileUrl] = useState("");
  const [nftImageFile, setNftImageFile] = useState();
  const [isLoading, setLoading] = useState(false);
  const [uploadPrecentage, setUploadPrecentage] = useState(0);
  const [ownerCollections, setOwnerCollections] = useState();
  const isMetaconnected = useSelector(getMetaConnected);
  const metaToken = useSelector(getMetaToken);
  const [nftContract, setNftContract] = useState();
  const [nftTokenId, setNftTokenId] = useState();
  const [displayUploadModal, setDisplayUploadModal] = useState(false);
  const [displayModalButtons, setDisplayModalButtons] = useState();
  const [displayUnlockModal, setDisplayUnlockModal] = useState(false);
  const [displayRegisterModal, setDisplayRegisterModal] = useState();
  const [uploadErrorMessage, setUploadErrorMessage] = useState("");
  const [form] = Form.useForm();
  const router = useRouter();

  const getSelectedCollection = (colId) => {
    const selected = collections.filter((item) => item.id === colId)[0];
    setSelectedCollection(selected);
    return selectedCollection;
  };

  const getSelectedCategories = (catList) => {
    const cats = categories.filter((item) => catList.includes(item.id));
    setSelectedCategories(cats);
    return cats;
  };

  const openFileUpload = (event) => {
    event.preventDefault();
    hiddenFileInput.current.click();
  };

  const handleFileUpload = (event) => {
    event.preventDefault();

    var targetFile = event.target.files[0];

    if (targetFile) {
      setNftImageFile(targetFile);
      setUploadFileUrl(URL.createObjectURL(event.target.files[0]));
      const validationStatus = validateImage(targetFile, 10);

      if (!validationStatus.status) {
        setNftImageError(validationStatus.message);
      } else {
        setNftImageError(null);
      }
    }
  };

  const checkNftNameDuplication = (e) => {
    console.log("nfts are", nfts);
    let input = e.target.value;
    const nftDuplicationResult = checkAssetForDuplicate(nfts, input, "name", "Asset Name");
    setDuplicateNameError(nftDuplicationResult);
  };

  const clearForm = () => {
    setUploadFileUrl(null);
    setNftImageFile(null);
    setUploadPrecentage(0);
    setDuplicateNameError("");
    form.resetFields();
    hiddenFileInput.current.value = null;
  };

  const createNftData = (values) => {
    let nftData = values;
    nftData.collections = selectedCollection;
    nftData.talent = nftTalent;
    nftData.categories = selectedCategories;
    return nftData;
  };

  const onFinish = (values) => {
    let validationResult = validateImage(nftImageFile, 10);
    if (validationResult.status == true && !duplicateNameError.isDuplicate) {
      if (metaToken.length > 0) {
        saveNFT(nftImageFile, values);
      }
    }
  };

  const saveNFT = async (nftImageFile, values) => {
    const { ethereum } = window;
    let accounts = await ethereum.request({ method: "eth_accounts" });
    if (isMetaconnected) {
      if (accounts != undefined) {
        setDisplayUploadModal(true);
        const nftData = createNftData(values);
        let ownerAccount = metaToken[0];
        if (ownerAccount) {
          const result = await uploadNft(nftImageFile, nftData, ownerAccount);
          if (result.success) {
            setUploadErrorMessage("");
            setNftContract(result.data.tokenAddress);
            setNftTokenId(result.data.tokenId);
            setDisplayUploadModal(true);
            setDisplayModalButtons(true);
          } else {
            CustomNotification("warn", "Metamask", result.message);
            setDisplayUploadModal(false);
            setDisplayModalButtons(false);
          }
        }
      } else {
        CustomNotification(
          "warning",
          "Metamask",
          "Make Sure Metamask wallet is unlocked and refresh the page"
        );
      }
    }
  };
  const onFinishFailed = () => {
    setDisplayUploadModal(false);
    const validationStatus = validateImage(nftImageFile, 10);
    if (!validationStatus.status) {
      setNftImageError(validationStatus.message);
    } else {
      setNftImageError(null);
    }
  };

  const checkMetamaskUnlocked = async () => {
    const { ethereum } = window;
    if (ethereum && ethereum.isMetaMask) {
      if (!isMetaconnected) {
        setDisplayUnlockModal(true);
      }
    }
  };

  const getOwnerCollections = async () => {
    console.log("collections are ", collections);
    if (metaToken != null && metaToken[0]) {
      const ownerAccount = await metaToken[0];
      const cols = collections.filter((item) => {
        return item.talentAddress == ownerAccount && item.isEnternal == true;
      });
      setOwnerCollections(cols);
    }
  };

  const isTalentRegistered = async () => {
    if (metaToken != null && metaToken[0]) {
      const account = await metaToken[0];
      const talentResult = await fetch(`/talents/talentexists/${account}`);
      if (talentResult.data) {
        const talentExists = talentResult.data;
        if (talentExists.success) {
          setNftTalent({
            id: talentExists.id,
          });
          setDisplayRegisterModal(false);
        } else {
          setDisplayRegisterModal(true);
        }
      } else {
        setDisplayRegisterModal(true);
      }
    }
  };

  const handleNewNft = () => {
    setDisplayUploadModal(false);
    setDisplayModalButtons(false);
    clearForm();
  };

  const refreshData = () => {
    socket.on("serverBroadCastNewCollection", (data) => {
      let cols = collections;
      cols.push(data);
      setCollections(cols);
      getOwnerCollections();
    });
    socket.on("serverBroadCastNewERC721", (data) => {
      const oldNfts = nfts;
      oldNfts.push(data);
      setNfts(oldNfts);
    });
  };

  useEffect(() => {
    refreshData();
    isTalentRegistered();
    getOwnerCollections();
  }, [isMetaconnected]);

  return (
    <div className="no-bottom" id="content">
      <div id="top"></div>

      {/* <!-- section begin --> */}
      <section id="subheader" className="text-light AssetSubheader">
        <div className="center-y relative text-center">
          <div className="container">
            <div className="row">
              <div className="col-md-12 text-center">
                <h1>Creating Asset</h1>
              </div>
              <div className="clearfix"></div>
            </div>
          </div>
        </div>
      </section>
      {/* <!-- section close --> */}

      {/* <!-- section begin --> */}
      <section aria-label="section">
        <div className="container">
          <div className="row fadeIn">
            <div className="col-lg-7 offset-lg-1">
              <form id="form-create-item" className="form-border" method="post" action="email.php">
                <div className="field-set">
                  <h5>Upload file</h5>

                  <div className="d-create-file">
                    <p id="file_name">PNG, JPG, GIF, WEBP or MP4. Max 200mb.</p>
                    <input type="button" id="get_file" className="btn-main" value="Browse" />
                    <input type="file" id="upload_file" />
                  </div>

                  <div className="spacer-single"></div>

                  <h5>Select method</h5>
                  <div className="de_tab tab_methods">
                    <ul className="de_nav">
                      <li className="active">
                        <span>
                          <i className="fa fa-tag"></i>Fixed price
                        </span>
                      </li>
                      <li>
                        <span>
                          <i className="fa fa-hourglass-1"></i>Timed auction
                        </span>
                      </li>
                      <li>
                        <span>
                          <i className="fa fa-users"></i>Open for bids
                        </span>
                      </li>
                    </ul>

                    <div className="de_tab_content">
                      <div id="tab_opt_1">
                        <h5>Price</h5>
                        <input
                          type="text"
                          name="item_price"
                          id="item_price"
                          className="form-control"
                          placeholder="enter price for one item (ETH)"
                        />
                      </div>

                      <div id="tab_opt_2">
                        <h5>Minimum bid</h5>
                        <input
                          type="text"
                          name="item_price_bid"
                          id="item_price_bid"
                          className="form-control"
                          placeholder="enter minimum bid"
                        />

                        <div className="spacer-10"></div>

                        <div className="row">
                          <div className="col-md-6">
                            <h5>Starting date</h5>
                            <input
                              type="date"
                              name="bid_starting_date"
                              id="bid_starting_date"
                              className="form-control"
                              min="1997-01-01"
                            />
                          </div>
                          <div className="col-md-6">
                            <h5>Expiration date</h5>
                            <input
                              type="date"
                              name="bid_expiration_date"
                              id="bid_expiration_date"
                              className="form-control"
                            />
                          </div>
                          <div className="spacer-single"></div>
                        </div>
                      </div>

                      <div id="tab_opt_3"></div>
                    </div>
                  </div>

                  <h5>Title</h5>
                  <input
                    type="text"
                    name="item_title"
                    id="item_title"
                    className="form-control"
                    placeholder="e.g. 'Crypto Funk"
                  />

                  <div className="spacer-10"></div>

                  <h5>Description</h5>
                  <textarea
                    data-autoresize
                    name="item_desc"
                    id="item_desc"
                    className="form-control"
                    placeholder="e.g. 'This is very limited item'"
                  ></textarea>

                  <div className="spacer-10"></div>

                  <h5>Royalties</h5>
                  <input
                    type="text"
                    name="item_royalties"
                    id="item_royalties"
                    className="form-control"
                    placeholder="suggested: 0, 10%, 20%, 30%. Maximum is 70%"
                  />

                  <div className="spacer-single"></div>

                  <input type="button" id="submit" className="btn-main" value="Create Item" />
                  <div className="spacer-single"></div>
                </div>
              </form>
            </div>

            <div className="col-lg-3 col-sm-6 col-xs-12">
              <h5>Preview item</h5>
              <div className="nft__item">
                <div
                  className="de_countdown"
                  data-year="2021"
                  data-month="10"
                  data-day="16"
                  data-hour="8"
                ></div>
                <div className="author_list_pp">
                  <a href="#">
                    <img className="lazy" src="images/author/author-1.jpg" alt="" />
                    <i className="fa fa-check"></i>
                  </a>
                </div>
                <div className="nft__item_wrap">
                  <a href="#">
                    <img
                      src="images/collections/coll-item-3.jpg"
                      id="get_file_2"
                      className="lazy nft__item_preview"
                      alt=""
                    />
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
                    <i className="fa fa-heart"></i>
                    <span>50</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
export default ERC721;

export const getServerSideProps = async () => {
  const collectionsResult = await fetch("/collections/collectionslist");
  const cactegoriesResult = await fetch("/categories/categoriesList");
  const nftResult = await fetch("/nfts/nftsList");
  const nfts = nftResult.data;
  const collections = collectionsResult.data;

  const categories = cactegoriesResult.data;

  return {
    props: {
      serverCollections: JSON.parse(JSON.stringify(collections)),
      categories: JSON.parse(JSON.stringify(categories)),
      serverNfts: JSON.parse(JSON.stringify(nfts)),
    },
  };
};
