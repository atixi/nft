import styled from "styled-components";
import { Select } from "antd";

const inputHeight = "45px";
export const FooterContainer = styled.div`
  background-color: #f2f2f2;
  position: relative;
  div {
    margin-left: auto;
    margin-right: auto;
    max-width: 1400px;
  }
`;

export const SearchInput = styled.input`
  background-color: #fff;
  padding: 15px;
  border-top-left-radius: 20px;
  border-bottom-left-radius: 20px;
  float: left;
  height: ${inputHeight};
  border: 0px;
`;
export const SearchButton = styled.button`
  border-radius: 20px;
  width: 80px;
  margin-left: -15px;
  z-index: 1;
  background-color: #0066ff !important;
  color: #fff;
  font-weight: bold;
  &:hover {
    color: #fff;
  }
`;

export const CategoryTitle = styled.span`
  text-decoration: none;
  font-size: 18px;
  line-height: 24.84px;
  font-family: inherit;
  font-weight: 900;
  margin-bottom: 20px;
`;
export const SelectLanguage = styled(Select)`
  width: 100%;
  height: ${inputHeight};
  margin: auto;
  div {
    border-radius: 20px !important;
    height: ${inputHeight} !important;
    padding-top: 8px !important;
  }
`;
export const CategoryListUl = styled.ul`
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
`;
export const CategoryListLi = styled.li`
  text-decoration: none;
  margin: 0px 0px 10px;
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
`;
export const CategoryLink = styled.a`
    text-decoration: none;
    transition: all 0.12s ease-in-out 0s;
    color: rgba(4, 4, 5, 0.6); !important;
`;
export const LinkText = styled.span`
  color: inherit;
  font-size: 16px;
  line-height: 22.08px;
  font-family: inherit;
  font-weight: 900;
  a {
    color: rgba(4, 4, 5, 0.6);
  }
`;
export const LanguageContainer = styled.div`
  @media (max-width: 700px) {
    padding: 0px 20px;
  }
`;
export const FooterExtraLinkContainer = styled.div`
  margin: 0px;
  padding: 32px 0px;
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
  -webkit-box-align: center;
  align-items: center;
  -webkit-box-pack: justify;
  justify-content: space-between;
  @media (max-width: 700px) {
    flex-direction: column;
  }
`;
export const CopyRightAndPolicyContainer = styled.div`
  // flex: 1;
  flex-direction: row;
  align-items: center;
  margin-left: 10px !important;
  @media (max-width: 700px) {
    margin: auto !important;
    position: relative;
    top: 50px;
  }
`;
export const CopyRight = styled.span`
    text-decoration: none;
    color: rgba(4, 4, 5, 0.6); !important;
    font-size: 14px;
    line-height: 19.32px;
    font-family: inherit;
    font-weight: inherit;
    margin-right: 50px;
    @media (max-width:  700px)
    {
         position: relative;
         left: 5px;
    }

`;

export const TermAndPolicy = styled.div`
    flex: 1;
    margin-left: 20px;
    span{
      a{
        font-weight: 700;
        color: rgba(4, 4, 5, 0.6); !important;
        padding-left: 10px;

        &:hover{
          color: blue;
        }
      }
    };
    @media (max-width:  700px)
    {
         margin: auto !important;
         position: relative;
         top: -30px;
         left: -20px;
         span{
             margin: 5px;
         }
    }
`;
