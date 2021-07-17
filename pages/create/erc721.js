import React, { useEffect, useRef, useState, useReducer } from "react";
import styles from "/styles/erc721.module.css";
import axios from "axios";
import {
  Input,
  Tooltip,
  Select,
  Progress,
  Button,
  Form,
  Upload,
  message,
} from "antd";
import { fetch, post } from "/Utils/strapiApi";
import { useFormik, File } from "formik";
import * as Yup from "yup";
import ReactPlayer from "react-player";

const pinataApiKey = "de68bc3ddb8bf7a53749";
const pinataSecretApiKey =
  "47ea101a80715e023688af759d27f84d8b5eca43b94612cb905735eb398fed55";
const pinataJwt =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySW5mb3JtYXRpb24iOnsiaWQiOiI1YzEwN2JkMC1kMjA5LTRlOGYtYWM2MS0zYzliZjM1ZjFjODQiLCJlbWFpbCI6Im1wYXJzYUBnYXRld2F5aWN0cy5jb20iLCJlbWFpbF92ZXJpZmllZCI6dHJ1ZSwicGluX3BvbGljeSI6eyJyZWdpb25zIjpbeyJpZCI6Ik5ZQzEiLCJkZXNpcmVkUmVwbGljYXRpb25Db3VudCI6MX1dLCJ2ZXJzaW9uIjoxfSwibWZhX2VuYWJsZWQiOmZhbHNlfSwiYXV0aGVudGljYXRpb25UeXBlIjoic2NvcGVkS2V5Iiwic2NvcGVkS2V5S2V5IjoiZGU2OGJjM2RkYjhiZjdhNTM3NDkiLCJzY29wZWRLZXlTZWNyZXQiOiI0N2VhMTAxYTgwNzE1ZTAyMzY4OGFmNzU5ZDI3Zjg0ZDhiNWVjYTQzYjk0NjEyY2I5MDU3MzVlYjM5OGZlZDU1IiwiaWF0IjoxNjI2MDkxNDM5fQ.dQcFRAwxieC16TSZMJElj6_4kskljJpR_WdkqppFWQw";

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
const ERC721 = () => {
  const hiddenFileInput = useRef(null);
  const formRef = React.createRef();
  const [collections, setCollections] = useState(localCols);
  const [categories, setCategories] = useState(localCategories);
  const [nftData, setNftData] = useState(initNft);
  const [isFileValid, setIsFileValid] = useState({
    isInputTouched: false,
    isFileExist: false,
    isSizeValid: false,
    isOnSubmit: false,
  });
  const [uploadFileUrl, setUploadFileUrl] = useState("");
  const [file, setFile] = useState();
  const [isLoading, setLoading] = useState(false);
  const [uploadPrecentage, setUploadPrecentage] = useState(0);

  const getSelectedCategories = (catList) => {
    const cats = catList.filter((item) => nftData.categories.includes(item.id));
    return cats;
  };

  const openFileUpload = (event) => {
    event.preventDefault();
    hiddenFileInput.current.click();
  };

  const handleFileUpload = (event) => {
    event.preventDefault();

    var file = event.target.files[0];

    if (file) {
      let newIsFileValid = {
        ...isFileValid,
        isInputTouched: true,
        isFileExist: true,
      };
      setFile(file);

      console.log("file.size / 1024 / 1024) ", file.size / 1024 / 1024);
      setUploadFileUrl(URL.createObjectURL(event.target.files[0]));
      if (file.size / 1024 / 1024 < 40) {
        newIsFileValid = {
          ...newIsFileValid,
          isSizeValid: true,
        };
      } else {
        newIsFileValid = {
          ...newIsFileValid,
          isSizeValid: false,
        };
      }
      setIsFileValid(newIsFileValid);
    } else {
      newIsFileValid = {
        ...newIsFileValid,
        isFileExist: false,
      };
    }
  };

  const saveFileToPinata = async (file) => {
    const pinataData = new FormData();
    pinataData.append("file", file);

    const url = `https://api.pinata.cloud/pinning/pinFileToIPFS`;
    return await axios.post(url, pinataData, {
      onUploadProgress: function (progressEvent) {
        const precentage = Math.round(
          (progressEvent.loaded * 100) / progressEvent.total
        );
        setUploadPrecentage(precentage);
        console.log("completed: ", precentage);
      },
      maxContentLength: "Infinity",
      headers: {
        "Content-Type": `multipart/form-data; boundary=${pinataData._boundary}`,
        pinata_api_key: pinataApiKey,
        pinata_secret_api_key: pinataSecretApiKey,
      },
    });
  };

  const clearForm = () => {
    setUploadFileUrl(null);
    setFile();
    setUploadPrecentage(0);
    setIsFileValid({
      isInputTouched: false,
      isFileExist: false,
      isSizeValid: false,
      isOnSubmit: false,
    });
    form.resetFields();
  };

  useEffect(() => {
    // loadCategories();
    // loadCollections();
  }, []);

  // const loadCollections = async () => {
  //   const result = await fetch("collections");
  //   const data = await result.data;
  //   console.log("collections are is ", data);
  //   if (data) {
  //     setCollections(data);
  //   }
  // };
  // const loadCategories = async () => {
  //   const categoriesData = await fetch("/categories");
  //   const cats = await categoriesData.data;
  //   console.log("categories", cats);
  //   setCategories(cats);
  // };

  function checkFileType(files) {
    let valid = true;
    if (files) {
      (files) => {
        if (
          !["application/pdf", "image/jpeg", "image/png"].includes(file.type)
        ) {
          valid = false;
        }
      };
    }
    return valid;
  }
  const saveNft = async (values) => {
    setLoading(true);
    const selectedCats = getSelectedCategories(categories);

    const { data } = await saveFileToPinata(file);
    if (data) {
      console.log("pintada is saved", data);
      const image_url = "https://gateway.pinata.cloud/ipfs/" + data.IpfsHash;
      const preview_image_url =
        "https://gateway.pinata.cloud/ipfs/" + data.IpfsHash;

      const nftData = {
        tokenId:
          "103750325357517214391910940774049778145622348743697075275564645855722148462593",
        tokenAddress: "0x495f947276749ce646f68ac8c248420045cb7b5e",
        name: values.name,
        collections: {
          id: values.collections,
        },
        categories: selectedCats,
        metadata: {
          external_link: values.external_link,
          description: values.description,
          name: values.name,
          image_url,
          preview_image_url,
        },
      };

      const formData = new FormData();
      formData.append("files.previewImage", file);
      formData.append("data", JSON.stringify(nftData));
      const nftResponse = await post(
        // `https://rim-entertainment.herokuapp.com/nfts`,
        `http://localhost:1337/nfts`,
        formData,
        {
          onUploadProgress: (progressEvent) =>
            console.log("progress from strapi", progressEvent),
          headers: {
            "Content-Type": "application/json",
            "Content-Type": "multipart/form-data",
          },
        }
      );
      console.log("file is", file);
      console.log("strapi response is :", nftResponse);
      clearForm();
      setLoading(false);
    }
  };

  const [form] = Form.useForm();
  const onFinish = (values) => {
    let newIsFileValid = {
      ...isFileValid,
      isOnSubmit: true,
    };
    setIsFileValid(newIsFileValid);
    if (
      isFileValid.isInputTouched == true &&
      isFileValid.isFileExist == true &&
      isFileValid.isOnSubmit == true &&
      isFileValid.isSizeValid == true
    ) {
      saveNft(values);
      // clearForm();
    } else {
      alert("form has errro");
    }
  };

  const onFinishFailed = (errorInfo) => {
    let newIsFileValid = {
      ...isFileValid,
      isOnSubmit: true,
    };
    setIsFileValid(newIsFileValid);
    // setIsFileValid({
    //   onSubmit: true,
    // });
  };

  return (
    <div className={styles.container}>
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
          initialValues={{ file: "" }}
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
        >
          <div className={styles.uploadedFileContainer}>
            {uploadFileUrl ? (
              <div className={styles.imageBox}>
                {file.type.toString().includes("image") ? (
                  <img
                    src={uploadFileUrl}
                    className={"img-fluid"}
                    onClick={openFileUpload}
                  />
                ) : (
                  <div className={styles.videoBox}>
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
                <Progress percent={uploadPrecentage} />
              </div>
            ) : (
              <div className={styles.uploadedFileButtonContainer}>
                <div
                  className={styles.uploadedFileButton}
                  onClick={openFileUpload}
                >
                  <img src={"/icons/upload.svg"} />
                </div>
              </div>
            )}
            {isFileValid.isOnSubmit == true && !isFileValid.isFileExist ? (
              <div className={styles.nftFormErrors}>{"File is required"}</div>
            ) : null}
            {isFileValid.isInputTouched && isFileValid.isSizeValid == false && (
              <div className={styles.nftFormErrors}>File Size is too large</div>
            )}
            <Form.Item rules={[{ required: true }]} style={{ display: "none" }}>
              <input
                rules={[{ required: true }]}
                type="file"
                name="file"
                onChange={handleFileUpload}
                ref={hiddenFileInput}
              />
            </Form.Item>
          </div>
          <div className={styles.nftInputComponent}>
            <h3 className={styles.nftSubHeader}>Name *</h3>
            <Form.Item
              name="name"
              rules={[
                { required: true, message: "Please input your Asset Name!" },
              ]}
            >
              <Input
                name="name"
                id="name"
                placeholder="Asset Name"
                className={styles.nftInput}
              />
            </Form.Item>
          </div>
          <div className={styles.nftInputComponent}>
            <h3 className={styles.nftSubHeader}>External Link</h3>
            <p className={styles.nfgParagraph}>
              {
                "OpenSea will include a link to this URL on this item's detail page, so that users can click to learn more about it. You are welcome to link to your own webpage with more details."
              }
            </p>
            <Form.Item name="external_link" rules={[{ required: true }]}>
              <Input
                name="external_link"
                id="external_link"
                placeholder="https://yoursite.ion/item/123"
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
            <Form.Item name="description" rules={[{ required: true }]}>
              <Input.TextArea
                name="description"
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
                    message: "Please Selected Collection of Item",
                  },
                ]}
              >
                <Select
                  style={{ width: "100%" }}
                  placeholder="Please select"
                  onChange={(value) => (nftData.categories = value)}
                >
                  {collections.map((item) => (
                    <Select.Option
                      value={item.id}
                      key={item.id}
                      style={{ height: 50, padding: 10 }}
                    >
                      {item.collectionName}
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
            {
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
                  name="categories"
                  mode="multiple"
                  style={{ width: "100%" }}
                  placeholder="Please select"
                  // defaultValue={categories[9].id}
                  onChange={(value) => (nftData.categories = value)}
                >
                  {categories.map((item) => (
                    <Select.Option
                      value={item.id}
                      key={item.id}
                      style={{ height: 50, padding: 10 }}
                    >
                      {item.categoryName}
                    </Select.Option>
                  ))}
                </Select>
              </Form.Item>
            }
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
