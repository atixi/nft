import React, { useEffect, useRef, useState } from "react";
import styles from "/styles/erc721.module.css";
import { Input, Button, Form, Spin, Modal } from "antd";
import { fetch } from "/Utils/strapiApi";
import { checkFileType, deployCollection } from "Utils/mintApi";
import { getAccount } from "Utils/openseaApi";
import { getTalentAccount } from "Constants/constants";
const ERC721Collection = ({ collections }) => {
  const logoImageInputRef = useRef(null);
  const bannerImageInputRef = useRef(null);
  const formRef = React.createRef();
  const [logoError, setLogoError] = useState();
  const [bannerError, setBannerError] = useState();
  const [collectionError, setCollectionError] = useState(false);
  const [isDuplicate, setIsDuplicate] = useState(false);
  const [logoImageUrl, setLogoImageUrl] = useState("");
  const [bannerImageUrl, setBannerImageUrl] = useState("");
  const [logoImageFile, setLogoImageFile] = useState();
  const [bannerImageFile, setBannerImageFile] = useState();
  const [isLoading, setLoading] = useState(false);
  const [uploadPrecentage, setUploadPrecentage] = useState(0);
  const [displayUploadModal, setDisplayUploadModal] = useState(false);

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
        setLogoError(null);
        setLogoImageFile(imageFile);
        setLogoImageUrl(URL.createObjectURL(imageFile));
      } else if (targetInput == "bannerImageFile") {
        setBannerError(null);
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
    form.resetFields();
  };

  const [form] = Form.useForm();

  const onFinish = (values) => {
    if (!logoImageFile) {
      setLogoError("Logo Image is Required");
    }
    if (!bannerImageFile) {
      setBannerError("Banner Image is Required");
    }

    if (logoImageFile && bannerImageFile && !isDuplicate) {
      setDisplayUploadModal(true);
      console.log("values are valide ", values);
      (async function () {
        const result = await saveCollection(
          logoImageFile,
          bannerImageFile,
          values
        );
        if (result.success) {
          console.log(result.message);
          clearForm();
          setDisplayUploadModal(false);
        }
      })();
    }
  };

  const saveCollection = async (logoImageFile, bannerImageFile, values) => {
    const result = await deployCollection(
      logoImageFile,
      bannerImageFile,
      values
    );
    if (result) {
      return result;
    } else {
      return {
        success: false,
        message: "Collection not uploaded",
      };
    }
  };

  const checkCollectionDuplicate = (e) => {
    console.log("value is value", e.target.value.toString().trim());
    let input = e.target.value;

    const isDuplicate = collections.some(
      (collection) => collection.collection == e.target.value.toString().trim()
    );
    console.log("duplicate is ", isDuplicate);
    if (isDuplicate == true) {
      setIsDuplicate(true);
      setCollectionError("× Collection name is already taken");
    } else {
      setIsDuplicate(false);
      setCollectionError("✔ This Collection name is available.");
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

  useEffect(() => {}, []);

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
        <div className={styles.waitingSpiner}>
          <div className={styles.deplyingMessage}>
            {"Please Be Patient It may take serveral minutes"}
          </div>
          <Spin size="large" />
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
              name="name"
              rules={[
                {
                  required: true,
                  message: "Please input your Collection Name!",
                },
              ]}
            >
              <Input
                name="name"
                id="name"
                placeholder="Collection Name"
                onInput={checkCollectionDuplicate}
                className={styles.nftInput}
              />
            </Form.Item>
            <div
              className={
                collectionError == "× Collection name is already taken"
                  ? styles.nftFormErrors
                  : styles.nftFormValid
              }
            >
              {collectionError}
            </div>
          </div>
          <div className={styles.nftInputComponent}>
            <h3 className={styles.nftSubHeader}>External Link</h3>
            <p className={styles.nfgParagraph}>
              {
                "OpenSea will include a link to this URL. You are welcome to link to your own webpage with more details."
              }
            </p>
            <Form.Item name="external_link" rules={[{ required: false }]}>
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
