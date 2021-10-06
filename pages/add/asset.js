import react, { useState, useEffect } from "react"
import { Form, Statistic, Spin, message, Radio, Select } from "antd"
import Link from "next/link"
import {
    CountDownContainer
} from "../../Components/StyledComponents/explore-styledComponents";
import request from "../../Utils/axios"
import { unixToMilSeconds } from "../../Utils/utils"
import { useRouter } from "next/router";
import { useSelector } from "react-redux";
import { getUser } from '../../store/action/accountSlice';

const { Countdown } = Statistic
const { Option } = Select
function AddAsset() {
    const [addedAsset, setAddedAsset] = useState()
    const [collections, setCollections] = useState()
    const [categories, setCategories] = useState()
    const [response, setShowResponse] = useState(false)
    const [exist, setExist] = useState(false)
    const [loading, setLoading] = useState(false)
    const [errorMessage, setErrorMessage] = useState()
    const router = useRouter();
    const { jwt } = useSelector(getUser);
    useEffect(() => {
        if (jwt === null) {
            router.push("/404");
        }
    }, []);
    const loadCollections = async () => {
        const cols = await request("collections", {
            method: "GET"
        });
        if (cols.status === 200) {
            setCollections(cols.data)
        }
    }
    const loadCategories = async () => {
        const cats = await request("categories", {
            method: "GET"
        });
        if (cats.status === 200) {
            setCategories(cats.data)
        }
    }
    const submitAsset = async (values) => {
        setExist(false)
        setShowResponse(false)
        setLoading(true)
        const add = await request(`nfts/add`, {
            method: "POST",
            data: { tokenId: values.tokenId, tokenAddress: values.tokenAddress, categories: values.categories, collections: values.collections, featured: values.featured }
        })
        if (add.status === 200) {
            if (add.data === 1) {
                setErrorMessage("This Asset already exist")
                setShowResponse(true)
                setExist(true)
            }
            else if (add.data === 2) {
                setErrorMessage("This asset is not NFT, please add NFT")
                setShowResponse(true)
                setExist(true)
            }
            else if (add.data?.tokenId) {
                setAddedAsset(add.data)
                setShowResponse(true)
            }
            else {
                setShowResponse(false)
                setLoading(false)
                message.error("Error adding asset, try again!")
            }
        }
    }
    useEffect(() => {
        loadCollections()
        loadCategories();
    }, [])
    const [form] = Form.useForm();
    return <div className="no-bottom" id="content">
        {/* <div id="top"></div> */}
        <section id="subheader" className="text-light AssetSubheader">
            <div className="center-y relative text-center">
                <div className="container">
                    <div className="row">
                        <div className="col-md-12 text-center">
                            <h1>Add Existing Asset</h1>
                        </div>
                        <div className="clearfix"></div>
                    </div>
                </div>
            </div>
        </section>
        <section aria-label="section">
            <div className="container">
                <div className="row">
                    <div className="col-lg-7 offset-lg-1">
                        <Form form={form} onFinish={submitAsset} id="form-create-item" className="form-border" method="post" action="email.php">
                            <div className="field-set">

                                <h5>Token Address</h5>
                                <Form.Item name={"tokenAddress"} rules={[
                                    {
                                        required: true,
                                        message: 'This field is required',
                                    },
                                ]}>
                                    <input type="text" id="item_royalties" className="form-control" placeholder="Enter asset token address" />
                                </Form.Item>
                                <h5>Token ID</h5>
                                <Form.Item name={"tokenId"} rules={[
                                    {
                                        required: true,
                                        message: 'This field is required',
                                    },
                                ]}>
                                    <input type="text" id="item_title" className="form-control" placeholder="Enter asset token ID" />
                                </Form.Item>
                                <h5>Collection</h5>
                                <Form.Item name={"collections"} rules={[
                                    {
                                        required: true,
                                        message: 'This field is required',
                                    },
                                ]}>
                                    <select className={"form-control"}>
                                        <option key={"empty"} >----</option>
                                        {collections && collections.map((col) => {
                                            return <option key={col.id} value={col.id}>{col.collectionName}</option>
                                        })}
                                    </select>
                                </Form.Item>
                                <h5>Categories</h5>
                                <Form.Item name={"categories"} rules={[
                                    {
                                        required: true,
                                        message: 'This field is required',
                                    },
                                ]}>
                                    <Select
                                        mode="multiple"
                                        style={{ width: '100%' }}
                                        placeholder="---"
                                    >
                                        {categories && categories.map((cat) => {
                                            return <Option key={cat.id} value={cat.id}>{cat.categoryName}</Option>
                                        })}
                                    </Select>
                                </Form.Item>
                                <h5>Featured</h5>
                                <Form.Item name={"featured"}>
                                    <Radio.Group>
                                        <Radio value={true}>Yes</Radio>
                                        <Radio value={false}>No</Radio>
                                    </Radio.Group>
                                </Form.Item>

                                <div className="spacer-10"></div>
                                <div className="spacer-single"></div>
                                <input type="submit" id="submit" className="btn-main" value="Add Asset" />
                                <div className="spacer-single"></div>
                            </div>
                        </Form>
                    </div>

                    <div className="col-lg-3 col-sm-6 col-xs-12">
                        {response && addedAsset &&
                            <>
                                <h5>Preview Asset</h5>
                                <div className="nft__item">
                                    {addedAsset?.sellOrders && addedAsset?.sellOrders?.length > 0 && addedAsset?.sellOrders[0].expirationTime !== "0" &&
                                        <CountDownContainer>
                                            <Countdown
                                                value={unixToMilSeconds(addedAsset?.sellOrders[0].expirationTime)}
                                                format={`D[d] HH[h] mm[m] ss[s]`}
                                                valueStyle={{ lineHeight: "1.1", color: "white" }}
                                            />
                                        </CountDownContainer>}
                                    <div className="author_list_pp">
                                        <a href="#">
                                            <img className="lazy" src={addedAsset?.owner?.profile_img_url} alt="" />
                                            <i className="fa fa-check"></i>
                                        </a>
                                    </div>
                                    <div className="nft__item_wrap">
                                        <Link href={`/nft/${addedAsset?.tokenAddress}?tokenId=${addedAsset?.tokenId}`}>
                                            <a><img src={addedAsset.imageUrlThumbnail} id="get_file_2" className="lazy nft__item_preview" alt="" />
                                            </a>
                                        </Link>
                                    </div>
                                    <div className="nft__item_info">
                                        <a> <h4>{addedAsset.name}</h4></a>
                                        <div className="nft__item_action">
                                            <Link href={`/nft/${addedAsset?.tokenAddress}?tokenId=${addedAsset?.tokenId}`}>
                                                <a>Click to view</a>
                                            </Link>
                                        </div>
                                    </div>
                                </div>
                            </>}
                        {response && exist && <>
                            <h5>Result:</h5>
                            <div className="alert alert-danger d-flex align-items-center" role="alert">
                                <div>
                                    <i className={"fa fa-error-circle"} /> {errorMessage}
                                </div>
                            </div>
                        </>
                        }
                        {loading && !response &&
                            <div style={{ textAlign: "center", marginTop: "30px" }}><Spin /></div>
                        }
                    </div>
                </div>
            </div>
        </section>
    </div>
}
export default AddAsset;