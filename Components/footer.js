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
              <form action="blank.php" className="row form-dark" id="form_subscribe" method="post" name="form_subscribe">
                <div className="col text-center">
                  <input className="form-control" id="txt_subscribe" name="txt_subscribe" placeholder="enter your email" type="text" /> <a href="#" id="btn-subscribe"><i className="arrow_right bg-color-secondary"></i></a>
                  <div className="clearfix"></div>
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
                    <img alt="" className="f-logo" src="images/logo-2-light.png" /><span className="copy">&copy; Copyright 2021 - The Code Giant</span>
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
