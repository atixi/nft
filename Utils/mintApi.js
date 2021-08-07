import HDWalletProvider from "@truffle/hdwallet-provider";
import collectionArtifact from "./../build/contracts/Rimable.json";

import Web3 from "web3";
import axios from "axios";
import { slugify } from "./utils";

const INFURA_KEY = "c2dde5d7c0a0465a8e994f711a3a3c31";
const ALCHEMY_KEY = "PGlxDmz18UTsTeDW5dc-qpKevhALbA-b";
const RINKEBY_KEY = "c2dde5d7c0a0465a8e994f711a3a3c31";
// const RINKEBY_NODE_URL = `https://rinkeby.infura.io/v3/${RINKEBY_KEY}`;
const RINKEBY_NODE_URL = `wss://rinkeby.infura.io/ws/v3/${RINKEBY_KEY}`;
const INFURA_NODE_URL = `https://infura.io/v3/${INFURA_KEY}`;
const METAMASK_MNEMONIC =
  "pink dose endorse soccer demand pink fringe search always invest twin tower";
const pinataApiKey = "de68bc3ddb8bf7a53749";
const pinataSecretApiKey =
  "47ea101a80715e023688af759d27f84d8b5eca43b94612cb905735eb398fed55";
const pinataJwt =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySW5mb3JtYXRpb24iOnsiaWQiOiI1YzEwN2JkMC1kMjA5LTRlOGYtYWM2MS0zYzliZjM1ZjFjODQiLCJlbWFpbCI6Im1wYXJzYUBnYXRld2F5aWN0cy5jb20iLCJlbWFpbF92ZXJpZmllZCI6dHJ1ZSwicGluX3BvbGljeSI6eyJyZWdpb25zIjpbeyJpZCI6Ik5ZQzEiLCJkZXNpcmVkUmVwbGljYXRpb25Db3VudCI6MX1dLCJ2ZXJzaW9uIjoxfSwibWZhX2VuYWJsZWQiOmZhbHNlfSwiYXV0aGVudGljYXRpb25UeXBlIjoic2NvcGVkS2V5Iiwic2NvcGVkS2V5S2V5IjoiZGU2OGJjM2RkYjhiZjdhNTM3NDkiLCJzY29wZWRLZXlTZWNyZXQiOiI0N2VhMTAxYTgwNzE1ZTAyMzY4OGFmNzU5ZDI3Zjg0ZDhiNWVjYTQzYjk0NjEyY2I5MDU3MzVlYjM5OGZlZDU1IiwiaWF0IjoxNjI2MDkxNDM5fQ.dQcFRAwxieC16TSZMJElj6_4kskljJpR_WdkqppFWQw";
const provider = new HDWalletProvider({
  mnemonic: {
    phrase: METAMASK_MNEMONIC,
  },
  providerOrUrl: RINKEBY_NODE_URL,
  pollingInterval: 200000,
});
// const provider = createWeb3();
const web3 = new Web3(provider);
const OWNER_ADDRESS = "0x8CA35f878fD14992b58a18bEB484f721b1d07A33";

export const capitalizeWorkd = (value) => {
  return value.charAt(0).toUpperCase() + value.slice(1);
};

export const checkForDuplicate = (array, input, searchField) => {
  if (input != "") {
    const isDuplicate = array.some(
      (item) => item[searchField] == input.toString().trim()
    );
    if (isDuplicate) {
      return {
        isDuplicate,
        message: `× ${capitalizeWorkd(searchField)} is already taken`,
      };
    } else {
      return {
        isDuplicate,
        message: `✔ This ${capitalizeWorkd(searchField)} is  available.`,
      };
    }
  }
};

export const getTokenId = async (txHash) => {
  var receipt = await web3.eth.getTransactionReceipt(txHash);
  return web3.utils.hexToNumber(receipt.logs[0].topics[3]);
};

export const validateImage = (file, limitSize) => {
  if (!file) {
    return {
      message: "NFT Image is Required hhh",
      status: false,
    };
  } else {
    let typeStatus = checkFileType(file);
    let sizeStatus = checkFileSize(file, limitSize);
    if (!sizeStatus.isSizeValid) {
      return {
        message: sizeStatus.message,
        status: false,
      };
    } else if (!typeStatus.isTypeValid) {
      return {
        message: typeStatus.message,
        status: false,
      };
    } else {
      return {
        message: null,
        status: true,
      };
    }
  }
};

export const checkFileType = (file) => {
  if (
    [
      "image/jpeg",
      "image/png",
      "image/svg",
      "image/jpg",
      "image/gif",
      "image/svg+xml",
    ].includes(file.type)
  ) {
    return { mediaType: "image", message: null, isTypeValid: true };
  } else if (
    [
      "video/mp4",
      "video/webm",
      "video/mp3",
      "video/wav",
      "video/ogg",
      "video/glb",
      "video/gltf",
    ].includes(file.type)
  ) {
    return { mediaType: "video", message: null, isTypeValid: true };
  } else {
    return {
      mediaType: "undefined",
      message: "Media Type is Invalid",
      isTypeValid: false,
    };
  }
};

export const checkFileSize = (file, sizeLimit) => {
  if (file) {
    const mbSize = Math.round(file.size / 1024 / 1024);
    if (mbSize < sizeLimit) {
      return {
        size: mbSize,
        isSizeValid: true,
        message: "File Size is Valid",
      };
    }
    return {
      size: mbSize,
      isSizeValid: false,
      message: `File is Too Large, File size should be less than ${sizeLimit} MB`,
    };
  }
};

export const saveFileToPinata = (file) => {
  const pinataData = new FormData();
  pinataData.append("file", file);
  const url = `https://api.pinata.cloud/pinning/pinFileToIPFS`;

  return axios
    .post(url, pinataData, {
      maxContentLength: "Infinity",
      headers: {
        "Content-Type": `multipart/form-data; boundary=${pinataData._boundary}`,
        pinata_api_key: pinataApiKey,
        pinata_secret_api_key: pinataSecretApiKey,
      },
    })
    .then(function (response) {
      return {
        success: true,
        pinataUrl:
          "https://gateway.pinata.cloud/ipfs/" + response.data.IpfsHash,
        ipfsUrl: "https://ipfs.io/ipfs/" + response.data.IpfsHash,
      };
    })
    .catch(function (error) {
      console.log(error);
      return {
        success: false,
        message: error.message,
      };
    });
};

export const pinJSONToIPFS = (metaContent, mediaType) => {
  const metadata = {
    pinataMetadata: {
      name: (metaContent.name + " - " + mediaType).toUpperCase(),
    },
    pinataContent: metaContent,
  };

  const url = `https://api.pinata.cloud/pinning/pinJSONToIPFS`;
  return axios
    .post(url, metadata, {
      maxContentLength: "Infinity",
      headers: {
        pinata_api_key: pinataApiKey,
        pinata_secret_api_key: pinataSecretApiKey,
      },
    })
    .then(function (response) {
      return {
        success: true,
        pinataUrl:
          "https://gateway.pinata.cloud/ipfs/" + response.data.IpfsHash,
        ipfsUrl: "https://ipfs.io/ipfs/" + response.data.IpfsHash,
      };
    })
    .catch(function (error) {
      console.log(error);
      return {
        success: false,
        message: error.message,
      };
    });
};

export const deployCollection = async (logo, banner, values) => {
  let collectionData = new Object();
  const fileType = checkFileType(logo);
  console.log("values is ", values);
  const logoFileResult = await saveFileToPinata(logo);
  const bannerFileResult = await saveFileToPinata(banner);
  console.log("wating to upload collection image...");

  if (logoFileResult.success && bannerFileResult.success) {
    const ipfsUrl = logoFileResult.ipfsUrl;
    const bannerIpfsUrl = bannerFileResult.ipfsUrl;
    const metadata = {
      name: values.name,
      description: values.description,
      image: ipfsUrl,
      banner_image_url: bannerIpfsUrl,
      ...(fileType.mediaType == "video" && {
        animation_url: ipfsUrl,
      }),
      ...(values.external_link && { external_link: values.external_link }),
    };
    console.log("collection metadata is ", metadata);
    const collectionMetadataResult = await pinJSONToIPFS(
      metadata,
      "collection"
    );
    console.log("wating to upload collection metadata...");
    if (collectionMetadataResult.success) {
      const collectionUri = collectionMetadataResult.ipfsUrl;
      console.log("wating to deploy collection...");

      try {
        // await window.web3.currentProvider.enable();
        const deployedCollection = await new web3.eth.Contract(
          collectionArtifact.abi
        )
          .deploy({
            name: "Rimable",
            data: collectionArtifact.bytecode,
            arguments: [
              "0xf57b2c51ded3a29e6891aba85459d600256cf317",
              "Rimable",
              "RIMABLE",
              collectionUri,
            ],
          })
          .send({
            from: "0x8CA35f878fD14992b58a18bEB484f721b1d07A33",
            gas: "6721975",
          });

        console.log(
          "collection is deployed at ",
          deployedCollection.options.address
        );

        collectionData.contractAddress = deployedCollection.options.address;
        collectionData.talentAddress =
          deployedCollection.currentProvider.addresses[0];
        collectionData.collectionName = values.name;
        console.log("name of collection is: ", values.name.toString());
        collectionData.slug = slugify(values.name.toString());
        console.log("slug of collection is ", collectionData.slug);
        const uploadResult = await uploadCollectionToStrapi(
          logo,
          banner,
          collectionData
        );
        if (uploadResult.success) {
          return uploadResult;
        }
        provider.engine.stop();
      } catch (e) {
        console.log("error");
      }
    }
  }
  return {
    success: false,
    message: error.message,
  };
};

export const uploadNft = async (file, values, onUploadProgress) => {
  let nftData = new Object();
  let metadata = new Object();
  let tokenId;
  const fileType = checkFileType(file);
  console.log("nft values is ", values);

  const fileUploadResult = await saveFileToPinata(file);

  if (fileUploadResult.success) {
    console.log(
      "File is uploaded to pinata successfully",
      fileUploadResult.ipfsUrl
    );

    console.log("start uploading metadata...");

    const ipfsUrl = fileUploadResult.ipfsUrl;
    metadata = {
      name: values.name,
      description: values.description,
      image: ipfsUrl,
      ...(fileType.mediaType == "video" && {
        animation_url: ipfsUrl,
      }),
      ...(values.external_link && { external_link: values.external_link }),
    };
    console.log("Asset metadata is ", metadata);
    const metadataUploadResult = await pinJSONToIPFS(metadata, "asset");
    if (metadataUploadResult.success) {
      console.log("uploaded metadata uri is ", metadataUploadResult);
      const mintingResult = await mintNft(
        values.collections.contractAddress,
        OWNER_ADDRESS,
        metadataUploadResult.ipfsUrl
      );
      console.log("minting result is ", mintingResult);
      tokenId = await getTokenId(mintingResult.transactionHash);
      console.log("Asset token Id is ", tokenId);
    }
  }
  if (tokenId != 0) {
    nftData.tokenId = tokenId.toString();
    nftData.tokenAddress = values.collections.contractAddress;
    nftData.collections = values.collections;
    nftData.name = values.name;
    nftData.categories = values.categories;
    nftData.metadata = metadata;
    console.log("NFT data is ", nftData);
    const strapiResult = await uploadNftToStrapi(file, nftData);
    if (strapiResult.success == true) {
      console.log("Nft is uploaded to strapi", strapiResult);
      return strapiResult;
    }
  }
};

export const mintNft = (contractAddress, ownerAddress, metadataUri) => {
  try {
    const nftContract = new web3.eth.Contract(
      collectionArtifact.abi,
      contractAddress,
      {
        gasLimit: "1000000",
      }
    );
    console.log(
      "starting to mint One Rimable Asset with contract Address: ",
      contractAddress
    );
    return nftContract.methods
      .mintTo(ownerAddress, metadataUri)
      .send({ from: ownerAddress });
  } catch (e) {
    console.log("error ", e);
  }
};

export const uploadCollectionToStrapi = (logo, banner, collectionData) => {
  let formData = new FormData();
  formData.append("files.collectionImageURL", logo);
  formData.append("files.collectionBanner", banner);
  formData.append("data", JSON.stringify(collectionData));
  console.log("uploading to strapi...");
  return axios
    .post("http://localhost:1337/collections", formData, {
      headers: {
        "Content-Type": `multipart/form-data`,
      },
    })
    .then(function () {
      return {
        success: true,
        message: "Collection Deployed Successfully",
      };
    })
    .catch(function (error) {
      console.log(error);
      return {
        success: false,
        message: error.message,
      };
    });
};

export const uploadNftToStrapi = (file, nftMetadata) => {
  let formData = new FormData();
  formData.append("files.previewImage", file);
  formData.append("data", JSON.stringify(nftMetadata));
  console.log("uploading fntData to strapi...");
  return axios
    .post("http://localhost:1337/nfts", formData, {
      headers: {
        "Content-Type": `multipart/form-data`,
      },
    })
    .then(function () {
      return {
        success: true,
        message: "Nft Deployed Successfully",
      };
    })
    .catch(function (error) {
      console.log(error);
      return {
        success: false,
        message: error.message,
      };
    });
};

export const connectWallet = async () => {
  if (window.ethereum) {
    try {
      const addressArray = await window.ethereum.request({
        method: "eth_requestAccounts",
      });
      const obj = {
        status: "👆🏽 wallet address",
        address: addressArray[0],
      };
      return obj;
    } catch (err) {
      return {
        address: "",
        status: "😥 " + err.message,
      };
    }
  } else {
    return {
      status: `🦊 You must install Metamask, a virtual Ethereum wallet, in your plz go to "https://metamask.io/download.html" and add extenstion to your browser`,
    };
  }
};
