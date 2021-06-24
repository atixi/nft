import Header from "/Components/header";
import Footer from "/Components/footer";
import Head from "next/head";
import { useEffect, useState } from "react";
import detectEthereumProvider from "@metamask/detect-provider";
import { useDispatch, useSelector } from "react-redux";
import { triggerWalletConnectionChange } from "/store/action/accountSlice";
import { useRouter } from "next/router";
import { getTriggerConnection } from "../../store/action/accountSlice";
const Layout = ({ children }) => {
  const dispatchWalletConnection = useDispatch();
  const isConnectedToAnyWallet = useSelector(getTriggerConnection);
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
  const subscribeMetamaskProvider = async () => {
    const provider = await detectEthereumProvider();
    if (provider !== window.ethereum) {
      console.error("Do you have multiple wallets installed?");
    }
    ethereum.on("accountsChanged", handleAccountsChanged);
    ethereum.on("chainChanged", (chainId) => {
      console.log(chainId);
    });
  };
  const handleAccountsChanged = async (accounts) => {
    if (accounts.length === 0) {
      await dispatchWalletConnection(triggerWalletConnectionChange(false));
    } else {
      await dispatchWalletConnection(triggerWalletConnectionChange(true));
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
