import "bootstrap/dist/css/bootstrap.min.css";
import "antd/dist/antd.css";
import "../styles/style.css";
import dynamic from "next/dynamic";

import ReactDOM from "react-dom";

import React, { useEffect, useRef } from "react";
import { Web3ReactProvider } from "@web3-react/core";
import { MetaMaskProvider } from "metamask-react";

function getLibrary(provider) {
  const library = new Web3Provider(provider);
  library.pollingInterval = 12000;
  return library;
}

function MyApp({ Component, pageProps }) {
  let ref = useRef();

  useEffect(() => {
    ReactDOM.render(
      <MetaMaskProvider>
        <Component {...pageProps} />
      </MetaMaskProvider>,
      ref.current
    );
  }, []);
  return <div ref={ref} />;
}

export default MyApp;
