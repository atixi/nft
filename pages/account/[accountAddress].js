import React, { useEffect, useState } from "react";
import { topSellersAPI } from "Constants/mockApi/topSellerApi";
import { Menu } from "antd";
import {
  AppstoreOutlined,
  MailOutlined,
  SettingOutlined,
} from "@ant-design/icons";

const { SubMenu } = Menu;

function AccountSetting({ accountAddress }) {
  const [address, setAddress] = useState(accountAddress);

  useEffect(() => {
    console.log("account address is : ", accountAddress);
    setAddress(
      address
        .toString()
        .replace(address.toString().substring(10, address.length - 10), ".....")
    );
  });

  return (
    <div className={"container"}>
      <div>
        <Menu
          //   onClick={this.handleClick}
          style={{ width: 300 }}
          defaultSelectedKeys={["1"]}
          defaultOpenKeys={["sub1"]}
          mode="inline"
        >
          <SubMenu style={{ color: "black" }} key="sub1" title="My Wallet">
            <Menu.Item key="1">
              <span style={{ color: "black" }}>{address}</span>
            </Menu.Item>
            <Menu.Item key="1">
              {<span style={{ color: "black" }}>{"General"}</span>}
            </Menu.Item>
            <Menu.Item key="1">
              <span style={{ color: "black" }}>{"Notification Settings"}</span>
            </Menu.Item>
            <Menu.Item key="1">
              <span style={{ color: "black" }}>{"Appearance"}</span>
            </Menu.Item>
          </SubMenu>
        </Menu>
      </div>
    </div>
  );
}

export async function getStaticPaths() {
  const talentResult = topSellersAPI;
  const talentAddresses = [];
  talentResult.map((talent) => talentAddresses.push(talent.accountAddress));
  const paths = talentAddresses.map((address) => {
    return {
      params: { accountAddress: address.toString() },
    };
  });
  return {
    paths,
    fallback: true,
  };
}
export const getStaticProps = async (context) => {
  const accountAddress = context.params.accountAddress;

  //   const talentData = topSellersAPI.filter(
  //     (item) => item.accountAddress == accountAddress
  //   )[0];
  //   const assets = talentData.assets;
  //   const created = assets.slice(0, assets.length / 2);
  //   const collectibles = assets.slice(assets.length / 2, assets.length);
  //   const talent = talentData.talent;
  //   const profile_img_url = talentData.profile_img_url;
  return {
    props: {
      //   assets: JSON.parse(JSON.stringify(assets)),
      //   created: JSON.parse(JSON.stringify(created)),
      //   collectibles: JSON.parse(JSON.stringify(collectibles)),
      //   talent: JSON.parse(JSON.stringify(talent)),
      //   profile_img_url: JSON.parse(JSON.stringify(profile_img_url)),
      accountAddress: JSON.parse(JSON.stringify(accountAddress)),
    },
  };
};

export default AccountSetting;
