import styled from "styled-components";


export const TopSellerContainer = styled.div`
    display: flex;
    height: 275px;
    flex-flow: column wrap;
    background-color: white;
    align-content: flex-start;
    overflow-x: auto;
`;
export const TopSellerItem = styled.div`
    cursor: pointer;
    display: flex;
    justify-content: flex-start;
    align-items: center;
    background-color: #fff;
    width: 275px;
    height: 75px;
    margin: 5px;
    text-align: start;
    font-size: 12px;
    div {
        margin: 0 5px;
      }
`;
export const AvatarContainer = styled.div`
    width: 48px;
    height: 48px;
    max-width: 48px;
    max-height: 48px;
    overflow: hidden;
    object-fit: contain;
    img{
        width: 100%;
        height: 100%;
        border-radius: 24px;
    }
`;
export const SellerDetails = styled.div`
display: flex;
flex-direction: column;
justify-content: flex-start;
align-items: flex-start;
`
export const ListCounter = styled.div`
    text-decoration: none;
    color: rgba(4, 4, 5, 0.5);
    font-size: 14px;
    line-height: 19.32px;
    font-weight: 500;
`;
export const SellerName = styled.div`
    transition: all 0.12s ease-in-out 0s;
    color: rgb(4, 4, 5);
    margin-top: -5px;

`;
export const SellerPrice = styled.div`
    text-decoration: none;
    color: rgba(4, 4, 5, 0.5);
    font-size: 14px;
    line-height: 19.32px;
    font-weight: 500;

`