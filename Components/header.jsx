import { useEffect, useState } from "react";
import Image from "next/image";
import Search from "./search";
import Link from "next/link";
import { Avatar, Dropdown } from "antd";
import {
  TwitterOutlined,
  YoutubeFilled,
  InstagramFilled,
  SearchOutlined,
  CloseOutlined,
} from "@ant-design/icons";

import CONSTANTS from "../Constants/headerConstants";
import {
  Wrapper,
  WrapperItemContainer,
  SearchContainer,
  HeaderContainer,
  HeaderNav,
  CreateButton,
  ConnectButton,
  Button,
  HeaderBottomMenu,
  SearchWrapper,
  SocialLinkContainer,
  ConnectedButton,
  BalanceLabel,
} from "./StyledComponents/header-styledComponents.js";
import WalletInfoDropdown from "./connectedWalletDropdown";
import { fetchUsers } from "/Utils/strapiApi";
import {
  setAccountTokens,
  setMetaToken,
  setWalletToken,
  setMetaConnected,
  setWalletConnected,
  getAccountTokens,
  getMetaToken,
  getMetaBalance,
  getWalletToken,
  getWalletBalance,
  getMetaConnected,
  getWalletConnected,
} from "/store/action/accountSlice";
import { useDispatch, useSelector } from "react-redux";
import { useRouter } from "next/router";
import api from "/Components/axiosRequest";
function Header(props) {
  const router = useRouter();
  const dispatchAccountTokens = useDispatch();
  const dispatchMetaToken = useDispatch();
  const dispatchWalletToken = useDispatch();
  const dispatchMetaConnected = useDispatch();
  const dispatchWalletconneted = useDispatch();

  const accountTokens = useSelector(getAccountTokens);
  const metaToken = useSelector(getMetaToken);
  const metaBalance = useSelector(getMetaBalance);
  const walletToken = useSelector(getWalletToken);

  const walletBalance = useSelector(getWalletBalance);
  const isMetaconnected = useSelector(getMetaConnected);
  const isWalletConnected = useSelector(getWalletConnected);

  const [profileDetails, setProfileDetails] = useState(null);
  const [search, setSearch] = useState(false);
  const [menu, setMenu] = useState(false);
  const [connected, setConnected] = useState(false);
  const [data, setData] = useState({
    talents: [],
    assets: [],
    collections: [],
  });
  const [submit, setSubmit] = useState();
  function submitClick() {
    router.push(`/search?query=${submit}`);
    setSearch(false);
  }
  function handleLiveSearch(e) {
    setSubmit(e.target.value);
    async function fetchingData() {
      const data = await api.get(`/talents/search/${e.target.value}`);
      setData(await data.data);
      console.log("coskash", await data.data);
    }
    fetchingData();
  }
  function handleSearch(e) {
    console.log("search handled", e.target.value);
    if (e.charCode === 13) {
      setSearch(false);
      router.push(`search?query=${e.target.value}`);
    }
  }

  useEffect(() => {
    isConnectedToAnyWallet();
  }, [isMetaconnected]);

  const isConnectedToAnyWallet = async () => {
    if (isMetaconnected == false) {
      setConnected(false);
    } else if (
      isMetaconnected == false &&
      isWalletConnected == false &&
      metaToken == null &&
      walletToken == null
    ) {
      setConnected(false);
    } else {
      setConnected(true);
    }
  };
  const connectToWallet = async () => {
    if (!connected) {
      router.push("/wallet");
    } else {
      router.push("/");
    }
  };
  const displayMetaBalance = () => {
    return metaBalance + " Eth";
  };
  const displayAddress = (token) => {
    const address = token[0];
    return (
      address.substring(1, 4) +
      "..." +
      address.substring(address.length - 5, address.length)
    );
  };
  return (
    <header className="transparent header-light scroll-light">
      <div className="container">
        <div className="row">
          <div className="col-md-12">
            <div className="de-flex sm-pt10">
              <div className="de-flex-col">
                <div className="de-flex-col">
                  {/* <!-- logo begin --> */}
                  <div id="logo">
                    <a href="index.html">
                      <img alt="" className="logo" src="/images/logo-light.png" />
                      <img alt="" className="logo-2" src="/images/logo.png" />
                    </a>
                  </div>
                  {/* <!-- logo close --> */}
                </div>
                <div className="de-flex-col">
                  <input id="quick_search" className="xs-hide" name="quick_search" placeholder="search item here..." type="text" />
                </div>
              </div>
              <div className="de-flex-col header-col-mid">
                {/* <!-- mainmenu begin --> */}
                <ul id="mainmenu">
                  <li>
                    <a href="index.html">Home<span></span></a>
                    <ul>
                      <li><a href="03_grey-index.html">New: Grey Scheme</a></li>
                      <li><a href="index.html">Homepage 1</a></li>
                      <li><a href="index-2.html">Homepage 2</a></li>
                      <li><a href="index-3.html">Homepage 3</a></li>
                      <li><a href="index-4.html">Homepage 4</a></li>
                    </ul>
                  </li>
                  <li>
                    <a href="explore.html">Explore<span></span></a>
                    <ul>
                      <li><a href="explore.html">Explore</a></li>
                      <li><a href="explore-2.html">Explore 2</a></li>
                      <li><a href="collection.html">Collections</a></li>
                      <li><a href="live-auction.html">Live Auction</a></li>
                      <li><a href="item-details.html">Item Details</a></li>
                    </ul>
                  </li>
                  <li>
                    <a href="#">Pages<span></span></a>
                    <ul>
                      <li><a href="author.html">Author</a></li>
                      <li><a href="wallet.html">Wallet</a></li>
                      <li><a href="create.html">Create</a></li>
                      <li><a href="news.html">News</a></li>
                      <li><a href="gallery.html">Gallery</a></li>
                      <li><a href="login.html">Login</a></li>
                      <li><a href="login-2.html">Login 2</a></li>
                      <li><a href="register.html">Register</a></li>
                      <li><a href="contact.html">Contact Us</a></li>
                    </ul>
                  </li>
                  <li>
                    <a href="#">Stats<span></span></a>
                    <ul>
                      <li><a href="activity.html">Activity</a></li>
                      <li><a href="rankings.html">Rankings</a></li>
                    </ul>
                  </li>
                  <li>
                    <a href="#">Create<span></span></a>
                    <ul>
                      <li><Link href={"/"}><a>Create Asset</a></Link></li>
                      <li><Link href={"/add/asset"}><a>Add Existing Asset</a></Link></li>

                    </ul>
                  </li>
                </ul>
                <div className="menu_side_area">
                  <a href="wallet.html" className="btn-main"><i className="icon_wallet_alt"></i><span>Connect Wallet</span></a>
                  <span id="menu-btn"></span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
export default Header;
