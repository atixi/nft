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
  const menuFooter = (
    <SocialLinkContainer>
      <div>
        <a href="#">
          <TwitterOutlined />
        </a>
      </div>
      <div>
        <a href="#">
          <svg
            viewBox="0 0 16 14"
            fill="none"
            width="17"
            height="17"
            xlmns="http://www.w3.org/2000/svg"
          >
            <path
              d="M15.9513 1.29916L13.5438 13.1556C13.377 13.997 12.8902 14.1987 12.21 13.8093L8.542 10.979L6.76804 12.7662C6.56797 12.9748 6.40125 13.1556 6.03445 13.1556C5.55428 13.1556 5.63431 12.9679 5.47425 12.495L4.20714 8.19051L0.572523 7.00834C-0.214421 6.76495 -0.22109 6.20168 0.745918 5.7914L14.9243 0.0891779C15.5711 -0.209841 16.1914 0.256072 15.9446 1.29221L15.9513 1.29916Z"
              fill="currentColor"
            ></path>
          </svg>
        </a>
      </div>
      <div>
        <a href="#">
          <InstagramFilled />
        </a>
      </div>
      <div>
        <a href="#">
          <svg
            viewBox="0 0 18 13"
            fill="none"
            width="18"
            height="18"
            xlmns="http://www.w3.org/2000/svg"
          >
            <path
              fillRule="evenodd"
              clipRule="evenodd"
              d="M11.5507 0.0036464H11.5624L11.5612 0L11.5507 0.0036464ZM11.5108 0.0176323L11.5507 0.0036464H11.5252L11.5108 0.0176323ZM11.5039 0.0243315L11.5108 0.0176323L11.4917 0.0243072L11.5039 0.0243315ZM11.5039 0.0243315L11.2748 0.246719C13.8446 0.975936 15.088 2.11473 15.088 2.11473C13.4318 1.30287 11.9393 0.896938 10.4467 0.732864C9.36818 0.56879 8.28967 0.65508 7.37851 0.732864H7.13058C6.54793 0.732864 5.30826 0.975936 3.64711 1.62616C3.06818 1.87287 2.73595 2.03452 2.73595 2.03452C2.73595 2.03452 3.9781 0.816724 6.71529 0.166505L6.54793 0.00243113C6.54793 0.00243113 4.47521 -0.075352 2.2376 1.54594C2.2376 1.54594 0 5.36704 0 10.0778C0 10.0778 1.23967 12.1925 4.64008 12.2727C4.64008 12.2727 5.13595 11.6249 5.63802 11.0549C3.72893 10.4861 2.98512 9.34857 2.98512 9.34857C2.98512 9.34857 3.15124 9.42878 3.40041 9.59164H3.47479C3.50979 9.59164 3.52722 9.60778 3.54568 9.62487C3.54684 9.62595 3.548 9.62702 3.54917 9.6281V9.63539C3.56901 9.65484 3.58636 9.67185 3.62355 9.67185C3.6596 9.68642 3.69564 9.70096 3.73164 9.71548C4.10416 9.8658 4.47123 10.0139 4.77645 10.158C5.35413 10.4035 6.09669 10.6478 7.00785 10.8094C8.16074 10.9735 9.48223 11.0525 10.9872 10.8094L11.0353 10.7988L11.0353 10.7988C11.7631 10.6384 12.4908 10.4779 13.2186 10.1592C13.3516 10.0923 13.4931 10.0255 13.6419 9.95511C14.0339 9.76978 14.4769 9.56038 14.9504 9.26349C14.9504 9.26349 14.2066 10.4011 12.2169 10.9699C12.626 11.5362 13.2025 12.1852 13.2025 12.1852C15.9898 12.1255 17.3804 10.6948 17.8328 10.2295C17.9325 10.1269 17.9866 10.0713 18 10.0875C18 5.38405 15.75 1.55566 15.75 1.55566C13.7464 0.097178 11.8701 0.0257804 11.5039 0.0243315ZM6.13886 5.36701C7.00663 5.36701 7.70828 6.09623 7.70828 6.98952C7.70828 7.88889 7.00167 8.61811 6.1339 8.61811C5.26613 8.61811 4.55952 7.88889 4.55952 6.99682C4.55952 6.09745 5.26613 5.37066 6.1339 5.37066L6.13886 5.36701ZM11.7707 5.36701C12.6422 5.36701 13.3451 6.09623 13.3451 6.98952C13.3451 7.88889 12.6384 8.61811 11.7707 8.61811C10.9029 8.61811 10.1963 7.88889 10.1963 6.99682C10.1988 6.09745 10.9066 5.37066 11.7707 5.37066V5.36701Z"
              fill="currentColor"
            ></path>
          </svg>
        </a>
      </div>
      <div>
        <a href="#">
          <YoutubeFilled />
        </a>
      </div>
      <div>
        <a href="#">
          <svg
            viewBox="0 0 18 12"
            fill="none"
            width="20"
            height="20"
            xlmns="http://www.w3.org/2000/svg"
          >
            <path
              d="M5.07644 11.25C7.88022 11.25 10.1531 8.89939 10.1531 5.99991C10.1531 3.10043 7.88004 0.75 5.07644 0.75C2.27284 0.75 0 3.09972 0 5.99991C0 8.9001 2.27267 11.25 5.07644 11.25Z"
              fill="currentColor"
            ></path>
            <path
              d="M13.1839 10.9419C14.5857 10.9419 15.7222 8.72942 15.7222 5.99991C15.7222 3.27111 14.5857 1.0579 13.1839 1.0579C11.7821 1.0579 10.6455 3.27111 10.6455 5.99991C10.6455 8.72871 11.7821 10.9419 13.1839 10.9419Z"
              fill="currentColor"
            ></path>
            <path
              d="M17.1072 10.4277C17.6003 10.4277 18 8.44542 18 5.99991C18 3.55458 17.6006 1.57207 17.1074 1.57207C16.6142 1.57207 16.2145 3.55511 16.2145 5.99991C16.2145 8.44471 16.6142 10.4277 17.1072 10.4277Z"
              fill="currentColor"
            ></path>
          </svg>
        </a>
      </div>
    </SocialLinkContainer>
  );
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
            {menuFooter}
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
            placement="bottomRight"
            trigger={["hover"]}
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
