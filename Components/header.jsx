import { useEffect, useState } from "react";
import Search from "./search";
import Link from "next/link";
import { Avatar, Dropdown } from "antd";
import { Avatar, Modal } from "antd";
import CONSTANTS from "../Constants/headerConstants";
import Image from 'next/image'
import {
  ConnectedButton,
  BalanceLabel,
} from "./StyledComponents/header-styledComponents.js";
import {
  getAccountTokens,
  getMetaBalance,
  getWalletToken,
  getWalletBalance,
  getMetaConnected,
  getWalletConnected,
} from "/store/action/accountSlice";
import LoginModal from "../Components/loginModal"
import { useDispatch, useSelector } from "react-redux";
import { useRouter } from "next/router";
import api from "/Components/axiosRequest";
import { DownOutlined, UpOutlined } from "@ant-design/icons";
import { getUser, signout } from '../store/action/accountSlice';
function Header(props) {
  const router = useRouter();
  const { jwt } = useSelector(getUser)
  const accountTokens = useSelector(getAccountTokens);
  const metaToken = useSelector(getMetaToken);
  const metaBalance = useSelector(getMetaBalance);
  const walletToken = useSelector(getWalletToken);

  const walletBalance = useSelector(getWalletBalance);
  const isMetaconnected = useSelector(getMetaConnected);
  const isWalletConnected = useSelector(getWalletConnected);
  const dispatch = useDispatch();
  const [profileDetails, setProfileDetails] = useState(null);
  const [search, setSearch] = useState(false);
  const [menu, setMenu] = useState(false);
  const [connected, setConnected] = useState(false);
  const [data, setData] = useState({
    talents: [],
    assets: [],
    collections: [],
  });
  // for the header in mobile 
  const [toggle,setToggle]= useState({"0":false,"1":false});
  const [toggleMenu,setToggleMenu]= useState(false);
  const [submit, setSubmit] = useState();
  const [submit, setSubmit] = useState()
  const [showLoginModal, setShowLoginModal] = useState(false)
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
  const openLogin = () => {
    setShowLoginModal(true)
  }
  const handleLogout = async () => {
    try {
      const logout = await dispatch(signout(null));
      console.log("sign out", logout)
      if (logout.meta?.requestStatus === "fulfilled") {
        router.push("/")
      }
    } catch (err) {
    }
  }
  const isLoggedIn = () => { return jwt ? true : false }
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
                    <a href="/">
                      <img alt="" className="logo" src="/images/logo-light.png" />
                      <img alt="" style={{ width: "250px" }} className="logo-2" src="/images/logo.svg" />
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
                    <a href="#">Explore<span></span></a>
                    <ul>
                      <li><a href="/explore">All Assets</a></li>
                    </ul>
                  </li>
                  <li>
                    <a href="#">Create<span></span></a>
                    <ul>
                      <li><Link href={"/"}><a>Create Asset</a></Link></li>
                      <li><Link href={"/add/asset"}><a>Add Existing Asset</a></Link></li>

                    </ul>
                  </li>
                  <li>
                    {isLoggedIn() ?
                      <a onClick={handleLogout}>Logout</a> :
                      <a onClick={openLogin}>Login</a>}
                  </li>
                </ul>
                <div className="menu_side_area">
                  {connected == true ? (
                    <ConnectedButton className={`d-lg-block`}>
                      {walletBalance !== null && isWalletConnected == true ? (
                        <>
                          <BalanceLabel>
                            {parseFloat(walletBalance).toFixed(4) + " Eth"}
                          </BalanceLabel>
                          <Avatar
                            size={36}
                            src={"/images/walletIcons/walletIcon.svg"}
                          />{" "}
                        </>
                      ) : (
                          <>
                            <BalanceLabel>
                              {parseFloat(metaBalance).toFixed(4) + " Eth"}
                            </BalanceLabel>
                            <Avatar size={36} src={"/images/walletIcons/metaIcon.svg"} />
                          </>
                        )}
                    </ConnectedButton>
                  ) : (
                      <>
                        <Link href={"/wallet"} passHref>
                          <a className="btn-main"><i className="icon_wallet_alt"></i><span>{`${CONSTANTS.connect} ${CONSTANTS.wallet}`}</span></a>
                        </Link>
                        <span id="menu-btn" onClick={()=>setToggleMenu(!toggleMenu)}></span>
                      </>
                    )}
                </div>
              </div>
            </div>
          </div>
        </div>
          <ul id="MobileMenu" style={toggleMenu?{height:"200px"}:{height:"0px"}}>
             <li>
               <div className="dropdownList">
                  <a href="/">Explore</a>
                 <span className="ArrowIcons" onClick={()=>setToggle({...toggle,["0"]:!toggle[0]})} >
                 {toggle[0]?<UpOutlined style={{width:30}} />: <DownOutlined style={{width:30}} />} 
                 </span>
               </div>
               <div className="dropdownContent" style={toggle[0]?{height:"70px"}:{height:"0px"}}>
                  <a href="/">All Assets</a>
                  
               </div>
               </li>  
              <li>
               <div className="dropdownList">
                  <a href="/">Create</a>
                 <span className="ArrowIcons" onClick={()=>setToggle({...toggle,["1"]:!toggle[1]})} >
                 {toggle[1]?<UpOutlined style={{width:30}} />: <DownOutlined style={{width:30}} />} 
                 </span>
               </div>
               <div className={toggle[1]?"dropdownContent show":"dropdownContent"}>
                  <a href="/">Create Asset</a>
                   <a href="/">Add Existing Asset</a>
               </div>
               </li>  
          </ul>
      </div>
      {showLoginModal && <LoginModal showLoginModal={showLoginModal} setShowLoginModal={setShowLoginModal} />}
    </header>
  );
}
export default Header;
