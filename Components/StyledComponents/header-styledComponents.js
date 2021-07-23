import styled from "styled-components";

export const Wrapper = styled.div`
  position: fixed;
  top: 0px;
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  z-index: 2;
  background-color: #fff;
`;
export const SearchContainer = styled.div`
  flex: 1;
  overflow-y: auto;
  color: rgba(4, 4, 5, 0.5);
  font-weight: 600;
  font-size: x-large;
`;
export const WrapperItemContainer = styled.div`
  flex: 1;
  overflow-y: auto;

  padding: 0px 25px;

  &::-webkit-scrollbar {
    width: 10px;
    height: 10px;
  }
  &::-webkit-scrollbar-track {
    border-radius: 4px;
  }
  &::-webkit-scrollbar-thumb {
    border-radius: 4px;
    background-color: #fff;
  }
  &::-webkit-scrollbar-thumb:hover {
    background-color: #ccc;
  }

  ul {
    list-style: none;
    padding: 0px;

    li {
      margin-bottom: 8px;
      cursor: pointer;
      a {
        text-decoration: none;
        font-weight: 700;
        font-size: 20px;
        color: #000;
      }
    }
  }
`;
export const HeaderContainer = styled.div`
  padding: 0px 30px;
  width: 100%;
  min-height: 0px;
  height: 74px;
  background-color: #ffffff;
  font-family: inherit;
  display: flex;
  margin: auto;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
`;
export const HeaderNav = styled.nav`
  padding: 0px 30px;
  width: 100%;
  min-height: 0px;
  height: 74px;
  background-color: #ffffff;
  font-family: "Poppins", sans-serif !important;
  display: flex;
  margin: auto;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;

  border-bottom: 1px solid #e5e5e5;
  position: fixed;
  top: 0px;
  left: 0px;
  right: 0px;
  z-index: 99;
  ul {
    display: flex;
    margin: 0px;
    padding: 0px;
    list-style: none;
    flex-direction: row;
    li {
      display: flex;
      align-items: center;
      position: relative;
      margin: 0px 8px;
      cursor: pointer;
      &:hover {
        color: #333;
      }
      button {
        font-family: inherit;
        font-weight: 900;
        color: rgba(4, 4, 5, 0.5);
        font-size: 0.98rem;
      }
      a {
        display: block;
        text-decoration: none;
        font-family: inherit;
        font-size: 0.98rem;
        font-weight: 900 !important;
        color: rgba(4, 4, 5, 0.5);
        &.active {
          color: #000;
        }
      }
    }
  }
`;

export const CreateButton = styled.button`
  margin: 0px 5px;
  line-height: 12px;
  font-weight: 600;
  border-radius: 25px;
  font-size: 0.98rem !important;
  color: rgb(0, 102, 255);
  background: rgba(0, 102, 255, 0.15);
  border: none !important;
  padding: 13px 20px;
`;
export const ConnectButton = styled.button`
  margin: 0px 5px;
  line-height: 12px;
  font-weight: 600;
  border-radius: 25px;
  border: 1px solid rgba(4, 4, 5, 0.1);
  background-color: #fff;
  font-size: 0.98rem !important;
  padding: 13px 20px;
  a {
    color: black !important;
  }
`;
export const ConnectedButton = styled.button`
  margin: 0px 5px;
  line-height: 12px;
  max-height: 44px;
  font-weight: 600;
  border-radius: 25px;
  border: 1px solid rgba(4, 4, 5, 0.1);
  background-color: #fff;
  font-size: 0.98rem !important;
  padding-right: 0px;
  a {
    color: black !important;
  }
`;
export const BalanceLabel = styled.div`
  display: inline;
  margin-left: 10px;
  margin-top: 5px;
  margin-right: 10px;
  min-width: 146px;
`;
export const Button = styled.button`
  margin: 0px 5px;
  line-height: 7px;
  font-weight: 600;
  padding: 12px 12px;
  border-radius: 25px;
  border: 1px solid rgba(4, 4, 5, 0.1);
  background-color: #fff;
  font-size: 0.98rem !important;
  height: 40px;
  border-radius: 25px;

  &:hover {
    border: 1px solid #333;
  }
`;
export const HeaderBottomMenu = styled.div`
  border-top: 1px solid #e5e5e4;
  padding: 20px 0px;
  ul {
    list-style: none;
    display: flex;
    justify-content: space-evenly;
    align-items: center;
    li {
      padding: 10px;
    }
  }
`;
export const SearchWrapper = styled.div`
  width: 100%;
  margin: 0px 20px;
  border-radius: 25px;
  max-height: 50px;
  padding: 5px 10px;
  border: 1px solid transparent;
  background-color: #ededed;
  display: flex;
  flex-direction: row;
  align-items: center;

  &:focus-within {
    border: 1px solid #ccc;
    background-color: #fff;
    box-shadow: 0 0 0px 3px rgba(200, 200, 200, 0.3);
  }
  &:hover {
    border: 1px solid #ccc;
  }
  input {
    border: 0px;
    min-width: 180px;
    flex: 1;
    font-weight: 600;
    background-color: transparent;
    font-family: inherit;
    &:focus {
      outline: none !important;
    }
  }
`;
export const SocialLinkContainer = styled.div`
  min-width: 200px;
  display: flex;
  justify-content: space-around;
  a {
    color: #888;
  }
`;
