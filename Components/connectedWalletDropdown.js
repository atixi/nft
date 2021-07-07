import React from "react";
import { Menu, List, Avatar } from "antd";
import { SwapOutlined, QuestionCircleOutlined } from "@ant-design/icons";
import styled from "styled-components";
import Link from "next/link";
import { Button } from "./StyledComponents/header-styledComponents";
import { useDispatch, useSelector } from "react-redux";
import WalletConnect from "@walletconnect/client";
import QRCodeModal from "@walletconnect/qrcode-modal";

import {
  setAccountTokens,
  setMetaToken,
  setWalletToken,
  setMetaConnected,
  setWalletConnected,
  setWalletBalance,
  getAccountTokens,
  getMetaToken,
  getMetaBalance,
  getWalletToken,
  getWalletBalance,
  getMetaConnected,
  getWalletConnected,
  getIsDisconnectedFromServer,
} from "/store/action/accountSlice";
const Label = styled.div`
  margin: 0px;
  padding: 0px;
  height: 50px;
  -webkit-box-align: stretch;
  align-items: stretch;
  border-width: 0px;
  border-style: solid;
  border-color: rgb(4, 4, 5);
  display: flex;
  flex-basis: auto;
  flex-direction: column;
  flex-shrink: 0;
  min-height: 0px;
  min-width: 0px;
  max-width: 100%;
  &:first-child {
    text-decoration: none;
    color: inherit;
    font-size: 17px !important;
    line-height: inherit;
    font-family: inherit;
    font-weight: inherit;
    text-overflow: ellipsis;
    white-space: nowrap;
    overflow: hidden;
    max-width: 100%;
  }
  &:last-child {
    margin: 4px 0px 0px;
    padding: 0px;
    -webkit-box-align: stretch;
    align-items: stretch;
    border-width: 0px;
    border-style: solid;
    border-color: rgb(4, 4, 5);
    display: flex;
    flex-basis: auto;
    flex-direction: column;
    flex-shrink: 0;
    min-height: 0px;
    min-width: 0px;
    max-width: 100%;
  }
`;
const ListTitle = styled.span`
  color: gray;
`;
const ListDescription = styled.span`
  color: black;
  span {
    color: gray;
  }
`;
const DropdownMenu = styled(Menu)`
  width: 350px;
  padding: 8px 24px;
  margin-top: 15px;
  @media (max-width: 485px) {
    margin-right: 10px !important;
  } ;
`;
const CONSTANTS = {
  setDisplay: "set display name",
  balance: "Balance",
  bidding: "Bidding",
  addFunds: "Add Funds with Visa",
  myItems: "My Items",
  editProfile: "Edit Profile",
  manageFunds: "Manage Funds",
  disconnect: "Disconnect",
};
const MenuItem = styled.div`
  &:hover {
    cursor: pointer !important;
  }
`;
function WalletInfoDropdown({ data }) {
  const dispatchMetaConnected = useDispatch();
  const dispatchWalletConnected = useDispatch();
  const dispatchWalletToken = useDispatch();
  const dispatchWalletBalance = useDispatch();
  const metaBalance = useSelector(getMetaBalance);
  const walletBalance = useSelector(getWalletBalance);
  const metaToken = useSelector(getMetaToken);
  const walletToken = useSelector(getWalletToken);
  let address = data[0];
  address = address
    .toString()
    .replace(address.toString().substring(10, address.length - 10), ".....");

  const disconnectWallet = async () => {
    const bridge = "https://bridge.walletconnect.org";

    const connector = new WalletConnect({ bridge, qrcodeModal: QRCodeModal });

    if (!connector.connected) {
    } else {
      await connector.killSession();
    }
    await dispatchMetaConnected(setMetaConnected(false));
    await dispatchWalletConnected(setWalletConnected(false));
    await dispatchWalletToken(setWalletToken(null));
    await dispatchWalletBalance(setWalletBalance(""));
  };
  const displayAddress = (token) => {
    return (
      token.substring(1, 4) +
      "..." +
      token.substring(token.length - 5, token.length)
    );
  };
  return (
    <DropdownMenu>
      <Label>
        <span
          style={{
            paddingTop: 20,
            display: "flex",
            flexDirection: "column",
          }}
        >
          {address}
        </span>
        <span
          style={{
            paddingTop: 20,
            display: "flex",
            flexDirection: "column",
          }}
        >
          <Link href={"#"}>
            <a>
              <small>{CONSTANTS.setDisplay}</small>
            </a>
          </Link>
        </span>
      </Label>
      <List itemLayout="horizontal">
        <List.Item>
          <List.Item.Meta
            avatar={<Avatar src="/images/svg/ethcoin.png" size={"large"} />}
            title={<ListTitle>{CONSTANTS.balance}</ListTitle>}
            description={
              <ListDescription>
                {walletBalance !== ""
                  ? walletBalance + " ETH "
                  : metaBalance + " ETH"}
              </ListDescription>
            }
          />
        </List.Item>
        <List.Item
          extra={
            <Button>
              <SwapOutlined />
            </Button>
          }
        >
          <List.Item.Meta
            avatar={<Avatar src="/images/svg/ethcoin.png" size={"large"} />}
            title={
              <ListTitle>
                {`${CONSTANTS.bidding} ${CONSTANTS.balance}`}{" "}
                <QuestionCircleOutlined
                  style={{
                    marginLeft: "20px",
                    marginTop: "5px",
                    position: "absolute",
                    color: "black !important",
                  }}
                />
              </ListTitle>
            }
            description={
              <ListDescription>
                {walletBalance !== ""
                  ? walletBalance + " WETH "
                  : metaBalance + " WETH"}
              </ListDescription>
            }
          />
        </List.Item>
      </List>
      <hr />
      <Menu.Item key={"1"}>
        <Link
          href={{
            // pathname: "/profile/index",
            pathname: `/profile/${
              metaToken[0] ? metaToken[0] : walletToken[0]
            }`,
            // query: {
            //   address: seller.address,
            //   talent: seller.talent,
            //   avatar: seller.profile_img_url,
            // },
          }}
        >
          <a>{"My Items"}</a>
        </Link>
      </Menu.Item>
      {/* <Menu.Item key={"2"}>
        <Link href={"#"}>
          <a>{"Edit Profile"}</a>
        </Link>
      </Menu.Item> */}
      <Menu.Item key={"3"}>
        <Link
          href={{
            // pathname: "/profile/index",
            pathname: `/account/${
              metaToken[0] ? metaToken[0] : walletToken[0]
            }`,
            // query: {
            //   address: seller.address,
            //   talent: seller.talent,
            //   avatar: seller.profile_img_url,
            // },
          }}
        >
          <a>{"My Account Setting"}</a>
        </Link>
      </Menu.Item>
      <Menu.Item key={"4"}>
        <MenuItem style={{ cursor: "pointer" }} onClick={disconnectWallet}>
          <label>{`Disconnect`}</label>
        </MenuItem>
      </Menu.Item>
    </DropdownMenu>
  );
}

export default WalletInfoDropdown;
