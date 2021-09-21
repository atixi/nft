import { Avatar, List, Menu } from "antd";
import React, { useEffect, useState } from "react";
import {
  getAccountTokens,
  getIsDisconnectedFromServer,
  getMetaBalance,
  getMetaConnected,
  getMetaToken,
  getWalletBalance,
  getWalletConnected,
  getWalletToken,
  setAccountTokens,
  setDisplayWalletModal,
  setMetaConnected,
  setMetaToken,
  setWalletBalance,
  setWalletConnected,
  setWalletToken,
} from "/store/action/accountSlice";
import { useDispatch, useSelector } from "react-redux";

import Link from "next/link";
import styled from "styled-components";

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
  // margin-top: 15px;
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
function WalletInfoDropdown({ data }) {
  const dispatch = useDispatch();
  const dispatchMetaConnected = useDispatch();
  const dispatchWalletConnected = useDispatch();
  const dispatchWalletToken = useDispatch();
  const dispatchWalletBalance = useDispatch();
  const isWalletConnected = useSelector(getWalletConnected);
  const isMetaConnected = useSelector(getMetaConnected);
  const metaBalance = useSelector(getMetaBalance);
  const walletBalance = useSelector(getWalletBalance);
  const metaToken = useSelector(getMetaToken);
  const walletToken = useSelector(getWalletToken);
  const [address, setAddress] = useState(data[0]);

  const disconnectWallet = async () => {
    // const bridge = "https://bridge.walletconnect.org";

    // const connector = new WalletConnect({ bridge, qrcodeModal: QRCodeModal });

    // if (!connector.connected) {
    // } else {
    //   await connector.killSession();
    // }
    await dispatchMetaConnected(setMetaConnected(false));
    await dispatchWalletConnected(setWalletConnected(false));
    await dispatchWalletToken(setWalletToken(null));
    await dispatchWalletBalance(setWalletBalance(""));
    await dispatch(setDisplayWalletModal(true));
  };
  const displayAddress = () => {
    const add =
      address?.substring(0, 6) +
      "..." +
      address?.substring(address?.length - 4, address?.length);
    setAddress(add);
  };

  useEffect(() => {
    displayAddress();
  }, [isMetaConnected]);
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
            <a>{/* <small>{CONSTANTS.setDisplay}</small> */}</a>
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
                {parseFloat(metaBalance).toFixed(8) + " ETH"}
              </ListDescription>
            }
          />
        </List.Item>
        {/* <List.Item
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
                {walletBalance !== null && isWalletConnected == true
                  ? walletBalance + " WETH "
                  : metaBalance + " WETH"}
              </ListDescription>
            }
          />
        </List.Item> */}
      </List>
      <hr />
      <Menu.Item>
        <Link
          href={{
            pathname: `/profile/${metaToken[0]}`,
          }}
        >
          <a>{"My Items"}</a>
        </Link>
      </Menu.Item>
      <Menu.Item>
        <Link
          href={{
            pathname: `/create/collection`,
          }}
        >
          <a>{"Create Collection"}</a>
        </Link>
      </Menu.Item>
      <Menu.Item>
        <Link
          href={{
            pathname: `/create/erc721`,
          }}
        >
          <a>{"Create Item"}</a>
        </Link>
      </Menu.Item>
      {/* <Menu.Item>
        <Link
          href={{
            // pathname: "/profile/index",
            pathname: `/account/${metaToken[0] ? metaToken[0] : ""}`,
            // query: {
            //   address: seller.address,
            //   talent: seller.talent,
            //   avatar: seller.profile_img_url,
            // },
          }}
        >
          <a>{"My Account Setting"}</a>
        </Link>
      </Menu.Item> */}
      <Menu.Item onClick={disconnectWallet}>
        <label style={{ cursor: "pointer" }}>{`Disconnect`}</label>
      </Menu.Item>
    </DropdownMenu>
  );
}

export default WalletInfoDropdown;
