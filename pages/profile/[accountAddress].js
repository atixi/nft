import { Tabs, Spin } from "antd";
import React, { useEffect, useState } from "react";
import {
  ProfileContainer,
  ShareButton,
  BiographyContainer,
  BioDescription,
  ProfileButton,
} from "/Components/StyledComponents/talentPage-styledComponents";
import Products from "/Components/products";
import {
  LoadingContainer,
  LoadMoreButton,
  MainWrapper,
} from "/Components/StyledComponents/globalStyledComponents";

import { useRouter } from "next/router";
import { useQueryParam } from "/Components/hooks/useQueryParam";
import { topSellersAPI } from "/Constants/mockApi/topSellerApi";

const { TabPane } = Tabs;
function Profile({
  accountAddress,
  assets,
  talent,
  profile_img_url,
  created,
  collectibles,
}) {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(true);
  const [addressToShow, setAddress] = useState(
    accountAddress &&
      accountAddress
        .toString()
        .replace(
          accountAddress.toString().substring(10, accountAddress.length - 10),
          "....."
        )
  );

  const query = useQueryParam();
  useEffect(() => {
    if (!query) {
      return;
    }
    console.log("assetas of my is : ", assets);
    console.log("talent of my is ", talent);
    console.log("accoutn address is ", accountAddress);
    console.log("profile_img_url ", profile_img_url);
    console.log("collectibles are", collectibles);
    console.log("create item are", created);
  }, [query]);
  return (
    <>
      <MainWrapper>
        <ProfileContainer>
          <img
            src={profile_img_url ? profile_img_url : "/images/talentCover.png"}
          />
          <BiographyContainer>
            <div className={"avatar"}>
              <img
                alt="userAvatar"
                src={
                  profile_img_url ? profile_img_url : "/images/talentCover.png"
                }
                loading="lazy"
              />
            </div>
            <BioDescription>
              <h3>
                <strong>{talent}</strong>
              </h3>
              <h6>
                <strong>{addressToShow}</strong>
              </h6>
              <div className="mt-4">
                <ProfileButton type="button">
                  <ShareButton />
                </ProfileButton>
                <ProfileButton type="button">{"..."}</ProfileButton>
              </div>
            </BioDescription>
          </BiographyContainer>
        </ProfileContainer>
        <Tabs defaultActiveKey="1">
          <TabPane tab="Created" key="1">
            {false ? (
              <LoadingContainer>
                <Spin />
              </LoadingContainer>
            ) : (
              <>
                {" "}
                <Products data={created} />
                {/* <LoadMoreButton block shape={"round"} size={"large"}>
                  {"Load More"}
                </LoadMoreButton> */}
              </>
            )}
          </TabPane>
          <TabPane tab="Collectibles" key="2">
            <>
              {" "}
              <Products data={collectibles} />
              <LoadMoreButton block shape={"round"} size={"large"}>
                {"Load More"}
              </LoadMoreButton>{" "}
              {/* the load button will be showed based on a condition */}{" "}
            </>
          </TabPane>
        </Tabs>
      </MainWrapper>
    </>
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
    fallback: false,
  };
}

export const getStaticProps = async (context) => {
  const accountAddress = context.params.accountAddress;

  const talentData = topSellersAPI.filter(
    (item) => item.accountAddress == accountAddress
  )[0];
  const assets = talentData.assets;
  const created = assets.slice(0, assets.length / 2);
  const collectibles = assets.slice(assets.length / 2, assets.length);
  const talent = talentData.talent;
  const profile_img_url = talentData.profile_img_url;
  return {
    props: {
      assets: JSON.parse(JSON.stringify(assets)),
      created: JSON.parse(JSON.stringify(created)),
      collectibles: JSON.parse(JSON.stringify(collectibles)),
      talent: JSON.parse(JSON.stringify(talent)),
      profile_img_url: JSON.parse(JSON.stringify(profile_img_url)),
      accountAddress: JSON.parse(JSON.stringify(accountAddress)),
    },
  };
};

export default Profile;
