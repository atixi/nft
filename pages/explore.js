/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable @next/next/no-img-element */
import React, { useEffect, useState } from "react";
import Image from "next/image";
import styles from "/styles/explore.module.css";
import { Button, Form, Input, Select, Spin } from "antd";
import { fetch } from "Utils/strapiApi";
import { saleBundleType, saleKindList } from "Constants/constants";

function Explore({ serverExplores, categories }) {
  const [searchQuery, setSearchQuery] = useState({ categorySlug: "all" });
  const [start, setStart] = useState(2);
  const [explores, setExplores] = useState(serverExplores);
  const [filterdExplores, setFilteredExplores] = useState(serverExplores);
  const searchFormRef = React.createRef();
  const [searchForm] = Form.useForm();

  const onFinish = (values) => {
    console.log("values of searchfomr is ", values);
  };

  const getSelectedCategories = async (category) => {
    if (category == "all") {
      setFilteredExplores(explores);
    } else {
      let object = searchQuery;
      object.categorySlug = category;
      setSearchQuery(object);

      console.log("searchquery is ", searchQuery);
      console.log("selected catoegyr is ", category);
      let filteredData = explores;
      filteredData = filteredData.filter((item) => item.categories[0].slug == category);
      console.log("filter data is", filteredData);
      setFilteredExplores(filteredData);
    }
  };
  const getSaleKind = (saleKind) => {
    let object = searchQuery;
    object.saleKind = saleKind;
    setSearchQuery(object);
  };
  const getSaleBundleType = (type) => {
    let object = searchQuery;
    object.bundleType = type;
    setSearchQuery(object);
  };

  const loadMoreExplores = async () => {
    console.log(
      "query is ",
      `/nfts?_start=${start}&_limit=2` +
        (searchQuery && searchQuery.categorySlug
          ? `&_categories.slug=${searchQuery?.categorySlug}`
          : ``)
    );
    const exploreResult = await fetch(
      `/nfts?_start=${start}&_limit=2` +
        (searchQuery && searchQuery.categorySlug
          ? `&_categories.slug=${searchQuery?.categorySlug}`
          : ``)
    );

    const exploreResultwhitoutfilter = await fetch(`/nfts?_start=${start}&_limit=2`);
    // let recentData = explores;
    // recentData = recentData.filter((item) => item.categories[0].slug == searchQuery?.categorySlug);
    // console.log("recend data is ", recentData);
    const dataorgin = await exploreResultwhitoutfilter.data;
    const data = await exploreResult.data;
    setExplores((prev) => [...prev, ...dataorgin]);
    console.log("explore si", explores);
    console.log("daata origin is ", dataorgin);
    setFilteredExplores((prev) => [...filterdExplores, ...data]);
    if (dataorgin.length > 0) {
      setStart(start + 2);
    }
  };
  const onFinishFailed = () => {
    console.log("failed");
  };

  return (
    <div>
      <div className="" id="content">
        <section id="subheader" className="text-light AssetSubheader">
          <div className="center-y relative text-center">
            <div className="container">
              <div className="row">
                <div className="col-md-12 text-center">
                  <h1>Explore</h1>
                </div>
                <div className="clearfix"></div>
              </div>
            </div>
          </div>
        </section>
        <section aria-label="explore" className={styles.exploreContainer}>
          <div className={styles.filterContainer}>
            <Form
              className={styles.searchForm}
              ref={searchFormRef}
              form={searchForm}
              // initialValues={{ nftImageFile: "" }}
              onFinish={onFinish}
              onFinishFailed={onFinishFailed}
            >
              <Form.Item
                className={styles.searchFormItem}
                name="name"
                // rules={[{ required: true, message: "Please input your Asset Name!" }]}
                // onInput={checkNftNameDuplication}
              >
                <Input id="name" placeholder="search item here" className={styles.searhFormInput} />
              </Form.Item>
              <Form.Item className={styles.searchFormItem}>
                <Button
                  className={styles.searhFormInput}
                  // loading={isLoading}
                  type="primary"
                  htmlType="submit"
                >
                  Search
                </Button>
              </Form.Item>
              <Form.Item
                className={styles.searchFormItem}
                name="categories"
                // rules={[
                //   {
                //     required: true,
                //     message: "Please Selected At least (1) Category",
                //   },
                // ]}
              >
                <Select
                  className={styles.searchFormSelect}
                  id="categories"
                  placeholder="Please select"
                  onChange={(values) => getSelectedCategories(values)}
                  showSearch
                  filterOption={(input, option) =>
                    option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                  }
                  defaultValue={categories[0].slug}
                >
                  {categories?.map((item) => (
                    <Select.Option
                      value={item.slug}
                      key={item.slug}
                      style={{ height: 50, padding: 10 }}
                    >
                      {item.slug}
                    </Select.Option>
                  ))}
                </Select>
              </Form.Item>
              <Form.Item
                className={styles.searchFormItem}
                name="saleKindList"
                // rules={[
                //   {
                //     required: true,
                //     message: "Please Selected At least (1) Category",
                //   },
                // ]}
              >
                <Select
                  className={styles.searchFormSelect}
                  id="saleKindList"
                  placeholder="Please select"
                  onChange={(values) => getSaleKind(values)}
                  showSearch
                  filterOption={(input, option) =>
                    option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                  }
                >
                  {saleKindList.map((item) => (
                    <Select.Option
                      value={item.id}
                      key={item.id}
                      style={{ height: 60, padding: 10 }}
                    >
                      {item.label}
                    </Select.Option>
                  ))}
                </Select>
              </Form.Item>
              <Form.Item
                className={styles.searchFormItem}
                name="saleBundleType"
                // rules={[
                //   {
                //     required: true,
                //     message: "Please Selected At least (1) Category",
                //   },
                // ]}
              >
                <Select
                  className={styles.searchFormSelect}
                  id="saleBundleType"
                  placeholder="Please select"
                  onChange={(type) => getSaleBundleType(type)}
                  showSearch
                  filterOption={(input, option) =>
                    option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                  }
                >
                  {saleBundleType.map((item) => (
                    <Select.Option
                      value={item.id}
                      key={item.id}
                      style={{ height: 50, padding: 10 }}
                    >
                      {item.label}
                    </Select.Option>
                  ))}
                </Select>
              </Form.Item>
            </Form>
          </div>
          <div className={styles.nftListContainer}>
            {filterdExplores &&
              filterdExplores.map((item) => (
                <div key={item.id} className={styles.nftItemContainer}>
                  <div className="nft__item">
                    <div
                      className="de_countdown"
                      data-year="2021"
                      data-month="10"
                      data-day="16"
                      data-hour="8"
                    ></div>
                    <div className="author_list_pp">
                      <a href="author.html">
                        <img className="lazy" src={item.asset.owner.profile_img_url} alt="" />
                        <i className="fa fa-check"></i>
                      </a>
                    </div>
                    <div className="nft__item_wrap">
                      <a href="item-details.html">
                        <img src={item.asset.imageUrl} className="lazy nft__item_preview" alt="" />
                      </a>
                    </div>
                    <div className="nft__item_info">
                      <a href="item-details.html">
                        <h4>{item.asset.name}</h4>
                      </a>
                      <div className="nft__item_price">
                        0.08 ETH<span>1/20</span>
                      </div>
                      <div className="nft__item_action">
                        <a href="#">Place a bid</a>
                      </div>
                      <div className="nft__item_like">
                        <i className="fa fa-heart"></i>
                        <span>50</span>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
          </div>
          <div>
            <Button onClick={loadMoreExplores}>{`Load More`}</Button>
          </div>
        </section>
      </div>
    </div>
  );
}
export default Explore;

export const getServerSideProps = async () => {
  const exploreResult = await fetch("/nfts?_start=0&_limit=2");
  const explores = exploreResult.data;
  const categoriesResult = await fetch("/categories");
  const cats = await categoriesResult.data;
  return {
    props: {
      serverExplores: JSON.parse(JSON.stringify(explores)),
      categories: JSON.parse(JSON.stringify(cats)),
    },
  };
};
