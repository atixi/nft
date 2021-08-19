import Link from "next/link";
import React, { useEffect, useState } from "react";
import Web3 from "web3";
import Web3Modal from "web3modal";
import { isMobileDevice, providerOptions } from "/Constants/constants";
import styles from "/styles/wallet.module.css";
const STRAPI_BASE_URL = process.env.HEROKU_BASE_URL;
// const STRAPI_BASE_URL = process.env.STRAPI_LOCAL_BASE_URL;
import {
  setMetaToken,
  setMetaConnected,
  getAccountTokens,
  getMetaToken,
  getWalletToken,
  getMetaConnected,
  getWalletConnected,
} from "/store/action/accountSlice";
import { useDispatch, useSelector } from "react-redux";
import { useRouter } from "next/router";
import { useOnboard } from "use-onboard";

import Onboard from "bnc-onboard";
import { getCurrentAccount } from "Utils/utils";
import { fetch, post } from "Utils/strapiApi";
const Wallet = () => {
  const router = useRouter();
  const dispatchMetaToken = useDispatch();
  const dispatchMetaConnected = useDispatch();

  const isMetaconnected = useSelector(getMetaConnected);
  const isWalletConnected = useSelector(getWalletConnected);
  const accountTokens = useSelector(getAccountTokens);
  const metaToken = useSelector(getMetaToken);
  const walletToken = useSelector(getWalletToken);

  const [connected, setConnected] = useState();
  const [isMobile, setIsMobile] = useState(false);
  const [metamaskModal, setMetamaskModal] = useState(null);
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

  const [web3, setWeb3] = useState(null);
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
    const account = await getCurrentAccount();
    console.log("current account is ", account);
    const talentResult = await fetch(`/talents/talentexists/${account}`);
    if (talentResult.data) {
      const talentExists = talentResult.data.success;
      if (!talentExists) {
        let talentData = new FormData();
        talentData.append("data", JSON.stringify({ walletAddress: account }));
        const result = await post(`${STRAPI_BASE_URL}/talents`, talentData, {
          headers: {
            "Content-Type": `multipart/form-data`,
          },
        });
      }
    }
    console.log("connecting to metamask");
    if (metaToken.length > 0) {
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
        await dispatchMetaToken(setMetaToken([]));
      } else {
        await dispatchMetaConnected(setMetaConnected(true));
        await dispatchMetaToken(setMetaToken(accounts));
      }
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

  useEffect(() => {
    if (typeof window !== "undefined") {
      const browserModal = new Web3Modal({
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
