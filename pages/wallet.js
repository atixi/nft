import Link from "next/link";
import React, { useEffect, useState } from "react";
import Web3 from "web3";
import Web3Modal from "web3modal";
import HandleNotification from "/Components/commons/handleNotification";
import { isMobileDevice, providerOptions } from "/Constants/constants";
import styles from "/styles/wallet.module.css";
import WalletConnect from "@walletconnect/client";
import {
  setAccountTokens,
  setMetaToken,
  setWalletToken,
  setWalletBalance,
  setMetaConnected,
  setWalletConnected,
  getAccountTokens,
  getMetaToken,
  getWalletToken,
  getMetaConnected,
  getWalletConnected,
} from "/store/action/accountSlice";
import { useDispatch, useSelector } from "react-redux";
import router, { useRouter } from "next/router";
import QRCodeModal from "@walletconnect/qrcode-modal";
import { useOnboard } from "use-onboard";
const bridge = "https://bridge.walletconnect.org";

import Onboard from "bnc-onboard";
const Wallet = () => {
  const router = useRouter();
  const dispatchAccountTokens = useDispatch();
  const dispatchMetaToken = useDispatch();
  const dispatchWalletToken = useDispatch();
  const dispatchWalletBalance = useDispatch();
  const dispatchMetaConnected = useDispatch();
  const dispatchWalletconnected = useDispatch();

  const isMetaconnected = useSelector(getMetaConnected);
  const isWalletConnected = useSelector(getWalletConnected);
  const accountTokens = useSelector(getAccountTokens);
  const metaToken = useSelector(getMetaToken);
  const walletToken = useSelector(getWalletToken);

  const [connected, setConnected] = useState();
  const [isMobile, setIsMobile] = useState(false);
  const [metamaskModal, setMetamaskModal] = useState(null);
  const [mobileModal, setMobileModal] = useState(null);
  const [mobileConnector, setMobileConnector] = useState();
  const { selectWallet, address, isWalletSelected, disconnectWallet, balance } =
    useOnboard({
      options: {
        dappId: process.env.ONBOARD_API_KEY, // optional API key
        networkId: 4, // Ethereum network ID
        walletSelect: {
          wallets: [
            {
              walletName: "metamask",
              rpcUrl:
                "https://rinkeby.infura.io/v3/c2dde5d7c0a0465a8e994f711a3a3c31",
            },
          ],
        },
      },
    });

  const [onboard, setOnboard] = useState(null);

  const [metamaskWeb3, setMetamaskWeb3] = useState(null);
  const [metamaskProvider, setMetamaskProvider] = useState(null);
  const [metamaskConnected, setMetamaskConnected] = useState(null);

  const [fetching, setFetching] = useState(false);
  // const [address, setAddress] = useState();
  const [web3, setWeb3] = useState(null);
  const [provider, setProvider] = useState(null);
  // const [connected, setConnected] = useState(false);
  const [assets, setAssets] = useState();
  const [showModal, setShowModal] = useState(false);
  const [pendingRequest, setPendingRequest] = useState(false);
  const [result, setResult] = useState();
  const initWeb3 = (provider) => {
    const web3 = new Web3(provider);

    web3.eth.extend({
      methods: [
        {
          name: "chainId",
          call: "eth_chainId",
          outputFormatter: web3.utils.hexToNumber,
        },
      ],
    });

    return web3;
  };
  const connectToMetamask = async (wallet) => {
    console.log("connecting to metamask");
    if (metaToken !== null) {
      await dispatchMetaConnected(setMetaConnected(true));
      router.push("/");
    } else {
      const metamaskProvider = await metamaskModal.connectTo(wallet);
      await subscribeMetamaskProvider(metamaskProvider);
      const metamaskWeb3 = initWeb3(metamaskProvider);

      await setMetamaskWeb3(metamaskWeb3);
      await setMetamaskProvider(metamaskProvider);
    }
  };

  const subscribeMetamaskProvider = async (provider) => {
    if (!provider.on) {
      return;
    }

    provider.on("disconnect", () => {
      setMetamaskConnected(false);
    });
    provider.on("accountsChanged", async (accounts) => {
      if (accounts.length == 0) {
        await dispatchMetaConnected(setMetaConnected(false));
        await dispatchMetaToken(setMetaToken(null));
      } else {
        console.log("we are connected to wallet now?");
        await dispatchMetaConnected(setMetaConnected(true));
        await dispatchMetaToken(setMetaToken(accounts));
      }
      // await getAccountAssets();
    });

    provider.on("chainChanged", async (networkId) => {
      const web3 = new Web3(provider);
      const chainId = await web3.eth.chainId();
    });
  };

  const onMobileConnect = async () => {
    if (metaToken != null) {
      await dispatchMetaConnected(setMetaConnected(true));
      router.push("/");
    } else {
      const data = await onboard.walletSelect();

      if (data) {
        const walletCheck = await onboard.walletCheck();
        console.log("walletselct is ", data);
        console.log("wallet checi is ", walletCheck);
      }
    }
  };

  const initBoard = async () => {
    const onboard = Onboard({
      dappId: process.env.ONBOARD_API_KEY, // [String] The API key created by step one above
      networkId: 4, // [Integer] The Ethereum network ID your Dapp uses.
      subscriptions: {
        wallet: (wallet) => {
          setWeb3(new Web3(wallet.provider));
        },
        address: (addres) => {
          console.log("adddres is ", address);
        },
      },
      walletSelect: {
        wallets: [{ walletName: "metamask" }],
      },
    });
    setOnboard(onboard);
  };
  const subscribeWalletProvider = async (connector) => {
    if (isWalletConnected == false) {
      resetApp();
    }
    if (!connector) {
      return;
    }

    connector.on("session_update", async (error, payload) => {
      if (error) {
        throw error;
      }

      const { chainId, accounts } = payload.params[0];
      console.log("accounts in event ", accounts);
    });

    connector.on("connect", (error, payload) => {
      if (error) {
        throw error;
      }
      onConnect(payload);
    });

    connector.on("disconnect", (error, payload) => {
      if (error) {
        throw error;
      }

      disconnectWallet();
    });

    if (connector.connected) {
    }

    setMobileConnector(connector);
  };

  const onConnect = async (payload) => {
    const { accounts } = payload.params[0];
    dispatchWalletToken(setWalletToken(accounts));
    dispatchWalletconnected(setWalletConnected(true));
    const web3 = new Web3(window.ethereum);
    web3.eth.getBalance(accounts[0], async (err, result) => {
      if (err) {
        console.log(err);
      } else {
        await dispatchWalletBalance(
          setWalletBalance(web3.utils.fromWei(result, "ether"))
        );
      }
      console.log(
        "wallet balance is ",
        web3.utils.fromWei(result, "ether") + " ETH"
      );
    });
    router.push("/");
  };
  const getAccountAssets = async () => {
    setFetching(true);
    try {
      await setFetching(true);
      await setAssets(assets);
    } catch (error) {
      await setFetching(false);
    }
  };

  const diconnectMobileWallet = async () => {};
  const resetApp = async () => {
    if (web3 && web3.currentProvider && web3.currentProvider.close) {
      await web3.currentProvider.close();
    }

    await dispatchWalletToken(setWalletToken(null));
    await dispatchWalletconnected(setWalletConnected(false));
    // setFetching(false);
    // setAddress(null);
    // setWeb3(null);
    // setProvider(null);
    // setConnected(false);
    // setChainId(1);
    // setNetworkId(1);
    // setAssets([]);
    // setShowModal(false);
    // setPendingRequest(false);
    // setResult(null);
  };

  useEffect(() => {
    if (typeof window !== "undefined") {
      const browserModal = new Web3Modal({
        network: "mainnet", // optional
        cacheProvider: false, // optional
        providerOptions, // required
        disableInjectedProvider: true,
      });
      const mobileModal = new Web3Modal({
        network: "mainnet", // optional
        cacheProvider: false, // optional
        providerOptions, // required
        disableInjectedProvider: true,
      });
      setIsMobile(isMobileDevice());
      if (browserModal.cachedProvider && isMobile) {
        // onMobileConnect();
      }
      setMetamaskModal(browserModal);
      setMobileModal(mobileModal);
      setMobileConnector(
        new WalletConnect({ bridge, qrcodeModal: QRCodeModal })
      );
      subscribeWalletProvider();
    }

    initBoard();
  }, []);
  return (
    <div className={styles.container}>
      <div className={styles.leftColumn}></div>
      <div className={styles.rightColumn}>
        <div className={styles.content}>
          <div className={styles.contentHeader}>
            <Link className={styles.navigation} href="/">
              Go Home
            </Link>
            <h1 className={styles.walletHeader}>Connect your wallet</h1>
            <p className={styles.walletParagraph}>
              Connect with one of available wallet providers or create a new
              wallet. What is a wallet?
            </p>
          </div>
          <div className={styles.wallectContainer}>
            {!isMobile && (
              <div
                className={styles.walletCard}
                onClick={() => connectToMetamask("injected")}
              >
                <div className={styles.walletCardPopup}>
                  <span>Most Popular</span>
                </div>
                <img
                  width={28}
                  height={28}
                  src={"/images/walletIcons/metamask.svg"}
                />
                <div>Metamask</div>
              </div>
            )}

            {isMobile && (
              <div className={styles.walletCard} onClick={onMobileConnect}>
                <div className={styles.walletCardPopup}>
                  <span>Mobile Wallets</span>
                </div>
                <div>
                  <img
                    className={styles.walletIcon}
                    width={28}
                    height={28}
                    src={"/images/walletIcons/walletconnect-1.svg"}
                  />
                  <img
                    className={styles.walletIcon}
                    width={28}
                    height={28}
                    src={"/images/walletIcons/walletconnect-2.svg"}
                  />
                  <img
                    className={styles.walletIcon}
                    width={28}
                    height={28}
                    src={"/images/walletIcons/walletconnect-3.png"}
                  />
                </div>
                <div className={styles.walletDetails}>WalletConnect</div>
              </div>
            )}
          </div>
          <div>
            <p className={styles.walletFooter}>
              We do not own your private keys and cannot access your funds
              without your confirmation.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
export async function getServerSideProps(context) {
  return {
    props: {}, // will be passed to the page component as props
  };
}
export default Wallet;
