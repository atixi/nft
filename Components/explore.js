import React, {useState, useEffect} from "react";
import Products from "/Components/products";
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
import { fetch } from "/Utils/strapiApi";

const api = axios.create({
  baseURL: process.env.HEROKU_BASE_URL,
  headers: {
    Accept: "application/json",
    "Content-Type": "application/json",
  },
});

function Explore() {
  const [categories, setCategories] = useState([]);
  const [explores, setExplores] = useState({});
 
  const loadExplore = async () => {
    const nfts = await fetch("nfts")
    setExplores(nfts.data);
  } 
  useEffect(() => {
    async function fetchingCats() {
      const data = await api.get("/categories");
      setCategories(await data.data);
    }
    fetchingCats();
    await loadExplore()
  }, []);
  return (
    <>    
      <div>
        <CategoriesListContainer>
          <SectionHeading>{EXPLORE_CONSTANTS.explore}</SectionHeading>
          <CategoriesListScroll>
            <CategoriesList className={"m-2"}>
              {categories.map((category, v) => (
                <li key={v}>{`${category.icon ? category.icon : ""} ${
                  category.categoryName
                }`}</li>
              ))}
            </CategoriesList>
          </CategoriesListScroll>
    
        </CategoriesListContainer>
        {explores ? (
          <>
            {explores && <Products data={explores} /> }
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
