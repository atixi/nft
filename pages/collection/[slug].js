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
import { useQueryParam } from "/Components/hooks/useQueryParam";
import OpenSeaAPI from "/Utils/openseaApi";
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

function CollectionDetails({ collections }) {
  const [isLoad, setLoad] = useState(false);
  const [collect, setCollect] = useState({
    collectionName: "",
    collectionImageURL: {
      url: "",
    },
    collectionBanner: {
      url: "",
    },
    nfts: [],
  });
  const loadTabData = async (e) => {
    if (e === "1") {
      //loadAssets(slug);
    } else if (e === "2") {
      //loadCollections(slug);
    }
  };
  const query = useQueryParam();
  useEffect(() => {
    if (!query) {
      console.log("slug  query empty", query);
      return;
    } else {
      console.log("slug", query.slug);
      api.get(`/collections/${query.slug}`).then((response) => {
        setCollect(response.data);
        setLoad(true);
        console.log("from parents: ", response.data);
      });
    }
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
            <Products data={collect} />
            <LoadMoreButton block shape={"round"} size={"large"}>
              {"Load More"}
            </LoadMoreButton>
          </TabPane>
          <TabPane tab="Owned" key="2">
            <>
              {" "}
              <Products data={collect} />
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
// export async function getStaticPaths() {
//   // Call an external API endpoint to get collections
//   const res = await api.get("/collections");
//   console.log("static path: res:", res);
//   const collections = await res;

//   // Get the paths we want to pre-render based on collections
//   const paths = collections.map((collection) => ({
//     params: { slug: collection.slug },
//   }));

//   // We'll pre-render only these paths at build time.
//   // { fallback: false } means other routes should 404.
//   return { paths, fallback: false };
// }

// // This also gets called at build time
// export async function getStaticProps({ params }) {
//   // params contains the post `id`.
//   // If the route is like /posts/1, then params.id is 1
//   const res = await api.get(`/collections/${params.slug}`);
//   const collection = await res;

//   // Pass collection data to the page via props
//   return { props: { collection } };
// }
export async function getStaticPaths() {
  // const result = await OpenSeaAPI.getCollectionAssetsBySlug();
  // const collections = await OpenSeaAPI.mapCollection(result);
  // console.log("result by slug", result);
  // console.log("collections by slug", collections);

  const slugs = [
    "reika-mandala-art",
    "atixi",
    "cosplay-made-in-japan",
    "unofficial-bayc-collectibles",
    "delorean-s-40th-anniversary-nft-collection",
    "glewme-city-master-of-permits-uriel",
    "plaguedoctor-1",
    "builsontheblock",
    "fnd",
    "uniswap-v3-positions",
    "penguin-dummy-club-1",
    "iconpunks",
    "airlord",
    "monalisa-art",
    "unique-one-v2",
    "slumdoge-billionaires",
  ];
  const paths = slugs.map((slug) => {
    return {
      params: { slug: slug.toString() },
    };
  });
  return {
    paths,
    fallback: false,
  };
}

export const getStaticProps = async (context) => {
  const slug = context.params.slug;
  const result = await OpenSeaAPI.getAssetsInCollection(slug);
  const assets = result.data;
  // const banner_image_url = assets[0].collection.banner_image_url;
  return {
    props: {
      assets: JSON.parse(JSON.stringify(assets)),
      // banner_image_url: JSON.parse(JSON.stringify(banner_image_url)),
    },
  };
};

export default CollectionDetails;
