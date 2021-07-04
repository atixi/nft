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
import axios from "axios";
const { TabPane } = Tabs;
const api = axios.create({
  baseURL: "https://rim-entertainment.herokuapp.com",
  headers: {
    Accept: "application/json",
    "Content-Type": "application/json",
  },
});

function CollectionDetails({ assets, banner_image_url }) {
  const [collections, setCollections] = useState();
  const [collect, setCollect] = useState({
    collectionName: "",
    collectionImageURL: {
      formats: {
        thumbnail: {
          url: "",
        },
      },
    },
    collectionBanner: {
      formats: {
        thumbnail: {
          url: "",
        },
      },
    },
  });
  const [slug, setSlug] = useState();
  const [created, setCreated] = useState();
  const [collectionName, setCollectionName] = useState();
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
    api.get(`/collections/${query.slug}`).then((response) => {
      setCollect(response.data);
      console.log("kasdfj", response.data);
    });
    setSlug(query.slug);
    loadAssets(query.slug);
    loadCollections(query.slug);
    setCollectionName(query.collection);
  }, [query]);

  return (
    <>
      <MainWrapper>
        <ProfileContainer>
          <img src={collect.collectionBanner?.formats.thumbnail.url} />
          <BiographyContainer>
            <div className={"avatar"}>
              <img
                alt="userAvatar"
                src={collect.collectionImageURL?.formats.thumbnail.url}
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
export async function getStaticPaths() {
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
