import React, { useEffect, useState } from "react";
import styles from "/styles/erc721.module.css";
import axios from "axios";
import { CloudUploadOutlined } from "@ant-design/icons";
import { Menu, Dropdown, Button, Input, Tooltip } from "antd";
import { fetch, post } from "/Utils/strapiApi";

const pinataApiKey = "7b316dc9992fd3f371ee";
const pinataSecretApiKey =
  "a282c78214f46a036282b889ad01803f84b52c879747436f5a740d56951f5a0c";
const pinataJwt =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySW5mb3JtYXRpb24iOnsiaWQiOiJjYzA0M2Y4Yi0yMDA4LTQwNGMtOTczNC1jMzFmOTBhNmFkMzciLCJlbWFpbCI6Im1vaGNlbi5wYXJzYUBnbWFpbC5jb20iLCJlbWFpbF92ZXJpZmllZCI6dHJ1ZSwicGluX3BvbGljeSI6eyJyZWdpb25zIjpbeyJpZCI6Ik5ZQzEiLCJkZXNpcmVkUmVwbGljYXRpb25Db3VudCI6MX1dLCJ2ZXJzaW9uIjoxfSwibWZhX2VuYWJsZWQiOmZhbHNlfSwiYXV0aGVudGljYXRpb25UeXBlIjoic2NvcGVkS2V5Iiwic2NvcGVkS2V5S2V5IjoiN2IzMTZkYzk5OTJmZDNmMzcxZWUiLCJzY29wZWRLZXlTZWNyZXQiOiJhMjgyYzc4MjE0ZjQ2YTAzNjI4MmI4ODlhZDAxODAzZjg0YjUyYzg3OTc0NzQzNmY1YTc0MGQ1Njk1MWY1YTBjIiwiaWF0IjoxNjI1OTUzMzgzfQ.etp-RgF8GENrIQItCqYww_GT7ZrEnJoNx0vbSpbnTOg";

const ERC721 = () => {
  const [collectionMenu, setCollectionMenu] = useState(null);
  const [uploadFileUrl, setUploadFileUrl] = useState(null);
  const [file, setFile] = useState(null);
  const [isValid, setIsValid] = useState(false);
  const [collections, setCollections] = useState();

  // Create a reference to the hidden file input element
  const hiddenFileInput = React.useRef(null);

  useEffect(() => {
    loadCollections();
    postNft();
  }, []);
  // Programatically click the hidden file input element
  // when the Button component is clicked
  const openFileUpload = (event) => {
    event.preventDefault();
    hiddenFileInput.current.click();
  };

  const postNft = async () => {
    const data = {
      tokenId:
        "103750325357517214391910940774049778145622348743697075275564645855722148462593",
      tokenAddress: "0x495f947276749ce646f68ac8c248420045cb7b5e",
      name: "sailor No.3 corpetto",
      collections: "1",
      categories: "1",
      previewImage:
        "https://gateway.pinata.cloud/ipfs/QmNSfza75tLLj5wcNfL9GqKLncuhNv61gwJCtj9UxdjESV",
      talent: "1",
      metadata: {
        url: "http://hello.com",
        description: "this is very good nft",
        image_url: "http://ifps/hello.com",
      },
    };
    const response = await post("nfts", data);
    console.log("response is ", response);
  };
  const loadCollections = async () => {
    const { data } = await fetch("collections");
    if (data) {
      const menu = (
        <Menu>
          {data.map((item) => (
            <Menu.Item key={item.id}>{item.collectionName}</Menu.Item>
          ))}
        </Menu>
      );

      setCollectionMenu(menu);
    }
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
            <Input placeholder="Item Name" className={styles.nftInput} />
          </div>
          <div className={styles.nftInputComponent}>
            <h3 className={styles.nftSubHeader}>External Link</h3>
            <p className={styles.nfgParagraph}>
              OpenSea will include a link to this URL on this item's detail
              page, so that users can click to learn more about it. You are
              welcome to link to your own webpage with more details.
            </p>
            <Input
              placeholder="https://yoursite.ion/item/123"
              className={styles.nftInput}
            />
          </div>
          <div className={styles.nftInputComponent}>
            <h3 className={styles.nftSubHeader}>Description</h3>
            <p className={styles.nfgParagraph}>
              The description will be included on the item's detail page
              underneath its image. Markdown syntax is supported.
            </p>
            <Input
              placeholder="Peovide a detailed description of your item"
              className={styles.nftInput}
            />
          </div>
          <div className={styles.nftInputComponent}>
            <h3 className={styles.nftSubHeader}> Collection *</h3>
            <p className={styles.nfgParagraph}>
              This is the collection where your item will appear. info
            </p>
            <Dropdown
              overlay={collectionMenu}
              placement="bottomLeft"
              arrow
              className={[styles.collectionDropdown, styles.nftInput]}
            >
              <Button>Collection</Button>
            </Dropdown>
          </div>
          <div className={styles.nftInputComponent}>
            <h3 className={styles.nftSubHeader}>Supply</h3>
            <p className={styles.nfgParagraph}>
              The number of copies that can be minted. No gas cost to you!
              Quantities above one coming soon.
            </p>
            <Input
              placeholder="Peovide a detailed description of your item"
              className={styles.nftInput}
            />
          </div>
          <div className={styles.nftInputComponent}>
            <h3 className={styles.nftSubHeader}>Blockchain</h3>
            <p className={styles.nfgParagraph}>
              Freezing your metadata will allow you to permanently lock and
              store all of this item's content in decentralized file storage.
              <span className={styles.nfgParagraphSpan}>
                <Tooltip
                  overlayInnerStyle={{
                    width: 400,
                    backgroundColor: `#04111D`,
                    padding: 15,
                    textAlign: "center",
                  }}
                  title={`Once locked, your content cannot be edited or removed as it is
                permanently stored in decentralized file storage, which will be
                accessible for other clients to view and use. `}
                  placement="top"
                >
                  Info
                </Tooltip>
              </span>
            </p>
            <Input
              placeholder="Peovide a detailed description of your item"
              className={styles.nftInput}
            />
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
