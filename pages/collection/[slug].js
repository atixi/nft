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
import { clientCollections } from "/Constants/mockApi/collectionApi";
import { useQueryParam } from "/Components/hooks/useQueryParam";
import {
  LoadingContainer,
  LoadMoreButton,
  MainWrapper,
} from "/Components/StyledComponents/globalStyledComponents";

const { TabPane } = Tabs;
function CollectionDetails() {
  const [collections, setCollections] = useState();
  const [slug, setSlug] = useState();
  const [banner, setBanner] = useState();
  const [created, setCreated] = useState();
  const [collectionName, setCollectionName] = useState();
  const [isLoading, setIsLoading] = useState(true);
  const loadTabData = async (e) => {
    if (e === "1") {
      loadAssets(slug);
    } else if (e === "2") {
      loadCollections(slug);
    }
  };
  const loadCollections = (slug) => {
    const data = clientCollections[slug];
    setCollections(data?.slice(1, data.length / 2));
  };
  const loadAssets = (slug) => {
    const data = clientCollections[slug];
    setCreated(data?.slice(data.length / 2, data.length));
  };
  const query = useQueryParam();
  useEffect(() => {
    if (!query) {
      return;
    } else {
      setSlug(query.slug);
      setBanner(query.banner_image_url);
      loadAssets(query.slug);
      loadCollections(query.slug);
      setCollectionName(query.collection);
    }
  }, [query]);
  if (!slug) {
    return <p>Loading....</p>;
  }
  return (
    <>
      <MainWrapper>
        <ProfileContainer>
          <img src={query.banner_image_url} />
          <BiographyContainer>
            <div className={"avatar"}>
              <img alt="userAvatar" src={query.image_url} loading="lazy" />
            </div>
            <BioDescription>
              <h3>
                <strong>{collectionName}</strong>
              </h3>
              <h6>
                <strong>{"addressToShow"}</strong>
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

// export const getServerSideProps = async () => {
//   // const { data: assets } = await OpenSeaAPI.getAssets("bitcoinphotos");
//   return {
//     props: {
//       // assets: JSON.parse(JSON.stringify(assets.assets)),
//       // assets: JSON.parse(JSON.stringify(assets)),
//       // liveAuctions: JSON.parse(JSON.stringify(liveAuctions.orders)),
//       // collections: JSON.parse(JSON.stringify(collections)),
//       // explores: JSON.parse(JSON.stringify(explores)),
//     },
//   };
// };
export default CollectionDetails;
