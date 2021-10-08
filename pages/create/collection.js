import { Button, Form, Input, Modal, Spin, Select } from "antd";
import React, { useEffect, useRef, useState } from "react";
import {
  checkFileType,
  deployCollection,
  validateCollectionIdetifier,
  validateCollectionName,
  validateCompleteCollectionName,
} from "Utils/mintApi";
import { getMetaConnected, getMetaToken, getWalletConnected } from "store/action/accountSlice";

import CustomNotification from "@/components/commons/customNotification";
import Link from "next/link";
import Web3 from "web3";
import { allowedImageTypes } from "Constants/constants";
import { fetch } from "/Utils/strapiApi";
import { signTransaction } from "Utils/utils";
import { socket } from "config/websocket";
import styles from "/styles/collection.module.css";
import { useSelector } from "react-redux";
const { Option } = Select;
let collectionCompleteName = {
  collectionName: "",
  collectionIdentifier: "",
};
const ERC721Collection = ({ serverCollections, categories, talentData }) => {
  const [form] = Form.useForm();
  const logoImageInputRef = useRef(null);
  const bannerImageInputRef = useRef(null);
  const talentImageInputRef = useRef(null);
  const formRef = React.createRef();
  const [logoError, setLogoError] = useState();
  const [bannerError, setBannerError] = useState();
  const [collectionNameError, setCollectionNameError] = useState("");
  const [collectionIdentifierError, setCollectionIdentifierError] = useState("");
  const [duplicateIdentifierError, setDuplicateIdentifierError] = useState();
  const [logoImageUrl, setLogoImageUrl] = useState("");
  const [bannerImageUrl, setBannerImageUrl] = useState("");
  const [logoImageFile, setLogoImageFile] = useState();
  const [bannerImageFile, setBannerImageFile] = useState();
  const [isLoading, setLoading] = useState(false);
  const [uploadPrecentage, setUploadPrecentage] = useState(0);
  const [displayUploadModal, setDisplayUploadModal] = useState(false);
  const [displayModalButtons, setDisplayModalButtons] = useState();
  const [newCollectionSlug, setNewCollectionSlug] = useState();
  const [collectionTalent, setCollectionTalent] = useState();
  const [displayUnlockModal, setDisplayUnlockModal] = useState(false);
  const [mobileModal, setMobileModal] = useState(null);
  const [displayRegisterModal, setDisplayRegisterModal] = useState();
  const isMetaconnected = useSelector(getMetaConnected);
  const isWalletConnected = useSelector(getWalletConnected);
  const metaToken = useSelector(getMetaToken);
  const [onboard, setOnboard] = useState(null);
  const [collections, setCollections] = useState(serverCollections);
  const [completeCollectionNameError, setCompleteCollectionNameError] = useState("");

  const handleCollectionCompleteName = (e) => {
    const value = e.target.value;

    collectionCompleteName = {
      ...collectionCompleteName,
      [e.target.name]: value,
    };

    const nameResult = validateCollectionName(
      collectionCompleteName.collectionName,
      "Collection Name"
    );
    if (collectionCompleteName.collectionName != "") {
      setCollectionNameError(nameResult);
    } else {
      setCollectionNameError("");
    }

    const identifierResult = validateCollectionIdetifier(
      collectionCompleteName.collectionIdentifier,
      "Identifier"
    );

    if (collectionCompleteName.collectionIdentifier != "") {
      setCollectionIdentifierError(identifierResult);
    } else {
      setCollectionIdentifierError("");
    }

    const result = validateCompleteCollectionName(
      collections,
      collectionCompleteName.collectionName,
      collectionCompleteName.collectionIdentifier
    );

    if (
      collectionCompleteName.collectionName != "" &&
      collectionCompleteName.collectionIdentifier != ""
    ) {
      setCompleteCollectionNameError(result);
    } else {
      setCompleteCollectionNameError("");
    }
  };
  const openLogoFileChooser = (event) => {
    console.log("opening logo file chooser");
    event.preventDefault();
    logoImageInputRef.current.click();
  };
  const openBannerFileChooser = (event) => {
    console.log("opening banner file chooser");
    event.preventDefault();
    bannerImageInputRef.current.click();
  };

  const handleFileUpload = (event) => {
    event.preventDefault();
    const targetInput = event.target.name;
    var imageFile = event.target.files[0];
    if (imageFile) {
      const typeResult = checkFileType(imageFile);
      if (targetInput == "logoImageFile") {
        const logoType = checkFileType(imageFile);
        if (logoType.mediaType != "image") {
          setLogoError("Only Images are allowed as Collection Image");
        } else {
          setLogoError(null);
        }
        setLogoImageFile(imageFile);
        setLogoImageUrl(URL.createObjectURL(imageFile));
      } else if (targetInput == "bannerImageFile") {
        const bannerType = checkFileType(imageFile);
        if (bannerType.mediaType != "image") {
          setBannerError("Only Images Are allowed as Collection Banner");
        } else {
          setBannerError(null);
        }
        setBannerImageFile(imageFile);
        setBannerImageUrl(URL.createObjectURL(imageFile));
      }
    }
  };

  const clearForm = () => {
    setLogoImageUrl(null);
    setBannerImageUrl(null);
    setLogoImageFile(null);
    setBannerImageFile(null);
    setUploadPrecentage(0);
    setCollectionIdentifierError("");
    setCollectionNameError("");
    setCompleteCollectionNameError("");
    form.resetFields();
    logoImageInputRef.current.value = null;
    bannerImageInputRef.current.value = null;
  };

  const onFinish = (values) => {
    console.log("values are ", values);
    const collectionData = createCollectinData(values);
    if (!logoImageFile) {
      setLogoError("Avatar Image is Required");
    }
    if (!bannerImageFile) {
      setBannerError("Banner Image is Required");
    }
    if (
      logoImageFile &&
      bannerImageFile &&
      !completeCollectionNameError.isDuplicate &&
      !collectionNameError.isDuplicate &&
      !collectionIdentifierError.isDuplicate &&
      logoError == null &&
      bannerError == null
    ) {
      if (metaToken.length > 0) {
        saveCollection(logoImageFile, bannerImageFile, collectionData);
      }
    }
  };

  const onFinishFailed = (errorInfo) => {
    if (!logoImageFile) {
      setLogoError("Avatar Image is Required");
    }
    if (!bannerImageFile) {
      setBannerError("Banner Image is Required");
    }
  };

  const saveCollection = async (logoImageFile, bannerImageFile, collectionData) => {
    const { ethereum } = window;
    if (isMetaconnected) {
      let accounts = await ethereum.request({ method: "eth_accounts" });
      if (accounts != undefined) {
        setDisplayUploadModal(true);
        let ownerAccount = metaToken[0];
        const result = await deployCollection(
          logoImageFile,
          bannerImageFile,
          collectionData,
          ownerAccount
        );
        if (result.success) {
          const slug = result.data.slug;
          setNewCollectionSlug(slug);
          setDisplayModalButtons(true);
        } else {
          CustomNotification("warn", "Metamask", result.message);
          setDisplayUploadModal(false);
          setDisplayModalButtons(false);
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

  const handleNewCollection = () => {
    setDisplayUploadModal(false);
    setDisplayModalButtons(false);
    clearForm();
  };

  const isTalentRegistered = async () => {
    if (metaToken != null && metaToken[0]) {
      const account = await metaToken[0];
      const talentResult = await fetch(`talents/talentexists/${account}`);
      if (talentResult.data) {
        const talentExists = talentResult.data;
        if (talentExists.success) {
          setCollectionTalent({
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

  const createCollectinData = (values) => {
    let collectionData = values;
    collectionData.talent = collectionTalent;
    return collectionData;
  };

  const refreshData = () => {
    socket.on("serverBroadCastNewCollection", (data) => {
      let cols = collections;
      cols.push(data);
      setCollections(cols);
    });
  };

  useEffect(() => {
    refreshData();
    isTalentRegistered();
  }, []);

  return (
    <div className="no-bottom" id="content">
      <Modal
        title="Uploading Collection..."
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
              <Button type="primary" className={styles.modalButton} onClick={handleNewCollection}>
                New Collection
              </Button>
              <Link
                className={styles.modalButton}
                href={{
                  pathname: `/collection/${newCollectionSlug}`,
                }}
              >
                <a>{"View Collection"}</a>
              </Link>
            </div>
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
                <h1>Creating Collection</h1>
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
                id="form-create-item"
                className="form-border"
                method="post"
              >
                <div className="field-set">
                  <h5>Upload Banner</h5>

                  <div className="d-create-file">
                    <p id="file_name">PNG, JPG, GIF, WEBP or MP4. Max 2mb.</p>
                    {bannerImageUrl == "" ? (
                      <input
                        type="button"
                        id="get_file"
                        className="btn-main"
                        value="Browse"
                        onClick={openBannerFileChooser}
                      />
                    ) : (
                      <img
                        onClick={openBannerFileChooser}
                        src={bannerImageUrl}
                        id="get_file_2"
                        className={`lazy nft__item_preview ${styles.uploadBannerImage}`}
                        alt=""
                        // width="500px"
                        // height="200px"
                      />
                    )}
                    <input
                      type="file"
                      id="upload_file"
                      name="logoImageFile"
                      onChange={handleFileUpload}
                      ref={logoImageInputRef}
                    />
                    <input
                      type="file"
                      id="upload_file"
                      name="bannerImageFile"
                      onChange={handleFileUpload}
                      ref={bannerImageInputRef}
                    />
                  </div>
                  <div className="spacer-single"></div>
                  <div className={styles.nftFormErrors}>{bannerError}</div>
                  <div className="spacer-single"></div>
                  <h5>Upload Collection Avatar</h5>
                  <div className="d-create-file py-3">
                    <p id="file_name">PNG, JPG, GIF, WEBP or MP4. Max 2mb.</p>
                    {logoImageUrl == "" ? (
                      <input
                        type="button"
                        id="avatarImagePreview"
                        className="btn-main"
                        value="Browse"
                        onClick={openLogoFileChooser}
                      />
                    ) : (
                      <img
                        onClick={openLogoFileChooser}
                        src={logoImageUrl}
                        id="avatarImage"
                        className={`lazy nft__item_preview ${styles.uploadAvatarImage} rounded-circle`}
                        alt=""
                      />
                    )}
                    <input
                      type="file"
                      id="upload_file"
                      name="logoImageFile"
                      onChange={handleFileUpload}
                      ref={logoImageInputRef}
                    />
                  </div>
                  <div className="spacer-single"></div>
                  <div className={styles.nftFormErrors}>{logoError}</div>
                  <div className="spacer-double"></div>
                  <h5>Collection Name</h5>
                  <Form.Item
                    name={"collectionName"}
                    rules={[
                      {
                        required: true,
                        message: "Collection Name field is required",
                      },
                    ]}
                  >
                    <input
                      type="text"
                      name="collectionName"
                      id="collectionName"
                      className="form-control"
                      placeholder="e.g. 'Ninja Warriors"
                    />
                  </Form.Item>
                  <div className="spacer-single"></div>
                  <h5>Collection Identifier</h5>
                  <Form.Item
                    name={"collectionIdentifier"}
                    rules={[
                      {
                        required: true,
                        message: "Collection identifier field is required",
                      },
                    ]}
                  >
                    <input
                      type="text"
                      name="collectionIdentifier"
                      id="collectionIdentifier"
                      className="form-control"
                      placeholder="e.g. 'Crypto Funk"
                    />
                  </Form.Item>
                  <div className="spacer-single"></div>

                  <h5>Description</h5>
                  <Form.Item
                    name={"collectionDescription"}
                    rules={[
                      {
                        required: true,
                        message: "Collection Description field is required",
                      },
                    ]}
                  >
                    <textarea
                      data-autoresize
                      name="collectionDescription"
                      id="collectionDescription"
                      className="form-control"
                      placeholder="e.g. 'This is very limited item'"
                    ></textarea>
                  </Form.Item>
                  <div className="spacer-single"></div>

                  <h5>Categories</h5>
                  <Form.Item
                    name={"collectionCategories"}
                    rules={[
                      {
                        required: true,
                        message: "Please select at least one category",
                      },
                    ]}
                  >
                    <Select mode="multiple" style={{ width: "100%" }} placeholder="---">
                      {categories &&
                        categories.map((cat) => {
                          return (
                            <Option key={cat.id} value={cat.id}>
                              {cat.categoryName}
                            </Option>
                          );
                        })}
                    </Select>
                  </Form.Item>

                  <div className="spacer-single"></div>

                  <input type="submit" id="submit" className="btn-main" value="Create Item" />
                  <div className="spacer-single"></div>
                </div>
              </Form>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
export default ERC721Collection;

export const getServerSideProps = async (context) => {
  const collectionsResult = await fetch("/collections/collectionslist");
  const collections = collectionsResult.data;
  const categoriesResult = await fetch("categories");
  const categories = await categoriesResult.data;
  // const talentResult = await fetch(`talents?walletAddress=${query.accountAddress}`);
  const talentResult = await fetch(
    `talents?walletAddress=0x8CA35f878fD14992b58a18bEB484f721b1d07A33`
  );
  const talent = await talentResult.data[0];
  return {
    props: {
      serverCollections: JSON.parse(JSON.stringify(collections)),
      categories: JSON.parse(JSON.stringify(categories)),
      talentData: JSON.parse(JSON.stringify(talent)),
    },
  };
};
