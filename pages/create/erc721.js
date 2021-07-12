import React, { useEffect, useState } from "react";
import styles from "/styles/erc721.module.css";
import axios from "axios";
import { CloudUploadOutlined } from "@ant-design/icons";
import { Menu, Dropdown, Button, Input, Tooltip, Select } from "antd";
import { fetch, post } from "/Utils/strapiApi";

const pinataApiKey = "7b316dc9992fd3f371ee";
const pinataSecretApiKey =
  "a282c78214f46a036282b889ad01803f84b52c879747436f5a740d56951f5a0c";
const pinataJwt =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySW5mb3JtYXRpb24iOnsiaWQiOiJjYzA0M2Y4Yi0yMDA4LTQwNGMtOTczNC1jMzFmOTBhNmFkMzciLCJlbWFpbCI6Im1vaGNlbi5wYXJzYUBnbWFpbC5jb20iLCJlbWFpbF92ZXJpZmllZCI6dHJ1ZSwicGluX3BvbGljeSI6eyJyZWdpb25zIjpbeyJpZCI6Ik5ZQzEiLCJkZXNpcmVkUmVwbGljYXRpb25Db3VudCI6MX1dLCJ2ZXJzaW9uIjoxfSwibWZhX2VuYWJsZWQiOmZhbHNlfSwiYXV0aGVudGljYXRpb25UeXBlIjoic2NvcGVkS2V5Iiwic2NvcGVkS2V5S2V5IjoiN2IzMTZkYzk5OTJmZDNmMzcxZWUiLCJzY29wZWRLZXlTZWNyZXQiOiJhMjgyYzc4MjE0ZjQ2YTAzNjI4MmI4ODlhZDAxODAzZjg0YjUyYzg3OTc0NzQzNmY1YTc0MGQ1Njk1MWY1YTBjIiwiaWF0IjoxNjI1OTUzMzgzfQ.etp-RgF8GENrIQItCqYww_GT7ZrEnJoNx0vbSpbnTOg";

const initNftData = {
  tokenId: null,
  tokenAddress: null,
  name: null,
  collections: null,
  categories: null,
  previewImage: null,
  talent: null,
  metadata: {
    description: null,
    image_url: null,
    external_link: null,
  },
};
const { option } = Select;
const ERC721 = () => {
  const [collectionMenu, setCollectionMenu] = useState(null);
  const [selectedCollection, setSelectedCollection] = useState(null);
  const [uploadFileUrl, setUploadFileUrl] = useState(null);
  const [file, setFile] = useState(null);
  const [isValid, setIsValid] = useState(false);
  const [collections, setCollections] = useState(null);
  const [nftData, setNftData] = useState(null);

  const [name, setName] = useState("");
  const [collectionName, setCollectionName] = useState("");
  const [categories, setCategories] = useState(1);
  const [talent, setTalen] = useState("");
  const [externalLink, setExternalLink] = useState("");
  const [description, setDescription] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [previewImage, setPreviewImage] = useState("");

  // Create a reference to the hidden file input element
  const hiddenFileInput = React.useRef(null);

  useEffect(() => {
    loadCollections();
  }, []);
  // Programatically click the hidden file input element
  // when the Button component is clicked
  const openFileUpload = (event) => {
    event.preventDefault();
    hiddenFileInput.current.click();
  };

  const saveNft = async () => {
    // const data = {
    //   tokenId:
    //     "103750325357517214391910940774049778145622348743697075275564645855722148462593",
    //   tokenAddress: "0x495f947276749ce646f68ac8c248420045cb7b5e",
    //   name: "sailor No.3 corpetto",
    //   collections: selectedCollection.id.toString(),
    //   categories: "1",
    //   previewImage:
    //     "https://gateway.pinata.cloud/ipfs/QmNSfza75tLLj5wcNfL9GqKLncuhNv61gwJCtj9UxdjESV",
    //   talent: "1",
    //   metadata: {
    //     url: "http://hello.com",
    //     description: "this is very good nft",
    //     image_url: "http://ifps/hello.com",
    //   },
    // };
    const response = await post("nfts", data);
    console.log("response is ", response);
  };

  const handleCollectionChange = (value) => {
    const col = collections.filter((item) => item.slug == value)[0];
    setSelectedCollection(col);
  };
  const loadCollections = async () => {
    const result = await fetch("collections");
    const data = await result.data;
    if (data) {
      setCollections(data);
    }
  };
  const handleFileUpload = (event) => {
    event.preventDefault();
    var file = event.target.files[0];
    if (file) {
      setFile(file);
      setUploadFileUrl(URL.createObjectURL(event.target.files[0]));
      console.log("uploadFileUrl ", uploadFileUrl);
      setIsValid(true);
    }
  };
  const handleSubmit = async (event) => {
    event.preventDefault();
    setIsValid(false);
    const data = {
      tokenId:
        "103750325357517214391910940774049778145622348743697075275564645855722148462593",
      tokenAddress: "0x495f947276749ce646f68ac8c248420045cb7b5e",
      name,
      collections: selectedCollection.id.toString(),
      categories: "1",
      previewImage,
      talent: 1,
      metadata: {
        url: externalLink,
        description,
        imageUrl,
      },
    };
    // setNftData();
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
      setPreviewImage(
        "https://gateway.pinata.cloud/ipfs/" + pintaData.IpfsHash
      );
      setImageUrl("https://gateway.pinata.cloud/ipfs/" + pintaData.IpfsHash);
      console.log("nft data is : ", data);
      const nftResponse = await post("nfts", data);
      console.log("nftResponse is ", nftResponse);
    }

    setIsValid(true);
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
        <form onSubmit={handleSubmit} className={styles.uploadForm}>
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
              type="file"
              onChange={handleFileUpload}
              ref={hiddenFileInput}
              style={{ display: "none" }}
            />
          </div>
          <div className={styles.nftInputComponent}>
            <h3 className={styles.nftSubHeader}>Name *</h3>
            <input
              placeholder="Item Name"
              className={styles.nftInput}
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>
          <div className={styles.nftInputComponent}>
            <h3 className={styles.nftSubHeader}>External Link</h3>
            <p className={styles.nfgParagraph}>
              {"OpenSea will include a link to this URL on this item's detail page, so that users can click to learn more about it. You are welcome to link to your own webpage with more details."}
            </p>
            <input
              placeholder="https://yoursite.ion/item/123"
              className={styles.nftInput}
              value={externalLink}
              onChange={(e) => setExternalLink(e.target.value)}
            />
          </div>
          <div className={styles.nftInputComponent}>
            <h3 className={styles.nftSubHeader}>Description</h3>
            <p className={styles.nfgParagraph}>
              {"The description will be included on the item's detail page underneath its image. Markdown syntax is supported."}
            </p>
            <input
              placeholder="Provide a detailed description of your item"
              className={styles.nftInput}
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
          </div>
          <div className={styles.nftInputComponent}>
            <h3 className={styles.nftSubHeader}> Collection *</h3>
            <p className={styles.nfgParagraph}>
              This is the collection where your item will appear. info
            </p>
            {collections && (
              <Select
                size={`large`}
                style={{ width: `100%`, height: `40px` }}
                value={
                  selectedCollection ? selectedCollection?.collectionName : ""
                }
                onChange={handleCollectionChange}
              >
                {collections.map((item) => (
                  <Select.Option
                    value={item.slug}
                    key={item.id}
                    style={{ height: 50, padding: 10 }}
                  >
                    {item.collectionName}
                  </Select.Option>
                ))}
              </Select>
            )}
          </div>
          <button disabled={isValid == false} className={styles.createButton}>
            Create
          </button>
        </form>
      </div>
    </div>
  );
};
export default ERC721;
