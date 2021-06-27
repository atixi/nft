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
import { collectionAssets as assets } from "/Constants/mockApi/collectionApi";
import { useQueryParam } from "/Components/hooks/useQueryParam";
import {
  LoadingContainer,
  LoadMoreButton,
  MainWrapper,
} from "/Components/StyledComponents/globalStyledComponents";

import { useRouter } from "next/router";
const { TabPane } = Tabs;
function CollectionDetails() {
  const router = useRouter();
  const [collections, setCollections] = useState();
  const [banner, setBanner] = useState();
  const [created, setCreated] = useState();
  const { collection } = router.query;
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
      loadAssets();
    } else if (e === "2") {
      loadCollections();
    }
  };
  const loadCollections = (tal) => {
    setCollections(assets);
  };
  const loadAssets = (tal) => {
    const data = assets.slice(assets.length / 2, assets.length);
    setCreated(data);
  };
  const query = useQueryParam();
  useEffect(() => {
    if (!query) {
      return;
    }
    var item = assets[Math.floor(Math.random() * assets.length)];
    setBanner(item.image_url);
    loadAssets();
    loadCollections();
  }, [query]);
  // useEffect(() => {
  // setCreated(assets.assets);
  // }, [assets]);
  return (
    <>
      <MainWrapper>
        <ProfileContainer>
          <img src={`https://picsum.photos/1000/400`} />
          <BiographyContainer>
            <div className={"avatar"}>
              <img alt="userAvatar" src={query.image_url} loading="lazy" />
            </div>
            <BioDescription>
              <h3>
                <strong>{collection}</strong>
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
          <TabPane tab="On Sale" key="1">
            <Products data={created} />
            <LoadMoreButton block shape={"round"} size={"large"}>
              {"Load More"}
            </LoadMoreButton>
          </TabPane>
          <TabPane tab="Owned" key="2">
            <>
              {" "}
              <Products data={collections} />
              <LoadMoreButton block shape={"round"} size={"large"}>
                {"Load More"}
              </LoadMoreButton>
            </>
          </TabPane>
        </Tabs>
      </MainWrapper>
    </>
  );
}
export const getServerSideProps = async () => {
  // const { data: assets } = await OpenSeaAPI.getAssets("bitcoinphotos");
  return {
    props: {
      // assets: JSON.parse(JSON.stringify(assets.assets)),
      // assets: JSON.parse(JSON.stringify(assets)),
      // liveAuctions: JSON.parse(JSON.stringify(liveAuctions.orders)),
      // collections: JSON.parse(JSON.stringify(collections)),
      // explores: JSON.parse(JSON.stringify(explores)),
    },
  };
};
export default CollectionDetails;
