import { Row, Col, Input, Space, Form, Button } from "antd";
import { useState } from "react";
import { FOOTER } from "/Constants/footerConstants";
import { FOOTER_WEBSITE_LINKS } from "/Constants/footerConstants";
import { FOOTER_COMMUNITY } from "/Constants/footerConstants";
import { FOOTER_LANGUAGES } from "/Constants/footerConstants";
import React from "react";
const {
  updatesMessage,
  searchPlaceHolder,
  searchSubmitMessage,
  terms,
  policy,
} = FOOTER;
import {
  FooterContainer,
  SearchInput,
  LanguageContainer,
  TermAndPolicy,
  SocialLinksContainer,
  SearchButton,
  CopyRight,
  CopyRightAndPolicyContainer,
  FooterExtraLinkContainer,
  CategoryListUl,
  LinkText,
  CategoryLink,
  CategoryListLi,
  CategoryTitle,
  SelectLanguage,
} from "./StyledComponents/footer-styledComponents";
const { Option } = SelectLanguage;
import api from "/Components/axiosRequest";
function Footer() {
  const [email, setEmail] = useState();
  const [validEmail, setValidEmail] = useState({
    invalidEmail: false,
    dublicateEntry: false,
  });
  const submitSubscribe = () => {
    const re =
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    const validation = re.test(String(email).toLowerCase());
    validation
      ? (() => {
          setValidEmail({
            dublicateEntry: false,
            invalidEmail: false,
          });
          const formData = new FormData();
          formData.append("data", JSON.stringify({ email: email }));
          api.post(`/subscribeds`, formData).catch(function (error) {
            console.log("duplicate entry", error.message);
            setValidEmail({
              invalidEmail: false,
              dublicateEntry: true,
            });
          });
        })()
      : setValidEmail({
          dublicateEntry: false,
          invalidEmail: true,
        });
  };
  function settingEmail(e) {
    setEmail(e.target.value);
  }
  function handleSubmit(e) {
    if (e.charCode === 13) {
      submitSubscribe();
    }
  }
  return (
    <>
      <FooterContainer className={` pt-5 pl-3 pr-3 pb-3`}>
        <Row>
          <Col md={6} lg={6} sm={24} xs={24} className="mb-3 mb-md-0">
            <div className="col-md-12 col-sm-12">
              <CategoryTitle>{updatesMessage}</CategoryTitle>
              <div className="input-group mt-3">
                <SearchInput
                  type="search"
                  className={`form-control`}
                  placeholder={searchPlaceHolder}
                  aria-label="Search"
                  size={"large"}
                  key={"0"}
                  onChange={(e) => {
                    settingEmail(e);
                  }}
                  onKeyPress={(e) => handleSubmit(e)}
                />
                <SearchButton
                  type="button"
                  className={`btn`}
                  onClick={submitSubscribe}
                >
                  {searchSubmitMessage}
                </SearchButton>
              </div>
              {validEmail.invalidEmail
                ? "Invalid Email Address"
                : validEmail.dublicateEntry
                ? "This email is already subscribed"
                : ""}
            </div>
          </Col>
          <Col md={12} sm={24} xs={24} className={"text-center"}>
            <Row>
              <Col md={12} sm={12} xs={12} className={"text-left pl-5"}>
                <CategoryTitle>
                  {FOOTER_WEBSITE_LINKS.websiteTitle}
                </CategoryTitle>
                <CategoryListUl>
                  {FOOTER_WEBSITE_LINKS.websiteLinks.map(
                    (websiteLink, index) => (
                      <CategoryListLi key={index}>
                        <CategoryLink
                          target="_blank"
                          href={websiteLink.link}
                          key={websiteLink.websiteLinkTitle}
                        >
                          <LinkText>{websiteLink.websiteLinkTitle}</LinkText>
                        </CategoryLink>
                      </CategoryListLi>
                    )
                  )}
                </CategoryListUl>
              </Col>
              <Col md={12} sm={12} xs={12} className={"text-left pl-5"}>
                <CategoryTitle>{FOOTER_COMMUNITY.communityTitle}</CategoryTitle>
                <CategoryListUl>
                  {FOOTER_COMMUNITY.communityLinks.map(
                    (communitlink, index) => (
                      <CategoryListLi key={index}>
                        <CategoryLink key={communitlink.communityLinktitle}>
                          <LinkText>
                            <a
                              rel="noreferrer"
                              target="_blank"
                              href={communitlink.link}
                            >
                              {communitlink.communityLinktitle}
                            </a>
                          </LinkText>
                        </CategoryLink>
                      </CategoryListLi>
                    )
                  )}
                </CategoryListUl>
              </Col>
            </Row>
          </Col>
          <Col md={24} xs={24}>
            <hr />
            <FooterExtraLinkContainer>
              <CopyRightAndPolicyContainer>
                <CopyRight>{`© ${FOOTER_WEBSITE_LINKS.websiteTitle}, Inc. ${FOOTER_WEBSITE_LINKS.allRightReserved}`}</CopyRight>
              </CopyRightAndPolicyContainer>
              <TermAndPolicy>
                <span>{terms}</span>
                <span>{policy}</span>
              </TermAndPolicy>
              <SocialLinksContainer>
                <a
                  rel="noreferrer"
                  href="https://twitter.com/rariblecom"
                  target="_blank"
                  className="sc-dlnjPT sc-hKFyIo sc-fKgIGh sc-bCwgka cuIYFB hEVogm PAjGx jHJtWF sc-flUlJl gYzuBe"
                >
                  <svg
                    viewBox="0 0 18 16"
                    fill="none"
                    width="18"
                    height="18"
                    xlmns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M17.9655 2.42676C17.3018 2.71851 16.593 2.91726 15.8468 3.00801C16.6073 2.54976 17.1922 1.82751 17.469 0.965759C16.7558 1.38201 15.9653 1.68501 15.1238 1.85376C14.4518 1.13451 13.494 0.684509 12.4305 0.684509C10.3927 0.684509 8.7405 2.33676 8.7405 4.37226C8.7405 4.66476 8.77425 4.94601 8.83575 5.21526C5.76825 5.07051 3.0495 3.59751 1.23 1.37076C0.90975 1.91226 0.7305 2.54151 0.7305 3.22701C0.7305 4.50951 1.383 5.63676 2.3715 6.29901C1.76625 6.27951 1.197 6.11301 0.7005 5.83701V5.88276C0.7005 7.67151 1.97025 9.16326 3.66 9.50301C3.35025 9.58626 3.02325 9.63126 2.688 9.63126C2.4525 9.63126 2.22675 9.60876 2.001 9.56676C2.47425 11.0315 3.83475 12.0995 5.454 12.1295C4.194 13.1188 2.59725 13.7083 0.8775 13.7083C0.585 13.7083 0.29325 13.691 0 13.658C1.64175 14.7035 3.576 15.3148 5.66775 15.3148C12.4583 15.3148 16.167 9.69276 16.167 4.82526C16.167 4.66851 16.167 4.51026 16.1558 4.35276C16.8765 3.83601 17.5057 3.18276 18.0007 2.44176L17.9655 2.42676Z"
                      fill="currentColor"
                    ></path>
                  </svg>
                </a>
                <a
                  rel="noreferrer"
                  href="https://t.me/rarible"
                  target="_blank"
                  className="sc-dlnjPT sc-hKFyIo sc-fKgIGh sc-bCwgka cuIYFB hEVogm PAjGx jHJtWF sc-flUlJl gYzuBe"
                >
                  <svg
                    viewBox="0 0 16 14"
                    fill="none"
                    width="17"
                    height="17"
                    xlmns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M15.9513 1.29916L13.5438 13.1556C13.377 13.997 12.8902 14.1987 12.21 13.8093L8.542 10.979L6.76804 12.7662C6.56797 12.9748 6.40125 13.1556 6.03445 13.1556C5.55428 13.1556 5.63431 12.9679 5.47425 12.495L4.20714 8.19051L0.572523 7.00834C-0.214421 6.76495 -0.22109 6.20168 0.745918 5.7914L14.9243 0.0891779C15.5711 -0.209841 16.1914 0.256072 15.9446 1.29221L15.9513 1.29916Z"
                      fill="currentColor"
                    ></path>
                  </svg>
                </a>
                <a
                  rel="noreferrer"
                  href="http://instagram.com/rariblecom"
                  target="_blank"
                  className="sc-dlnjPT sc-hKFyIo sc-fKgIGh sc-bCwgka cuIYFB hEVogm PAjGx jHJtWF sc-flUlJl gYzuBe"
                >
                  <svg
                    viewBox="0 0 14 14"
                    fill="none"
                    width="16"
                    height="16"
                    xlmns="http://www.w3.org/2000/svg"
                  >
                    <path
                      fillRule="evenodd"
                      clipRule="evenodd"
                      d="M7 0C5.09833 0 4.86092 0.00875 4.11425 0.042C3.36875 0.077 2.86125 0.19425 2.415 0.3675C1.95475 0.546 1.56392 0.78575 1.17483 1.17483C0.78575 1.56392 0.545417 1.95417 0.3675 2.415C0.19425 2.86125 0.0764167 3.36875 0.042 4.11425C0.007 4.86092 0 5.09833 0 7C0 8.90167 0.00875 9.13908 0.042 9.88575C0.077 10.6307 0.19425 11.1388 0.3675 11.585C0.546 12.0447 0.78575 12.4361 1.17483 12.8252C1.56392 13.2137 1.95417 13.4546 2.415 13.6325C2.86183 13.8052 3.36933 13.9236 4.11425 13.958C4.86092 13.993 5.09833 14 7 14C8.90167 14 9.13908 13.9912 9.88575 13.958C10.6307 13.923 11.1388 13.8052 11.585 13.6325C12.0447 13.454 12.4361 13.2137 12.8252 12.8252C13.2137 12.4361 13.4546 12.0464 13.6325 11.585C13.8052 11.1388 13.9236 10.6307 13.958 9.88575C13.993 9.13908 14 8.90167 14 7C14 5.09833 13.9912 4.86092 13.958 4.11425C13.923 3.36933 13.8052 2.86067 13.6325 2.415C13.454 1.95475 13.2137 1.56392 12.8252 1.17483C12.4361 0.78575 12.0464 0.545417 11.585 0.3675C11.1388 0.19425 10.6307 0.0764167 9.88575 0.042C9.13908 0.007 8.90167 0 7 0ZM10.7369 4.10372C11.2 4.10372 11.5769 3.72747 11.5769 3.26372C11.5769 2.80055 11.1994 2.42372 10.7369 2.4243C10.2737 2.4243 9.89685 2.80055 9.89685 3.26372C9.89685 3.72689 10.2731 4.10372 10.7369 4.10372ZM3.40552 6.99997C3.40552 5.01547 5.01377 3.40547 7.00002 3.40547C8.98452 3.40547 10.5945 5.01372 10.5945 6.99997C10.5945 8.98447 8.98627 10.5945 7.00002 10.5945C5.01552 10.5945 3.40552 8.98622 3.40552 6.99997ZM7.00002 9.33337C5.71086 9.33337 4.66669 8.2892 4.66669 7.00004C4.66669 5.71087 5.71086 4.6667 7.00002 4.6667C8.28919 4.6667 9.33335 5.71087 9.33335 7.00004C9.33335 8.2892 8.28919 9.33337 7.00002 9.33337Z"
                      fill="currentColor"
                    ></path>
                  </svg>
                </a>
                <a
                  rel="noreferrer"
                  href="https://discord.gg/cdaFbV5"
                  target="_blank"
                  className="sc-dlnjPT sc-hKFyIo sc-fKgIGh sc-bCwgka cuIYFB hEVogm PAjGx jHJtWF sc-flUlJl gYzuBe"
                >
                  <svg
                    viewBox="0 0 18 13"
                    fill="none"
                    width="18"
                    height="18"
                    xlmns="http://www.w3.org/2000/svg"
                  >
                    <path
                      fillRule="evenodd"
                      clipRule="evenodd"
                      d="M11.5507 0.0036464H11.5624L11.5612 0L11.5507 0.0036464ZM11.5108 0.0176323L11.5507 0.0036464H11.5252L11.5108 0.0176323ZM11.5039 0.0243315L11.5108 0.0176323L11.4917 0.0243072L11.5039 0.0243315ZM11.5039 0.0243315L11.2748 0.246719C13.8446 0.975936 15.088 2.11473 15.088 2.11473C13.4318 1.30287 11.9393 0.896938 10.4467 0.732864C9.36818 0.56879 8.28967 0.65508 7.37851 0.732864H7.13058C6.54793 0.732864 5.30826 0.975936 3.64711 1.62616C3.06818 1.87287 2.73595 2.03452 2.73595 2.03452C2.73595 2.03452 3.9781 0.816724 6.71529 0.166505L6.54793 0.00243113C6.54793 0.00243113 4.47521 -0.075352 2.2376 1.54594C2.2376 1.54594 0 5.36704 0 10.0778C0 10.0778 1.23967 12.1925 4.64008 12.2727C4.64008 12.2727 5.13595 11.6249 5.63802 11.0549C3.72893 10.4861 2.98512 9.34857 2.98512 9.34857C2.98512 9.34857 3.15124 9.42878 3.40041 9.59164H3.47479C3.50979 9.59164 3.52722 9.60778 3.54568 9.62487C3.54684 9.62595 3.548 9.62702 3.54917 9.6281V9.63539C3.56901 9.65484 3.58636 9.67185 3.62355 9.67185C3.6596 9.68642 3.69564 9.70096 3.73164 9.71548C4.10416 9.8658 4.47123 10.0139 4.77645 10.158C5.35413 10.4035 6.09669 10.6478 7.00785 10.8094C8.16074 10.9735 9.48223 11.0525 10.9872 10.8094L11.0353 10.7988L11.0353 10.7988C11.7631 10.6384 12.4908 10.4779 13.2186 10.1592C13.3516 10.0923 13.4931 10.0255 13.6419 9.95511C14.0339 9.76978 14.4769 9.56038 14.9504 9.26349C14.9504 9.26349 14.2066 10.4011 12.2169 10.9699C12.626 11.5362 13.2025 12.1852 13.2025 12.1852C15.9898 12.1255 17.3804 10.6948 17.8328 10.2295C17.9325 10.1269 17.9866 10.0713 18 10.0875C18 5.38405 15.75 1.55566 15.75 1.55566C13.7464 0.097178 11.8701 0.0257804 11.5039 0.0243315ZM6.13886 5.36701C7.00663 5.36701 7.70828 6.09623 7.70828 6.98952C7.70828 7.88889 7.00167 8.61811 6.1339 8.61811C5.26613 8.61811 4.55952 7.88889 4.55952 6.99682C4.55952 6.09745 5.26613 5.37066 6.1339 5.37066L6.13886 5.36701ZM11.7707 5.36701C12.6422 5.36701 13.3451 6.09623 13.3451 6.98952C13.3451 7.88889 12.6384 8.61811 11.7707 8.61811C10.9029 8.61811 10.1963 7.88889 10.1963 6.99682C10.1988 6.09745 10.9066 5.37066 11.7707 5.37066V5.36701Z"
                      fill="currentColor"
                    ></path>
                  </svg>
                </a>
                <a
                  rel="noreferrer"
                  href="https://www.youtube.com/channel/UC2v3aVwed777Sxj7pjrpK9Q"
                  target="_blank"
                  className="sc-dlnjPT sc-hKFyIo sc-fKgIGh sc-bCwgka cuIYFB hEVogm PAjGx jHJtWF sc-flUlJl gYzuBe"
                >
                  <svg
                    viewBox="0 0 18 12"
                    fill="none"
                    width="18"
                    height="18"
                    xlmns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M17.6242 1.85293C17.5199 1.49635 17.3209 1.17147 17.0465 0.909689C16.772 0.64791 16.4314 0.458089 16.0576 0.358571C14.6546 1.02807e-05 9.00801 1.01525e-05 9.00801 1.01525e-05C9.00801 1.01525e-05 3.37567 -0.00714662 1.95839 0.358571C1.58457 0.458089 1.24399 0.64791 0.969559 0.909689C0.69513 1.17147 0.496134 1.49635 0.391808 1.85293C0.125849 3.22313 -0.00526955 4.61404 0.000162055 6.00752C-0.00424273 7.39574 0.126872 8.78133 0.391808 10.1464C0.496134 10.5029 0.69513 10.8278 0.969559 11.0896C1.24399 11.3514 1.58457 11.5412 1.95839 11.6407C3.35991 12 9.00801 12 9.00801 12C9.00801 12 14.6396 12 16.0576 11.6407C16.4314 11.5412 16.772 11.3514 17.0465 11.0896C17.3209 10.8278 17.5199 10.5029 17.6242 10.1464C17.8836 8.78084 18.0092 7.39525 17.9994 6.00752C18.0102 4.61454 17.8846 3.22363 17.6242 1.85293ZM7.20584 8.57757V3.4296L11.9056 6.00752L7.20584 8.57757Z"
                      fill="currentColor"
                    ></path>
                  </svg>
                </a>
                <a
                  rel="noreferrer"
                  href="https://medium.com/@rarible"
                  target="_blank"
                  className="sc-dlnjPT sc-hKFyIo sc-fKgIGh sc-bCwgka cuIYFB hEVogm PAjGx jHJtWF sc-flUlJl gYzuBe"
                >
                  <svg
                    viewBox="0 0 18 12"
                    fill="none"
                    width="20"
                    height="20"
                    xlmns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M5.07644 11.25C7.88022 11.25 10.1531 8.89939 10.1531 5.99991C10.1531 3.10043 7.88004 0.75 5.07644 0.75C2.27284 0.75 0 3.09972 0 5.99991C0 8.9001 2.27267 11.25 5.07644 11.25Z"
                      fill="currentColor"
                    ></path>
                    <path
                      d="M13.1839 10.9419C14.5857 10.9419 15.7222 8.72942 15.7222 5.99991C15.7222 3.27111 14.5857 1.0579 13.1839 1.0579C11.7821 1.0579 10.6455 3.27111 10.6455 5.99991C10.6455 8.72871 11.7821 10.9419 13.1839 10.9419Z"
                      fill="currentColor"
                    ></path>
                    <path
                      d="M17.1072 10.4277C17.6003 10.4277 18 8.44542 18 5.99991C18 3.55458 17.6006 1.57207 17.1074 1.57207C16.6142 1.57207 16.2145 3.55511 16.2145 5.99991C16.2145 8.44471 16.6142 10.4277 17.1072 10.4277Z"
                      fill="currentColor"
                    ></path>
                  </svg>
                </a>
              </SocialLinksContainer>
            </FooterExtraLinkContainer>
          </Col>
        </Row>
      </FooterContainer>
    </>
  );
}

export default Footer;
