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
  if (search)
    return (
      <Wrapper>
        <HeaderContainer style={{ borderBottom: "1px solid #e5e5e5" }}>
          <Button
            onClick={() => {
              setSearch(false);
            }}
          >
            <CloseOutlined />
          </Button>
          <SearchWrapper style={{ flex: 1 }}>
            <SearchOutlined
              onClick={(e) => {
                submitClick();
              }}
              style={{
                marginRight: "10px",
                color: "inherit",
              }}
            />
            <input
              type="text"
              style={{ flex: 1, width: "auto" }}
              placeholder="Search by creator, collections or NFT"
              onChange={(e) => handleLiveSearch(e)}
              onKeyPress={(e) => handleSearch(e)}
            />
          </SearchWrapper>
        </HeaderContainer>
        <SearchContainer>
          <br />
          <center>
            {CONSTANTS.searchResult} &quot;{submit}&quot;
          </center>
          <div className="p-4">
            {data.assets?.length !== 0 ? (
              <h5>
                <strong>Assets</strong>
              </h5>
            ) : (
              ""
            )}
            {data.assets.map((n, index) => {
              return (
                <Link
                  key={index}
                  href={`/nft/${n.tokenAddress}?tokenId=${n?.tokenId}`}
                  passHref
                >
                  <div
                    style={{
                      display: "flex",
                      flexDirection: "row",
                      justifyContent: "flex-start",
                      alignItems: "center",
                      justifyContent: "flex-start",
                      marginBottom: "3px",
                    }}
                  >
                    <Image
                      src={n.previewImage.url}
                      width={60}
                      height={60}
                      alt={n.name}
                    />
                    <div className="ml-2">
                      <h5>{n.name}</h5>
                    </div>
                  </div>
                </Link>
              );
            })}
          </div>

          <div className="p-4">
            {data.assets?.length !== 0 ? (
              <h5>
                <strong>Collections</strong>
              </h5>
            ) : (
              ""
            )}
            {data.collections.map((n, index) => {
              return (
                <Link key={index} href={`/collection/${n.slug}`} passHref>
                  <div
                    style={{
                      display: "flex",
                      flexDirection: "row",
                      justifyContent: "flex-start",
                      alignItems: "center",
                      justifyContent: "flex-start",
                      marginBottom: "3px",
                    }}
                  >
                    <Image
                      src={n.collectionImageURL.url}
                      width={60}
                      height={60}
                      alt={n.collectionName}
                    />
                    <div className="ml-2">
                      <h5>{n.collectionName}</h5>
                    </div>
                  </div>
                </Link>
              );
            })}
          </div>

          <div className="p-4">
            {data.assets?.length !== 0 ? (
              <h5>
                <strong>Talents</strong>
              </h5>
            ) : (
              ""
            )}
            {data.talents.map((n, index) => {
              return (
                <Link key={index} href={`/profile/${n.userName}`} passHref>
                  <div
                    style={{
                      display: "flex",
                      flexDirection: "row",
                      justifyContent: "flex-start",
                      alignItems: "center",
                      justifyContent: "flex-start",
                      marginBottom: "3px",
                    }}
                  >
                    <Image
                      src={n.talentAvatar.url}
                      width={60}
                      height={60}
                      alt={n.talentName}
                    />
                    <div className="ml-2">
                      <h5>{n.talentName}</h5>
                    </div>
                  </div>
                </Link>
              );
            })}
          </div>
        </SearchContainer>
      </Wrapper>
    );
  if (menu)
    return (
      <Wrapper>
        <HeaderContainer>
          <div style={{ marginRight: "15px" }}>
            <Link href="/">
              <Image src="/logo/logo.png" width="40" height="40" />
            </Link>
          </div>
          <div style={{ flex: 1 }}></div>
          <Button
            onClick={() => {
              setMenu(false);
            }}
          >
            <CloseOutlined />
          </Button>
        </HeaderContainer>
        <WrapperItemContainer>
          <ul>
            <li>
              <a href="#">{CONSTANTS.explore}</a>
            </li>
            <li>
              <a href="#">{CONSTANTS.myItems}</a>
            </li>
            <li>
              <a href="#">{CONSTANTS.howItWorks}</a>
            </li>
          </ul>

          <HeaderBottomMenu>
            <div style={{ display: "flex", padding: "20px 10px" }}>
              <Button
                style={{ flex: 1, backgroundColor: "#0066ff", color: "#fff" }}
              >
                {CONSTANTS.create}
              </Button>
              <CreateButton
                onClick={() => {
                  setMenu(false);
                }}
                style={{ flex: 1 }}
              >
                <Link href="/wallet" passHref>
                  <a>{CONSTANTS.connect}</a>
                </Link>
              </CreateButton>
            </div>
          </HeaderBottomMenu>
        </WrapperItemContainer>
      </Wrapper>
    );
  return (
    <HeaderNav>
      <div style={{ marginRight: "15px" }}>
        <Link href="/" passHref>
          <a>
            <Image src="/logo/logo.png" width="40" height="40" />
          </a>
        </Link>
      </div>
      <div
        className="d-none d-xl-flex px-1"
        style={{ flex: "1", marginRight: "0px", height: "40px" }}
      >
        <Search />
      </div>
      <ul style={{ paddingRight: "30px" }}>
        <li className={`active d-none d-lg-flex`}>
          <a href="#">{CONSTANTS.explore}</a>
        </li>
        <li className="d-none d-lg-flex">
          {isMetaconnected && metaToken.length > 0 && (
            <Link
              href={{
                pathname: `/profile/${metaToken[0]}`,
              }}
            >
              <a>{"My Items"}</a>
            </Link>
          )}
        </li>
        <li className="d-none d-lg-flex">
          <a
            target="_blank"
            rel="noreferrer"
            href="https://savory-vulcanodon-748.notion.site/Top-NFT-Collectibles-ece713f206cb48838e4cd0d1113bcd14"
          >
            {CONSTANTS.howItWorks}
          </a>
        </li>
      </ul>
      <div style={{ flex: 1 }} className="d-block d-xl-none"></div>
      <div style={{ display: "flex" }}>
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
            overlayStyle={{ boxShadow: "0px 1px 2px grey"}}
            placement="bottomRight"
            trigger={["click"]}
          >
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
          </Dropdown>
        ) : (
          <ConnectButton
            className={`d-none d-lg-block`}
            onClick={connectToWallet}
          >
            <Link href={"/wallet"} passHref>
              <a>{`${CONSTANTS.connect} ${CONSTANTS.wallet}`}</a>
            </Link>
          </ConnectButton>
        )}
        <Button
          onClick={() => {
            setSearch(true);
          }}
          className={`d-block d-xl-none`}
        >
          <SearchOutlined />
        </Button>
        <Button
          onClick={() => {
            setMenu(true);
          }}
          className={`d-block d-lg-none`}
        >
          <svg
            style={{ color: "#000" }}
            viewBox="0 0 18 8"
            fill="none"
            width="13.200000000000001"
            height="13.200000000000001"
            xlmns="http://www.w3.org/2000/svg"
          >
            <path
              fillRule="evenodd"
              clipRule="evenodd"
              d="M1 0C0.447715 0 0 0.447715 0 1C0 1.55228 0.447716 2 1 2H17C17.5523 2 18 1.55228 18 1C18 0.447715 17.5523 0 17 0H1ZM4 6C3.44772 6 3 6.44772 3 7C3 7.55228 3.44772 8 4 8H14C14.5523 8 15 7.55228 15 7C15 6.44772 14.5523 6 14 6H4Z"
              fill="currentColor"
            ></path>
          </svg>
        </Button>
      </div>
    </HeaderNav>
  );
}
export default Header;
