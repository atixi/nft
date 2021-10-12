import { DownOutlined, UpOutlined } from "@ant-design/icons";
import { Avatar, Dropdown } from "antd";
import Link from "next/link";
import { useRouter } from "next/router";
import axios from 'axios';
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import LoginModal from "../Components/loginModal";
import CONSTANTS from "../Constants/headerConstants";
import { getMetaToken, getUser, signout } from "../store/action/accountSlice";
import { BalanceLabel, ConnectedButton } from "./StyledComponents/header-styledComponents.js";
import WalletInfoDropdown from "./connectedWalletDropdown";
import useUser from '../Utils/useUser'
import api from "/Components/axiosRequest";
import {
  getMetaBalance,
  getMetaConnected,
  getWalletBalance,
  getWalletConnected,
  getWalletToken,
} from "/store/action/accountSlice";
function Header(props) {
  const router = useRouter();
 const { user  } = useUser({
    redirectTo: "/",
    redirectIfFound: false,
  });
  const metaToken = useSelector(getMetaToken);
  const metaBalance = useSelector(getMetaBalance);
  const walletToken = useSelector(getWalletToken);

  const walletBalance = useSelector(getWalletBalance);
  const isMetaconnected = useSelector(getMetaConnected);
  const isWalletConnected = useSelector(getWalletConnected);
  const dispatch = useDispatch();
  const [search, setSearch] = useState(false);
  const [menu, setMenu] = useState(false);
  const [connected, setConnected] = useState(false);
  const [data, setData] = useState({
    talents: [],
    assets: [],
    collections: [],
  });
  // for the header in mobile
  const [toggle, setToggle] = useState({ 0: false, 1: false });
  const [toggleMenu, setToggleMenu] = useState(false);
  const [submit, setSubmit] = useState();
  const [showLoginModal, setShowLoginModal] = useState(false);
  function submitClick() {
    router.push(`/search?query=${submit}`);
    setSearch(false);
  }
  function handleLiveSearch(e) {
    setSubmit(e.target.value);
    async function fetchingData() {
      const data = await api.get(`/talents/search/${e.target.value}`);
      setData(await data.data);
    }
    fetchingData();
  }
  function handleSearch(e) {
    if (e.charCode === 13) {
      setSearch(false);
      router.push(`search?query=${e.target.value}`);
    }
  }

  const searchExplore = (e) => {
    if (e.key === "Enter" || e.keyCode === 13) {
      router.push({
        pathname: "/explore",
        query: { search: e.target.value },
      });
    }
  };
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
    return address.substring(1, 4) + "..." + address.substring(address.length - 5, address.length);
  };
  const openLogin = () => {
    setShowLoginModal(true);
  };
  const handleLogout = async () => { 
    await  axios.post('/api/logout') 
    router.reload('/')
  }
  
  const isLoggedIn = user && user.jwt ? true : false;
  return (
    <header className="transparent header-light scroll-light">
      <div className="container">
        <div className="row">
          <div className="col-md-12 theHeader">
            <div className="de-flex sm-pt10">
              <div className="de-flex-col">
                <div className="de-flex-col">
                  {/* <!-- logo begin --> */}
                  <div id="logo">
                    <Link href="/" passHref>
                      <a href="/">
                        <img alt="" className="logo" src="/images/logo-light.png" />
                        <img
                          alt=""
                          style={{ width: "250px" }}
                          className="logo-2"
                          src="/images/logo.svg"
                        />
                      </a>
                    </Link>
                  </div>
                  {/* <!-- logo close --> */}
                </div>
                <div className="de-flex-col">
                  <input
                    id="quick_search"
                    className="xs-hide"
                    name="quick_search"
                    placeholder="search item here..."
                    type="text"
                    onKeyUp={searchExplore}
                  />
                </div>
              </div>
              <div className="de-flex-col header-col-mid">
                {/* <!-- mainmenu begin --> */}
                <ul id="mainmenu">
                  <li>
                    <a href="#">
                      Explore<span></span>
                    </a>
                    <ul>
                      <li>
                        <Link href="/explore" passHref>
                          <a>All Assets</a>
                        </Link>
                      </li>
                    </ul>
                  </li>
                  {isLoggedIn && (
                    <li>
                      <a href="#">
                        Create<span></span>
                      </a>
                      <ul>
                        <li>
                          <Link href={"/create/collection"}>
                            <a>Create Collection</a>
                          </Link>
                        </li>
                        <li>
                          <Link href={"/create/erc721"}>
                            <a>Create Asset</a>
                          </Link>
                        </li>
                        <li>
                          <Link href={"/add/asset"}>
                            <a>Add Existing Asset</a>
                          </Link>
                        </li>
                      </ul>
                    </li>
                  )}
                  <li>
                    {isLoggedIn ? (
                      <a onClick={handleLogout}>Logout</a>
                    ) : (
                        <a onClick={openLogin}>Login</a>
                      )}
                  </li>
                </ul>
                <div className="menu_side_area">
                  {connected == true ? (
                    <Dropdown
                      overlay={
                        <WalletInfoDropdown
                          data={
                            walletToken != null && isWalletConnected == true
                              ? walletToken
                              : metaToken != null && metaToken
                          }
                        />
                      }
                      overlayStyle={{ boxShadow: "0px 1px 2px grey" }}
                      placement="bottomRight"
                      trigger={["click"]}
                    >
                      <ConnectedButton className={`d-lg-block`}>
                        {walletBalance !== null && isWalletConnected == true ? (
                          <>
                            <BalanceLabel>
                              {parseFloat(walletBalance).toFixed(4) + " Eth"}
                            </BalanceLabel>
                            <Avatar size={36} src={"/images/walletIcons/walletIcon.svg"} />{" "}
                          </>
                        ) : (
                            <>
                              <BalanceLabel>{parseFloat(metaBalance).toFixed(4) + " Eth"}</BalanceLabel>
                              <Avatar size={36} src={"/images/walletIcons/metaIcon.svg"} />
                            </>
                          )}
                      </ConnectedButton>
                    </Dropdown>
                  ) : (
                      <>
                        <Link href={"/wallet"} passHref>
                          <a className="btn-main">
                            <i className="icon_wallet_alt"></i>
                            <span>{`${CONSTANTS.connect} ${CONSTANTS.wallet}`}</span>
                          </a>
                        </Link>
                        <span id="menu-btn"></span>
                      </>
                    )}
                </div>
              </div>
            </div>
          </div>
        </div>
        <ul id="MobileMenu" style={toggleMenu ? { height: "300px" } : { height: "0px" }}>
          <li>
            <div className="dropdownList">
              <Link href="/explore" passHref>
                <a href="/explore">Explore</a>
              </Link>
              <span
                className="ArrowIcons"
                onClick={() => setToggle({ ...toggle, ["0"]: !toggle[0] })}
              >
                {toggle[0] ? (
                  <UpOutlined style={{ width: 30 }} />
                ) : (
                    <DownOutlined style={{ width: 30 }} />
                  )}
              </span>
            </div>
            <div
              className="dropdownContent"
              style={toggle[0] ? { height: "70px" } : { height: "0px" }}
            >
              <Link href="/explore" passHref>
                <a href="/explore">All Assets</a>
              </Link>
            </div>
          </li>
          <li>
            <div className="dropdownList">
              <Link href="/">
                <a>Create</a>
              </Link>
              <span
                className="ArrowIcons"
                onClick={() => setToggle({ ...toggle, ["1"]: !toggle[1] })}
              >
                {toggle[1] ? (
                  <UpOutlined style={{ width: 30 }} />
                ) : (
                    <DownOutlined style={{ width: 30 }} />
                  )}
              </span>
            </div>
            <div className={toggle[1] ? "dropdownContent show" : "dropdownContent"}>
              <Link href="/create">
                <a>Create Asset</a>
              </Link>
              <Link href="/add/asset">
                <a>Add Existing Asset</a>
              </Link>
            </div>
          </li>
          <li>
            <div className="dropdownList">
              {isLoggedIn ? (
                <a style={{ color: "#F32178" }} onClick={handleLogout}>
                  Logout
                </a>
              ) : (
                  <a style={{ color: "#F32178" }} onClick={openLogin}>
                    Login
                  </a>
                )}
            </div>
          </li>
        </ul>
      </div>
      {showLoginModal && (
        <LoginModal showLoginModal={showLoginModal} setShowLoginModal={setShowLoginModal} />
      )}
    </header>
  );
}
export default Header;
