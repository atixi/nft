import React, {useState, useEffect} from "react"
import { Dropdown, Image, Menu, Row, Col, List, Tabs, Avatar, Result, Button, Spin } from "antd";
import Link from "next/link";
import { useQueryParam } from "/Components/hooks/useQueryParam";
import { fetchOne, fetchBundle } from "/Utils/strapiApi";
import { getAuctionPriceDetails } from "/Constants/constants";
import { convertToUsd} from "/Utils/utils";
import { MainWrapper } from "/Components/StyledComponents/globalStyledComponents";
import {Wrapper, Content} from "../../Components/StyledComponents/productDetails-styledComponents";
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
                        <Tabs defaultActiveKey="1" size={"large"}>
                        <TabPane tab="Fixed" key="1" style={{ height: 200 }}>
                            fixed
                        </TabPane>
                        <TabPane tab="Auction" key="2">
                           auction
                        </TabPane>
                    
                        </Tabs>
                </Col>
                <Col lg={8} md={8}>{"final"}</Col>
            </Row>
        </Content>}
     </Wrapper>
     </MainWrapper>

}

export default SellNft;