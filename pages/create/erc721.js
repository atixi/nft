import React, { useEffect, useState } from "react";
import styles from "/styles/erc721.module.css";
import axios from "axios";
import { Input, Tooltip, Select, Progress, Button } from "antd";
import { fetch, post } from "/Utils/strapiApi";
import { useFormik, File } from "formik";
import * as Yup from "yup";
import ReactPlayer from "react-player";

const pinataApiKey = "de68bc3ddb8bf7a53749";
const pinataSecretApiKey =
  "47ea101a80715e023688af759d27f84d8b5eca43b94612cb905735eb398fed55";
const pinataJwt =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySW5mb3JtYXRpb24iOnsiaWQiOiI1YzEwN2JkMC1kMjA5LTRlOGYtYWM2MS0zYzliZjM1ZjFjODQiLCJlbWFpbCI6Im1wYXJzYUBnYXRld2F5aWN0cy5jb20iLCJlbWFpbF92ZXJpZmllZCI6dHJ1ZSwicGluX3BvbGljeSI6eyJyZWdpb25zIjpbeyJpZCI6Ik5ZQzEiLCJkZXNpcmVkUmVwbGljYXRpb25Db3VudCI6MX1dLCJ2ZXJzaW9uIjoxfSwibWZhX2VuYWJsZWQiOmZhbHNlfSwiYXV0aGVudGljYXRpb25UeXBlIjoic2NvcGVkS2V5Iiwic2NvcGVkS2V5S2V5IjoiZGU2OGJjM2RkYjhiZjdhNTM3NDkiLCJzY29wZWRLZXlTZWNyZXQiOiI0N2VhMTAxYTgwNzE1ZTAyMzY4OGFmNzU5ZDI3Zjg0ZDhiNWVjYTQzYjk0NjEyY2I5MDU3MzVlYjM5OGZlZDU1IiwiaWF0IjoxNjI2MDkxNDM5fQ.dQcFRAwxieC16TSZMJElj6_4kskljJpR_WdkqppFWQw";

const ERC721 = () => {
  const [collections, setCollections] = useState(localCols);
  const [isFileValid, setIsFileValid] = useState(true);
  const [categories, setCategories] = useState(localCategories);
  const [uploadFileUrl, setUploadFileUrl] = useState(null);
  const [file, setFile] = useState(null);
  const [isLoading, setLoading] = useState(false);
  const [uploadPrecentage, setUploadPrecentage] = useState(0);

  const nftForm = useFormik({
    initialValues: {
      tokenId: "",
      tokenAddress: "",
      name: "",
      collections: 1,
      categories: [],
      talent: "",
      description: "",
      external_link: "",
      file: "",
    },
    validationSchema: Yup.object({
      tokenId: Yup.string(),
      tokenAddress: Yup.string(),
      name: Yup.string().required().label("Name"),
      collections: Yup.number().required(),
      categories: Yup.array().required(),
      talent: Yup.string(),
      description: Yup.string(),
      external_link: Yup.string().url().label("Website"),
      file: Yup.mixed().required(),
    }),
    onSubmit: (values) => {
      console.log("subimting");
      alert(JSON.stringify(values));
      saveNft(values);
    },
  });

  const saveNft = async (values) => {
    setLoading(true);
    // setIsValid(false);
    console.log("savenft");
    console.log("values", values);
    const pinataData = new FormData();
    pinataData.append("file", file);

    const url = `https://api.pinata.cloud/pinning/pinFileToIPFS`;
    const pinataResult = await axios.post(url, pinataData, {
      onUploadProgress: function (progressEvent) {
        const precentage = Math.round(
          (progressEvent.loaded * 100) / progressEvent.total
        );
        setUploadPrecentage(precentage);
        console.log("completed: ", uploadPrecentage);
      },
      maxContentLength: "Infinity",
      headers: {
        "Content-Type": `multipart/form-data; boundary=${pinataData._boundary}`,
        pinata_api_key: pinataApiKey,
        pinata_secret_api_key: pinataSecretApiKey,
      },
    });

    if (pinataResult.data) {
      const pintaData = await pinataResult.data;
      console.log("pinta data is ", pintaData);
      const image_url =
        "https://gateway.pinata.cloud/ipfs/" + pintaData.IpfsHash;
      const preview_image_url =
        "https://gateway.pinata.cloud/ipfs/" + pintaData.IpfsHash;

      const nftData = {
        tokenId:
          "103750325357517214391910940774049778145622348743697075275564645855722148462593",
        tokenAddress: "0x495f947276749ce646f68ac8c248420045cb7b5e",
        name: values.name,
        collections: {
          id: values.collections,
        },
        metadata: {
          external_link: values.external_link,
          description: values.description,
          name: values.name,
          description: values.description,
          // image: image_url,
          // preview_image_url: preview_image_url,
        },
      };

      console.log("nft data is ", nftData);
      const formData = new FormData();
      formData.append("files.previewImage", file);
      formData.append("data", JSON.stringify(nftData));
      const nftResponse = await post(
        `https://rim-entertainment.herokuapp.com/nfts`,
        formData,
        {
          onUploadProgress: (progressEvent) =>
            console.log("progress from strapi", progressEvent),
          headers: {
            // "Content-Type": "application/json",
            "Content-Type": "multipart/form-data",
          },
        }
      );
      console.log("nftResponse is ", nftResponse);
      setLoading(false);
      nftForm.resetForm();
      setIsValid(true);
    }
  };
  const hiddenFileInput = React.useRef(null);

  useEffect(() => {
    // loadCategories();
    // loadCollections();
  }, []);

  const openFileUpload = (event) => {
    event.preventDefault();
    hiddenFileInput.current.click();
  };

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
  const handleFileUpload = (event) => {
    event.preventDefault();
    var file = event.target.files[0];
    console.log("file.size / 1024 / 1024) ", file.size / 1024 / 1024);
    if (file) {
      if (file.size / 1024 / 1024 < 40) {
        setIsFileValid(true);
        setFile(file);
        setUploadFileUrl(URL.createObjectURL(event.target.files[0]));
        nftForm.setFieldValue("file", file);
      } else {
        setIsFileValid(false);
        setUploadFileUrl(null);
      }
    }
  };

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
  return (
    <div className={styles.container}>
      <div className={styles.nftFormContainer}>
        <h1 className={styles.header}>Create new item</h1>
        <h4 className={styles.subHeader}>Image, Video, Audio, or 3D Model</h4>
        <p className={styles.fileTypes}>
          {`File types supported: JPG, PNG, GIF, SVG, MP4, WEBM, MP3, WAV, OGG,
          GLB, GLTF. Max size: 40 MB`}
        </p>
        <form className={styles.uploadForm} onSubmit={nftForm.handleSubmit}>
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
            {nftForm.touched.file && nftForm.errors.file ? (
              <div className={styles.nftFormErrors}>{nftForm.errors.file}</div>
            ) : null}
            {!isFileValid && (
              <div className={styles.nftFormErrors}>{"file is big"}</div>
            )}
            <input
              accept="*"
              name="file"
              id="file"
              type="file"
              onChange={handleFileUpload}
              ref={hiddenFileInput}
              style={{ display: "none" }}
            />

            <Progress percent={uploadPrecentage} />
          </div>
          <div className={styles.nftInputComponent}>
            <h3 className={styles.nftSubHeader}>Name *</h3>
            {nftForm.touched.name && nftForm.errors.name ? (
              <div className={styles.nftFormErrors}>{nftForm.errors.name}</div>
            ) : null}
            <input
              name="name"
              id="name"
              placeholder="Item Name"
              className={styles.nftInput}
              value={nftForm.values.name}
              onChange={nftForm.handleChange}
            />
          </div>
          <div className={styles.nftInputComponent}>
            <h3 className={styles.nftSubHeader}>External Link</h3>
            <p className={styles.nfgParagraph}>
              {
                "OpenSea will include a link to this URL on this item's detail page, so that users can click to learn more about it. You are welcome to link to your own webpage with more details."
              }
            </p>
            {nftForm.touched.external_link && nftForm.errors.external_link ? (
              <div className={styles.nftFormErrors}>
                {nftForm.errors.external_link}
              </div>
            ) : null}
            <input
              name="external_link"
              id="external_link"
              placeholder="https://yoursite.ion/item/123"
              className={styles.nftInput}
              value={nftForm.values.external_link}
              onChange={nftForm.handleChange}
            />
          </div>
          <div className={styles.nftInputComponent}>
            <h3 className={styles.nftSubHeader}>Description</h3>
            <p className={styles.nfgParagraph}>
              {
                "The description will be included on the item's detail page underneath its image. Markdown syntax is supported."
              }
            </p>
            <Input.TextArea
              name="description"
              id="description"
              placeholder="Provide a detailed description of your item"
              className={styles.nftInput}
              value={nftForm.values.description}
              onChange={nftForm.handleChange}
              rows={4}
            />
          </div>
          <div className={styles.nftInputComponent}>
            <h3 className={styles.nftSubHeader}> Collection *</h3>
            <p className={styles.nfgParagraph}>
              {`This is the collection where your item will appear`}
            </p>
            {collections && (
              <Select
                style={{ width: "100%" }}
                placeholder="Please select"
                defaultValue={collections[0].id}
                onChange={(value) => (nftForm.categories = value)}
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
            )}
          </div>
          <div className={styles.nftInputComponent}>
            <h3 className={styles.nftSubHeader}> Categories *</h3>
            <p className={styles.nfgParagraph}>
              {`This is the Category where your item will appear`}
            </p>
            {nftForm.touched.categories && nftForm.errors.categories ? (
              <div className={styles.nftFormErrors}>
                {nftForm.errors.categories}
              </div>
            ) : null}
            {
              <Select
                id="categories"
                name="categories"
                mode="multiple"
                style={{ width: "100%" }}
                placeholder="Please select"
                // value={nftForm.values.categories}
                defaultValue={categories[0].id}
                onChange={(value) => (nftForm.values.categories = value)}
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
            }
          </div>
          <Button
            onClick={nftForm.submitForm}
            // loading={isLoading}
            // disabled={!nftForm.isValid || isLoading == true || !isFileValid}
            type="submit"
            className={styles.createButton}
            style={
              !nftForm.isValid || isLoading == true
                ? {
                    backgroundColor: `rgba(0,102,255,0.15)`,
                    color: "black",
                    border: "none",
                  }
                : {}
            }
          >
            Create
          </Button>
        </form>
      </div>
    </div>
  );
};
export default ERC721;
