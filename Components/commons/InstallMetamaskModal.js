import Modal from "antd/lib/modal/Modal";
import Link from "next/link";
import React from "react";
import styles from "/styles/metamaskModal.module.css";

const InstallMetamaskModal = ({ displayModal }) => {
  return (
    <Modal
      title="Pleas Install Metamask"
      visible={displayModal}
      header={null}
      footer={null}
      closable={false}
      width={600}
      height={500}
      maskStyle={{
        backgroundColor: "#EEEEEE",
        opacity: 0.1,
      }}
      bodyStyle={{
        height: 350,
        display: "flex",
        justifyContent: "center",
        alignContent: "center",
      }}
    >
      <div className={styles.modalContent}>
        <div className={styles.metamaskInfoTextContainer}>
          <span className={styles.metamaskInfoText}>
            {"If you have installed metamask extension just refresh the page"}
          </span>
          <span className={styles.metamaskInfoText}>
            {"If you have disabled metamask extension just enable it"}
          </span>
        </div>
        <div className={styles.modalControls}>
          <Link
            href={{
              pathname: `/`,
            }}
          >
            <a className={styles.linkButton}>
              <span>{"Go To Main Page"}</span>
            </a>
          </Link>
          <Link
            href={{
              pathname: `https://metamask.io/download.html`,
            }}
          >
            <a className={styles.linkButton}>
              {<span>{"Install Metamask"}</span>}
            </a>
          </Link>
        </div>
      </div>
    </Modal>
  );
};

export default InstallMetamaskModal;
