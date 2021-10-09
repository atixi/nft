import { Row, Col, Input, Space, Form, Button } from "antd";
import { useState } from "react";
import { FOOTER } from "/Constants/footerConstants";
import { FOOTER_WEBSITE_LINKS } from "/Constants/footerConstants";
import { FOOTER_COMMUNITY } from "/Constants/footerConstants";
import { FOOTER_LANGUAGES } from "/Constants/footerConstants";
import { Formik, useFormik } from "formik";
import api from "/Components/axiosRequest";
import * as Yup from "yup";
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

import { Loading3QuartersOutlined } from "@ant-design/icons";
import { stubTrue } from "lodash-es";

const subscriptionSchemea = Yup.object().shape({
  email: Yup.string().email("Invalid email").required("Required"),
});
function Footer() {
  const[Loading,setLoading]= useState();
  const[duplicate,setDuplicate]=useState(false);
  const [success, setSuccess]= useState(false);
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
  const handleSubmission = async(value) => {
      api.post(`/subscribeds`, value)
        .then(data => {
          setSuccess(true);
          formik.resetForm();
          setDuplicate(false)
        })
        .catch(err => {
          console.log(err.message,"hello err")
          setDuplicate(true);
          formik.resetForm();
          setSuccess(false)
      })
  };
  return (
    <footer>
      <div className="container">
        <div className="row">
          <div className="col-md-3 col-sm-6 col-xs-1">
            <div className="widget">
              <h5>Categories</h5>
              <ul>
                <li><a href="#">All NFTs</a></li>
                <li><a href="#">Art</a></li>
                <li><a href="#">Music</a></li>
                <li><a href="#">Domain Names</a></li>
                <li><a href="#">Virtual World</a></li>
                <li><a href="#">Collectibles</a></li>
              </ul>
            </div>
          </div>
          <div className="col-md-3 col-sm-6 col-xs-1">
            <div className="widget">
              <h5>Resources</h5>
              <ul>
                <li><a href="#">Help Center</a></li>
                <li><a href="#">Docs</a></li>
              </ul>
            </div>
          </div>
          <div className="col-md-3 col-sm-6 col-xs-1">
            <div className="widget">
              <h5>Community</h5>
              <ul>
                <li><a href="#">Brand Assets</a></li>
                <li><a href="#">Forum</a></li>
              </ul>
            </div>
          </div>
          <div className="col-md-3 col-sm-6 col-xs-1">
            <div className="widget">
              <h5>subscribe</h5>
              <p>subscribe for to get the latest news in your inbox.</p>
              <form onSubmit={formik.handleSubmit} className="row form-dark" id="form_subscribe" method="post">
                <div className="col text-center">
                  <input className="form-control" id="txt_subscribe"  type="text"
                  name="email"
                  placeholder="Your Email"
                  onChange={formik.handleChange}
                  value={formik.values.email}
                  /> <a onClick={formik.handleSubmit} id="btn-subscribe"><i className="arrow_right bg-color-secondary"></i></a>
                  <div className="clearfix"></div>
                  {formik.errors.email && formik.touched.email ? (
                  <div style={{color:'red'}}>{formik.errors.email}</div>
                ) : null}
                {success && <div style={{color:'green'}}> Successfully Subscribed </div>}
                {duplicate && <div style={{color:'red'}}> Duplicated Entry!! </div>}
                </div>
              </form>
              <div className="spacer-10"></div>
              <small>Your email is safe with us. We don't spam.</small>
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
                  <a href="https://thecodegiant.ca" target={"_blank"}>
                    <img alt="" class="f-logo" style={{ width: "250px" }} src="/images/logo.svg" /><span class="copy">&copy; Copyright 2021 - The Code Giant</span>
                  </a>
                </div>
                <div className="de-flex-col">
                  <div className="social-icons">
                    {/* <a href="#"><i className="fa fa-facebook fa-lg"></i></a>
                    <a href="#"><i className="fa fa-twitter fa-lg"></i></a> */}
                    <a href="https://www.linkedin.com/company/the-code-giant" target={"_blank"}><i className="fa fa-linkedin fa-lg"></i></a>
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
