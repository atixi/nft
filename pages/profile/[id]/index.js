import { Tabs, Spin } from "antd";
import React, { useEffect, useState } from "react";
import {
  ProfileContainer,
  ShareButton,
  BiographyContainer,
  BioDescription,
  ProfileButton,
} from "/Components/StyledComponents/talentPage-styledComponents";
import Header from "/Components/header";
import Footer from "/Components/footer";
import Products from "/Components/products";
import OpenSeaAPI from "/Utils/openseaApi";
import {
  LoadingContainer,
  LoadMoreButton,
  MainWrapper,
} from "/Components/StyledComponents/globalStyledComponents";

import {useRouter} from "next/router";
const { TabPane } = Tabs;
 function Profile ()  {
  const router = useRouter();
  const [collections, setCollections] = useState();
  const [created, setCreated] = useState();
  const {talent}=router.query;
  const {address}= router.query;
  const {avatar}=router.query;
  const [isLoading, setIsLoading] = useState(true);
  console.log("address", address)

  const [addressToShow, setAddress] = useState(
   address && address
      .toString()
      .replace(
        address.toString().substring(10, address.length - 10),
        "....."
      )
  );
  const FetchCreatedAssets = async (e) => {
    setIsLoading(true);
    const createRequest =  await OpenSeaAPI.getAssetsListByOwner(address);
    if (createRequest.ok) {
      const assets = await createRequest.data?.assets;
      setCreated(assets);
      setIsLoading(false);
    } else {
      setIsLoading(false);
      alert(createRequest.problem);
    }
  };
  const FetchCollectibleAssets = async (e) => {
    setIsLoading(true);
    const collectionRequest = await OpenSeaAPI.getCollections(address);
    if (collectionRequest.ok) {
      const cols = await collectionRequest.data;
      setCollections(cols);
      setIsLoading(false);
    } else {
      setIsLoading(false);
      alert(collectionRequest.problem);
    }
  };
  const loadTabData = async (e) => {
    if (e === "1") {
    address && FetchCreatedAssets();
    } else if (e === "2") {
      FetchCollectibleAssets();
    }
  };

  useEffect(() => {
  address && FetchCreatedAssets();
  }, [address]);
  return (
    <>
      <Header />
      <MainWrapper>
        <ProfileContainer>
          <img src="/images/talentCover.png" />
          <BiographyContainer>
            <div className={"avatar"}>
              <img
                alt="userAvatar"
                src={avatar}
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
        <Tabs defaultActiveKey="1" onChange={(e) => loadTabData(e)}>
          <TabPane tab="Created" key="1">
            {isLoading ? (
              <LoadingContainer>
                <Spin />
              </LoadingContainer>
            ) : (
              <>
                {" "}
                <Products data={created} />
                <LoadMoreButton block shape={"round"} size={"large"}>
                  {"Load More"}
                </LoadMoreButton>
              </>
            )}
          </TabPane>
          <TabPane tab="Collectibles" key="2">
            {isLoading ? (
              <LoadingContainer>
                <Spin />
              </LoadingContainer>
            ) : (
              <>
                {" "}
                <Products data={collections} />
                <LoadMoreButton block shape={"round"} size={"large"}>
                  {"Load More"}
                </LoadMoreButton>{" "}
                {/* the load button will be showed based on a condition */}{" "}
              </>
            )}
          </TabPane>
        </Tabs>
      </MainWrapper>
      <Footer />
    </>
  );
}
export default Profile;
