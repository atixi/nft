/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable @next/next/no-img-element */
import React, { useEffect, useState } from "react";
import Image from "next/image";
import styles from "/styles/explore.module.css";
import { Button, Form, Input, Select, Spin } from "antd";
import { fetch } from "Utils/strapiApi";
import { saleBundleType, saleTypes } from "Constants/constants";
import AssetCard from "@/components/assetCard";
import {
  getExplores,
  queryExplore,
  querySearch,
  querysearchExplore,
} from "services/explore.service";
// import { useRouter } from "next/router";
import router from "next/router";

function Explore({ serverExplores, categories }) {
  const { search } = router.query;
  // const [urlQuery, setUrlQuery] = useState("http://192.168.1.251:1337/nfts?[name_contains]=The Man From UNCLE");
  const [urlQuery, setUrlQuery] = useState();
  const [searchQuery, setSearchQuery] = useState({
    search: "",
    categorySlug: "all",
    saleType: "all",
    bundleType: "all",
  });
  const [stringQuery, setStringQuery] = useState(``);

  const [start, setStart] = useState(2);
  const [displayLoadMoreButton, setDisplayLoadMoreButton] = useState(true);
  const [explores, setExplores] = useState(serverExplores);
  const [filterdExplores, setFilteredExplores] = useState(serverExplores);
  const searchFormRef = React.createRef();
  const [searchForm] = Form.useForm();

  const getSelectedCategories = async (category) => {
    let query = searchQuery;
    query.categorySlug = category;
    setSearchQuery(query);
    handleFilter();
  };
  const getSaleType = (saleType) => {
    let query = searchQuery;
    query.saleType = saleType;
    setSearchQuery(query);
    handleFilter();
  };

  // const getSaleBundleType = (bundleType) => {
  //   let query = searchQuery;
  //   query.bundleType = bundleType;
  //   setSearchQuery(query);
  //   handleFilter();
  // };
  const filter = () => {
    setDisplayLoadMoreButton(true);
    let custom = "";
    let query = searchQuery;
    if (query.categorySlug != "all") {
      custom += `categories.slug=${query.categorySlug}&`;
    }

    if (query.saleType != "all") {
      custom += `${query.saleType}=true&`;
    }
    return custom;
  };
  const handleFilter = async () => {
    let custom = filter();
    setStart(2);
    const loadedExplores = await queryExplore(custom, 0, 2);
    setFilteredExplores(loadedExplores.data);
    console.log("custome query is ", custom);
    setStringQuery(custom);
  };
  const loadMoreExplores = async () => {
    const loadedExplores = await queryExplore(stringQuery, start, 2);
    if (loadedExplores.data.length > 0) {
      setStart(start + 2);
    } else {
      setDisplayLoadMoreButton(false);
    }
    setFilteredExplores((prev) => [...prev, ...loadedExplores.data]);
  };
  const searchFilterData = async (searchText) => {
    let custom = filter();
    console.log("in start custom filter is ", custom);
    custom += `[name_contains]=${searchText.name}&`;
    setStart(2);
    const loadedExplores = await queryExplore(custom, 0, 2);
    setFilteredExplores(loadedExplores.data);
    console.log("custome query is ", custom);
    setStringQuery(custom);
  };
  const handleSearch = async (searchText) => {
    console.log("searching ", searchText);
    let totalsearch = `[name_contains]=${searchText}`;

    const loadedExplores = await queryExplore(totalsearch, 0, 2);
    setStart(2);
    setFilteredExplores(loadedExplores.data);
    console.log("custome query is ", totalsearch);
    console.log("befreString query is ", stringQuery);
    setStringQuery(totalsearch);
    console.log("after String query is ", stringQuery);
  };
  const onFinishFailed = () => {
    console.log("failed");
  };

  useEffect(() => {
    setUrlQuery(router.query);
    if (!search) return;
    handleSearch(router.query.search);
  }, [search]);
  return (
    <div className="no-bottom " id="content">
      <div id="top"></div>

      {/* <!-- section begin --> */}
      <section
        id="subheader"
        className="text-light AssetSubheader"
        data-bgimage="url(images/background/subheader.jpg) top"
      >
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
      {/* <!-- section close --> */}

      {/* <!-- section begin --> */}
      <section aria-label="section">
        <div className="container">
          <div className="row fadeIn">
            <div className={styles.filterContainer}>
              <Form
                className={styles.searchForm}
                ref={searchFormRef}
                form={searchForm}
                // initialValues={{ nftImageFile: "" }}
                onFinish={searchFilterData}
                onFinishFailed={onFinishFailed}
              >
                <Form.Item
                  className={styles.searhFormInputItem}
                  name="name"
                  // rules={[{ required: true, message: "Please input your Asset Name!" }]}
                  // onInput={checkNftNameDuplication}
                >
                  <Input
                    id="name"
                    placeholder="search item here"
                    className={styles.searhFormInput}
                  />
                </Form.Item>
                <Form.Item className={styles.searhFormInputItem}>
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
                  className={styles.searchFormSelectItem}
                  name="categories"
                  // rules={[
                  //   {
                  //     required: true,
                  //     message: "Please Selected At least (1) Category",
                  //   },
                  // ]}
                >
                  <Select
                    size="large"
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
                <Form.Item className={styles.searchFormSelectItem} name="saleTypes">
                  <Select
                    size="large"
                    className={styles.searchFormSelect}
                    id="saleTypes"
                    placeholder="Please select"
                    onChange={(values) => getSaleType(values)}
                    showSearch
                    filterOption={(input, option) =>
                      option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                    }
                    defaultValue={saleTypes[0].value}
                  >
                    {saleTypes.map((item) => (
                      <Select.Option
                        key={item.id}
                        value={item.value}
                        style={{ height: 50, padding: 10 }}
                      >
                        {item.label}
                      </Select.Option>
                    ))}
                  </Select>
                </Form.Item>
                {/* <Form.Item className={styles.searchFormSelectItem} name="bundleType">
                  <Select
                    size="large"
                    className={styles.searchFormSelect}
                    id="bundleType"
                    placeholder="Please select"
                    onChange={(values) => getSaleBundleType(values)}
                    showSearch
                    filterOption={(input, option) =>
                      option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                    }
                    defaultValue={saleBundleType[0].value}
                  >
                    {saleBundleType.map((item) => (
                      <Select.Option
                        key={item.id}
                        value={item.value}
                        style={{ height: 50, padding: 10 }}
                      >
                        {item.label}
                      </Select.Option>
                    ))}
                  </Select>
                </Form.Item> */}
              </Form>
            </div>
            {/* <!-- nft item begin --> */}
            {filterdExplores &&
              filterdExplores.map((item) => <AssetCard key={item.id} asset={item} />)}
            {displayLoadMoreButton && (
              <div className="col-md-12 text-center">
                <a onClick={loadMoreExplores} id="loadmore" className="btn-main  fadeInUp lead">
                  Load more
                </a>
              </div>
            )}
          </div>
        </div>
      </section>
    </div>
  );
}
export default Explore;

export const getServerSideProps = async () => {
  const exploreResult = await getExplores(0, 2);
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
