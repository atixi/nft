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
  LoadMoreButton,
  MainWrapper,
} from "/Components/StyledComponents/globalStyledComponents";
import axios from "axios";
import CollectionLoader from "@/components/collectionLoader";
const { TabPane } = Tabs;
const api = axios.create({
  baseURL: "https://rim-entertainment.herokuapp.com",
  headers: {
    Accept: "application/json",
    "Content-Type": "application/json",
  },
});

function CollectionDetails({ collection }) {
  const [testData, setTestData] = useState({ id: 1, assets: [] });
  const [loadMore, setLoadMore] = useState(0);
  const [isLoad, setLoad] = useState(false);
  const [onSales, setOnsales] = useState({
    assets: [],
  });
  const [collect, setCollect] = useState({
    collectionName: "",
    collectionImageURL: {
      url: "",
    },
    collectionBanner: {
      url: "",
    },
    assets: [],
  });
  const loadTabData = async (e) => {
    if (e === "1") {
      //loadAssets(slug);
    } else if (e === "2") {
      //loadCollections(slug);
    }
  };
  async function LoadMoreAssets() {
    const moreAssets = await api.get(
      `/collections/${collection.slug}?offset=${loadMore}`
    );
    console.log("length of assets", moreAssets.data.assets.lenght);
    console.log("comes from strapi", moreAssets.data.assets);
    // setTestData({
    //   id: 2,
    //   assets: [...testData.assets, ...moreAssets.data.assets],
    // });
    setOnsales({
      talent: { talentAvatar: { url: collection.talent.talentAvatar.url } },
      assets: [...onSales.assets, ...moreAssets.data.assets],
    });
    console.log("appended", onSales);
    setLoadMore(loadMore + 10);
  }
  useEffect(() => {
    setCollect(collection);
    const sellOrders = collection.assets.filter(
      (asset) => asset.sellOrders != null
    );
    setOnsales({
      talent: { talentAvatar: { url: collection.talent.talentAvatar.url } },
      assets: sellOrders,
    });
    console.log("onsales: =", onSales);
    setLoad(true);
  }, []);

  return (
    <>
      <MainWrapper>
        {isLoad === false ? <CollectionLoader /> : ""}
        {isLoad ? (
          <ProfileContainer>
            <img src={collect.collectionBanner.url} />
            <BiographyContainer>
              <div className={"avatar"}>
                <img
                  alt="userAvatar"
                  src={collect.collectionImageURL.url}
                  loading="lazy"
                />
              </div>
              <BioDescription>
                <h3>
                  <strong>{collect.collectionName}</strong>
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
        ) : (
          ""
        )}

        <Tabs defaultActiveKey="1" onChange={(e) => loadTabData(e)}>
          <TabPane tab="On Sale" key="1">
            <Products data={onSales} />
            <LoadMoreButton
              block
              shape={"round"}
              size={"large"}
              onClick={() => LoadMoreAssets()}
            >
              {`Load More ${loadMore}`}
            </LoadMoreButton>
          </TabPane>
          <TabPane tab="Owned" key="2">
            <>
              <Products data={collect} />
              <LoadMoreButton
                block
                shape={"round"}
                size={"large"}
                onClick={() => setLoadMore(loadMore + 10)}
              >
                {`Load More ${loadMore}`}
              </LoadMoreButton>
            </>
          </TabPane>
        </Tabs>
      </MainWrapper>
    </>
  );
}

export const getStaticPaths = async () => {
  const res = await fetch(
    "https://rim-entertainment.herokuapp.com/collections"
  );
  const collections = await res.json();
  console.log("collection from path", collections);
  const paths = collections.map((collection) => ({
    params: {
      slug: collection.slug,
    },
  }));

  return {
    paths,
    fallback: false,
  };
};

export const getStaticProps = async ({ params }) => {
  const res = await fetch(
    `https://rim-entertainment.herokuapp.com/collections/${params.slug}`
  );
  const collection = await res.json();
  return { props: { collection } };
};

export default CollectionDetails;
