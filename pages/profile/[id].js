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
import OpenSeaAPI from "/Utils/openseaApi";
import {
  LoadingContainer,
  LoadMoreButton,
  MainWrapper,
} from "/Components/StyledComponents/globalStyledComponents";

import { useRouter } from "next/router";
import { useQueryParam } from "/Components/hooks/useQueryParam";
import { assets } from "/Constants/mockApi/assets";

const { TabPane } = Tabs;
function Profile() {
  const router = useRouter();
  const [collections, setCollections] = useState();
  const [created, setCreated] = useState();
  const { talent } = router.query;
  const { address } = router.query;
  const { avatar } = router.query;
  const [isLoading, setIsLoading] = useState(true);
  const [addressToShow, setAddress] = useState(
    address &&
      address
        .toString()
        .replace(address.toString().substring(10, address.length - 10), ".....")
  );
  const FetchCreatedAssets = async (e) => {
    setIsLoading(true);
    const createRequest = await OpenSeaAPI.getAssetsListByOwner(address);
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
      loadAssets(talent);
    } else if (e === "2") {
      loadCollections(talent);
    }
  };

  const loadCollections = (tal) => {
    setCollections(assets[tal]);
  };
  const loadAssets = (tal) => {
    const data = assets[tal].slice(assets[tal].length / 2, assets[tal].length);
    setCreated(data);
  };
  const query = useQueryParam();
  useEffect(() => {
    if (!query) {
      return;
    }
    loadAssets(query.talent);
    loadCollections(query.talent);
  }, [query]);
  return (
    <>
      <MainWrapper>
        <ProfileContainer>
          <img src="/images/talentCover.png" />
          <BiographyContainer>
            <div className={"avatar"}>
              <img alt="userAvatar" src={avatar} loading="lazy" />
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
              <Products data={collections} />
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
export default Profile;
