import styled from "styled-components";
import { HeartTwoTone } from "@ant-design/icons";
export const CardsContainer = styled.div`
  display: flex;
  flex-direction: row;
  max-width: 1472px;
  width: 100%;
  padding: auto;
  flex-wrap: wrap;
  div {
    flex: 1;
    // margin: auto;
  }
`;
export const ProductCardContainer = styled.div`
  margin-bottom: 20px;
  max-width: 290px;
  padding: 10px;
  @media (max-width: 900px) {
    margin: auto;
  }
  div {
    @media (max-width: 575px) {
      max-width: 290px;
      margin: auto !important;
    }
  }
`;
export const Button = styled.button`
  border: none;
  background: transparent;
  margin-right: 15px;
  margin-top: -5px;
`;
export const CardTitle = styled.div`
  font-weight: 700;
  font-size: 16px;
  color: black !important;

  display: inline-block;
  width: 180px;
  white-space: nowrap;
  overflow: hidden !important;
  text-overflow: ellipsis;
`;
export const ProductPrice = styled.span`
  text-transform: uppercase;
  background: linear-gradient(to right, #009dff 0%, #026bff 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  font-weight: bold;
  font-size: ${(props) => (props.fontSize ? props.fontSize : "15px")};
`;
export const BidsStatus = styled.small`
  color: #818182;
  font-weight: bold;
  display: block;
`;

export const ProductCard = styled.div`
border: 1px solid #ccc;
border-radius: 15px;
max-width: 270px;
min-width: 260px;
min-height: 400px !important
// margin-right: 15px;
padding: 5px;
`;
export const NFTImage = styled.div`
  display: flex !important;
  align-items: center !important;
  justify-content: center !important;
  height: 250px !important;
  overflow: hidden;
`;
export const CardImage = styled.div`
  display: flex !important;
  align-items: center !important;
  justify-content: center !important;
  height: 250px !important;
`;
export const ProductCardHeaderOwners = styled.div`
  flex: 1;
  float: left;
  padding-left: 20px;
`;
export const ProductCardHeaderButton = styled.div`
  flex: 1;
  text-align: right;
`;
export const ProductCardHeader = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
`;
export const ProductDescription = styled.div`
  padding-left: 1rem;
`;
export const CountDownContainer = styled.div`
  position: relative;
  height: 30px;
  margin-top: -50px;
  width: 170px;
  margin-bottom: 20px;
  z-index: 1;
  text-align: center;
  &:before {
    content: " ";
    position: absolute;
    width: 175px;
    height: 40px;
    left: -12px !important;
    inset: 0px;
    z-index: 0.5;
    border-radius: 25px;
    background: linear-gradient(
      to right,
      rgb(12, 80, 255) 0%,
      rgb(12, 80, 255) 24%,
      rgb(91, 157, 255) 55.73%,
      rgb(255, 116, 241) 75%,
      rgb(255, 116, 241) 100%
    );
  }
`;

export const CountDown = styled.div`
position: relative;
top: 2px;
background: white;
width: 170px;
border-radius: 25px;
height: 36px;
left: -10px;
padding-top: 7px;
div{
    display: inline-flex;
    margin: auto;
    margin-top: -10px;
}/
`;
export const ProductDescriptionBottom = styled.div``;
export const ProductList = styled.span`
  color: #969696;
  font-size: 12px;
  position: relative;
  left: 0px;
`;
