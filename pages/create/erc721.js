import React, { useEffect, useState } from "react";
import styles from "/styles/erc721.module.css";
import axios from "axios";
import { CloudUploadOutlined } from "@ant-design/icons";
import { Menu, Dropdown, Button } from "antd";

const pinataApiKey = "7b316dc9992fd3f371ee";
const pinataSecretApiKey =
  "a282c78214f46a036282b889ad01803f84b52c879747436f5a740d56951f5a0c";
const pinataJwt =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySW5mb3JtYXRpb24iOnsiaWQiOiJjYzA0M2Y4Yi0yMDA4LTQwNGMtOTczNC1jMzFmOTBhNmFkMzciLCJlbWFpbCI6Im1vaGNlbi5wYXJzYUBnbWFpbC5jb20iLCJlbWFpbF92ZXJpZmllZCI6dHJ1ZSwicGluX3BvbGljeSI6eyJyZWdpb25zIjpbeyJpZCI6Ik5ZQzEiLCJkZXNpcmVkUmVwbGljYXRpb25Db3VudCI6MX1dLCJ2ZXJzaW9uIjoxfSwibWZhX2VuYWJsZWQiOmZhbHNlfSwiYXV0aGVudGljYXRpb25UeXBlIjoic2NvcGVkS2V5Iiwic2NvcGVkS2V5S2V5IjoiN2IzMTZkYzk5OTJmZDNmMzcxZWUiLCJzY29wZWRLZXlTZWNyZXQiOiJhMjgyYzc4MjE0ZjQ2YTAzNjI4MmI4ODlhZDAxODAzZjg0YjUyYzg3OTc0NzQzNmY1YTc0MGQ1Njk1MWY1YTBjIiwiaWF0IjoxNjI1OTUzMzgzfQ.etp-RgF8GENrIQItCqYww_GT7ZrEnJoNx0vbSpbnTOg";

const menu = (
  <Menu>
    <Menu.Item>cosplay-made-in-japan</Menu.Item>
    <Menu.Item>unofficial-bayc-collectibles</Menu.Item>
    <Menu.Item>reika-mandala-art</Menu.Item>
    <Menu.Item>atixi</Menu.Item>
  </Menu>
);
const ERC721 = () => {
  const [uploadFileUrl, setUploadFileUrl] = useState(null);
  const [file, setFile] = useState(null);
  const [isValid, setIsValid] = useState(false);
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

  const loadCollections = async () => {
    const data = await axios.get(
      "https://rim-entertainment.herokuapp.com/collections"
    );
    console.log("collections", data);
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
    const data = new FormData();
    data.append("file", file);

    const url = `https://api.pinata.cloud/pinning/pinFileToIPFS`;
    const uploadRes = await axios.post(url, data, {
      maxContentLength: "Infinity",
      headers: {
        "Content-Type": `multipart/form-data; boundary=${data._boundary}`,
        pinata_api_key: pinataApiKey,
        pinata_secret_api_key: pinataSecretApiKey,
      },
    });

    console.log("result of file uploading is ", uploadRes);
  };
  return (
    <div className={styles.container}>
      <h1 className={styles.header}>Create new item</h1>
      <h4 className={styles.subHeader}>Image, Video, Audio, or 3D Model</h4>
      <p className={styles.fileTypes}>
        File types supported: JPG, PNG, GIF, SVG, MP4, WEBM, MP3, WAV, OGG, GLB,
        GLTF. Max size: 40 MB
      </p>
      <div className={styles.FileUpload}>
        <form onSubmit={handleSubmit} className={styles.uploadForm}>
          <div className={styles.uploadedFileContainer}>
            {uploadFileUrl ? (
              <img
                src={uploadFileUrl}
                width={50}
                height={50}
                className={styles.uploadedFile}
                onClick={openFileUpload}
              />
            ) : (
              <button className={styles.uploadedFile} onClick={openFileUpload}>
                <CloudUploadOutlined
                  size="large"
                  className={styles.uploadIcon}
                />
              </button>
            )}
          </div>

          <input
            type="file"
            onChange={handleFileUpload}
            ref={hiddenFileInput}
            style={{ display: "none" }}
          />
          <div>
            <h1 className={styles.collectionHeader}> Collection</h1>
            <p className={styles.collectionParagraph}>
              This is the collection where your item will appear. info
            </p>
            <Dropdown
              overlay={menu}
              placement="bottomCenter"
              arrow
              className={styles.collectionDropdown}
            >
              <Button>Collection</Button>
            </Dropdown>
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
