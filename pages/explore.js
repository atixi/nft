/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable @next/next/no-img-element */
import React, { useEffect, useState } from "react";
import Image from "next/image";
import styles from "/styles/explore.module.css";
import { Button, Form, Input, Select, Spin } from "antd";
import { fetch } from "Utils/strapiApi";
import { saleBundleType, saleTypes } from "Constants/constants";
import AssetCard from "@/components/assetCard";
import { getExplores } from "services/explore.service";

const { Option } = Select;

function Explore({ serverExplores, categories }) {
  const [searchQuery, setSearchQuery] = useState({
    search: "",
    categorySlug: "all",
    saleType: "all",
    bundleType: "all",
  });

  const [start, setStart] = useState(2);
  const [explores, setExplores] = useState(serverExplores);
  const [filterdExplores, setFilteredExplores] = useState(serverExplores);
  const searchFormRef = React.createRef();
  const [searchForm] = Form.useForm();

  const onFinish = (values) => {
    console.log("values of searchfomr is ", values);
  };

  const getSelectedCategories = async (category) => {
    let query = searchQuery;
    query.categorySlug = category;
    setSearchQuery(query);
    // let allExplores = explores;
    // let filteredData = allExplores;

    // if (searchQuery.saleType == "all" && searchQuery.bundleType == "all" && category == "all") {
    //   console.log("all all in the category");
    //   setFilteredExplores(explores);
    // } else if (category == "all") {
    //   filteredData = allExplores.filter((item) => {
    //     return item.onSale == searchQuery.saleType || item.hasOffer == searchQuery.saleType;
    //   });
    //   setFilteredExplores(filteredData);
    // } else {
    //   let query = searchQuery;
    //   query.categorySlug = category;
    //   setSearchQuery(query);
    //   handleFilter();
    // }
  };
  const getSaleType = (saleType) => {
    let query = searchQuery;
    query.saleType = saleType;
    setSearchQuery(query);
    // let allExplores = explores;
    // let filteredData = allExplores;
    // // console.log("all in the sell", searchQuery.saleType);
    // // console.log("all in the sell", searchQuery.bundleType);
    // // console.log(saleType);
    // // console.log("all in the sell", searchQuery.bundleType == "all", searchQuery.saleType == "all");
    // if (searchQuery.categorySlug == "all" && saleType == "all" && searchQuery.bundleType == "all") {
    //   console.log("int the handle for all all ");
    //   setFilteredExplores(allExplores);
    // } else if (saleType == "all") {
    //   console.log("all in the sell");
    //   console.log("all explored in sell is ", allExplores);
    //   filteredData = allExplores.filter((item) => {
    //     return item.categories[0].slug == searchQuery.categorySlug;
    //   });
    //   setFilteredExplores(filteredData);
    // } else {
    //   console.log("selected saleType is ", saleType);
    //   let query = searchQuery;
    //   query.saleType = saleType;
    //   setSearchQuery(query);
    //   handleFilter();
    // }
  };

  const getSaleBundleType = (bundleType) => {
    let query = searchQuery;
    query.bundleType = bundleType;
    setSearchQuery(query);

    // let allExplores = explores;
    // let filteredData = allExplores;
    // if (bundleType == "all") {
    //   setFilteredExplores(filteredData);
    // } else {
    //   console.log("selected bundleType is ", bundleType);
    //   let query = searchQuery;
    //   query.bundleType = bundleType;
    //   setSearchQuery(query);
    //   handleFilter();
    // }
  };

  const handleFilter = () => {
    let allExplores = explores;
    let filteredData = allExplores.filter(
      (item) => item.categories[0].slug == searchQuery.categorySlug
    );
    setFilteredExplores(filteredData);
    // console.log(
    //   "searchquery is  ",
    //   searchQuery.categorySlug == "all" &&
    //     searchQuery.saleType == "all" &&
    //     searchQuery.bundleType == "all"
    // );
    // if (
    //   searchQuery.categorySlug == "all" &&
    //   searchQuery.saleType == "all" &&
    //   searchQuery.bundleType == "all"
    // ) {
    //   console.log("int the handle for all opetions");
    //   setFilteredExplores(allExplores);
    // } else {
    //   const filteredData = allExplores.filter((item) => {
    //     console.log("item category", item.categories[0].slug);
    //     console.log("item onSale is ", item.onSale);
    //     return (
    //       (item.onSale == (searchQuery.saleType == "onSale") ||
    //         item.hasOffer == (searchQuery.saleType == "hasOffer")) &&
    //       item.categories[0].slug == searchQuery.categorySlug
    //     );
    //   });
    //   console.log("filterd data", filteredData);
    //   console.log("search query is ", searchQuery);
    //   console.log("--------------------------------------------------------");
    //   setFilteredExplores(filteredData);
    // }
  };
  const loadMoreExplores = async () => {
    console.log("loading more data");
    const loadedExplores = await getExplores(start, 2);
    if (loadedExplores.data.length > 0) {
      setStart(start + 2);
    }
    setExplores((prev) => [...prev, ...loadedExplores.data]);
    if (
      (searchQuery.search == "" && searchQuery.categorySlug == "all",
      searchQuery.saleType == "all",
      searchQuery.bundleType == "all")
    ) {
      console.log("no filter is selected");
      setFilteredExplores((prev) => [...prev, ...loadedExplores.data]);
    } else {
      handleFilter();
    }
  };
  const onFinishFailed = () => {
    console.log("failed");
  };

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
                onFinish={onFinish}
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
                <Form.Item className={styles.searchFormSelectItem} name="bundleType">
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
                </Form.Item>
              </Form>
            </div>
            {/* <!-- nft item begin --> */}
            {filterdExplores &&
              filterdExplores.map((item) => <AssetCard key={item.id} asset={item} />)}
            <div className="col-md-12 text-center">
              <a onClick={loadMoreExplores} id="loadmore" className="btn-main  fadeInUp lead">
                Load more
              </a>
            </div>
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
