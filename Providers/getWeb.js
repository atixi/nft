import React, { useEffect, useState } from "react";
import Web3 from "web3";

export const useWeb3 = () => {
  const [web3, setWeb3] = useState();
  useEffect(() => {
    var instance;
    if (window.ethereum) {
      try {
        instance = new Web3(window.ethereum);
      } catch (e) {
        console.log(e);
      }
    } else if (window.web3) {
      instance = new Web3(window.web3);
    } else {
      const provider = new Web3.provider.HttpProvider(
        "https://mainnet.infura.io"
      );
      instance = new Web3(provider);
    }

    setWeb3(instance);
  }, []);

  return web3;
};
