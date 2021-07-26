import React, { useState, useEffect } from "react";
import Products from "/Components/nfts";
import Link from "next/link";
import { Spin } from "antd";
import EXPLORE_CONSTANTS from "/Constants/exploreConstants";
import {
  CategoriesListContainer,
  CategoriesListScroll,
  CategoriesList,
} from "./StyledComponents/explore-styledComponents";
import {
  SectionHeading,
  LoadingContainer,
  LoadMoreButton,
} from "./StyledComponents/globalStyledComponents";
import { useRouter } from "next/router";
import { GET_SINGLE_CATEGORY } from "/graphql/queries";
import { gqlClient } from "/lib/graphql-client";
import axios from "axios";
const api = axios.create({
  baseURL: process.env.HEROKU_BASE_URL,
  headers: {
    Accept: "application/json",
    "Content-Type": "application/json",
  },
});

function Explore() {
  const [isLoad, setLoad] = useState(false);
  const [categories, setCategories] = useState([]);
  const [explores, setExplores] = useState({ assets: [] });
  const [loadMore, setLoadMore] = useState({
    dataLimit: 2,
    dataStart: 0,
    countBy: 2,
    dataLoad: true,
    dataLoadMoreButtonLoading: false,
  });
  async function LoadMoreData(slug) {
    setLoadMore({
      ...loadMore,
      dataStart: loadMore.dataStart + loadMore.countBy,
      dataLoadMoreButtonLoading: true,
    });
    const fetchedData = await gqlClient.query({
      query: GET_SINGLE_CATEGORY,
      variables: {
        slug: slug,
        limit: loadMore.dataLimit,
        start: loadMore.dataStart,
      },
    });
    const assetLength = fetchedData.data.categories[0].nfts.length;
    assetLength === 0
      ? setLoadMore({ ...loadMore, dataLoad: false })
      : (() => {
          setExplores({
            ...explores,
            assets: [
              ...explores.assets,
              ...fetchedData.data.categories[0].nfts,
            ],
          });
          setLoadMore({
            ...loadMore,
            dataLoadMoreButtonLoading: false,
          });
        })();
  }

  const router = useRouter();
  const { cat } = router.query;
  async function fetchingData(slug) {
    const fetchedData = await gqlClient.query({
      query: GET_SINGLE_CATEGORY,
      variables: {
        slug: slug,
        limit: loadMore.dataLimit,
        start: loadMore.dataStart,
      },
    });
    setExplores({
      ...fetchedData.data.categories[0],
      assets: [...fetchedData.data.categories[0].nfts],
    });
    setLoad(true);
  }
  useEffect(() => {
    async function fetchingCats() {
      const data = await api.get("/categories?_sort=id:ASC");
      setCategories(await data.data);
    }
    fetchingCats();

    if (cat != undefined) {
      fetchingData(cat);
    } else {
      fetchingData("all");
    }
  }, [cat]);
  return (
    <>
      <div>
        <CategoriesListContainer>
          <SectionHeading>{EXPLORE_CONSTANTS.explore}</SectionHeading>
          <CategoriesListScroll>
            <CategoriesList className={"m-2"}>
              {categories.map((category, v) => (
                <Link key={v} href={`/?cat=${category.slug}`} passHref>
                  <li className={cat == category.slug ? "active" : ""}>{`${
                    category.icon ? category.icon : ""
                  } ${category.categoryName}`}</li>
                </Link>
              ))}
            </CategoriesList>
          </CategoriesListScroll>
        </CategoriesListContainer>
        {explores ? (
          <>
            {explores && <Products data={explores} />}
            {isLoad ? (
              loadMore.dataLoad ? (
                loadMore.dataLoadMoreButtonLoading ? (
                  <LoadMoreButton block shape={"round"} size={"large"}>
                    <Spin></Spin>
                  </LoadMoreButton>
                ) : (
                  <LoadMoreButton
                    block
                    shape={"round"}
                    size={"large"}
                    onClick={() => LoadMoreData(cat ? cat : "all")}
                  >
                    Load More
                  </LoadMoreButton>
                )
              ) : null
            ) : null}
          </>
        ) : (
          <LoadingContainer>
            <Spin />
          </LoadingContainer>
        )}
      </div>
    </>
  );
}
export default Explore;
