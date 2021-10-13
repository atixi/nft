import React, { useState, useEffect } from "react";

const OnboardModal = () => {
  const initOnboard = async () => {
    const onboard = new Onboard({
      dappId: process.env.ONBOARD_API_KEY, // [String] The API key created by step one above
      networkId: 4, // [Integer] The Ethereum network ID your Dapp uses.
      subscriptions: {
        wallet: (wallet) => {},
        address: (address) => {},
      },
      walletSelect: {
        wallets: [{ walletName: "metamask" }],
      },
    });

    const select = await onboard.walletSelect();
    const check = await onboard.walletCheck();
    if (check) {
      let web3 = new Web3(window.ethereum);
    }
  };
  useEffect(() => {
    initOnboard();
  }, []);
  return <div>Hello</div>;
};

export default OnboardModal;
