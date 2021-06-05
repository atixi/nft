import React from "react";
import Products from "/Components/products";
import { Dropdown, Menu, Switch } from "antd";
import EXPLORE_CONSTANTS from "/Constants/exploreConstants";
import {
  FilterAndSort,
  CategoriesListContainer,
  CategoriesListScroll,
  CategoriesList,
} from "./StyledComponents/explore-styledComponents";
import { SectionHeading } from "./StyledComponents/globalStyledComponents";

const menu = (
  <Menu>
    <Menu.ItemGroup title="Sort by">
      <Menu.Item>{"Recently added"}</Menu.Item>
      <Menu.Item>{"Cheapest"}</Menu.Item>
      <Menu.Item>{"Highest price"}</Menu.Item>
      <Menu.Item>{"Most Liked"}</Menu.Item>
      <Menu.Item>2nd menu item</Menu.Item>
    </Menu.ItemGroup>
    <Menu.ItemGroup title="Options">
      <Menu.Item>
        {"Verified only"} <Switch size="small" defaultChecked />
      </Menu.Item>
    </Menu.ItemGroup>
  </Menu>
);
const exploreMore = (
  <Menu>
    <Menu.Item>{"item 1"}</Menu.Item>
    <Menu.Item>{"item 2"}</Menu.Item>
  </Menu>
);
function Explore({ data }) {
  const explorers = data;
  return (
    <>
      <div>
        <CategoriesListContainer>
          <div className="pl-3">
            <SectionHeading>{EXPLORE_CONSTANTS.explore}</SectionHeading>
          </div>
          <CategoriesListScroll>
            <CategoriesList className={"m-2"}>
              <li>{EXPLORE_CONSTANTS.all}</li>
              <li>🌈 {EXPLORE_CONSTANTS.art}</li>
              <li>📸 {EXPLORE_CONSTANTS.photography}</li>
              <li>🕹 {EXPLORE_CONSTANTS.games}</li>
              <li>👾 {EXPLORE_CONSTANTS.metaverses}</li>
              <li>🎵 {EXPLORE_CONSTANTS.music}</li>
              <li>🏷 {EXPLORE_CONSTANTS.domains}</li>
              <li>💰 {EXPLORE_CONSTANTS.defi}</li>
              <li>🤡 {EXPLORE_CONSTANTS.memes}</li>
              <li>🤘 {EXPLORE_CONSTANTS.punks}</li>
              <li>
                <Dropdown
                  overlay={exploreMore}
                  placement="bottomCenter"
                  trigger={["click"]}
                >
                  <svg
                    viewBox="0 0 14 4"
                    fill="none"
                    width="13.200000000000001"
                    height="13.200000000000001"
                    xlmns="http://www.w3.org/2000/svg"
                  >
                    <path
                      fillRule="evenodd"
                      clipRule="evenodd"
                      d="M3.5 2C3.5 2.82843 2.82843 3.5 2 3.5C1.17157 3.5 0.5 2.82843 0.5 2C0.5 1.17157 1.17157 0.5 2 0.5C2.82843 0.5 3.5 1.17157 3.5 2ZM8.5 2C8.5 2.82843 7.82843 3.5 7 3.5C6.17157 3.5 5.5 2.82843 5.5 2C5.5 1.17157 6.17157 0.5 7 0.5C7.82843 0.5 8.5 1.17157 8.5 2ZM11.999 3.5C12.8274 3.5 13.499 2.82843 13.499 2C13.499 1.17157 12.8274 0.5 11.999 0.5C11.1706 0.5 10.499 1.17157 10.499 2C10.499 2.82843 11.1706 3.5 11.999 3.5Z"
                      fill="currentColor"
                    ></path>
                  </svg>
                </Dropdown>
              </li>
            </CategoriesList>
          </CategoriesListScroll>
          <Dropdown
            overlay={menu}
            placement="bottomCenter"
            visible={false}
            trigger={["click"]}
          >
            <FilterAndSort>
              <svg
                viewBox="0 0 24 24"
                fill="none"
                width="22"
                height="22"
                xlmns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M20 16L12 16"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                ></path>
                <path
                  d="M6 16L4 16"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                ></path>
                <path
                  d="M20 8L18 8"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                ></path>
                <path
                  d="M12 8L4 8"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                ></path>
                <circle cx="9" cy="16" r="3" fill="currentColor"></circle>
                <circle cx="15" cy="8" r="3" fill="currentColor"></circle>
              </svg>
              <span>{`${EXPLORE_CONSTANTS.filter} & ${EXPLORE_CONSTANTS.sort}`}</span>
            </FilterAndSort>
          </Dropdown>
        </CategoriesListContainer>
        {explorers && <Products data={explorers} />}
      </div>
    </>
  );
}
export default Explore;
