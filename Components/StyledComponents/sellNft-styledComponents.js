import styled from "styled-components"

export const CustomTapBarElement = styled.div`
    width: 130px;
    text-align: center;
    div{
        text-align: center;
        font-size: 30px;
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
export const SellAssetContent = styled.div`
.ant-tabs-tab-active{
    border: 1px solid #F32178 !important;
    min-width: 80px;
    text-align: center;
    border-radius: 10px !important;

};
.ant-tabs-tab{
    border-radius: 10px !important;
};
.ant-tabs-tab-active div span{
    color: black !important;
};
.ant-tabs-tab-active div i{
    color: #F32178 !important;
};
.ant-tabs-tab {
    background-color: #EEE;
    min-width: 80px;
    padding: 10px 0px;
    display: inline;
    border-radius: 3px;
    margin-left: 0px !important;
};
.ant-tabs-tab .ant-tabs-tab-btn{
    text-align: center !important;
    color: #666666 !important;
};
.ant-tabs-nav::before{
    border: none !important;
};
.ant-tabs-ink-bar{
    display: none !important;
};
`