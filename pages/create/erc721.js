import { Button, Form, Modal, Select, Spin, DatePicker } from "antd";
import React, { useEffect, useRef, useState } from "react";
import { capitalizeWord, checkAssetForDuplicate, uploadNft, validateImage } from "Utils/mintApi";
import { fetch } from "/Utils/strapiApi";
import { getMetaConnected, getMetaToken } from "store/action/accountSlice";
import styles from "/styles/erc721.module.css";
import CustomNotification from "@/components/commons/customNotification";
import Link from "next/link";
import ReactPlayer from "react-player";
import { socket } from "config/websocket";
import { useSelector } from "react-redux";
import { sellOrder, signTransaction } from "Utils/utils";
import { getAsset, updateAsset } from "services/asset.service";
import { fetchOne } from "Utils/strapiApi";
import withSession from "../../lib/session"
const { Option } = Select;

const ERC721 = ({ serverCollections, categories, serverNfts }) => {
  const [collections, setCollections] = useState(serverCollections);
  const [nfts, setNfts] = useState(serverNfts);
  const [ownerCollections, setOwnerCollections] = useState();
  const [selectedCategories, setSelectedCategories] = useState();
  const [selectedCollection, setSelectedCollection] = useState();
  const [nftImageError, setNftImageError] = useState();
  const [nftTalent, setNftTalent] = useState();
  const [uploadFileUrl, setUploadFileUrl] = useState("");
  const [sellOrderErrorMessage, setSellOrderErrorMessage] = useState("");
  const [duplicateNameError, setDuplicateNameError] = useState();
  const [nftContract, setNftContract] = useState();
  const [nftTokenId, setNftTokenId] = useState();
  const [selectedTab, setSelectedTab] = useState(0);
  const [uploadPrecentage, setUploadPrecentage] = useState(0);

  const [nftImageFile, setNftImageFile] = useState();

  const [displayUploadModal, setDisplayUploadModal] = useState(false);
  const [displayModalButtons, setDisplayModalButtons] = useState(false);
  const [displaySellOrderLabel, setDisplaySellOrderLabel] = useState(true);

  const isMetaconnected = useSelector(getMetaConnected);
  const metaToken = useSelector(getMetaToken);

  const hiddenFileInput = useRef(null);
  const [form] = Form.useForm();

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
    console.log("nft data is ", nftData);
    return nftData;
  };

  const onFinish = (values) => {
    console.log("values are ", values);
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
          if (result?.success) {
            CustomNotification("success", "Creating Asset", "Your Asset is created", "topLeft");

            setNftContract(result.data.tokenAddress);
            setNftTokenId(result.data.tokenId);
            let isFixed = selectedTab == 0 ? true : false;
            let contractAddress = selectedCollection.contractAddress;
            let sellOrderResult = await createSellOrder(
              result.data.tokenAddress,
              result.data.tokenId,
              ownerAccount,
              values,
              contractAddress,
              isFixed
            );
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
  const onFinishFailed = (info) => {
    console.log("required errors are ", info);
    setDisplayUploadModal(false);
    const validationStatus = validateImage(nftImageFile, 10);
    if (!validationStatus.status) {
      setNftImageError(validationStatus.message);
    } else {
      setNftImageError(null);
    }
  };

  const getOwnerCollections = async () => {
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
          setNftTalent(talentExists);
        }
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

  const handlefixedPrice = () => {
    setSelectedTab(0);
  };
  const handleAuctionPrice = () => {
    setSelectedTab(1);
  };

  const createSellOrder = async (
    tokenAddress,
    tokenId,
    ownerAddress,
    formValues,
    contractAddress,
    isFixed
  ) => {
    const sellSign = await signTransaction(ownerAddress, "Request to Sell", {
      name: formValues.name,
    });
    if (sellSign.success) {
      const sell = await sellOrder(
        tokenAddress,
        tokenId,
        ownerAddress,
        contractAddress,
        formValues,
        isFixed
      );
      setDisplayUploadModal(true);
      setDisplayModalButtons(true);
      if (sell?.hash) {
        handleUpdateAsset(tokenAddress, tokenId);
        CustomNotification("success", "Sell Order", "Sell order is placed", "topLeft");
        setDisplaySellOrderLabel(false);
      } else {
        setDisplaySellOrderLabel(true);
        setSellOrderErrorMessage("Sell order is not saved !!!");
        CustomNotification("warning", "Sell Order", "Sell order is not saved", "topLeft");
      }
    } else {
      setDisplayUploadModal(true);
      setDisplayModalButtons(true);
      setSellOrderErrorMessage(sellSign.message);
    }
  };

  const handleUpdateAsset = async (tokenAddress, tokenId) => {
    console.log("updating asset in strapi ....");
    const assetResult = await getAsset(tokenAddress, tokenId);
    let asset = assetResult.data[0];
    let openseaAsset = await fetchOne(asset.tokenAddress, asset.tokenId);
    if (openseaAsset.data) {
      asset.asset = openseaAsset.data;
      asset.onSale = true;
    }
    console.log("opensea asset", openseaAsset);
    console.log("updated  asset", asset);
    let updateResult = await updateAsset(asset.id, asset);
    console.log("updaing finished", updateResult);
  };
  useEffect(() => {
    refreshData();
    isTalentRegistered();
    getOwnerCollections();
  }, [isMetaconnected]);

  return (
    <div className="no-bottom" id="content">
      <Modal
        title="Uploading NFT..."
        centered
        visible={displayUploadModal}
        header={null}
        footer={null}
        closable={false}
        width={500}
        height={500}
        maskStyle={{
          backgroundColor: "#EEEEEE",
          opacity: 0.1,
        }}
        bodyStyle={{
          height: 350,
          display: "flex",
          justifyContent: "center",
          alignContent: "center",
        }}
      >
        <div className={styles.modalContent}>
          {!displayModalButtons ? (
            <div className={styles.waitingSpiner}>
              <div className={styles.deplyingMessage}>
                {"Please Be Patient It may take serveral minutes"}
              </div>
              <Spin size="large" />
            </div>
          ) : (
              <div className={styles.modalControls}>
                <Button type="primary" className={styles.modalButton} onClick={handleNewNft}>
                  Create New NFT
              </Button>
                <Link
                  className={styles.modalButton}
                  href={`/nft/${nftContract}?tokenId=${nftTokenId}`}
                >
                  <a>{"View Minted NFT"}</a>
                </Link>
              </div>
            )}
          {displaySellOrderLabel && (
            <div className={styles.nftSellOrderError}>{<span>{sellOrderErrorMessage}</span>}</div>
          )}
        </div>
      </Modal>
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
              <Form
                form={form}
                onFinish={onFinish}
                onFinishFailed={onFinishFailed}
                id="createAssetForm"
                className="form-border"
                method="post"
              >
                <div className="field-set">
                  <h5>Upload file</h5>
                  <div className="d-create-file">
                    <p id="file_name">PNG, JPG, GIF, WEBP or MP4. Max 10mb.</p>
                    <input
                      type="button"
                      id="get_file"
                      className="btn-main"
                      value="Browse"
                      onClick={openFileUpload}
                    />
                    <input
                      type="file"
                      id="upload_file"
                      ref={hiddenFileInput}
                      onChange={handleFileUpload}
                    />
                  </div>
                  <div className="spacer-single"></div>
                  <div className={styles.nftFormErrors}>{nftImageError}</div>
                  <div className="spacer-double"></div>

                  <h5>Select method</h5>
                  <div className="de_tab tab_methods">
                    <ul className="de_nav">
                      <li className={selectedTab == 0 ? "active" : ""} onClick={handlefixedPrice}>
                        <span>
                          <i className="fa fa-tag"></i>Fixed price
                        </span>
                      </li>
                      <li className={selectedTab == 1 ? "active" : ""} onClick={handleAuctionPrice}>
                        <span>
                          <i className="fa fa-hourglass-1"></i>Timed auction
                        </span>
                      </li>
                    </ul>

                    <div className="de_tab_content">
                      {(selectedTab == 0 || selectedTab == 1) && (
                        <div id="tab_opt_1">
                          <h5>{selectedTab == 0 ? "Price" : "Starting Price"}</h5>
                          <Form.Item
                            name={["price", selectedTab == 0 ? "amount" : "minAmount"]}
                            // noStyle
                            rules={[
                              (selectedTab == 0 || selectedTab == 1) && {
                                required: true,
                                message: "Starting Price is required and should be number",
                                pattern: new RegExp(/^[+-]?\d+(\.\d+)?$/),
                              },
                            ]}
                          >
                            <input
                              type="text"
                              id="itemPrice"
                              className="form-control"
                              placeholder="enter price for one item (ETH)"
                            />
                          </Form.Item>
                          <div className="spacer-single"></div>
                        </div>
                      )}

                      {selectedTab == 1 && (
                        <div id="tab_opt_2">
                          <h5>Ending price</h5>
                          <Form.Item
                            name={["price", "endPrice"]}
                            // noStyle
                            rules={[
                              selectedTab == 1 && {
                                required: true,
                                message: "Ending Price is required and should be number",
                                pattern: new RegExp(/^[+-]?\d+(\.\d+)?$/),
                              },
                            ]}
                          >
                            <input
                              type="text"
                              id="endPrice"
                              className="form-control"
                              placeholder="enter price for one item (ETH)"
                            />
                          </Form.Item>
                          <div className="spacer-single"></div>
                          <h5>Expiration date</h5>
                          <Form.Item
                            name={["date", "auctionExpirationTime"]}
                            rules={[
                              selectedTab == 1 && {
                                required: true,
                                message: "date required",
                                // pattern: new RegExp(/^[+-]?\d+(\.\d+)?$/),
                              },
                            ]}
                          // noStyle
                          >
                            <DatePicker
                              key={"auctionExpirationTime"}
                              style={{
                                position: "relative",
                                // right: "45px",
                              }}
                              showTime
                              allowClear={false}
                              format="YYYY-MM-DD HH:mm:ss"
                              // {...config}
                              size={"large"}
                            />
                          </Form.Item>
                          <div className="spacer-single"></div>
                        </div>
                      )}

                      <div id="tab_opt_3"></div>
                    </div>
                  </div>

                  <h5>Title</h5>
                  <Form.Item
                    name="name"
                    rules={[{ required: true, message: "Please input your Asset Title" }]}
                    onInput={checkNftNameDuplication}
                  >
                    <input
                      type="text"
                      id="name"
                      className="form-control"
                      placeholder="e.g. 'Crypto Funk"
                    />
                  </Form.Item>
                  <div
                    className={
                      duplicateNameError?.message?.includes("×")
                        ? styles.nftFormErrors
                        : styles.nftFormValid
                    }
                  >
                    {duplicateNameError?.message}
                  </div>
                  <div className="spacer-single"></div>

                  <h5>Description</h5>
                  <Form.Item
                    name="description"
                    rules={[{ required: true, message: "NFT Description is required" }]}
                  >
                    <textarea
                      data-autoresize
                      id="description"
                      className="form-control"
                      placeholder="e.g. 'This is very limited item'"
                    ></textarea>
                  </Form.Item>
                  <div className="spacer-single"></div>
                  <h5>Collection</h5>
                  {ownerCollections && (
                    <Form.Item
                      name={"collections"}
                      rules={[
                        {
                          required: true,
                          message: "Please select collection",
                        },
                      ]}
                    >
                      <Select
                        style={{ width: "100%" }}
                        placeholder="Select collection"
                        onChange={(value) => getSelectedCollection(value)}
                        filterOption={(input, option) =>
                          option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                        }
                      >
                        {ownerCollections &&
                          ownerCollections.map((item) => {
                            return (
                              <Option key={item.id} value={item.id}>
                                {item.collectionName}
                              </Option>
                            );
                          })}
                      </Select>
                    </Form.Item>
                  )}
                  <div className="spacer-single"></div>
                  <h5>Categories</h5>
                  {categories && (
                    <Form.Item
                      name={"categories"}
                      rules={[
                        {
                          required: true,
                          message: "Please select categories",
                        },
                      ]}
                    >
                      <Select
                        mode="multiple"
                        style={{ width: "100%" }}
                        placeholder="Select categories"
                        onChange={(value) => getSelectedCategories(value)}
                        filterOption={(input, option) =>
                          option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                        }
                      >
                        {categories &&
                          categories.map((item) => {
                            return (
                              <Option key={item.id} value={item.id}>
                                {capitalizeWord(item.category)}
                              </Option>
                            );
                          })}
                      </Select>
                    </Form.Item>
                  )}
                  <div className="spacer-single"></div>
                  <input type="submit" id="submit" className="btn-main" value="Create Item" />
                  <div className="spacer-single"></div>
                </div>
              </Form>
            </div>

            <div className="col-lg-3 col-sm-6 col-xs-12">
              <h5>Preview item</h5>
              {/* <AssetCard asset={form.values} /> */}
              <div className="nft__item">
                <div className="author_list_pp">
                  <a>
                    <img
                      className="lazy"
                      src={nftTalent?.talentAvatar?.formats?.thumbnail?.url}
                      alt=""
                    />
                    <i className="fa fa-check"></i>
                  </a>
                </div>
                <div className="nft__item_wrap">
                  {
                    <a href="#">
                      {uploadFileUrl && nftImageFile?.type.toString().includes("image") ? (
                        <img
                          src={uploadFileUrl}
                          id="get_file_2"
                          className="lazy nft__item_preview"
                          alt=""
                        />
                      ) : (
                          <div className={styles.nftVideoBox}>
                            <ReactPlayer
                              width={"100%"}
                              height={"100%"}
                              url={uploadFileUrl}
                              controls
                              playing={false}
                            />
                          </div>
                        )}
                    </a>
                  }
                </div>
                <div className="nft__item_info">
                  <a href="#">
                    <h4>{form.getFieldValue("name")}</h4>
                  </a>
                  <div className="nft__item_price">
                    {selectedTab == 0
                      ? form.getFieldValue(["price", "amount"])
                      : form.getFieldValue(["price", "minAmount"])}
                    ETH
                  </div>
                  <div className="nft__item_action">
                    <a href="#">Place a bid</a>
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

export const getServerSideProps = withSession(async ({ req, res }) => {
  const user = req.session.get("user");

  if (user === undefined) {
    res.setHeader("location", "/");
    res.statusCode = 302;
    res.end();
    return { props: {} };
  }
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
  }
})