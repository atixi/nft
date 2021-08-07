import styled from "styled-components"

export const CustomTapBarElement = styled.div`
    width: 200px;
    text-align: center;
    div{
        text-align: center;
        font-size: 14px;
        font-weight: 900;
    }
    span{
        text-align: center;
        font-size: 14px;
        font-weight: 400;
        color: #8C8C8C;
    }
`;
export const SwitchContainer = styled.span`
    width: 80px;
    button{
        width: 20px;
        background: #BFBFBF;
        position: relative;
        right: 15px;
    }
    .ant-switch-checked {
        background-color: #1890ff !important;
    }
`;
export const ListTile = styled.span`
    font-weight: 900;
`
export const ListDescription = styled.span`
    font-weight: 500;
`
export const SummarySection = styled.div`
    h5{
        font-weight: 900;
    };
    span,p{
        font-weight: 500;
    }
`