import React, {useState, useEffect} from "react"
import { Switch, Input, Form, Row, Col, List, DatePicker, Tabs, Avatar, Result, Button, Spin } from "antd";
import Link from "next/link";
import { useQueryParam } from "/Components/hooks/useQueryParam";
import { fetchOne, fetchBundle } from "/Utils/strapiApi";
import { getAuctionPriceDetails } from "/Constants/constants";
import { convertToUsd} from "/Utils/utils";
import { MainWrapper } from "/Components/StyledComponents/globalStyledComponents";
import {Wrapper, Content} from "../../Components/StyledComponents/productDetails-styledComponents";
import {CustomTapBarElement, SwitchContainer, ListTile, ListDescription} from "../../Components/StyledComponents/sellNft-styledComponents";
const { TabPane } = Tabs;
function SellNft()
{
    
    const  queryParam = useQueryParam();
    console.log(queryParam)
    const [asset, setAsset] = useState(null)
    const [loading, setLoading] = useState(true)
    const [notFound, setNotFound] = useState(false)
    const [futureTime, setFutureTime] = useState(false)
    const [formText, setFormText] = useState({
      price: "Price",
      priceDesc: "Will be on sale until you transfer this item or cancel it",
      includeEnding: "Include ending price",
      includeEndingDesc: "Adding an ending price will allow this listing to expire, or for the price to be reduced until a buyer is found.",
    });
    const [endingPrice, setEndingPrice] = useState(false)
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
      function handleIncludeEndPrice(checked)
      {
        
        if(checked) 
          {
            setFormText({...formText, price: "Starting Price", priceDesc: "Set an initial price", includeEndingDesc:""}) 
            setEndingPrice(true)
          }
          else
          {
            setFormText({...formText, 
              price: "Price",
              priceDesc: "Will be on sale until you transfer this item or cancel it",
              includeEnding: "Include ending price",
              includeEndingDesc: "Adding an ending price will allow this listing to expire, or for the price to be reduced until a buyer is found.",
            })
            setEndingPrice(false)
          }  
        
      }
      function handleFutureListing(checked)
      {
        if(checked)
        {
          setFutureTime(true)
        }
        else
        {
          setFutureTime(false)
        }
      }
      const config = {
        rules: [
          {
            type: 'object',
            required: true,
          },
        ],
      };
    useEffect(() => {
        if (!queryParam) {
            return null;
          }
        loadNft()
    }, [queryParam])
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
                        <Tabs defaultActiveKey="1" tabBarGutter={10} style={{height: "1000px"}} size={"large"} type={"card"}>
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
                                <List.Item.Meta title={<ListTile>{formText.price}</ListTile>} description={<ListDescription>{formText.priceDesc}</ListDescription>}>
                                   <div>
                                   
                                   </div>
                                </List.Item.Meta>
                            </List.Item>
                            <List.Item extra={<SwitchContainer><Switch onChange={handleIncludeEndPrice} /></SwitchContainer>}>
                                <List.Item.Meta title={<ListTile>{formText.includeEnding}</ListTile>} description={<ListDescription>{formText.includeEndingDesc}</ListDescription>}>
                                </List.Item.Meta>
                            </List.Item> 
                            {endingPrice ? <><List.Item extra={
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
                                <List.Item.Meta title={<ListTile>{"Ending Price"}</ListTile>} description={<ListDescription>{"Must be less than or equal to the starting price. The price will progress linearly to this amount until the expiration date."}</ListDescription>}/>
                            </List.Item>
                            <List.Item extra={ <DatePicker style={{position: "relative", right:"45px"}} showTime allowClear={false} format="YYYY-MM-DD HH:mm:ss" {...config} size={"large"} /> }>
                              <List.Item.Meta title={<ListTile>{"Expiration Time"}</ListTile>} description={<ListDescription>{"Your listing will automatically end at this time. No need to cancel it!"}</ListDescription>} />
                            </List.Item>
                            
                            </>:
                            <List.Item extra={
                              <>
                              {futureTime && <DatePicker style={{position: "relative", right:"15px"}} showTime allowClear={false} format="YYYY-MM-DD HH:mm:ss" {...config} size={"large"} /> }
                              <SwitchContainer><Switch onChange={handleFutureListing}/></SwitchContainer>
                            
                              </>

                            }>
                              <List.Item.Meta title={<ListTile>{"Schedule for a future time"}</ListTile>} description={<ListDescription>{"You can schedule this listing to only be buyable at a future date"}</ListDescription>} />
                            </List.Item>
                            }           
                        </List>
                        </TabPane>
                        <TabPane tab={<CustomTapBarElement>
                            <div>{"Highest Bid"}</div>
                            <span>{"Auction to the highest bidder"}</span>
                        </CustomTapBarElement>} key="2">
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
                                <List.Item.Meta title={<ListTile>{"Minimum Bid"}</ListTile>} description={<ListDescription>{"Set your starting bid price"}</ListDescription>}>
                                   <div>
                                   
                                   </div>
                                </List.Item.Meta>
                            </List.Item>
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
                                <List.Item.Meta title={<ListTile>{"Reserve Price"}</ListTile>} description={<ListDescription>{"Create a hidden limit by setting a reserve price."}</ListDescription>}>
                                   <div>
                                   
                                   </div>
                                </List.Item.Meta>
                            </List.Item>
                                <List.Item extra={ <Form.Item><DatePicker style={{position: "relative", right:"45px"}} showTime allowClear={false} format="YYYY-MM-DD HH:mm:ss" {...config} size={"large"} /></Form.Item> }>
                              <List.Item.Meta title={<ListTile>{"Expiration Time"}</ListTile>} description={<ListDescription>{"Your listing will automatically end at this time. No need to cancel it!"}</ListDescription>} />
                            </List.Item>
                            </List>
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