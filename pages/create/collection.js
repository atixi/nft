import React, { useEffect, useRef, useState } from "react";
import styles from "/styles/erc721.module.css";
import { Input, Button, Form, Spin, Modal } from "antd";
import { fetch } from "/Utils/strapiApi";
import Link from "next/link";
import { isMobileDevice, providerOptions } from "/Constants/constants";
import Onboard from "bnc-onboard";
import Web3 from "web3";
import {
  checkFileType,
  checkForDuplicate,
  deployCollection,
} from "Utils/mintApi";
import { allowedImageTypes } from "Constants/constants";
import detectEthereumProvider from "@metamask/detect-provider";
import { getCurrentAccount, requestUnlockMetamask } from "Utils/utils";
import {
  getAccountTokens,
  getMetaConnected,
  getMetaToken,
  getWalletConnected,
  getWalletToken,
} from "store/action/accountSlice";
import { useSelector } from "react-redux";
import { useOnboard } from "use-onboard";

let web3;

const ERC721Collection = ({ collections }) => {
  const logoImageInputRef = useRef(null);
  const bannerImageInputRef = useRef(null);
  const formRef = React.createRef();
  const [logoError, setLogoError] = useState();
  const [bannerError, setBannerError] = useState();
  const [duplicateNameError, setDuplicateNameError] = useState();
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
  const { selectWallet, address, isWalletSelected, disconnectWallet, balance } =
    useOnboard({
      dappId: "2978c0ac-ae01-46c3-8054-9fc9ec2bfc2d", // optional API key
      networkId: 4, // Ethereum network ID
    });

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
    const typeResult = checkFileType(imageFile);
    console.log("file type is ", typeResult.isTypeValid);
    if (imageFile) {
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

  const checkCollectionNameDuplication = (e) => {
    let input = e.target.value;
    const duplicationResult = checkForDuplicate(
      collections,
      input,
      "collection",
      "Collection Name"
    );
    setDuplicateNameError(duplicationResult);
  };

  const clearForm = () => {
    setLogoImageUrl(null);
    setBannerImageUrl(null);
    setLogoImageFile(null);
    setBannerImageFile(null);
    setUploadPrecentage(0);
    form.resetFields();
  };

  const [form] = Form.useForm();

  const onFinish = (values) => {
    const collectionData = createCollectinData(values);
    console.log("collectin dat ais ", collectionData);
    if (!logoImageFile) {
      setLogoError("Logo Image is Required");
    }
    if (!bannerImageFile) {
      setBannerError("Banner Image is Required");
    }

    if (
      logoImageFile &&
      bannerImageFile &&
      !duplicateNameError.isDuplicate &&
      logoError == null &&
      bannerError == null
    ) {
      setDisplayUploadModal(true);
      console.log("values are ready ", values);
      (async function () {
        const ownerAccount = await getCurrentAccount();
        console.log("current account is ", ownerAccount);
        if (ownerAccount) {
          const result = await deployCollection(
            logoImageFile,
            bannerImageFile,
            collectionData,
            ownerAccount
          );
          console.log("result of rejection is ", result);
          if (!result.rejected && result.data) {
            const slug = result.data.slug;
            setNewCollectionSlug(slug);
            setDisplayModalButtons(true);
          } else if (result.rejected) {
            setDisplayUploadModal(false);
            setDisplayModalButtons(false);
          } else {
            console.log("reult is ", result);
          }
        }
      })();
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

  const handleNewCollection = () => {
    setDisplayUploadModal(false);
    setDisplayModalButtons(false);
    clearForm();
  };

  const checkMetamaskUnlocked = async () => {
    const { ethereum } = window;
    if (ethereum && ethereum.isMetaMask) {
      if (!isMetaconnected || !metaToken) {
        setDisplayUnlockModal(true);
      }
    } else {
      if (!isMobileDevice()) {
        alert("Please install MetaMask!");
      }
    }
  };

  const checkMobileMaskUnlocked = async () => {
    const onboard = Onboard({
      dappId: process.env.ONBOARD_API_KEY, // [String] The API key created by step one above
      networkId: 4, // [Integer] The Ethereum network ID your Dapp uses.
      subscriptions: {
        wallet: (wallet) => {
          setWeb3(new Web3(wallet.provider));
        },
        address: (addres) => {
          console.log("adddres is ", address);
        },
      },
      walletSelect: {
        wallets: [{ walletName: "metamask" }],
      },
    });
    setOnboard(onboard);
    if (!isMetaconnected) {
      const data = await onboard.walletSelect();
      if (data) {
        const walletCheck = await onboard.walletCheck();
        console.log("walletselct is ", data);
        console.log("wallet checi is ", walletCheck);
      }
    }
  };

  const isTalentRegistered = async () => {
    const account = await getCurrentAccount();
    const talentResult = await fetch(`/talents/talentexists/${account}`);
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
  };

  const createCollectinData = (values) => {
    let collectionData = values;
    collectionData.talent = collectionTalent;
    return collectionData;
  };

  useEffect(() => {
    isTalentRegistered();
    if (isMobileDevice()) {
      checkMobileMaskUnlocked();
    } else {
      checkMetamaskUnlocked();
    }
  }, [isMetaconnected, metaToken]);

  return (
    <div className={styles.container}>
      <Modal
        title="Please Register your wallet"
        visible={displayRegisterModal}
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
          <div className={styles.modalControls}>
            <Link
              href={{
                pathname: `/`,
              }}
            >
              <a>
                <span className={styles.linkButton}>{"Go To Main Page"}</span>
              </a>
            </Link>
            <Link
              href={{
                pathname: `/wallet`,
              }}
            >
              <a>
                {
                  <span className={styles.linkButton}>
                    {"Register My Wallet"}
                  </span>
                }
              </a>
            </Link>
          </div>
        </div>
      </Modal>
      <Modal
        title="Unlock Wallet To Create Collection"
        visible={displayUnlockModal}
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
          <div className={styles.modalControls}>
            <Link
              href={{
                pathname: `/`,
              }}
            >
              <a>
                <span className={styles.linkButton}>{"Go To Main Page"}</span>
              </a>
            </Link>
            <Link
              href={{
                pathname: `/wallet`,
              }}
            >
              <a>
                {
                  <span className={styles.linkButton}>
                    {"Connect with Wallet"}
                  </span>
                }
              </a>
            </Link>
          </div>
        </div>
      </Modal>
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
                  // className={"img-fluid"}
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
            {`(optional) This image will appear at the top of your collection page. Avoid including too much text in this banner image, as the dimensions change on different devices. 1400 x 400 recommended.`}
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
            <h3 className={styles.nftSubHeader}>Collection Name *</h3>
            <Form.Item
              name="collection"
              rules={[
                {
                  required: true,
                  message: "Please input your Collection Name!",
                },
              ]}
              onInput={checkCollectionNameDuplication}
            >
              <Input
                id="collection"
                placeholder="Collection Name"
                className={styles.nftInput}
              />
            </Form.Item>
            <div
              className={
                duplicateNameError?.message.includes("×")
                  ? styles.nftFormErrors
                  : styles.nftFormValid
              }
            >
              {duplicateNameError?.message}
            </div>
          </div>
          <div className={styles.nftInputComponent}>
            <h3 className={styles.nftSubHeader}>External Link</h3>
            <p className={styles.nfgParagraph}>
              {
                "OpenSea will include a link to this URL. You are welcome to link to your own webpage with more details."
              }
            </p>
            <Form.Item
              name="external_link"
              rules={[{ required: true, message: "External Link is required" }]}
            >
              <Input
                name="external_link"
                id="external_link"
                placeholder="https://yoursite.com"
                className={styles.nftInput}
              />
            </Form.Item>
          </div>
          <div className={styles.nftInputComponent}>
            <h3 className={styles.nftSubHeader}>Description</h3>
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
      collections: JSON.parse(JSON.stringify(collections)),
    },
  };
};
