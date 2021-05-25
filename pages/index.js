import { QueryClient, QueryClientProvider, useQuery } from "react-query";
import { MY_TOKEN_ADDRESS } from "/Constants/constants";
import { MY_TOKEN_ID } from "/Constants/constants";
import openSeaApi from "./api/openSeaApi";
import Home from "./home/index";
import { useEffect, useState } from "react";
import * as Web3 from "web3";
import { OpenSeaPort, Network } from "opensea-js";
import Web3Modal from "web3modal";
import WalletConnectProvider from "@walletconnect/web3-provider";
import {
  web3Provider,
  onNetworkUpdate,
  OPENSEA_JS_URL,
  GITHUB_URL,
} from "../Constants/constants";
import axios from "axios";

const loadAsset = openSeaApi.fetchAssets(MY_TOKEN_ADDRESS, MY_TOKEN_ID);
// const web3Provider =
//   typeof web3 !== "undefined"
//     ? window.web3.currentProvider
//     : new Web3.providers.HttpProvider("https://mainnet.infura.io");
const defaultQueryFn = async () => {
  return new Promise((resolve) => {
    resolve(loadAsset);
  });
};

const seaport = new OpenSeaPort(web3Provider, {
  networkName: Network.Main,
});
const web3 = seaport.web3;

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      queryFn: defaultQueryFn,
    },
  },
});

export default function App() {
  const [account, setAccount] = useState(null);

  useEffect(() => {
    initWeb3();
  }, []);

  const initWeb3 = async () => {
    web3.eth.getAccounts((err, res) => {
      setAccount(res[0]);
    });
  };

  return (
    <QueryClientProvider client={queryClient}>
      <Home />
    </QueryClientProvider>
  );
}
