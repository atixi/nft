import React, { useState, useEffect } from "react";

const OnboardModal = () => {
  useEffect(() => {
    const onboard = new Onboard({
      dappId: process.env.ONBOARD_API_KEY, // [String] The API key created by step one above
      networkId: 4, // [Integer] The Ethereum network ID your Dapp uses.
      subscriptions: {
        wallet: (wallet) => {
          console.log("wallet is ", wallet);
        },
        address: (address) => {
          console.log("adddres is ", address);
        },
      },
      walletSelect: {
        wallets: [{ walletName: "metamask" }],
      },
    });

    const select = await onboard.walletSelect();
    console.log("wallect select result is ", select);
    const check = await onboard.walletCheck();
    console.log("wallect check result is ", check);
    if (check) {
      let web3 = new Web3(window.ethereum);
    }
  }, []);
  return <div>Hello</div>;
};

export default OnboardModal;
