import React, { useEffect, useState } from "react";
import styles from "/styles/explore.module.css";
import { Button, Form, Input, Select } from "antd";
import { fetch } from "Utils/strapiApi";
import { saleTypes } from "Constants/constants";
import AssetCard from "@/components/assetCard";
import { getExplores, queryExplore } from "services/explore.service";
import router from "next/router";

const searchInitialValue = { search: "", categories: "all", saleTypes: "all" };
const offset = 20;
function Explore({ serverExplores, categories }) {
  const { search } = router.query;
  const [searchQuery, setSearchQuery] = useState(searchInitialValue);
  const [stringQuery, setStringQuery] = useState(``);

  const [start, setStart] = useState(offset);
  const [displayLoadMoreButton, setDisplayLoadMoreButton] = useState(true);
  const [filterdExplores, setFilteredExplores] = useState(serverExplores);
  const searchFormRef = React.createRef();
  const [searchForm] = Form.useForm();

  const getSelectedCategories = async (category) => {
    let query = searchQuery;
    query.categories = category;
    setSearchQuery(query);
    handleFilter();
  };
  const getSaleType = (saleType) => {
    let query = searchQuery;
    query.saleType = saleType;
    setSearchQuery(query);
    handleFilter();
  };

  const filter = () => {
    setDisplayLoadMoreButton(true);
    let custom = "";
    let query = searchQuery;
    if (query.categories != "all") {
      custom += `categories.slug=${query.categories}&`;
    }

    if (query.saleType != "all") {
      custom += `${query.saleType}=true&`;
    }

    return custom;
  };
  const handleFilter = async () => {
    let custom = filter();
    setStart(offset);
    const { data } = await queryExplore(custom, 0, offset);
    setFilteredExplores(data);
    console.log("custome query is ", custom);
    setStringQuery(custom);
  };
  const loadMoreExplores = async () => {
    const { data } = await queryExplore(stringQuery, start, offset);
    if (data.length > 0) {
      setStart(start + offset);
    } else {
      setDisplayLoadMoreButton(false);
    }
    setFilteredExplores((prev) => [...prev, ...data]);
  };
  const searchFilterData = async (searchText) => {
    let custom = filter();
    custom += `[name_contains]=${searchText.search}&`;
    setStart(offset);
    const { data } = await queryExplore(custom, 0, offset);
    setFilteredExplores(data);
    setStringQuery(custom);
  };
  const handleSearch = async (search) => {
    let totalsearch = `[name_contains]=${search}`;
    const { data } = await queryExplore(totalsearch, 0, offset);
    setStart(offset);
    setFilteredExplores(data);
    searchForm.setFieldsValue({ search });
    setStringQuery(totalsearch);
  };

  useEffect(() => {
    if (!search) return;
    handleSearch(router.query.search);
  }, []);
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
                initialValues={searchInitialValue}
                onFinish={searchFilterData}
              >
                <Form.Item className={styles.searhFormInputItem} name="search">
                  <Input
                    id="name"
                    placeholder="search item here"
                    className={styles.searhFormInput}
                  />
                </Form.Item>
                <Form.Item className={styles.searhFormInputItem}>
                  <Button className={styles.searhFormInput} type="primary" htmlType="submit">
                    Search
                  </Button>
                </Form.Item>
                <Form.Item className={styles.searchFormSelectItem} name="categories">
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
  const exploreResult = await getExplores(0, offset);
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
