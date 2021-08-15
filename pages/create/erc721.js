import Link from "next/link";
import React, { useEffect, useRef, useState, useReducer } from "react";
import styles from "/styles/erc721.module.css";
import {
  Input,
  Tooltip,
  Select,
  Progress,
  Button,
  Form,
  Upload,
  message,
  Modal,
  Spin,
} from "antd";
import { fetch, post } from "/Utils/strapiApi";
import { useFormik, File } from "formik";
import * as Yup from "yup";
import ReactPlayer from "react-player";
import {
  capitalizeWorkd,
  checkForDuplicate,
  uploadNft,
  validateImage,
} from "Utils/mintApi";
import { useSelector } from "react-redux";
import { getMetaConnected, getMetaToken } from "store/action/accountSlice";
import { isMobileDevice } from "Constants/constants";
import Onboard from "bnc-onboard";

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

const ERC721 = ({ collections, categories, nfts }) => {
  const hiddenFileInput = useRef(null);
  const formRef = React.createRef();
  const [selectedCollection, setSelectedCollection] = useState();
  const [nftImageError, setNftImageError] = useState();
  const [duplicateNameError, setDuplicateNameError] = useState();
  const [selectedCategories, setSelectedCategories] = useState();
  const [displayUploadModal, setDisplayUploadModal] = useState(false);
  const [displayUnlockModal, setDisplayUnlockModal] = useState(false);

  const [nftData, setNftData] = useState(initNft);
  const [uploadFileUrl, setUploadFileUrl] = useState("");
  const [nftImageFile, setNftImageFile] = useState();
  const [isLoading, setLoading] = useState(false);
  const [uploadPrecentage, setUploadPrecentage] = useState(0);
  const isMetaconnected = useSelector(getMetaConnected);
  const metaToken = useSelector(getMetaToken);
  const [onboard, setOnboard] = useState(null);

  const getSelectedCollection = (colId) => {
    const selected = collections.filter((item) => item.id === colId)[0];
    console.log("selected collection is", selected);
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
      const validationStatus = validateImage(targetFile, 40);

      if (!validationStatus.status) {
        setNftImageError(validationStatus.message);
      } else {
        setNftImageError(null);
      }
    }
  };

  const checkNftNameDuplication = (e) => {
    let input = e.target.value;
    const nftDuplicationResult = checkForDuplicate(
      nfts,
      input,
      "name",
      "Asset Name"
    );
    setDuplicateNameError(nftDuplicationResult);
  };

  const clearForm = () => {
    setUploadFileUrl(null);
    setNftImageFile(null);
    setUploadPrecentage(0);
    form.resetFields();
    hiddenFileInput.current.value = null;
  };

  const createNftData = (values) => {
    let nftData = values;
    nftData.collections = selectedCollection;
    nftData.categories = selectedCategories;
    return nftData;
  };

  const saveNft = async (nftImageFile, values) => {
    const nftData = createNftData(values);
    return await uploadNft(nftImageFile, nftData, metaToken[0]);
    console.log("result of minting ", result);
    // if (result.success) {
    //   return result;
    // } else {
    //   return {
    //     success: false,
    //     message: "Collection not uploaded",
    //   };
    // }
  };

  const [form] = Form.useForm();
  const onFinish = (values) => {
    let validationResult = validateImage(nftImageFile, 40);
    console.log("on finish", validationResult);
    if (validationResult.status == true && !duplicateNameError.isDuplicate) {
      setDisplayUploadModal(true);
      console.log("validation of nfig image is file is ready");
      (async function () {
        const result = await saveNft(nftImageFile, values);
        if (result) {
          console.log(result);
          setDisplayUploadModal(false);
          clearForm();
        }
      })();
    }
  };
  const onFinishFailed = () => {
    setDisplayUploadModal(false);
    const validationStatus = validateImage(nftImageFile, 40);
    if (!validationStatus.status) {
      setNftImageError(validationStatus.message);
    } else {
      setNftImageError(null);
    }
  };
  useEffect(() => {
    if (isMobileDevice()) {
      checkMobileMaskUnlocked();
    } else {
      checkMetamaskUnlocked();
    }
  }, [isMetaconnected]);

  const checkMetamaskUnlocked = async () => {
    const { ethereum } = window;
    if (ethereum && ethereum.isMetaMask) {
      console.log("is metamask connected ", isMetaconnected);
      if (!isMetaconnected) {
        setDisplayUnlockModal(true);
      }
    } else {
      if (!isMobileDevice()) {
        alert("Please install MetaMask!");
      } else {
        // alert("Please install Metamask for Mobile!");
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

  return (
    <div className={styles.container}>
      <div>
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
          title="Uploading NFT..."
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
          <div className={styles.waitingSpiner}>
            <div className={styles.deplyingMessage}>
              Please Be Patient It may take serveral minutes
            </div>
            <Spin size="large" />
          </div>
        </Modal>
      </div>

      <div className={styles.nftFormContainer}>
        <h1 className={styles.header}>Create new item</h1>
        <h4 className={styles.subHeader}>Image, Video, Audio, or 3D Model</h4>
        <p className={styles.fileTypes}>
          {`File types supported: JPG, PNG, GIF, SVG, MP4, WEBM, MP3, WAV, OGG,
          GLB, GLTF. Max size: 40 MB`}
        </p>
        <Form
          className={styles.uploadForm}
          ref={formRef}
          form={form}
          // initialValues={{ nftImageFile: "" }}
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
        >
          <div
            className={
              !uploadFileUrl
                ? styles.nftFileUploadContainer
                : [styles.nftFileUploadContainer, styles.autoHeight].join(" ")
            }
          >
            {uploadFileUrl ? (
              <div className={styles.nftMediaContainer}>
                {nftImageFile.type.toString().includes("image") ? (
                  <div className={styles.nftImageBox}>
                    <img
                      className={styles.nftImage}
                      src={uploadFileUrl}
                      onClick={openFileUpload}
                    />
                  </div>
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
                <label
                  className={styles.changeUploadedImage}
                  style={{ cursor: "pointer" }}
                  onClick={openFileUpload}
                >
                  Change
                </label>
              </div>
            ) : (
              <div className={styles.uploadedFileButtonContainer}>
                <div
                  className={styles.uploadedFileButton}
                  onClick={openFileUpload}
                >
                  <img width={96} height={96} src={"/icons/nftUpload.svg"} />
                </div>
              </div>
            )}
            <Form.Item style={{ display: "none" }}>
              <input
                type="file"
                name="nftImageFile"
                onChange={handleFileUpload}
                ref={hiddenFileInput}
              />
            </Form.Item>
          </div>
          <div className={styles.nftFormErrors}>{nftImageError}</div>
          <div className={styles.nftInputComponent}>
            <h3 className={styles.nftSubHeader}>Name *</h3>
            <Form.Item
              name="name"
              rules={[
                { required: true, message: "Please input your Asset Name!" },
              ]}
              onInput={checkNftNameDuplication}
            >
              <Input
                // name="name"
                id="name"
                placeholder="Asset Name"
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
                "OpenSea will include a link to this URL on this item's detail page, so that users can click to learn more about it. You are welcome to link to your own webpage with more details."
              }
            </p>
            <Form.Item
              name="external_link"
              rules={[
                { required: true, message: "NFT Description is required" },
              ]}
            >
              <Input
                // name="external_link"
                id="external_link"
                placeholder="https://yoursite.io/item/123"
                className={styles.nftInput}
              />
            </Form.Item>
          </div>
          <div className={styles.nftInputComponent}>
            <h3 className={styles.nftSubHeader}>Description</h3>
            <p className={styles.nfgParagraph}>
              {
                "The description will be included on the item's detail page underneath its image. Markdown syntax is supported."
              }
            </p>
            <Form.Item
              name="description"
              rules={[
                { required: true, message: "NFT Description is required" },
              ]}
            >
              <Input.TextArea
                // name="description"
                id="description"
                placeholder="Provide a detailed description of your item"
                className={styles.nftInput}
                rows={4}
              />
            </Form.Item>
          </div>
          <div className={styles.nftInputComponent}>
            <h3 className={styles.nftSubHeader}> Collection *</h3>
            <p className={styles.nfgParagraph}>
              {`This is the collection where your item will appear`}
            </p>
            {collections && (
              <Form.Item
                name="collections"
                rules={[
                  {
                    required: true,
                    message: "Please Select Collection of Item",
                  },
                ]}
              >
                <Select
                  style={{ width: "100%" }}
                  placeholder="Please select"
                  onChange={(value) => getSelectedCollection(value)}
                >
                  {collections?.map((item) => (
                    <Select.Option
                      value={item.id}
                      key={item.id}
                      style={{ height: 50, padding: 10 }}
                    >
                      {item.collection}
                    </Select.Option>
                  ))}
                </Select>
              </Form.Item>
            )}
          </div>
          <div className={styles.nftInputComponent}>
            <h3 className={styles.nftSubHeader}> Categories *</h3>
            <p className={styles.nfgParagraph}>
              {`This is the Category where your item will appear`}
            </p>
            {categories && (
              <Form.Item
                name="categories"
                rules={[
                  {
                    required: true,
                    message: "Please Selected At least (1) Category",
                  },
                ]}
              >
                <Select
                  id="categories"
                  // name="categories"
                  mode="multiple"
                  style={{ width: "100%" }}
                  placeholder="Please select"
                  // defaultValue={categories[9].id}
                  // value={nftData.categories}
                  onChange={(values) => getSelectedCategories(values)}
                >
                  {categories.map((item) => (
                    <Select.Option
                      value={item.id}
                      key={item.id}
                      style={{ height: 50, padding: 10 }}
                    >
                      {capitalizeWorkd(item.category)}
                    </Select.Option>
                  ))}
                </Select>
              </Form.Item>
            )}
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
      collections: JSON.parse(JSON.stringify(collections)),
      categories: JSON.parse(JSON.stringify(categories)),
      nfts: JSON.parse(JSON.stringify(nfts)),
    },
  };
};
