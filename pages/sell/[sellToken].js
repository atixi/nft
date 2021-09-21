import {
  Avatar,
  Button,
  Card,
  Col,
  DatePicker,
  Form,
  Input,
  List,
  Result,
  Row,
  Slider,
  Spin,
  Switch,
  Tabs,
  message,
} from "antd";
import { CheckCircleTwoTone, UnorderedListOutlined } from "@ant-design/icons";
import {
  Content,
  Wrapper,
} from "../../Components/StyledComponents/productDetails-styledComponents";
import {
  CustomTapBarElement,
  ListDescription,
  ListTile,
  SummarySection,
  SwitchContainer,
} from "../../Components/StyledComponents/sellNft-styledComponents";
import React, { useEffect, useState } from "react";
import { fetchBundle, fetchOne } from "/Utils/strapiApi";
import {
  getAccountTokens,
  getMetaConnected,
  getWalletConnected,
} from "store/action/accountSlice";

import Link from "next/link";
import { MainWrapper } from "/Components/StyledComponents/globalStyledComponents";
import { getAuctionPriceDetails } from "/Constants/constants";
import { sellOrder } from "/Utils/utils";
import { signTransaction } from "Utils/utils";
import { socket } from "config/websocket";
import { useQueryParam } from "/Components/hooks/useQueryParam";
import { useSelector } from "react-redux";

const { TabPane } = Tabs;

function SellNft() {
  const queryParam = useQueryParam();
  const [asset, setAsset] = useState(null);
  const [loading, setLoading] = useState(true);
  const [notFound, setNotFound] = useState(false);
  const [futureTime, setFutureTime] = useState(false);
  const [formText, setFormText] = useState({
    price: "Price",
    priceDesc: "Will be on sale until you transfer this item or cancel it",
    includeEnding: "Include ending price",
    includeEndingDesc:
      "Adding an ending price will allow this listing to expire, or for the price to be reduced until a buyer is found.",
  });
  const isWalletConnected = useSelector(getWalletConnected);
  const isMetaConnected = useSelector(getMetaConnected);
  const tokenAddresses = useSelector(getAccountTokens);
  const [address, setAddress] = useState(null);
  const [balance, setBalance] = useState(null);
  const [endingPrice, setEndingPrice] = useState(false);
  const [isFixed, setIsFixed] = useState(true);
  const [posting, setPosting] = useState(false);
  const [hasOrder, setHasOrder] = useState(false);
  async function loadNft() {
    if (queryParam.sellToken != undefined && queryParam.tokenId != undefined) {
      const data = await fetchOne(queryParam.sellToken, queryParam.tokenId);
      if (data) {
        setLoading(false);
      }

      if (data.status == 200) {
        console.log(data);
        const nft = data.data;
        if (nft.sellOrder) setHasOrder(false); // console.log

        setAsset({
          name: nft.name,
          description: nft.description,
          owner: nft.owner,
          creator: nft?.creator,
          image: nft.imageUrl,
          contractAddress: nft?.assetContract?.address,
          tokenId: nft.tokenId,
          tokenAddress: nft.tokenAddress,
          collection: nft.collection,
          isPresale: nft.isPresale,
          thumbnail: nft.imageUrlThumbnail,
          sellOrder: nft.sellOrder,
          numOfSales: nft.numSales,
        });
      } else if (data == "error") {
        setNotFound(true);
      }
    }
  }
  const data = [
    {
      title: "Nft info",
    },
  ];
  function handleIncludeEndPrice(checked) {
    if (checked) {
      setFormText({
        ...formText,
        price: "Starting Price",
        priceDesc: "Set an initial price",
        includeEndingDesc: "",
      });
      setEndingPrice(true);
    } else {
      setFormText({
        ...formText,
        price: "Price",
        priceDesc: "Will be on sale until you transfer this item or cancel it",
        includeEnding: "Include ending price",
        includeEndingDesc:
          "Adding an ending price will allow this listing to expire, or for the price to be reduced until a buyer is found.",
      });
      setEndingPrice(false);
    }
  }
  function handleFutureListing(checked) {
    if (checked) {
      setFutureTime(true);
    } else {
      setFutureTime(false);
    }
  }
  const config = {
    rules: [
      {
        type: "object",
        required: true,
      },
    ],
  };
  const [bountyValue, setBountyValue] = useState(parseFloat(1).toFixed(2));
  const onChange = (value) => {
    if (isNaN(value)) {
      return;
    }
    setBountyValue(value);
  };
  const onSubmitForm = async (values) => {
    const enableAccount = await ethereum.enable();
    if (enableAccount) {
      if (enableAccount.length > 0) {
        const buySign = await signTransaction(
          enableAccount[0],
          "Request to Sell",
          asset
        );
        if (buySign.success) {
          setPosting(true);
          const sell = await sellOrder(
            queryParam.sellToken,
            queryParam.tokenId,
            address,
            asset?.contractAddress,
            values,
            isFixed
          );
          if (sell?.hash) {
            message.success("Sell order is saved");
            socket.emit("userCreatedNewFixedSell", sell);
            setHasOrder(true);
          } else {
            message.error(sell.toString());
            setPosting(false);
          }
        }
      }
    }
  };
  const onTabClick = (e) => {
    if (e == 2) {
      setIsFixed(false);
    } else if (e == 1) {
      setIsFixed(true);
    }
  };
  useEffect(() => {
    if (!queryParam) {
      return null;
    }
    if (isWalletConnected) {
      setAddress(tokenAddresses.walletToken[0]);
      setBalance(tokenAddresses.walletBalance);
    } else if (isMetaConnected) {
      setAddress(tokenAddresses.metaToken[0]);
      setBalance(tokenAddresses.metaBalance);
    }
    loadNft();
  }, [queryParam]);
  return (
    <MainWrapper>
      <Wrapper>
        {loading ? (
          <Spin style={{ marginTop: "200px" }} />
        ) : notFound ? (
          <Result
            status="500"
            title="Error!"
            subTitle="Please try again!"
            extra={[
              <Link key={"goBack"} href={"/"}>
                <a>
                  <Button key="buy">{"Back to home"}</Button>
                </a>
              </Link>,
            ]}
          />
        ) : (
          asset && (
            <Content>
              {" "}
              {!hasOrder ? (
                <Form onFinish={onSubmitForm}>
                  <div
                    style={{
                      paddingTop: "5px",
                      borderBottom: "1px solid gray",
                      marginBottom: "20px",
                    }}
                  >
                    <List
                      itemLayout="horizontal"
                      // dataSource={data}
                    >
                      <List.Item.Meta
                        avatar={
                          <Avatar
                            shape={"square"}
                            src={asset.thumbnail}
                            size={"large"}
                          />
                        }
                        title={<strong>{asset.name}</strong>}
                        description={asset.collection?.name}
                      >
                        <div className={"border-bottom"}>
                          {asset.sellOrder != null &&
                            `${
                              getAuctionPriceDetails(asset.sellOrder).priceBase
                            } ${asset.sellOrder.paymentTokenContract.symbol}`}
                        </div>
                      </List.Item.Meta>
                    </List>
                  </div>
                  <Row>
                    <Col lg={16} md={16}>
                      <Tabs
                        defaultActiveKey="1"
                        onTabClick={onTabClick}
                        tabBarGutter={10}
                        style={{ height: "500px" }}
                        size={"large"}
                        type={"card"}
                      >
                        <TabPane
                          tab={
                            <CustomTapBarElement>
                              <div>{"Set Price"}</div>
                              <span>
                                {"Sell at a fixed or declining price"}
                              </span>
                            </CustomTapBarElement>
                          }
                          key="1"
                          style={{ height: 200 }}
                        >
                          {isFixed && (
                            <List itemLayout="horizontal">
                              <List.Item
                                extra={
                                  <Form.Item style={{ width: "300px" }}>
                                    <Input.Group compact>
                                      <Form.Item
                                        name={["price", "blockchain"]}
                                        noStyle
                                      >
                                        <Input
                                          prefix={
                                            <img
                                              src={
                                                "https://storage.opensea.io/files/6f8e2979d428180222796ff4a33ab929.svg"
                                              }
                                              width={"25"}
                                              height={"25"}
                                            />
                                          }
                                          disabled
                                          style={{
                                            width: "20%",
                                            textAlign: "center",
                                          }}
                                          size={"large"}
                                        />
                                      </Form.Item>
                                      <Form.Item
                                        name={["price", "amount"]}
                                        noStyle
                                        rules={[
                                          {
                                            required: true,
                                            message: "Amount is required",
                                          },
                                        ]}
                                      >
                                        <Input
                                          style={{ width: "65%" }}
                                          size={"large"}
                                          placeholder="Amount"
                                        />
                                      </Form.Item>
                                    </Input.Group>
                                  </Form.Item>
                                }
                              >
                                <List.Item.Meta
                                  title={<ListTile>{formText.price}</ListTile>}
                                  description={
                                    <ListDescription>
                                      {formText.priceDesc}
                                    </ListDescription>
                                  }
                                >
                                  <div></div>
                                </List.Item.Meta>
                              </List.Item>
                              <List.Item
                                extra={
                                  <SwitchContainer>
                                    <Form.Item
                                      name={["switch", "includeEnd"]}
                                      noStyle
                                    >
                                      <Switch
                                        onChange={handleIncludeEndPrice}
                                      />
                                    </Form.Item>
                                  </SwitchContainer>
                                }
                              >
                                <List.Item.Meta
                                  title={
                                    <ListTile>
                                      {formText.includeEnding}
                                    </ListTile>
                                  }
                                  description={
                                    <ListDescription>
                                      {formText.includeEndingDesc}
                                    </ListDescription>
                                  }
                                ></List.Item.Meta>
                              </List.Item>
                              {endingPrice ? (
                                <>
                                  <List.Item
                                    extra={
                                      <Form.Item style={{ width: "300px" }}>
                                        <Input.Group compact>
                                          <Form.Item
                                            name={["price", "blockchainEnd"]}
                                            noStyle
                                          >
                                            <Input
                                              prefix={
                                                <img
                                                  src={
                                                    "https://storage.opensea.io/files/6f8e2979d428180222796ff4a33ab929.svg"
                                                  }
                                                  width={"25"}
                                                  height={"25"}
                                                />
                                              }
                                              disabled
                                              style={{
                                                width: "20%",
                                                textAlign: "center",
                                              }}
                                              size={"large"}
                                            />
                                          </Form.Item>
                                          <Form.Item
                                            name={["price", "endPrice"]}
                                            noStyle
                                            rules={[
                                              {
                                                required: true,
                                                message: "Amount is required",
                                              },
                                            ]}
                                          >
                                            <Input
                                              style={{ width: "65%" }}
                                              size={"large"}
                                              placeholder="Amount"
                                            />
                                          </Form.Item>
                                        </Input.Group>
                                      </Form.Item>
                                    }
                                  >
                                    <List.Item.Meta
                                      title={
                                        <ListTile>{"Ending Price"}</ListTile>
                                      }
                                      description={
                                        <ListDescription>
                                          {
                                            "Must be less than or equal to the starting price. The price will progress linearly to this amount until the expiration date."
                                          }
                                        </ListDescription>
                                      }
                                    />
                                  </List.Item>
                                  <List.Item
                                    extra={
                                      <Form.Item
                                        name={["date", "expirationTime"]}
                                        noStyle
                                      >
                                        <DatePicker
                                          key={"expirationTime"}
                                          style={{
                                            position: "relative",
                                            right: "45px",
                                          }}
                                          showTime
                                          allowClear={false}
                                          format="YYYY-MM-DD HH:mm:ss"
                                          {...config}
                                          size={"large"}
                                        />
                                      </Form.Item>
                                    }
                                  >
                                    <List.Item.Meta
                                      title={
                                        <ListTile>{"Expiration Time"}</ListTile>
                                      }
                                      description={
                                        <ListDescription>
                                          {
                                            "Your listing will automatically end at this time. No need to cancel it!"
                                          }
                                        </ListDescription>
                                      }
                                    />
                                  </List.Item>
                                </>
                              ) : (
                                <List.Item
                                  extra={
                                    <>
                                      {futureTime && (
                                        <Form.Item
                                          name={["date", "endFutureTime"]}
                                          rules={[
                                            {
                                              required: true,
                                              message:
                                                "Future Time is required",
                                            },
                                          ]}
                                          noStyle
                                        >
                                          <DatePicker
                                            key={"futureExpirationTime"}
                                            style={{
                                              position: "relative",
                                              right: "15px",
                                            }}
                                            showTime
                                            allowClear={false}
                                            format="YYYY-MM-DD HH:mm:ss"
                                            {...config}
                                            size={"large"}
                                          />
                                        </Form.Item>
                                      )}
                                      <SwitchContainer>
                                        <Form.Item
                                          name={["switch", "futureTime"]}
                                          noStyle
                                        >
                                          <Switch
                                            onChange={handleFutureListing}
                                          />
                                        </Form.Item>
                                      </SwitchContainer>
                                    </>
                                  }
                                >
                                  <List.Item.Meta
                                    title={
                                      <ListTile>
                                        {"Schedule for a future time"}
                                      </ListTile>
                                    }
                                    description={
                                      <ListDescription>
                                        {
                                          "You can schedule this listing to only be buyable at a future date"
                                        }
                                      </ListDescription>
                                    }
                                  />
                                </List.Item>
                              )}
                            </List>
                          )}
                        </TabPane>
                        <TabPane
                          tab={
                            <CustomTapBarElement>
                              <div>{"Highest Bid"}</div>
                              <span>{"Auction to the highest bidder"}</span>
                            </CustomTapBarElement>
                          }
                          key="2"
                        >
                          {!isFixed && (
                            <List itemLayout="horizontal">
                              <List.Item
                                extra={
                                  <Form.Item style={{ width: "300px" }}>
                                    <Input.Group compact>
                                      <Form.Item
                                        name={["price", "blockchain"]}
                                        noStyle
                                      >
                                        <Input
                                          prefix={
                                            <img
                                              src={
                                                "https://storage.opensea.io/files/6f8e2979d428180222796ff4a33ab929.svg"
                                              }
                                              width={"25"}
                                              height={"25"}
                                            />
                                          }
                                          disabled
                                          style={{
                                            width: "20%",
                                            textAlign: "center",
                                          }}
                                          size={"large"}
                                        />
                                      </Form.Item>
                                      <Form.Item
                                        name={["price", "minAmount"]}
                                        noStyle
                                        rules={[
                                          {
                                            required: true,
                                            message: "Amount is required",
                                          },
                                        ]}
                                      >
                                        <Input
                                          style={{ width: "65%" }}
                                          size={"large"}
                                          placeholder="Amount"
                                        />
                                      </Form.Item>
                                    </Input.Group>
                                  </Form.Item>
                                }
                              >
                                <List.Item.Meta
                                  title={<ListTile>{"Minimum Bid"}</ListTile>}
                                  description={
                                    <ListDescription>
                                      {"Set your starting bid price"}
                                    </ListDescription>
                                  }
                                >
                                  <div></div>
                                </List.Item.Meta>
                              </List.Item>
                              <List.Item
                                extra={
                                  <Form.Item style={{ width: "300px" }}>
                                    <Input.Group compact>
                                      <Form.Item
                                        name={["price", "blockchain"]}
                                        noStyle
                                      >
                                        <Input
                                          prefix={
                                            <img
                                              src={
                                                "https://storage.opensea.io/files/6f8e2979d428180222796ff4a33ab929.svg"
                                              }
                                              width={"25"}
                                              height={"25"}
                                            />
                                          }
                                          disabled
                                          style={{
                                            width: "20%",
                                            textAlign: "center",
                                          }}
                                          size={"large"}
                                        />
                                      </Form.Item>
                                      <Form.Item
                                        name={["price", "reserveAmount"]}
                                        noStyle
                                        rules={[
                                          {
                                            required: true,
                                            message: "Amount is required",
                                          },
                                        ]}
                                      >
                                        <Input
                                          style={{ width: "65%" }}
                                          size={"large"}
                                          placeholder="Amount"
                                        />
                                      </Form.Item>
                                    </Input.Group>
                                  </Form.Item>
                                }
                              >
                                <List.Item.Meta
                                  title={<ListTile>{"Reserve Price"}</ListTile>}
                                  description={
                                    <ListDescription>
                                      {
                                        "Create a hidden limit by setting a reserve price."
                                      }
                                    </ListDescription>
                                  }
                                >
                                  <div></div>
                                </List.Item.Meta>
                              </List.Item>
                              <List.Item
                                extra={
                                  <Form.Item
                                    name={["date", "auctionExpirationTime"]}
                                  >
                                    <DatePicker
                                      style={{
                                        position: "relative",
                                        right: "45px",
                                      }}
                                      showTime
                                      allowClear={false}
                                      format="YYYY-MM-DD HH:mm:ss"
                                      {...config}
                                      size={"large"}
                                    />
                                  </Form.Item>
                                }
                              >
                                <List.Item.Meta
                                  title={
                                    <ListTile>{"Expiration Time"}</ListTile>
                                  }
                                  description={
                                    <ListDescription>
                                      {
                                        "Your listing will automatically end at this time. No need to cancel it!"
                                      }
                                    </ListDescription>
                                  }
                                />
                              </List.Item>
                            </List>
                          )}
                        </TabPane>
                      </Tabs>
                    </Col>
                    <Col lg={8} md={8}>
                      <SummarySection>
                        <Card
                          title={
                            <>
                              <UnorderedListOutlined
                                style={{
                                  position: "relative",
                                  top: -2,
                                  marginRight: "10px",
                                }}
                              />
                              <span>{"Summary"}</span>
                            </>
                          }
                          style={{ width: "100%", marginTop: 3 }}
                        >
                          <Form.Item>
                            <Button
                              type="secondary"
                              key={"submit"}
                              htmlType={"submit"}
                              style={{ background: "#0066ff", color: "white" }}
                              loading={posting}
                              size={"large"}
                            >
                              Post your listing
                            </Button>
                          </Form.Item>
                          <hr />
                          <h5>{"Bounties"}</h5>
                          <Form.Item name={["bounty", "bounty"]}>
                            <Slider
                              min={1.0}
                              max={2.5}
                              onChange={onChange}
                              value={
                                typeof bountyValue === "number"
                                  ? bountyValue
                                  : 0
                              }
                              step={0.01}
                            />
                          </Form.Item>
                          <span>{`Referral bounty ....................................................... ${bountyValue}%`}</span>
                          <p style={{ marginTop: "20px" }}>
                            {
                              "You can increase your bounty from the 1% default up to the OpenSea fee (2.5%). OpenSea rewards this amount to registered affiliates who refer your buyer."
                            }
                          </p>
                          <hr />
                          <h5>{"Fees"}</h5>
                          <p style={{ marginTop: "20px" }}>
                            {
                              "Listing Fee will be deducted at the time of listing"
                            }
                          </p>
                        </Card>
                      </SummarySection>
                    </Col>
                  </Row>
                </Form>
              ) : (
                <Result
                  icon={
                    <img
                      src={"/images/checkMark.svg"}
                      style={{ height: "100px", width: "100px" }}
                    />
                  }
                  title="Your order is listed!"
                  subTitle="Please click below to to see latest updates on your token"
                  extra={[
                    <Link
                      key={"vieTokenLink"}
                      href={`/nft/${queryParam.sellToken}?tokenId=${queryParam.tokenId}`}
                    >
                      <a>
                        <Button
                          type="primary"
                          style={{ background: "#0066ff", color: "white" }}
                          size={"large"}
                          key="1"
                        >
                          View my Token
                        </Button>
                      </a>
                    </Link>,
                    <Link key={"goHomeLink"} href={"/"}>
                      <a>
                        <Button size={"large"}>Go Home</Button>
                      </a>
                    </Link>,
                  ]}
                />
              )}
            </Content>
          )
        )}
      </Wrapper>
    </MainWrapper>
  );
}

export default SellNft;
