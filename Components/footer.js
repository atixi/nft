import { Row, Col, Input, Space, Form, Button } from "antd";
import { useEffect, useState } from "react";
import { FOOTER } from "/Constants/footerConstants";
import { FOOTER_WEBSITE_LINKS } from "/Constants/footerConstants";
import { FOOTER_COMMUNITY } from "/Constants/footerConstants";
import { FOOTER_LANGUAGES } from "/Constants/footerConstants";
import { Formik, useFormik } from "formik";
import api from "/Components/axiosRequest";
import * as Yup from "yup";
import Link from "next/link";
import React from "react";
import { getPageInfo } from "services/pageInfo.service";
import { fetch } from "Utils/strapiApi";
import request from "Utils/axios";
const { updatesMessage, searchPlaceHolder, searchSubmitMessage, terms, policy, privacy } = FOOTER;
import { Notification } from "Utils/utils"
const subscriptionSchemea = Yup.object().shape({
  email: Yup.string().email("Invalid email").required("Required"),
});
function Footer() {
  // const baseURL = process.env.HEROKU_BASE_URL;
  const [pageInfo, setPageInfo] = useState();
  const [categories, setCategories] = useState();
  const [Loading, setLoading] = useState();
  const [duplicate, setDuplicate] = useState(false);
  const [success, setSuccess] = useState(false);
  const formik = useFormik({
    initialValues: {
      email: "",
    },
    validationSchema: subscriptionSchemea,
    onSubmit: (values) => {
      setLoading(true);
      handleSubmission(values);
    },
  });
  const handleSubmission = async (value) => {
    console.log("sdfsf", value)
    try {
      const send = await request("subscribeds", {
        method: "POST",
        data: value
      })
      if (send.status === 200) {
        Notification("Thank you for you subscription", "success")
        setSuccess(true);
        formik.resetForm();
        setDuplicate(false);
      }
    }
    catch (e) {
      formik.resetForm();
      Notification("Subscription was not successful, try again!", "error")

    }
  };

  const loadCategories = async () => {
    const categoriesResult = await fetch("/categories");
    const cats = await categoriesResult.data;
    if (cats) {
      setCategories(cats);
    }
  };
  const loadPageInfo = async () => {
    let pageInfoResult = await getPageInfo();
    if (pageInfoResult.data) {
      setPageInfo(pageInfoResult.data);
    }
  };
  useEffect(() => {
    loadPageInfo();
    loadCategories();
  }, []);
  return (
    <footer>
      <div className="container">
        <div className="row">
          <div className="col-md-3 col-sm-6 col-xs-1">
            <div className="widget">
              <h5>{`Categories`}</h5>
              <ul>
                {categories &&
                  categories?.map((cat) => (
                    <li key={cat.id}>
                      <Link
                        href={{
                          pathname: "/explore",
                          query: { cat: cat.slug },
                        }}
                      >
                        <a>{cat?.categoryName}</a>
                      </Link>
                    </li>
                  ))}
              </ul>
            </div>
          </div>
          {pageInfo?.FooterMenus?.map((item) => (
            <div key={item.id} className="col-md-3 col-sm-6 col-xs-1">
              <div className="widget">
                <h5>{item.FooterMenuTitle}</h5>
                <ul>
                  {item.FooterMenuTitle==='Resources'?(
                    item.FooterMenuItem?.map((subMenu) => (
                    <li key={subMenu.id}>
                        <a href={subMenu.subMenuLink} target={"_blank"} rel="noreferrer">{subMenu?.subMenuLabel}</a>
                    </li>
                  ))):(
                    item.FooterMenuItem?.map((subMenu) => (
                    <li key={subMenu.id}>
                      <Link
                        href={{
                          pathname: `/${subMenu.SubMenuLink}`,
                        }}
                      >
                        <a href={subMenu.subMenuLink}>{subMenu?.subMenuLabel}</a>
                      </Link>
                    </li>
                  )))}
                  
                </ul>
              </div>
            </div>
          ))}
          <div className="col-md-3 col-sm-6 col-xs-1">
            <div className="widget">
              <h5>{pageInfo?.SubscriptionForm?.SubscriptionTitle}</h5>
              <p>{pageInfo?.SubscriptionForm?.SubscriptionText}</p>
              <form
                onSubmit={formik.handleSubmit}
                className="row form-dark"
                id="form_subscribe"
                method="post"
              >
                <div className="col text-center">
                  <input
                    className="form-control"
                    id="txt_subscribe"
                    type="text"
                    name="email"
                    placeholder={pageInfo?.SubscriptionForm?.SubscriptionPlaceholder}
                    onChange={formik.handleChange}
                    value={formik.values.email}
                  />{" "}
                  <a onClick={formik.handleSubmit} id="btn-subscribe">
                    <i className="arrow_right bg-color-secondary"></i>
                  </a>
                  <div className="clearfix"></div>
                  {formik.errors.email && formik.touched.email ? (
                    <div style={{ color: "red" }}>{formik.errors.email}</div>
                  ) : null}
                  {success && <div style={{ color: "green" }}> Successfully Subscribed </div>}
                  {duplicate && <div style={{ color: "red" }}> Duplicated Entry!! </div>}
                </div>
              </form>
              <div className="spacer-10"></div>
              <small>{pageInfo?.SubscriptionForm?.SubscriptionSubText}</small>
            </div>
          </div>
        </div>
      </div>
      <div className="subfooter">
        <div className="container">
          <div className="row">
            <div className="col-md-12">
              <div className="de-flex">
                <div className="de-flex-col">
                  <Link href="/" passHref>
                    <a href="/" >
                    <img
                      alt=""
                      className="f-logo"
                      style={{ maxWidth: "250px", height: "45px" }}
                      src={pageInfo?.FooterLogo?.LogoImage?.url}
                    />
                    </a>
                  </Link>
                  <span className="copy">{pageInfo?.Copyright}</span>
                </div>
                <div className="de-flex-col">
                  <div className="social-icons">
                    {/* <a href="#"><i className="fa fa-facebook fa-lg"></i></a>
                    <a href="#"><i className="fa fa-twitter fa-lg"></i></a> */}
                    {pageInfo?.FooterSocialMedia?.FooterSocialMediaItem?.map((item) => (
                      <a
                        key={item.id}
                        href={item.SocialMediaLink}
                        target={"_blank"}
                        rel="noreferrer"
                      >
                        <i className={`fa  fa-lg fa-${item.SocialMediaIconName}`}></i>
                      </a>
                    ))}
                    {/* <a href="#"><i className="fa fa-pinterest fa-lg"></i></a>
                    <a href="#"><i className="fa fa-rss fa-lg"></i></a> */}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
