import Header from "/Components/header";
import Footer from "/Components/footer";
import Head from "next/head";
import { useEffect, useState } from "react";
import detectEthereumProvider from "@metamask/detect-provider";
import { useDispatch, useSelector } from "react-redux";
import { setConnected } from "/store/action/accountSlice";
import { useRouter } from "next/router";
import {
  setAccountTokens,
  setMetaToken,
  setWalletToken,
  setMetaConnected,
  setWalletConnected,
  getAccountTokens,
  getMetaToken,
  getWalletToken,
  getMetaConnected,
  getWalletConnected,
} from "/store/action/accountSlice";
import Web3 from "web3";

const Layout = ({ children }) => {
  const dispatchAccountTokens = useDispatch();
  const dispatchMetaToken = useDispatch();
  const dispatchWalletToken = useDispatch();
  const dispatchMetaConnected = useDispatch();
  const dispatchWalletconneted = useDispatch();

  const accountTokens = useSelector(getAccountTokens);
  const metaToken = useSelector(getMetaToken);
  const walletToken = useSelector(getWalletToken);
  const isMetaconnected = useSelector(getMetaConnected);
  const isWalletConnected = useSelector(getWalletConnected);

  const router = useRouter();
  const [displayHeader, setDisplayHeader] = useState(true);
  useEffect(() => {
    subscribeMetamaskProvider();
    handleHeader();
  });
  const handleHeader = () => {
    if (router.pathname !== "/wallet") {
      setDisplayHeader(true);
    } else {
      setDisplayHeader(false);
    }
  };

  const getWalletAccountData = () => {};
  const subscribeMetamaskProvider = async () => {
    const provider = await detectEthereumProvider();
    if (provider !== window.ethereum) {
      return;
    }
    ethereum.on("accountsChanged", handleMetaAccount);
    ethereum.on("chainChanged", (chainId) => {
      console.log(chainId);
    });
  };
  const handleMetaAccount = async (accounts) => {
    console.log("Listen to account changes");
    if (accounts.length === 0) {
      await dispatchMetaConnected(setMetaConnected(false));
      await dispatchMetaToken(setMetaToken(null));
    } else {
      await dispatchMetaConnected(setMetaConnected(true));
      await dispatchMetaToken(setMetaToken(accounts));
      // const web3 = new Web3(
      //   new Web3.providers.HttpProvider(
      //     "https://mainnet.infura.io/v3/2e7ef0ac679f4860bbe49a34a98cf5ac"
      //   )
      // );
      const web3 = new Web3(window.ethereum);
      console.log("web3 is ", web3);
      web3.eth.getBalance(accounts[0], function (err, result) {
        if (err) {
          console.log(err);
        } else {
          console.log(web3.utils.fromWei(result, "ether") + " ETH");
        }
      });
      if (router.pathname === "/wallet") {
        router.push("/");
      }
    }
  };
  return (
    <>
      <Head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <title>Rim Entertainment</title>
        <meta name="description" content="Rim Entertainment inc" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      {!displayHeader && <div style={{ marginBottom: "-90px" }}></div>}
      {displayHeader && <Header />}
      {children}
      <Footer />
    </>
  );
};

export default Layout;
