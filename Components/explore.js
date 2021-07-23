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
import axios from "axios";
const api = axios.create({
  baseURL: process.env.HEROKU_BASE_URL,
  headers: {
    Accept: "application/json",
    "Content-Type": "application/json",
  },
});

function Explore() {
  const [categories, setCategories] = useState([]);
  const [explores, setExplores] = useState({ assets: [] });
  const [explorPagination, setExplorPagination] = useState({
    limit: 0,
    offset: 0,
  });
  const loadExplore = async () => {
    const nfts = await api.get("/nfts/nfts");
    setExplores({ assets: await nfts.data });
    console.log("cooos", await nfts.data);
  };
  const router = useRouter();
  const { cat } = router.query;
  useEffect(() => {
    async function fetchingCats() {
      const data = await api.get("/categories?_sort=id:ASC");
      setCategories(await data.data);
    }
    fetchingCats();

    if (cat != undefined) {
      async function fetchingData() {
        const data = await api.get(`/categories?_sort=id:ASC&slug_eq=${cat}`);
        setExplores({ assets: await data.data[0].nfts });
        console.log("kosskaasshh", await data.data[0].nfts);
      }
      fetchingData();
    } else {
      loadExplore();
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
                  <li>{`${category.icon ? category.icon : ""} ${
                    category.categoryName
                  }`}</li>
                </Link>
              ))}
            </CategoriesList>
          </CategoriesListScroll>
        </CategoriesListContainer>
        {explores ? (
          <>
            {explores && <Products data={explores} />}
            {/* <LoadMoreButton block shape={"round"} size={"large"}>
              {"Load More"}
            </LoadMoreButton> */}
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
