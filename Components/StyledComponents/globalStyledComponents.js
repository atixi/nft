import styled from "styled-components";
import {Button} from "antd";

export const SectionHeading = styled.span`
    position: relative;
    top: -5px;
    font-size: 30px;
    font-weight: 700;
    @media (max-width: 700px)
    {
        font-size: 20px !important;
        display: block !important;
    };
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
export const LoadMoreButton = styled(Button)`
    margin-top: 10px;
    margin-bottom: 10px;
`