import styled from "styled-components";

export const SectionHeading = styled.span`
    position: relative;
    top: -5px;
    font-size: 30px;
    font-weight: 700;
    @media (max-width: 700px)
    {
        // font-size: 16px !important;
        display: block !important;
    }
`;
export const LoadingContainer = styled.div`
    text-align: center;
    padding-top: 50px;

`;
export const MainWrapper = styled.div`
    max-width: 1400px;
    padding-right: 20px;
    padding-left: 20px;
    margin: auto;
`;
export const LoadMoreDiv = styled.div`
margin: 16px 0px 0px;
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
min-width: 0px;
max-width: 100%;

    button{
        display: flex;
        flex-flow: row nowrap;
        white-space: nowrap;
        line-height: 48px;
        height: 48px;
        width: 1200px;
        padding-left: 26.4px;
        padding-right: 26.4px;
        min-width: 192px;
        border: 1px solid transparent;
        -webkit-box-align: center;
        align-items: center;
        -webkit-box-pack: center;
        justify-content: center;
        border-radius: 48px;
        font-size: 15px;
        font-weight: 900;
        font-family: inherit;
        transition: all 0.12s ease-in-out 0s;
        transform-origin: center center;
        user-select: none;
        cursor: pointer;

        &:before{
            content: " ";
            position: relative;
            width: 100%;
            height: 50px;
            inset: 0px;
            z-index: 1;
            margin: -3px;
            border-radius: inherit;
            background: linear-gradient(to right, rgb(12, 80, 255) 0%, rgb(12, 80, 255) 24%, rgb(91, 157, 255) 55.73%, rgb(255, 116, 241) 75%, rgb(255, 116, 241) 100%);
        }
    }
`