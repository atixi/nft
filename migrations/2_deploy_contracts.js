const Rimable = artifacts.require("./Rimable.sol");

module.exports = async (deployer, network) => {
  // https://www.blockchain.com/eth/address/0xa5409ec958c83c3f309868babaca7c86dcb077c1
  let proxyRegistryAddress = "";
  let collectionMetadataURI =
    "https://gateway.pinata.cloud/ipfs/QmPysqr4a2nFiXwKqtjM9ahBBNWtDHaqEKwtpmntvJqgfa/collection_metadata/contractMetadata_for_avengers";
  if (network === "rinkeby") {
    proxyRegistryAddress = "0xf57b2c51ded3a29e6891aba85459d600256cf317";
  } else {
    proxyRegistryAddress = "0xa5409ec958c83c3f309868babaca7c86dcb077c1";
  }

  const rimable = await deployer.deploy(Rimable, proxyRegistryAddress, {
    gas: 6721975,
  });
  const deployedRimable = await Rimable.deployed();

  const tx = await deployedRimable.setContractURI(collectionMetadataURI);
  console.log("contract deployed");
};
