import { Web3ReactProvider } from "@web3-react/core";
import React from "react";
import { getLibrary } from "../Utils/Web3react";
const Providers = ({ children }) => {
  return <Web3ReactProvider getLibrary={getLibrary}></Web3ReactProvider>;
};

export default Providers;
