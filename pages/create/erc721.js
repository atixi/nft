import React, { useEffect, useState } from "react";
import styles from "/styles/erc721.module.css";
import qs from "qs";
import axios from "axios";
import { Menu, Dropdown, Button, Input, Tooltip, Select } from "antd";
import { fetch, post } from "/Utils/strapiApi";
import { useFormik } from "formik";
import * as Yup from "yup";
import { localCols, localCategories } from "/Constants/constants";

const pinataApiKey = "de68bc3ddb8bf7a53749";
const pinataSecretApiKey =
  "47ea101a80715e023688af759d27f84d8b5eca43b94612cb905735eb398fed55";
const pinataJwt =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySW5mb3JtYXRpb24iOnsiaWQiOiI1YzEwN2JkMC1kMjA5LTRlOGYtYWM2MS0zYzliZjM1ZjFjODQiLCJlbWFpbCI6Im1wYXJzYUBnYXRld2F5aWN0cy5jb20iLCJlbWFpbF92ZXJpZmllZCI6dHJ1ZSwicGluX3BvbGljeSI6eyJyZWdpb25zIjpbeyJpZCI6Ik5ZQzEiLCJkZXNpcmVkUmVwbGljYXRpb25Db3VudCI6MX1dLCJ2ZXJzaW9uIjoxfSwibWZhX2VuYWJsZWQiOmZhbHNlfSwiYXV0aGVudGljYXRpb25UeXBlIjoic2NvcGVkS2V5Iiwic2NvcGVkS2V5S2V5IjoiZGU2OGJjM2RkYjhiZjdhNTM3NDkiLCJzY29wZWRLZXlTZWNyZXQiOiI0N2VhMTAxYTgwNzE1ZTAyMzY4OGFmNzU5ZDI3Zjg0ZDhiNWVjYTQzYjk0NjEyY2I5MDU3MzVlYjM5OGZlZDU1IiwiaWF0IjoxNjI2MDkxNDM5fQ.dQcFRAwxieC16TSZMJElj6_4kskljJpR_WdkqppFWQw";

const { option } = Select;

const ERC721 = () => {
  const [collections, setCollections] = useState(localCols);
  const [categories, setCategories] = useState(localCategories);
  const [selectedCollection, setSelectedCollection] = useState(null);
  const [selectedCategories, setSelectedCategories] = useState(null);
  const [uploadFileUrl, setUploadFileUrl] = useState(null);
  const [file, setFile] = useState(null);
  // const [isValid, setIsValid] = useState(false);
  const [isLoading, setLoading] = useState(false);

  const nftForm = useFormik({
    initialValues: {
      tokenId: "",
      tokenAddress: "",
      name: "",
      collections: 1,
      categories: 1,
      talent: "",
      description: "",
      external_link: "",
    },
    validationSchema: Yup.object({
      tokenId: Yup.string(),
      tokenAddress: Yup.string(),
      name: Yup.string().required(),
      // collections: Yup.number(),
      talent: Yup.string(),
      description: Yup.string(),
      external_link: Yup.string(),
    }),
    onSubmit: (values, { resetForm }) => {
      console.log("subimting");
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
          image: image_url,
          preview_image_url: preview_image_url,
        },
      };

      console.log("nft data is ", nftData);
      const nftResponse = await post(
        `https://rim-entertainment.herokuapp.com/nfts`,
        nftData,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      console.log("nftResponse is ", nftResponse);
      setLoading(false);
      nftForm.resetForm();
      // setIsValid(true);
    }
  };
  const hiddenFileInput = React.useRef(null);

  useEffect(() => {
    // loadCategories();
    // loadCollections();
  }, []);

  const openFileUpload = (event) => {
    event.preventDefault();
    console.log("file upload click");
    hiddenFileInput.current.click();
  };

  const handleCategoriesChange = (value) => {
    const cats = categories.filter((item) => item.id == value)[0];
    setSelectedCategories(cats);
  };
  const handleCollectionChange = (value) => {
    const col = collections.filter((item) => item.slug == value)[0];
    setSelectedCollection(col);
  };
  // const loadCollections = async () => {
  //   const result = await fetch("collections");
  //   const data = await result.data;
  //   console.log("collections are is ", data);
  //   if (data) {
  //     setCollections(data);
  //   }
  // };
  const loadCategories = async () => {
    const categoriesData = await fetch("/categories");
    const cats = await categoriesData.data;
    console.log("categories", cats);
    setCategories(cats);
  };
  const handleFileUpload = (event) => {
    event.preventDefault();
    console.log("hadnel file uplodafsdlkjasl");
    var file = event.target.files[0];
    if (file) {
      // setIsValid(true);
      setFile(file);
      setUploadFileUrl(URL.createObjectURL(event.target.files[0]));
    }
  };
  return (
    <div className={styles.container}>
      <div className={styles.nftFormContainer}>
        <h1 className={styles.header}>Create new item</h1>
        <h4 className={styles.subHeader}>Image, Video, Audio, or 3D Model</h4>
        <p className={styles.fileTypes}>
          File types supported: JPG, PNG, GIF, SVG, MP4, WEBM, MP3, WAV, OGG,
          GLB, GLTF. Max size: 40 MB
        </p>
        <form className={styles.uploadForm} onSubmit={nftForm.handleSubmit}>
          <div className={styles.uploadedFileContainer}>
            {uploadFileUrl ? (
              <div className={styles.imageBox}>
                <img
                  src={uploadFileUrl}
                  className={"img-fluid"}
                  onClick={openFileUpload}
                />
                <label className={styles.changeUploadedImage}>Change</label>
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
            <input
              name="file"
              id="file"
              type="file"
              onChange={handleFileUpload}
              ref={hiddenFileInput}
              style={{ display: "none" }}
            />
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
              {"OpenSea will include a link to this URL on this item's detail page, so that users can click to learn more about it. You are welcome to link to your own webpage with more details."}
            </p>
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
              {"The description will be included on the item's detail page underneath its image. Markdown syntax is supported."}
            </p>
            <input
              name="description"
              id="description"
              placeholder="Provide a detailed description of your item"
              className={styles.nftInput}
              value={nftForm.values.description}
              onChange={nftForm.handleChange}
            />
          </div>
          <div className={styles.nftInputComponent}>
            <h3 className={styles.nftSubHeader}> Collection *</h3>
            <p className={styles.nfgParagraph}>
              This is the collection where your item will appear. info
            </p>
            {collections && (
              <select
                style={{ width: `100%`, height: `40px` }}
                name="collections"
                id="collections"
                value={nftForm.values.collections}
                onChange={nftForm.handleChange}
              >
                {collections.map((item) => (
                  <option
                    value={item.id}
                    key={item.id}
                    style={{ height: 50, padding: 10 }}
                  >
                    {item.collectionName}
                  </option>
                ))}
              </select>
            )}
          </div>
          <div className={styles.nftInputComponent}>
            <h3 className={styles.nftSubHeader}> Categories *</h3>
            <p className={styles.nfgParagraph}>
              This is the Category where your item will appear. info
            </p>
            {categories && (
              <select
                style={{ width: `100%`, height: `40px` }}
                name="categories"
                id="categories"
                value={nftForm.values.categories}
                onChange={nftForm.handleChange}
              >
                {categories.map((item) => (
                  <option
                    value={item.id}
                    key={item.id}
                    style={{ height: 50, padding: 10 }}
                  >
                    {item.categoryName}
                  </option>
                ))}
              </select>
            )}
          </div>
          <button
            disabled={!nftForm.isValid || isLoading == true}
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
          </button>
        </form>
      </div>
    </div>
  );
};
export default ERC721;
