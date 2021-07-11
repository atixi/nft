import { Tabs, Spin } from "antd";
import React, { useEffect, useState } from "react";
import {
  ProfileContainer,
  ShareButton,
  BiographyContainer,
  BioDescription,
  ProfileButton,
} from "/Components/StyledComponents/talentPage-styledComponents";
import Products from "/Components/nfts";
import {
  LoadingContainer,
  LoadMoreButton,
  MainWrapper,
} from "/Components/StyledComponents/globalStyledComponents";
import { useRouter } from "next/router";
import axios from "axios";

const api = axios.create({
  baseURL: process.env.HEROKU_BASE_URL,
  headers: {
    Accept: "application/json",
    "Content-Type": "application/json",
  },
});

const { TabPane } = Tabs;
function Profile() {
  const [talent, setTalent] = useState({
    talentAvatar: {
      url: "/images/talentCover.png",
    },
    talentBanner: {
      url: "",
    },
    talentName: "",
    assets: [],
  });
  const [onSales, setOnsales] = useState({
    assets: [],
  });
  const router = useRouter();
  const { profile } = router.query;

  useEffect(() => {
    (async function fetchingTalent() {
      if (profile != undefined) {
        const data = await api.get(`/talents/${profile}`);
        setTalent(await data.data);
        const sellOrders = await data.data.assets.filter(
          (asset) => asset.sellOrders != null
        );
        setOnsales({
          talent: { talentAvatar: { url: talent.talentAvatar.url } },
          assets: sellOrders,
        });
      }
    })();
  }, [profile]);
  return (
    <>
      <MainWrapper>
        <ProfileContainer>
          <img src={talent.talentBanner?.url} />
          <BiographyContainer>
            <div className={"avatar"}>
              <img
                alt="userAvatar"
                src={talent.talentAvatar?.url}
                loading="lazy"
              />
            </div>
            <BioDescription>
              <h3>
                <strong>{talent.talentName}</strong>
              </h3>
              <h6>
                <strong>{`addressToShow`}</strong>
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
          <TabPane tab="On Sale" key="1">
            <>
              <Products data={onSales} />
              <LoadMoreButton block shape={"round"} size={"large"}>
                {"Load More"}
              </LoadMoreButton>{" "}
            </>
          </TabPane>

          <TabPane tab="Owned" key="2">
            <>
              <Products data={onSales} />
              <LoadMoreButton block shape={"round"} size={"large"}>
                {"Load More"}
              </LoadMoreButton>{" "}
            </>
          </TabPane>
          <TabPane tab="Created" key="3">
            {false ? (
              <LoadingContainer>
                <Spin />
              </LoadingContainer>
            ) : (
              <>
                {" "}
                <Products data={talent} />
                {/* <LoadMoreButton block shape={"round"} size={"large"}>
                  {"Load More"}
                </LoadMoreButton> */}
              </>
            )}
          </TabPane>
        </Tabs>
      </MainWrapper>
    </>
  );
}

export default Profile;
