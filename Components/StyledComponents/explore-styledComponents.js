import styled from "styled-components";

export const FilterAndSort = styled.div`
  border: 1px solid rgb(204, 201, 201);
  height: 44px;
  margin-top: -7px !important;
  border-radius: 20px;
  padding: 10px 15px 10px 15px;
`;
export const CategoriesListContainer = styled.div`
  font-weight: bold;
  list-style-type: none;
  display: flex;
  flex-direction: row;
  align-items: center;

  justify-content: space-around;
  div {
    margin: 5px;
    white-space: nowrap;
  }
  ul {
    li {
      padding: 10px;
      padding-left: 20px;
      padding-right: 20px;
      border-radius: 30px;
      border: 1px solid #f2f2f2;
    }
  }
`;
export const CategoriesListScroll = styled.div`
  position: relative;
  overflow: auto;
`;
export const CategoriesList = styled.ul`
  list-style-type: none;
  display: flex;
  flex-direction: row;
  align-items: left;
  justify-content: flex-start;
  padding-left: 0px;
  li {
    border: solid 0.002rem rgb(204, 201, 201) !important;
    margin-right: 10px !important;
    color: black;
  }
  & li.active {
    background-color: #000;
    color: #fff;
  }
  li:hover{
    cursor: pointer;
    color: #208DD5;
  }
`;
