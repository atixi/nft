import styled from "styled-components";
import { HeartTwoTone } from '@ant-design/icons';
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
`;
export const ProductPrice = styled.span`
text-transform: uppercase;
	background: linear-gradient(to right, #009DFF 0%, #026BFF 100%);
	-webkit-background-clip: text;
	-webkit-text-fill-color: transparent;
    font-weight: bold;
    font-size: ${props => props.fontSize ? props.fontSize : "15px"};
`;
export const BidsStatus = styled.small`
    color: #818182;
    font-weight: bold;
`;
export const ProductCard = styled.div`
border: 1px solid #ccc;
border-radius: 15px;
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
&:before{
    content: " ";
    position: absolute;
    width: 170px;
    height: 40px;
    left: -12px !important;
    inset: 0px;
    z-index: 0.5;
    border-radius: 25px;
    background: linear-gradient(to right, rgb(12, 80, 255) 0%, rgb(12, 80, 255) 24%, rgb(91, 157, 255) 55.73%, rgb(255, 116, 241) 75%, rgb(255, 116, 241) 100%);

}`;

export const CountDown = styled.div`
position: relative;
top: 2px;
background: white;
width: 165px;
border-radius: 25px;
height: 36px;
left: -10px;
padding-top: 7px;
`;
export const ProductDescriptionBottom = styled.div`

`
export const ProductList = styled.span`
color: #969696;
font-size: 12px;
position: relative;
left: 0px;
`;
export const LikesContainer = styled.span`

`
export const NumberOfLikes = styled.h6`
color: #818182;
float: right;
`;
export const HeartIcon = styled(HeartTwoTone)`
color: #818182;
font-size: 35px;
position: relative;
right: ${props => props.right ? props.right : "-80px"};
top: -3px;
`