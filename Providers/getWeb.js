import React, { useEffect, useState } from "react";
import Web3 from "web3";
import HandleNotification from "/Components/commons/handleNotification";

export const useWeb3 = () => {
  const [web3, setWeb3] = useState();
  useEffect(() => {
    var instance;
    if (window.ethereum) {
      try {
        instance = new Web3(window.ethereum);
      } catch (e) {}
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

export const loadWeb3 = () => {
  if (window.ethereum) {
    window.web3 = new Web3(window.ethereum);
  } else {
    HandleNotification(
      "error",
      "Non-Ethereum",
      "Non-Ethereum browser detected. You should consider trying Metamask"
    );
  }
};

export const loadWeb3Data = async () => {
  if (typeof window !== "undefined") {
    if (window.ethereum) {
      window.web3 = new Web3(window.ethereum);
      await window.ethereum.enable();
    } else {
      window.web3 = new Web3(window.web3.currentProvider);
    }
    const web3 = window.web3;
    const accounts = web3.eth.getAccounts();
    const networkId = web3.eth.net.getId();
    return {
      accounts,
      networkId,
      web3,
    };
  }
  return null;
};

export const subscribeToMetamask = () => {
  // const accounts = [];
  // const chainId;
  // const connectInfo;
  // ethereum.on('connect', (info) =>{
  //   connectInfo = info;
  // })
  // ethereum.on("accountsChanged", function (ac) {
  //   accounts = ac;
  //   console.log('accounts are chaning mohammdin', accounts)
  // });
  // ethereum.on("chainChanged", (chain) => {
  //   chainId = chain
  //   window.location.reload();
  // });
  // return {
  //   accounts,
  //   chainId,
  //   connectInfo
  // };
};

export const createWeb3 = async () => {
  var Web3 = require("web3");

  if (typeof web3 !== "undefined") {
    web3 = new Web3(web3.currentProvider);
  } else {
    web3 = new Web3(
      new Web3.providers.HttpProvider(
        "wss://rinkeby.infura.io/ws/v3/c2dde5d7c0a0465a8e994f711a3a3c31"
      )
    );
  }
};
