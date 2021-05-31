import React from "react";
import { Web3Provider } from "../providers/store";
import "../styles/globals.css";

function MyApp({ Component, pageProps }) {
  return (
    <React.StrictMode>
      <Web3Provider>
        <Component {...pageProps} />;
      </Web3Provider>
    </React.StrictMode>
  );
}

export default MyApp;
