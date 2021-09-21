import styled from "styled-components";
import { Menu } from "antd";
export const Wrapper = styled.div`
    display: flex;
    height: calc(100vh - 74px);
    flex-direction: column;
    a{
        color: black !important;
    }
`;
export const Content = styled.div`
    flex:1;
    height: 100%;
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
    .itemImage{
        max-height: 70vh;
        max-width: 90%;
        display: block;
        margin: auto;
        border-radius: 8px;

        @media (max-width:575px) {
            margin-top: 20px;
            margin-bottom: 10px;
        };
    };
`;
export const ImageCon = styled.div`
position: relative;
right: auto;
left: auto;
margin: auto;
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
    @media (max-width:576px){
        border-left: none;
    };
    @media (min-width:768px) {
            width: 550px;
    };

`;

export const ItemDetails = styled.div`
    width: 100%;
    height: 100%;
    max-height: 800px !important;
    overflow-y: scroll;    
    padding:25px;
    padding-bottom: 250px;
`;
export const ItemFooter = styled.div`
    padding:15px;
    position: absolute;
    bottom: 0px;
    left: 0px;
    right: 0px;
    text-align: center;
    -webkit-backdrop-filter: blur(15px);
    backdrop-filter: blur(15px);
    background-color: rgba(255,255,255,.5);
    border-top: 1px solid #ccc;
    @media (max-width:575px) {
        position: relative;
        top: -180px;
    }

    center{
        font-size: 16px;
        color:#bbb;
        padding:10px 0px;
    };
`;
export const ItemName = styled.h1`
    padding-right: 10px;
    margin: 0px;
    font-weight: 900;
`;
export const ItemTopButtonContainer = styled.div`
    flex: 1;
    text-align: right;
`
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
        };
`;
export const ItemDetailsHeader = styled.div`
        display: flex;
`
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
    flex-direction: column;
    align-items: center;
`;
export const ImageListContainer = styled.div`
        margin-bottom: 100px;
        display: flex;
        flex-direction: row;
        div{
            background: red;
            margin: 5px;
            height: 60px;
            width: 60px;
            img{
                width: 100%;
                height: 100%;
                &:hover{
                    cursor: pointer;
                }
            }
        }
`
export const AvatarContainer = styled.div`
        display: flex;
        align-item: center;

        span{
            margin: 8px;
        };
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
    };
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
    background: transparent;
    padding: 10px 0px;
    display: flex;
    flex-direction: row;
    &:after{
        content: " ";
        position: absolute;
        width: 100%;
        z-index: 0;
        height: 5px;
        inset: 0px;
        background: linear-gradient(to right, rgb(12, 80, 255) 0%, rgb(12, 80, 255) 24%, rgb(91, 157, 255) 55.73%, rgb(255, 116, 241) 75%, rgb(255, 116, 241) 100%);
    };
`;
export const BidOwnerContainer = styled.div`
        display: flex;
        flex-direction: column;
        flex: 1;
        text-align: left;
`
export const Auction = styled.div`
        flex:1;
        // flex-basis: 30% !important;
        margin: 0px;
        // padding: 0px 0px 0px 16px;
        -webkit-box-align: stretch;
        align-items: stretch;
        border-width: 0px;
        border-style: solid;
        border-color: rgb(4, 4, 5);
        display: flex;
        flex-direction: column;
        flex-shrink: 0;
        min-height: 0px;
        min-width: 0px;
        max-width: 100%;
`
export const BidOwner = styled.div`
    text-decoration: none;
    color: rgba(4, 4, 5, 0.5);
    font-size: 14px;
    line-height: 19.32px;
    font-family: inherit;
    font-weight: 700;
    text-overflow: ellipsis;
    white-space: nowrap;
    overflow: hidden;
    max-width: 100%;

    a{
        transition: all 0.12s ease-in-out 0s;
        color: rgb(4, 4, 5) !important;
    };
`;
export const BidPrice = styled.div`
    margin: 8px 0px 0px;
    padding: 0px;
    -webkit-box-align: stretch;
    align-items: stretch;
    border-width: 0px;
    border-style: solid;
    border-color: rgb(4, 4, 5);
    display: flex;
    flex-basis: auto;
    flex-direction: row;
    flex-shrink: 0;
    min-height: 0px;
    min-width: 0px;
    max-width: 100%;
`;
export const BidPriceValue = styled.div`
    display: flex;
    flex-direction: column;
    @media (max-width: 1200px)
    {
    flex-direction: row;
    };
`
export const PriceInCryptoContainer = styled.div`
    text-decoration: none;
    font-size: 15px;
    line-height: 20.7px;
    font-family: inherit;
    font-weight: 700;
    color: rgb(4, 4, 5);
    text-overflow: ellipsis;
    white-space: nowrap;
    overflow: hidden;
    max-width: 100%;
        span{
            text-decoration: none;
            font-size: 20px;
            line-height: 24px;
            font-family: inherit;
            font-weight: 900;
            color: rgb(4, 4, 5);
            float: left;
        };
`;

export const PriceInDollarContainer = styled.div`
    text-decoration: none;
    color: rgba(4, 4, 5, 0.5);
    font-size: 13px;
    line-height: 17.94px;
    font-family: inherit;
    font-weight: 600;
    margin-top: 4px;
    text-overflow: ellipsis;
    white-space: nowrap;
    overflow: hidden;
    max-width: 100%;
        span{
            text-decoration: none;
            color: inherit;
            font-size: 14px;
            line-height: 19.32px;
            font-family: inherit;
            font-weight: inherit;
            float: left;
            margin-left: 5px;
        };
`;
export const LastBidder = styled.div`
    height: 69px;
    left: 0px;
    top: 0px;
    width: 100%;
    padding-bottom: 28px;

    .content{
        margin: 0px;
        padding: 0px;
        border-width: 0px;
        border-style: solid;
        border-color: rgb(4, 4, 5);
        display: flex;
        flex-basis: auto;
        flex-shrink: 0;
        min-height: 0px;
        min-width: 0px;
        max-width: 100%;
        flex-direction: row;
        -webkit-box-align: stretch;
        align-items: stretch;
        };
    .avatarContainer
        {
            width: 40px;
            height: 40px;
        };
    .bidInfo{
        flex-shrink: 1;
        -webkit-box-flex: 1;
        flex-grow: 1;
        display: flex;
        flex-direction: column;
        margin-left: 10px;
        margin-top: -7px;
        };
    .bidedPriceContainer{
        text-decoration: none;
        font-size: 15px;
        line-height: 20.7px;
        font-family: inherit;
        font-weight: 700;
        color: rgb(4, 4, 5) 
    };
    .bidedPriceText{
        text-decoration: none;
        color: rgba(4, 4, 5, 0.5);
        font-size: inherit;
        line-height: inherit;
        font-family: inherit;
        font-weight: inherit;
        };
    .bidValue{
        color: rgb(4, 4, 5);
        };
    .bidOwnerAndDateContainer{
        text-decoration: none;
        color: rgba(4, 4, 5, 0.5);
        font-size: 13px;
        line-height: 17.94px;
        font-family: inherit;
        font-weight: 600;
        margin-top: 4px;
        vertical-align: baseline;
        };
    .bidderLink{
        color: black;
        };
    .bidDate{
        white-space: nowrap;
        text-decoration: none;
        color: inherit;
        font-size: inherit;
        line-height: inherit;
        font-family: inherit;
        font-weight: inherit;
        };
  
    .auctionDiv
    {
        margin: 0px;
        padding: 0px;
        -webkit-box-align: stretch;
        align-items: stretch;
        border-width: 0px;
        border-style: solid;
        border-color: rgb(4, 4, 5);
        display: flex;
        flex-basis: auto;
        flex-direction: column;
        flex-shrink: 0;
        min-height: 0px;
    };
`;
export const AuctionLabel = styled.div`
    text-decoration: none;
    color: #818182 !important;
    font-size: 14px;
    line-height: 19.32px;
    font-family: inherit;
    font-weight: 700;
`
export const AuctionTimer = styled.div`
    margin: 8px 0px 0px;
    padding: 0px;
    -webkit-box-align: stretch;
    align-items: stretch;
    border-width: 0px;
    border-style: solid;
    border-color: rgb(4, 4, 5);
    display: flex;
    flex-basis: auto;
    flex-shrink: 0;
    min-height: 0px;
    min-width: 0px;
    max-width: 100%;
    flex-direction: row;
    div{
        color: #818182 !important;
        margin: auto;
        span{
        font-size: 25px !important;
        };
    };
    @media (max-width:768px) {
        div{
        span{
            font-size: 20px !important;
        };
    };
    };
`

export const BidOwnerProfile = styled.div`
    margin-right: 20px;

    @media (max-width:1200px)
    {
        display: none;
    };
`;
export const SaleEnd = styled.div`
    width: 100%;
    height: 30px;
   
    display: flex;
    align-items: center !important;
    padding-left: 10px;
    // justify-content: center;

    margin: 0px 5px;
    line-height: 12px;
    font-weight: 600;

    border-top: 1px solid rgba(4, 4, 5, 0.1);
    background-color: #fff;
    font-size: 0.98rem !important;
    height: 40px;
`
export const DetailTabDiv = styled.div`
    color: #818182 !important;
    padding: 0px 5px;
    margin: 5px 0px;
`