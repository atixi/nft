const HDWalletProvider = require("@truffle/hdwallet-provider");
const web3 = require("web3");
const INFURA_KEY = "c2dde5d7c0a0465a8e994f711a3a3c31";
const METAMASK_MNEMONIC =
  "pink dose endorse soccer demand pink fringe search always invest twin tower";
const ALCHEMY_KEY = "PGlxDmz18UTsTeDW5dc-qpKevhALbA-b";
const RINKEBY_KEY = "c2dde5d7c0a0465a8e994f711a3a3c31";
// const NFT_CONTRACT_ADDRESS = "0xEdE960358F34e59bb0B5bef43a01162bc2FCD8F8";
const NFT_CONTRACT_ADDRESS = "0x050aDa796922b7dCa16251fA2E62A68EAdc87c45";
const OWNER_ADDRESS = "0x8CA35f878fD14992b58a18bEB484f721b1d07A33";
const NETWORK = "rinkeby";

if (!METAMASK_MNEMONIC || !ALCHEMY_KEY || !OWNER_ADDRESS || !NETWORK) {
  console.error(
    "Please set a mnemonic, Alchemy/Infura key, owner, network, and contract address."
  );
  return;
}

const NFT_ABI = [
  {
    constant: false,
    inputs: [
      {
        name: "_to",
        type: "address",
      },
      {
        name: "metadataURI",
        type: "string",
      },
    ],
    name: "mintTo",
    outputs: [],
    payable: false,
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    constant: false,
    inputs: [
      {
        name: "tokenId",
        type: "uint256",
      },
      {
        name: "_tokenURI",
        type: "string",
      },
    ],
    name: "setTokenURI",
    outputs: [],
    payable: false,
    stateMutability: "nonpayable",
    type: "function",
  },
];

const RINKEBY_NODE_URL = `https://rinkeby.infura.io/v3/${RINKEBY_KEY}`;
const provider = new HDWalletProvider({
  mnemonic: {
    phrase: METAMASK_MNEMONIC,
  },
  providerOrUrl: RINKEBY_NODE_URL,
  pollingInterval: 200000,
});
const web3Instance = new web3(provider);

const METADATA_URL =
  "https://gateway.pinata.cloud/ipfs/QmY2dWesoeAqxchaKJD5SsSwfHvEhhAULzQJmJ7LdtcGPg";

async function main() {
  const nftContract = new web3Instance.eth.Contract(
    NFT_ABI,
    NFT_CONTRACT_ADDRESS,
    { gasLimit: "1000000" }
  );
  console.log(
    "starting to mint One Rimable Asset with contract Address: ",
    NFT_CONTRACT_ADDRESS
  );
  const result = await nftContract.methods
    .mintTo(OWNER_ADDRESS, METADATA_URL)
    .send({ from: OWNER_ADDRESS });
  const tokenId = await getTokenId(result.transactionHash);
  console.log("token id is :", tokenId);
  process.exit(0);
}

const getTokenId = async (txHash) => {
  var receipt = await web3Instance.eth.getTransactionReceipt(txHash);
  return web3Instance.utils.hexToNumber(receipt.logs[0].topics[3]);
};

main();

// export const minNft = (ownerAddress, contractAddress) => {
//   const nftContract = new web3Instance.eth.Contract(NFT_ABI, contractAddress, {
//     gasLimit: "1000000",
//   });

//   const result = await nftContract.methods
//     .mintTo(ownerAddress)
//     .send({ from: ownerAddress });
//   const tokenId = await getTokenId(result.transactionHash);
//   console.log("token id is :", tokenId);
//   return { tokenId };
// };
