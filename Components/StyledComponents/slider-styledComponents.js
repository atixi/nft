import styled from "styled-components";

export const SliderWrapper = styled.div`
  width: auto;
  overflow-x: auto;
  padding: 15px 0px;
  margin-right: 20px;
  white-space: nowrap;
  &::-webkit-scrollbar {
    width: 10px;
    height: 5px;
  }
  &::-webkit-scrollbar-track {
    border-radius: 10px;
    background-color: transparent;
  }
  &::-webkit-scrollbar-thumb {
    background: rgba(124, 124, 124, 0.1);
    border-radius: 10px;
  }
  &::-webkit-scrollbar-thumb:hover {
    background: rgba(124, 124, 124, 0.5);
  }
`;
export const SliderItem = styled.div`
  display: inline-block;
  width: 255px;
  height: 255px;
  padding-left: 20px;
  &:first-child {
    margin-left: -20px;
  }
  div {
    overflow: hidden;
    border-radius: 15px;
    border: 1px solid #ccc;
    width: 100%;
    height: 100%;
    position: relative;
    font-weight: 700;
    font-size: 25px;
    padding: 10px;
    span {
      font-weight: 700;
    }
  }
  img {
    width: 100%;
    height: 100%;
    position: absolute;
    top: 0px;
    left: 0px;
    transition: transform 500ms;
    z-index: -1;
  }
  &:hover {
    img {
      transform: scale(1.2, 1.2);
    }
    cursor: pointer;
  }
`;
export const SliderTitle = styled.span`
  font-size: 20px;
  font-weight: 700;
  display: block;
  word-wrap: break-word;
  width: 100%;
  background: #000;
  opacity: 0.7;
  color: #fff;
  border-radius: 5px;
  padding-left: 5px;
`;
export const SliderSubTitle = styled.span`
  font-size: 15px;
  font-weight: 700;
  width: 100%;
  display: block;
  color: #ffffff80;
`;
