import "bootstrap/dist/css/bootstrap.min.css";
import "antd/dist/antd.css";
import "../styles/style.css";
import dynamic from "next/dynamic";
import ReactDOM from "react-dom";
import { Web3Provider } from "../providers/store";

import React, { useEffect, useRef } from "react";

function getLibrary(provider) {
  const library = new Web3Provider(provider);
  library.pollingInterval = 12000;
  return library;
}

function MyApp({ Component, pageProps }) {
  let ref = useRef();

  useEffect(() => {
    ReactDOM.render(
      <Web3Provider>
        <Component {...pageProps} />
      </Web3Provider>,
      ref.current
    );
  }, []);
  return <div ref={ref} />;
}

export default MyApp;
