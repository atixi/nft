import { Row, Col, Input, Space, Form, Button } from "antd";
import { useState } from "react";
import { FOOTER } from "/Constants/footerConstants";
import { FOOTER_WEBSITE_LINKS } from "/Constants/footerConstants";
import { FOOTER_COMMUNITY } from "/Constants/footerConstants";
import { FOOTER_LANGUAGES } from "/Constants/footerConstants";
import Link from "next/link";
import React from "react";
const {
  updatesMessage,
  searchPlaceHolder,
  searchSubmitMessage,
  terms,
  policy,
  privacy,
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
                <CopyRight>
                  {`© `}{" "}
                  <Link href={"https://atixi.com/"}>
                    <a target={"_blank"}>{FOOTER_WEBSITE_LINKS.websiteTitle}</a>
                  </Link>
                  {`, Inc. `} {FOOTER_WEBSITE_LINKS.allRightReserved}
                </CopyRight>
              </CopyRightAndPolicyContainer>
              <TermAndPolicy>
                <span>
                  <a href={"/docs/terms.pdf"}>{terms}</a>
                </span>
                <span>
                  <a href={"/docs/privacy.pdf"}>{`${privacy} ${policy}`}</a>
                </span>
              </TermAndPolicy>
            </FooterExtraLinkContainer>
          </Col>
        </Row>
      </FooterContainer>
    </>
  );
}

export default Footer;
