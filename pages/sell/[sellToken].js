import React, {useState, useEffect} from "react"
import { Switch, Input, Form, Row, Col, List, Tabs, Avatar, Result, Button, Spin } from "antd";
import Link from "next/link";
import { useQueryParam } from "/Components/hooks/useQueryParam";
import { fetchOne, fetchBundle } from "/Utils/strapiApi";
import { getAuctionPriceDetails } from "/Constants/constants";
import { convertToUsd} from "/Utils/utils";
import { MainWrapper } from "/Components/StyledComponents/globalStyledComponents";
import {Wrapper, Content} from "../../Components/StyledComponents/productDetails-styledComponents";
import {CustomTapBarElement} from "../../Components/StyledComponents/sellNft-styledComponents";
const { TabPane } = Tabs;
function SellNft()
{
    

    const  queryParam = useQueryParam();
    console.log(queryParam)
    const [asset, setAsset] = useState(null)
    const [loading, setLoading] = useState(true)
    const [notFound, setNotFound] = useState(false)
    async function loadNft()
    {
        if (queryParam.sellToken != undefined && queryParam.tokenId != undefined) {
            const data = await fetchOne(queryParam.sellToken,queryParam.tokenId);
            if(data)
              {
                setLoading(false)
              }
      
            if(data.status == 200)
            {
                console.log(data)
              const nft = data.data;
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
                numOfSales: nft.numSales
              });
           
            }
            else if(data=="error")
            {
              setNotFound(true)
            }
          }
    }
    const data = [
        {
          title: 'Nft info',
        }
      ];
      function handleIncludeEndPrice()
      {

      }
    useEffect(() => {
        if (!queryParam) {
            return null;
          }
        loadNft()
    }, [])
    return <MainWrapper>
    <Wrapper>
      {loading ? <Spin style={{marginTop: "200px"}} /> : 
      notFound
       ?  <Result
       status="500"
       title="Error!"
       subTitle="Please try again!"
       extra={[
        <Link key={"goBack"} href={"/"}><a><Button key="buy">{"Back to home"}</Button></a></Link>
       ]}
     /> : 
       asset &&  <Content>
           <Form>
            <div style={{paddingTop: "5px", borderBottom: "1px solid gray", marginBottom:"20px"}}>
            <List
                    itemLayout="horizontal"
                    // dataSource={data}
                >
                  <List.Item.Meta
                        avatar={<Avatar shape={'square'} src={asset.thumbnail} size={"large"}/>}
                        title={<strong>{asset.name}</strong>}
                        description={asset.collection?.name}
                        >
                        <div className={"border-bottom"}>
                          {
                            asset.sellOrder != null && `${getAuctionPriceDetails(asset.sellOrder).priceBase} ${asset.sellOrder.paymentTokenContract.symbol}`
                          }
                        </div>
                    </List.Item.Meta>
                    </List>
            </div>
            <Row>
                <Col lg={16} md={16}>
                        <Tabs defaultActiveKey="1" size={"large"} type={"card"}>
                        <TabPane tab={<CustomTapBarElement>
                            <div>{"Set Price"}</div>
                            <span>{"Sell at a fixed or declining price"}</span>
                        </CustomTapBarElement>} key="1" style={{ height: 200 }}>
                        <List itemLayout="horizontal" >
                            <List.Item extra={
                                <Form.Item style={{width: "300px"}}> 
                                <Input.Group compact>
                                    <Form.Item
                                    name={['price', 'blockchain']}
                                    noStyle
                                >
                                    <Input prefix={<img src={"https://storage.opensea.io/files/accae6b6fb3888cbff27a013729c22dc.svg"} width={"25"} height={"25"}/>} disabled style={{ width: '20%', textAlign:"center"}}  size={"large"} />
                                    </Form.Item>
                                    <Form.Item
                                        name={['price', 'amount']}
                                        noStyle
                                        rules={[{ required: true, message: 'Amount is required' }]}>
                                        <Input style={{ width: '65%' }}  size={"large"} placeholder="Amount" />
                                    </Form.Item>
                                </Input.Group>
                                </Form.Item>
                            }>
                                <List.Item.Meta title={"Price"} description={"set the price"}>
                                   <div>
                                   
                                   </div>
                                </List.Item.Meta>
                            </List.Item>
                            <List.Item>
                                <List.Item.Meta title={"Include Ending Price"} description={"incode enddddd"} 
                                extra={<Switch defaultChecked onChange={handleIncludeEndPrice} />}/>
                            </List.Item>                
                        </List>
                        </TabPane>
                        <TabPane tab={<CustomTapBarElement>
                            <div>{"Highest Bid"}</div>
                            <span>{"Auction to the highest bidder"}</span>
                        </CustomTapBarElement>} key="2">
                           auction
                        </TabPane>
                    
                        </Tabs>
                </Col>
                <Col lg={8} md={8}>{"final"}</Col>
            </Row>
            </Form>
        </Content>}
     </Wrapper>
     </MainWrapper>

}

export default SellNft;