import styled from "styled-components";
import { Menu } from "antd";
export const Wrapper = styled.div`
    display: flex;
    height: calc(100vh - 74px);
    flex-direction: column;
`;

export const Content = styled.div`
    flex:1;
    display: block;

    button{
        border-radius: 24px;
        padding:6px 20px;
        flex:1;
        border:1px solid #00000040;
        margin:5px;
        background-color: #fff;
        box-sizing: border-box;
    };
    img{
        max-height: 70vh;
        max-width: 90%;
        display: block;
        margin: auto;
        border-radius: 8px;
    }
`;
export const ItemInfo = styled.div`
    width: 100%;
    height: 100%;    
    position: relative;
    overflow-y: auto;
    overflow-x: hidden;  
    border-left: 1px solid #ccc;

    @media (min-width:576px){
            width: 400px;
            height: auto;
    };

    @media (min-width:768px) {
            width: 500px;
    }

`;

export const ItemDetails = styled.div`
    width: 100%;
    height: 100%;
    padding:25px;
    padding-bottom: 180px;
`;
export const ItemFooter = styled.div`
    padding:15px;
    position: absolute;
    bottom: 0px;
    left: 0px;
    right: 0px;
    text-align: center;
    background-color: rgba(255,255,255,.8);
    border-top: 1px solid #ccc;

    center{
        font-size: 16px;
        color:#bbb;
        padding:10px 0px;
    }
`;
export const ItemName = styled.h1`
    flex: 1;
    margin: 0px;
    font-weight: 900;
`;
export const ItemLink = styled.a`
    cursor: pointer;
    color: rgb(4, 4, 5);
    transition: all 0.12s ease-in-out 0s;
    text-align: left;
    min-height: 32px;
    padding: 8px 12px;
    margin: 0px 12px;
    border-radius: 6px;
        span{
            text-decoration: none;
            color: inherit;
            font-size: 14px;
            line-height: 19.32px;
            font-family: inherit;
            font-weight: 700;
            text-overflow: ellipsis;
            white-space: nowrap;
            overflow: hidden;
            max-width: 100%;
        }
`;
export const DropdownMenu = styled(Menu)`
        padding: 10px;
`;
export const ItemDescriptionText = styled.p`
        font-size: 14px;
        font-weight: 600 !important;
`;
export const ItemImageContainer = styled.div`
    flex:1;
    display: flex;
    align-items: center;
`;
export const AvatarContainer = styled.div`
        display: flex;
        align-item: center;

        span{
            margin: 8px;
        }
`;
export const OwnerProfitContainer = styled.div`
    width: 90%;
	background: linear-gradient(to right, #F9EBFF 0%, #E8F7FE 100%);
    margin: auto;
    padding: 10px;
    height: 45px;
    border-radius: 20px;
    text-align: center;
    small{
        font-size: 12px;
        font-weight: 600;
    }
`;
export const ButtonContainer = styled.div`
    display: flex;
`;
export const FooterButton = styled.button`
    flex: 1;
    border: 0px !important;
    height: 48px;
    color: ${(props) => props.color ? props.color : "black"};
    background-color: ${(props) => props.bgColor ? props.bgColor : "gray"};
    font-size: 16px;
`;

export const BidCountdown = styled.div`
    width: 100%;
    background: red;
    height: 100px;
    &:after{
        content: " ";
        position: absolute;
        width: 100%;
        z-index: 0;
        height: 5px;
        inset: 0px;
        background: linear-gradient(to right, rgb(12, 80, 255) 0%, rgb(12, 80, 255) 24%, rgb(91, 157, 255) 55.73%, rgb(255, 116, 241) 75%, rgb(255, 116, 241) 100%);
    
`