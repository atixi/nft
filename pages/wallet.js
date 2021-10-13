import React, { useEffect, useState } from "react";
import { getCurrentAccount, registerTalent } from "Utils/utils";
import {
  getMetaToken,
  setMetaBalance,
  setMetaConnected,
  setMetaToken,
} from "/store/action/accountSlice";
import { useDispatch, useSelector } from "react-redux";

import CustomNotification from "/Components/commons/customNotification";
import InstallMetamaskModal from "/Components/commons/InstallMetamaskModal";
import Link from "next/link";
import Onboard from "bnc-onboard";
import Web3 from "web3";
import { getMetaConnected } from "store/action/accountSlice";
import { isMobile } from "react-device-detect";
import styles from "/styles/wallet.module.css";
import { useRouter } from "next/router";

const Wallet = () => {
  const router = useRouter();
  const dispatchMetaConnected = useDispatch();
  const dispatchMetaToken = useDispatch();
  const dipsatchMetaBalance = useDispatch();
  const metaToken = useSelector(getMetaToken);
  const isMetaconnected = useSelector(getMetaConnected);
  const [displayInstallModal, setDisplayInstallModal] = useState();

  const onDesktopConnect = async () => {
    const { ethereum } = window;
    if (ethereum) {
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
                CustomNotification("warning", "Metamask", "You must accept wallet connection ");
              } else {
                console.error(error);
              }
            });
          ethereum.on("accountsChanged", handleNewAccounts);
        }
      }
    } else {
      onMobileConnect();
    }
  };

  const onMobileConnect = async () => {
    const onboard = new Onboard({
      dappId: process.env.ONBOARD_API_KEY, // [String] The API key created by step one above
      networkId: 4, // [Integer] The Ethereum network ID your Dapp uses.
      subscriptions: {
        wallet: (wallet) => {},
        address: (addres) => {},
      },
      walletSelect: {
        wallets: [{ walletName: "metamask" }],
      },
    });
    if (!isMetaconnected) {
      const data = await onboard.walletSelect();
      if (data) {
        const walletCheck = await onboard.walletCheck();
      }
    }
  };

  useEffect(() => {}, []);

  const presisMetamask = async (accounts) => {
    let web3 = new Web3(window.ethereum);
    await dispatchMetaConnected(setMetaConnected(true));
    accounts = accounts.map((account) => web3.utils.toChecksumAddress(account));

    await registerTalent(accounts[0]);

    await dispatchMetaToken(setMetaToken(accounts));
    web3.eth.getBalance(accounts[0], async (err, result) => {
      if (err) {
        console.log(err);
      } else {
        await dipsatchMetaBalance(setMetaBalance(web3.utils.fromWei(result, "ether")));
      }
    });
    router.push("/");
  };

  const handleNewAccounts = (newAccounts) => {
    if (newAccounts.length > 0) {
      presisMetamask(newAccounts);
    }
  };
  <InstallMetamaskModal displayModal={displayInstallModal} />;

  return (
    <div className="no-bottom" id="content">
      {/* <div id="top"></div> */}
      <section
        id="subheader"
        className="text-light AssetSubheader"
        data-bgimage="url(images/background/subheader.jpg) top"
      >
        <div className="center-y relative text-center">
          <div className="container">
            <div className="row">
              <div className="col-md-12 text-center">
                <h1>{`Connect your Wallet`}</h1>
              </div>
              <div className="clearfix"></div>
            </div>
          </div>
        </div>
      </section>
      <section aria-label="section">
        <div className="contentContainer">
          <div className="row px-3">
            <div className={`col-md-6 col-xl-3 col-lg-3 col-12 mb30 `}>
              <a className="box-url" onClick={onDesktopConnect}>
                <span className="box-url-label">Most Popular</span>
                <img src="images/wallet/1.png" alt="" className="mb20" />
                <h4>{`Metamask`}</h4>
                <p>
                  {` Start exploring blockchain applications in seconds. Trusted by over 1 million
                  users worldwide.`}
                </p>
              </a>
            </div>
            {/* <div className={`col-lg-3 mb30 ${styles.disabledWallet}`}>
              <a className="box-url" aria-disabled={true} href={null}>
                <img src="images/wallet/2.png" alt="" className="mb20" />
                <h4>Bitski</h4>
                <p>
                  Bitski connects communities, creators and brands through unique, ownable digital
                  content.
                </p>
              </a>
            </div>
            <div className={`col-lg-3 mb30 ${styles.disabledWallet}`}>
              <a className="box-url" href={null}>
                <img src="images/wallet/3.png" alt="" className="mb20" />
                <h4>Fortmatic</h4>
                <p>Let users access your Ethereum app from anywhere. No more browser extensions.</p>
              </a>
            </div>

            <div className={`col-lg-3 mb30 ${styles.disabledWallet}`}>
              <a className="box-url" href={null}>
                <img src="images/wallet/4.png" alt="" className="mb20" />
                <h4>WalletConnect</h4>
                <p>
                  Open source protocol for connecting decentralised applications to mobile wallets.
                </p>
              </a>
            </div>

            <div className={`col-lg-3 mb30 ${styles.disabledWallet}`}>
              <a className="box-url" href={null}>
                <img src="images/wallet/5.png" alt="" className="mb20" />
                <h4>Coinbase Wallet</h4>
                <p>The easiest and most secure crypto wallet. ... No Coinbase account required.</p>
              </a>
            </div>

            <div className={`col-lg-3 mb30 ${styles.disabledWallet}`}>
              <a className="box-url" href={null}>
                <img src="images/wallet/6.png" alt="" className="mb20" />
                <h4>Arkane</h4>
                <p>Make it easy to create blockchain applications with secure wallets solutions.</p>
              </a>
            </div>

            <div className={`col-lg-3 mb30 ${styles.disabledWallet}`}>
              <a className="box-url" href={null}>
                <img src="images/wallet/7.png" alt="" className="mb20" />
                <h4>Authereum</h4>
                <p>Your wallet where you want it. Log into your favorite dapps with Authereum.</p>
              </a>
            </div>

            <div className={`col-lg-3 mb30 ${styles.disabledWallet}`}>
              <a className="box-url" href={null}>
                <span className="box-url-label">Most Simple</span>
                <img src="images/wallet/8.png" alt="" className="mb20" />
                <h4>Torus</h4>
                <p>
                  Open source protocol for connecting decentralised applications to mobile wallets.
                </p>
              </a>
            </div> */}
          </div>
        </div>
      </section>
    </div>
  );
};
export async function getServerSideProps(context) {
  return {
    props: {}, // will be passed to the page component as props
  };
}
export default Wallet;
