import Link from "next/link";
import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import Web3 from "web3";
import Web3Modal from "web3modal";
import HandleNotification from "/Components/commons/handleNotification";
import { isMobileDevice, providerOptions } from "/Constants/constants";
import styles from "/styles/wallet.module.css";

const Wallet = () => {
  const dispatch = useDispatch();
  const [isMobile, setIsMobile] = useState(false);
  const [metamaskModal, setMetamaskModal] = useState(null);
  const [web3Modal, setWeb3Modal] = useState(null);
  useEffect(() => {
    if (typeof window !== "undefined") {
      const browserModal = new Web3Modal({
        network: "mainnet", // optional
        cacheProvider: true, // optional
        providerOptions, // required
        disableInjectedProvider: true,
      });
      const mobileModal = new Web3Modal({
        network: "mainnet", // optional
        cacheProvider: true, // optional
        providerOptions, // required
        // disableInjectedProvider: false,
      });
      setIsMobile(isMobileDevice());
      if (browserModal.cachedProvider && isMobile) {
        onMobileConnect();
      }
      setMetamaskModal(mobileModal);
      setWeb3Modal(browserModal);
    }
  }, []);
  const [metamaskWeb3, setMetamaskWeb3] = useState(null);
  const [metamaskProvider, setMetamaskProvider] = useState(null);
  const [metamaskConnected, setMetamaskConnected] = useState(null);

  const [fetching, setFetching] = useState(false);
  const [address, setAddress] = useState();
  const [web3, setWeb3] = useState(null);
  const [provider, setProvider] = useState(null);
  const [connected, setConnected] = useState(false);
  const [chainId, setChainId] = useState(1);
  const [networkId, setNetworkId] = useState(1);
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
    if (metamaskConnected) {
      HandleNotification(
        "info",
        "Metamask",
        "Metamask is connected",
        "topLeft"
      );
    } else {
      const metamaskProvider = await metamaskModal.connectTo(wallet);
      await subscribeMetamaskProvider(metamaskProvider);
      const metamaskWeb3 = initWeb3(metamaskProvider);

      const accounts = await metamaskWeb3.eth.getAccounts();

      const address = accounts[0];

      const networkId = await metamaskWeb3.eth.net.getId();

      const chainId = await metamaskWeb3.eth.chainId();

      await setMetamaskWeb3(metamaskWeb3);
      await setMetamaskProvider(metamaskProvider);

      // await setConnected(true);
      await setAddress(address);
      await setChainId(chainId);
      await setNetworkId(networkId);
    }
  };

  const subscribeMetamaskProvider = async (provider) => {
    if (!provider.on) {
      return;
    }

    provider.on("disconnect", () => {
      setMetamaskConnected(false);
      console.log("closing metamask");
      HandleNotification(
        "success",
        "Metamask disconnected yeah",
        "Your Metamask wallet account is disconnected",
        "topLeft"
      );
    });
    provider.on("accountsChanged", async (accounts) => {
      console.log("Metamask accounts:", accounts);
      if (accounts.length == 0) {
        setMetamaskConnected(false);
        HandleNotification(
          "warning",
          "Metamask disconnected",
          "Your Metamask wallet account is disconnected",
          "topLeft"
        );
      } else {
        setMetamaskConnected(true);
        HandleNotification(
          "success",
          "Metamask",
          "Your Metamask wallet: " + accounts[0],
          "topLeft"
        );
      }
      await setAddress(accounts[0]);
      // await getAccountAssets();
    });
    provider.on("chainChanged", async (chainId) => {
      const web3 = new Web3(provider);
      const networkId = await web3.eth.net.getId();
      await setChainId(chainId);
      await setNetworkId(networkId);
      // await getAccountAssets();
    });

    provider.on("chainChanged", async (networkId) => {
      const web3 = new Web3(provider);
      const chainId = await web3.eth.chainId();
      await setChainId(chainId);
      await setNetworkId(networkId);
      // await getAccountAssets();
    });
  };
  const comingSoon = () => {
    HandleNotification(
      "info",
      "Comming Soon",
      "Portis Support Will be Available soon",
      "topLeft"
    );
  };
  const disconnectMetamask = () => {
    // const metamask = await detectEthereumProvider();
    // if (metamask) {
    //   console.log("Ethereum successfully detected!");
    //   if (ethereum.isMetaMask) {
    //     if (ethereum.isConnected()) {
    //       HandleNotification(
    //         "success",
    //         "Metamask is connected",
    //         "You are connected to metamask",
    //         "topLeft"
    //       );
    //     }
    //   }
    // } else {
    //   // if the provider is not detected, detectEthereumProvider resolves to null
    //   console.error("Please install MetaMask!", error);
    // }
  };
  const onMobileConnect = async () => {
    if (connected) {
      HandleNotification(
        "info",
        "Wallet is connected",
        "You are currently connected to wallet",
        "topLeft"
      );
    } else {
      const provider = await web3Modal.connect();

      await subscribeWalletProvider(provider);

      const web3 = initWeb3(provider);
      console.log("web3", web3);
      const accounts = await web3.eth.getAccounts();
      console.log("account is ", accounts);

      const address = accounts[0];

      const networkId = await web3.eth.net.getId();

      const chainId = await web3.eth.chainId();

      await setWeb3(web3);
      await setProvider(provider);
      await setConnected(true);
      await setAddress(address);
      await setChainId(chainId);
      await setNetworkId(networkId);
    }
  };

  const subscribeWalletProvider = async (provider) => {
    if (!provider.on) {
      return;
    }
    provider.on("close", () => resetApp());
    provider.on("accountsChanged", async (accounts) => {
      await setAddress(accounts[0]);
      // await getAccountAssets();
    });
    provider.on("chainChanged", async (chainId) => {
      const metamaskWeb3 = new Web3(provider);
      const networkId = await metamaskWeb3.eth.net.getId();
      await setChainId(chainId);
      await setNetworkId(networkId);
      // await getAccountAssets();
    });

    provider.on("chainChanged", async (networkId) => {
      const web3 = new Web3(provider);
      const chainId = await web3.eth.chainId();
      await setChainId(chainId);
      await setNetworkId(networkId);
      // await getAccountAssets();
    });
  };

  const getAccountAssets = async () => {
    setFetching(true);
    try {
      // get account balances
      // const assets = await apiGetAccountAssets(address, chainId);

      await setFetching(true);
      await setAssets(assets);
    } catch (error) {
      console.error(error); // tslint:disable-line
      await setFetching(false);
    }
  };

  const disconnectWallet = async () => {
    if (connected) {
      await resetApp();
      HandleNotification(
        "success",
        "WalletConnect Disconnected",
        "Successfully Disconnected Your Wallet",
        "topLeft"
      );
    } else {
      HandleNotification(
        "info",
        "WalletConnect",
        "You are not connected to any Mobile wallet",
        "topLeft"
      );
    }
  };

  const resetApp = async () => {
    if (web3 && web3.currentProvider && web3.currentProvider.close) {
      await web3.currentProvider.close();
      console.log("await web3.currentProvider.close()");
    }

    await web3Modal.clearCachedProvider();
    setFetching(false);
    setAddress(null);
    setWeb3(null);
    setProvider(null);
    setConnected(false);
    setChainId(1);
    setNetworkId(1);
    setAssets([]);
    setShowModal(false);
    setPendingRequest(false);
    setResult(null);
  };
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
            <div
              className={styles.walletCard}
              onClick={() => comingSoon("Portis")}
            >
              <div className={styles.walletCardPopup}>
                <span>Credit Card Flow</span>
              </div>
              <img
                width={28}
                height={28}
                src={"/images/walletIcons/portis.svg"}
              />
              <div>Portis</div>
            </div>
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
            <div
              className={styles.walletCard}
              onClick={() => disconnectWallet()}
            >
              <div className={styles.walletCardPopup}>
                <span>Disconnect </span>
              </div>
              <img
                width={28}
                height={28}
                src={"/images/walletIcons/disconnect.svg"}
              />
              <div>Disconnect Mobile Wallet</div>
            </div>
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
