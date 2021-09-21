import {
  getDisplayWalletModal,
  setDisplayWalletModal,
} from "store/action/accountSlice";
import {
  getMetaConnected,
  getMetaToken,
  setMetaBalance,
  setMetaConnected,
  setMetaToken,
} from "/store/action/accountSlice";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";

import ConnectMobileWalletModal from "../commons/connectMobileWalletModal";
import ConnectWalletModal from "../commons/connectWalletModal";
import Footer from "/Components/footer";
import Head from "next/head";
import Header from "/Components/header";
import { Modal } from "antd";
import Web3 from "web3";
import { isMobile } from "react-device-detect";
import { isMobileDevice } from "Constants/constants";
import { providers } from "/Constants/constants";
import { registerTalent } from "Utils/utils";
import { useIdleTimer } from "react-idle-timer";
import { useRouter } from "next/router";

const Layout = ({ children }) => {
  const { ethereum } = window;
  const router = useRouter();

  const dispatch = useDispatch();
  const dispatchMetaToken = useDispatch();
  const dispatchMetaConnected = useDispatch();
  const dipsatchMetaBalance = useDispatch();

  const metaToken = useSelector(getMetaToken);
  const isMetaconnected = useSelector(getMetaConnected);
  const [isWrongNet, setIsWrongNet] = useState(false);
  const [network, setNetwork] = useState(null);
  const [displayMematamaskModal, setDisplayMetaMaskModal] = useState(false);
  const displayWalletModal = useSelector(getDisplayWalletModal);

  const showHeader = router.pathname.toString().includes("wallet")
    ? false
    : true;
  const subscribeMetamaskProvider = async () => {
    const { ethereum } = window;
    if (ethereum) {
      const provider = await ethereum;
      if (provider !== window.ethereum) {
        return;
      }
      ethereum.on("accountsChanged", handleMetaAccount);
      ethereum.on("chainChanged", (chainId) => {
        console.log("chain changed in layout", chainId);
      });
    }
  };
  const handleMetaAccount = async (accounts) => {
    let web3 = new Web3(window.ethereum);
    if (accounts.length == 0) {
      await dispatchMetaConnected(setMetaConnected(false));
      await dispatchMetaToken(setMetaToken([]));
      await dipsatchMetaBalance(setMetaBalance(0));
      await dispatch(setDisplayWalletModal(true));
      setDisplayMetaMaskModal(true);
    } else {
      await dispatchMetaConnected(setMetaConnected(true));
      await dispatch(setDisplayWalletModal(false));
      accounts = accounts.map((account) =>
        web3.utils.toChecksumAddress(account)
      );

      await registerTalent(accounts[0]);
      await dispatchMetaToken(setMetaToken(accounts));
      web3.eth.getBalance(accounts[0], async (err, result) => {
        if (err) {
          console.log(err);
        } else {
          await dipsatchMetaBalance(
            setMetaBalance(web3.utils.fromWei(result, "ether"))
          );
        }
      });
      setDisplayMetaMaskModal(false);
      if (router.pathname.toString().includes("create")) {
        // router.replace(router.asPath);
      }
    }
  };

  const checkMetamaskUnlocked = async () => {
    const { ethereum } = window;
    if (ethereum && ethereum.isMetaMask) {
      if (router.pathname.toString().includes("create")) {
        if (isMetaconnected == false || !metaToken || metaToken.length == 0) {
          setDisplayMetaMaskModal(true);
        }
      } else {
        setDisplayMetaMaskModal(false);
      }
    }
  };

  const handleOnIdle = (event) => {
    disconnectUserWallet();
  };

  const disconnectUserWallet = async () => {
    await dispatchMetaConnected(setMetaConnected(false));
    await dispatch(setDisplayWalletModal(true));
  };

  const { getLastActiveTime } = useIdleTimer({
    timeout: 1000 * 60 * 60,
    onIdle: handleOnIdle,
    debounce: 500,
  });

  useEffect(() => {
    subscribeMetamaskProvider();
  }, [isMetaconnected, metaToken]);

  return (
    <>
      <Head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <title>Rim Entertainment</title>
        <meta name="description" content="Rim Entertainment inc" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      {showHeader == false ? (
        <div style={{ marginBottom: "-90px" }}></div>
      ) : (
        <Header />
      )}
      {children}
      {isWrongNet ? DisplayWrongNetModal() : ""}

      <Footer />

      {((ethereum &&
        router.pathname.includes("create") &&
        !isMetaconnected &&
        displayWalletModal) ||
        (ethereum &&
          router.pathname.includes("sell") &&
          !isMetaconnected &&
          displayWalletModal) ||
        (ethereum &&
          router.pathname.includes("nft") &&
          !isMetaconnected &&
          displayWalletModal)) && <ConnectWalletModal displayModal={true} />}

      {((!ethereum && router.pathname.includes("create")) ||
        (!ethereum && router.pathname.includes("sell")) ||
        (!ethereum && router.pathname.includes("nft"))) && (
        <ConnectMobileWalletModal displayModal={true} />
      )}
    </>
  );
  async function detectNetwork() {
    // let provider = await detectEthereumProvider();
    if (provider.chainId != "0x1") {
      setIsWrongNet(true);
      setNetwork(provider.chainId);
    }
  }
  function DisplayWrongNetModal() {
    let message =
      "You are connected to " +
      providers[network] +
      ".\n Please change to " +
      providers["0x1"] +
      " and reload the page";

    return (
      <Modal
        title={<strong>{"Wrong Network!"}</strong>}
        footer={false}
        visible={true}
      >
        {message}
      </Modal>
    );
  }
};

export default Layout;
