import { Button, Form, Input, Modal, Spin } from "antd";
import React, { useEffect, useRef, useState } from "react";
import {
  checkFileType,
  deployCollection,
  validateCollectionIdetifier,
  validateCollectionName,
  validateCompleteCollectionName,
} from "Utils/mintApi";
import {
  getMetaConnected,
  getMetaToken,
  getWalletConnected,
} from "store/action/accountSlice";

import CustomNotification from "@/components/commons/customNotification";
import Link from "next/link";
import Web3 from "web3";
import { allowedImageTypes } from "Constants/constants";
import { fetch } from "/Utils/strapiApi";
import { signTransaction } from "Utils/utils";
import { socket } from "config/websocket";
import styles from "/styles/erc721.module.css";
import { useSelector } from "react-redux";

let collectionCompleteName = {
  collectionName: "",
  collectionIdentifier: "",
};
const ERC721Collection = ({ serverCollections }) => {
  const logoImageInputRef = useRef(null);
  const bannerImageInputRef = useRef(null);
  const formRef = React.createRef();
  const [logoError, setLogoError] = useState();
  const [bannerError, setBannerError] = useState();
  const [collectionNameError, setCollectionNameError] = useState("");
  const [collectionIdentifierError, setCollectionIdentifierError] =
    useState("");
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
  const [completeCollectionNameError, setCompleteCollectionNameError] =
    useState("");

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
    event.preventDefault();
    logoImageInputRef.current.click();
  };
  const openFileUploadBanner = (event) => {
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

  const [form] = Form.useForm();

  const onFinish = (values) => {
    const collectionData = createCollectinData(values);
    if (!logoImageFile) {
      setLogoError("Logo Image is Required");
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
      setLogoError("Logo Image is Required");
    }
    if (!bannerImageFile) {
      setBannerError("Banner Image is Required");
    }
  };

  const saveCollection = async (
    logoImageFile,
    bannerImageFile,
    collectionData
  ) => {
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
    <div className={styles.container}>
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
              <Button
                type="primary"
                className={styles.modalButton}
                onClick={handleNewCollection}
              >
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
      <div className={styles.nftFormContainer}>
        <h1 className={styles.header}>Create new Collection</h1>
        <h4 className={styles.subHeader}>Collection Image</h4>
        <p className={styles.fileTypes}>
          {`File types supported: JPG, PNG, GIF, SVG. Max size: 10 MB`}
        </p>
        <Form
          className={styles.uploadForm}
          ref={formRef}
          form={form}
          initialValues={{ logoImageFile: "" }}
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
        >
          {/* ------------------------------------------------------Logo------------------------ */}
          <div className={styles.logoFileContainer}>
            {logoImageUrl ? (
              <div className={styles.logoImageBox}>
                <img
                  src={logoImageUrl}
                  className={styles.logoImage}
                  onClick={openLogoFileChooser}
                />
              </div>
            ) : (
              <div
                className={styles.uploadedFileButton}
                onClick={openLogoFileChooser}
              >
                <img
                  width={96}
                  height={96}
                  src={"/icons/collectionUpload.svg"}
                />
              </div>
            )}
            <Form.Item rules={[{ required: true }]} style={{ display: "none" }}>
              <input
                rules={[{ required: true }]}
                type="file"
                accept={allowedImageTypes}
                name="logoImageFile"
                onChange={handleFileUpload}
                ref={logoImageInputRef}
              />
            </Form.Item>
          </div>
          <div className={styles.nftFormErrors}>{logoError}</div>
          {/* ------------------------------------------------------Banner------------------------ */}
          <h3 className={styles.nftSubHeader}>{`Banner image`}</h3>
          <p className={styles.fileTypes}>
            {`This image will appear at the top of your collection page. Avoid including too much text in this banner image, as the dimensions change on different devices. 1400 x 400 recommended.`}
          </p>
          <div className={styles.bannerFileContainer}>
            {bannerImageUrl ? (
              <div className={styles.bannerImageBox}>
                <img
                  className={styles.bannerImage}
                  style={{ objectFit: "cover" }}
                  src={bannerImageUrl}
                  onClick={openFileUploadBanner}
                />
              </div>
            ) : (
              <div className={styles.uploadedFileButtonContainer}>
                <div
                  className={styles.uploadedFileButton}
                  onClick={openFileUploadBanner}
                >
                  <img
                    width={96}
                    height={96}
                    src={"/icons/collectionUpload.svg"}
                  />
                </div>
              </div>
            )}
            <Form.Item rules={[{ required: true }]} style={{ display: "none" }}>
              <input
                rules={[{ required: true }]}
                type="file"
                accept={allowedImageTypes}
                name="bannerImageFile"
                onChange={handleFileUpload}
                ref={bannerImageInputRef}
              />
            </Form.Item>
          </div>
          <div className={styles.nftFormErrors}>{bannerError}</div>
          <div className={styles.nftInputComponent}>
            <h3 className={styles.nftSubHeader}>{"Collection Name *"}</h3>
            <Form.Item
              name="collectionName"
              rules={[
                {
                  required: true,
                  message: "Please input your Collection Name!",
                  // validate: (value) => {
                  //   return value.toString().trim().match("/^[a-zA-Z ]*$/");
                  // },
                },
              ]}
              onInput={handleCollectionCompleteName}
            >
              <Input
                name="collectionName"
                id="collection"
                placeholder="Collection Name"
                className={styles.nftInput}
              />
            </Form.Item>
            <div className={styles.nftFormErrors}>
              {collectionNameError?.message}
            </div>
          </div>
          <div className={styles.nftInputComponent}>
            <h3 className={styles.nftSubHeader}>{"Collection Identifier"}</h3>
            <p className={styles.nfgParagraph}>
              {
                "This will be used as last part of your collection name. It might be your brand name or some arbitrary but unique word."
              }
            </p>
            <Form.Item
              name="collectionIdentifier"
              rules={[
                {
                  required: true,
                  message: "Collection Identifier is required",
                },
              ]}
              onInput={handleCollectionCompleteName}
            >
              <Input
                name="collectionIdentifier"
                id="collectionIdentifier"
                placeholder="Please enter some uniqu value"
                className={styles.nftInput}
              />
            </Form.Item>
            <div className={styles.nftFormErrors}>
              {collectionIdentifierError?.message}
            </div>
            <div
              className={
                completeCollectionNameError?.message?.includes("×")
                  ? styles.nftFormErrors
                  : styles.nftFormValid
              }
            >
              {completeCollectionNameError?.message}
            </div>
          </div>
          <div className={styles.nftInputComponent}>
            <h3 className={styles.nftSubHeader}>{"Description"}</h3>
            <p className={styles.nfgParagraph}>
              {
                "The description will be included on the for All Assets in this Collection"
              }
            </p>
            <Form.Item
              name="description"
              rules={[{ required: true, message: "Description is required" }]}
            >
              <Input.TextArea
                name="description"
                id="description"
                placeholder="Provide a detailed description of your Collection"
                className={styles.nftInput}
                rows={4}
              />
            </Form.Item>
          </div>

          <div className={styles.createButtonContainer}>
            <Form.Item>
              <Button
                className={styles.createButton}
                loading={isLoading}
                type="primary"
                htmlType="submit"
              >
                Create
              </Button>
            </Form.Item>
          </div>
        </Form>
      </div>
    </div>
  );
};
export default ERC721Collection;

export const getServerSideProps = async (context) => {
  const collectionsResult = await fetch("/collections/collectionslist");
  const collections = collectionsResult.data;
  return {
    props: {
      serverCollections: JSON.parse(JSON.stringify(collections)),
    },
  };
};
