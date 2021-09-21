import React, { useState } from "react";
import {
  getAccountTokens,
  getDisplayWalletModal,
  getMetaConnected,
  getMetaToken,
  getWalletConnected,
  getWalletToken,
  setDisplayWalletModal,
  setMetaBalance,
  setMetaConnected,
  setMetaToken,
} from "store/action/accountSlice";
import { useDispatch, useSelector } from "react-redux";

import CustomNotification from "/Components/commons/customNotification";
import Link from "next/link";
import { Modal } from "antd";
import Onboard from "bnc-onboard";
import Web3 from "web3";
import { isMobile } from "react-device-detect";
import { registerTalent } from "Utils/utils";
import styles from "/styles/connectWalletModal.module.css";
import { useRouter } from "next/router";

const ConnectWalletModal = ({ displayModal }) => {
  const dispatch = useDispatch();
  const displayWalletModal = useSelector(getDisplayWalletModal);
  const isMetaconnected = useSelector(getMetaConnected);
  const dispatchMetaConnected = useDispatch();
  const dispatchMetaToken = useDispatch();
  const dipsatchMetaBalance = useDispatch();
  const metaToken = useSelector(getMetaToken);
  const router = useRouter();
  const [onboard, setOnboard] = useState(null);
  const onDesktopConnect = async () => {
    const { ethereum } = window;

    if (ethereum) {
      console.log("wallet is connected from walled modal");
      let web3 = new Web3(ethereum);
      const accounts = await web3.eth.getAccounts();
      if (accounts.length > 0) {
        presisMetamask(accounts);
      } else {
        if (ethereum && ethereum.isMetaMask) {
          ethereum
            .request({ method: "eth_requestAccounts" })
            .then(handleNewAccounts)
            .catch((error) => {
              if (error.code === 4001) {
                CustomNotification(
                  "warning",
                  "Metamask",
                  "User must accept wallet connection "
                );
              } else {
                console.error(error);
              }
            });
          ethereum.on("accountsChanged", handleNewAccounts);
        }
      }
    } else {
      await dispatch(setDisplayWalletModal(false));
      onMobileConnect();
    }
  };

  const presisMetamask = async (accounts) => {
    let web3 = new Web3(window.ethereum);
    await dispatchMetaConnected(setMetaConnected(true));
    await dispatch(setDisplayWalletModal(false));
    accounts = accounts.map((account) => web3.utils.toChecksumAddress(account));

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
    if (router.pathname.toString().includes("nft")) {
      router.replace(router.asPath);
    }
  };

  const handleNewAccounts = (newAccounts) => {
    if (newAccounts.length > 0) {
      presisMetamask(newAccounts);
    }
  };

  const onMobileConnect = async () => {
    const onboard = new Onboard({
      dappId: process.env.ONBOARD_API_KEY, // [String] The API key created by step one above
      networkId: 4, // [Integer] The Ethereum network ID your Dapp uses.
      subscriptions: {
        wallet: (wallet) => {
          console.log("wallet is ", wallet);
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
    if (!isMetaconnected) {
      const data = await onboard.walletSelect();
      if (data) {
        const walletCheck = await onboard.walletCheck();
        console.log("walletselct is ", data);
        console.log("wallet checi is ", walletCheck);
      }
    }
  };

  return (
    <Modal
      title="Please Connect your wallet"
      visible={displayWalletModal}
      header={null}
      footer={null}
      closable={false}
      width={500}
      height={400}
      maskStyle={{
        backgroundColor: "#EEEEEE",
        opacity: 0.1,
      }}
    >
      <div className={styles.modalContent}>
        <div className={styles.navigateHome}>
          <Link
            className={styles.modalButton}
            href={{
              pathname: `/`,
            }}
          >
            <span className={styles.linkSpan}>{"Go Home"}</span>
          </Link>
        </div>
        <div className={styles.walletCard} onClick={onDesktopConnect}>
          <img
            className={styles.walletIcon}
            width={100}
            height={100}
            src={"/images/walletIcons/metamask.svg"}
          />
          <div className={styles.metamaskButton}>{"Connect with metamask"}</div>
        </div>
      </div>
    </Modal>
  );
};
export default ConnectWalletModal;
