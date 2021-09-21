import React, { useEffect, useState } from "react";
import { Modal } from "antd";
import Link from "next/link";
import styles from "/styles/connectWalletModal.module.css";
import { isMobile } from "react-device-detect";
import CustomNotification from "/Components/commons/customNotification";
import { useDispatch, useSelector } from "react-redux";
import Onboard from "bnc-onboard";
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
import Web3 from "web3";
import { useRouter } from "next/router";

const ConnectMobileWalletModal = ({ displayModal }) => {
  const router = useRouter();
  const mobileConnect = async () => {
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
    const data = await onboard.walletSelect();
    if (!data) {
      if (
        router.pathname.includes("create") ||
        router.pathname.includes("sell") ||
        router.pathname.includes("nft")
      ) {
        router.reload(window.location.pathname);
      }
    }
  };

  useEffect(() => {
    mobileConnect();
  }, []);

  return null;
  // <Modal
  //   title="Please Connect your wallet"
  //   visible={true}
  //   header={null}
  //   footer={null}
  //   closable={false}
  //   width={500}
  //   height={400}
  //   maskStyle={{
  //     backgroundColor: "#EEEEEE",
  //     opacity: 0.1,
  //   }}
  // >
  //   <div className={styles.modalContent}>
  //     <div className={styles.navigateHome}>
  //       <Link
  //         className={styles.modalButton}
  //         href={{
  //           pathname: `/`,
  //         }}
  //       >
  //         <span className={styles.linkSpan}>{"Go Home"}</span>
  //       </Link>
  //     </div>
  //     <div className={styles.walletCard} onClick={onMobileConnect}>
  //       <img
  //         className={styles.walletIcon}
  //         width={100}
  //         height={100}
  //         src={"/images/walletIcons/metamask.svg"}
  //       />
  //       <div className={styles.metamaskButton}>{"Connect with metamask"}</div>
  //     </div>
  //   </div>
  // </Modal>
};
export default ConnectMobileWalletModal;
