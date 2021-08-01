import React, {useState, useEffect} from "react"
import {Modal, Form, List, Avatar, Checkbox, message, Button} from "antd"
import {FooterButton, AvatarContainer} from "./StyledComponents/productDetails-styledComponents";
import {buyOrder, checkName} from "Utils/utils";
import { useDispatch, useSelector } from "react-redux";
import { getAccountTokens, getWalletConnected, getMetaConnected } from "store/action/accountSlice";
import Link from "next/link"
import styled from "styled-components"
import { getAuctionPriceDetails } from "/Constants/constants";
const ConnectButton = styled.button`
margin: auto;
width: 200px;
line-height: 12px;
font-weight: 600;
border-radius: 25px;
border: 1px solid rgba(4, 4, 5, 0.1);
background-color: ${(props) => props.background} !important;
color: ${(props) => props.color} !important;
margin-bottom: ${(props) => props.marginBottom ? props.marginBottom : ""};
font-size: 0.98rem !important;
padding: 13px 20px;
`;
const ModalContainer = styled.div`
  display: flex;
  flex-direction: column;
  text-align: center;
`;
const ModalTextContainer = styled.p`
  text-align: center;
`
const SubmitButton = styled(Button)`
margin: auto;
width: 200px;
line-height: 12px;
font-weight: 600;
border-radius: 25px;
border: 1px solid rgba(4, 4, 5, 0.1);
background-color: ${(props) => props.background} !important;
color: ${(props) => props.color} !important;
margin-bottom: ${(props) => props.marginBottom ? props.marginBottom : ""};
font-size: 0.98rem !important;
padding: 13px 20px;
`
function BuyNftModal({asset, loadAgain})
{
const isWalletConnected = useSelector(getWalletConnected)
const isMetaConnected = useSelector(getMetaConnected)
const tokenAddresses = useSelector(getAccountTokens)
const [step, setStep] = useState(true)
const [buying, setBuying] = useState(false)
let address=null;
  if(isWalletConnected)
  {
    address = tokenAddresses.walletToken[0].toString();
  }
  else if(isMetaConnected)
  {
    address = tokenAddresses.metaToken[0].toString();
  }
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [notConnected, setNotConnected] = useState(false);
    const [timeInput, setTime] = useState(true)
    const [responseMessage, setResponseMessage] = useState([""])
    const showModal = () => {
      (isWalletConnected || isMetaConnected) ?  
      setIsModalVisible(true) : setNotConnected(true)
    };
    const handleCancel = () => {
      setStep(true)
      setIsModalVisible(false);
      setNotConnected(false)
    };

      const onFinish = async values => {
        try {
          setBuying(true)
          let buy = await buyOrder(asset, address && address)
     
          setIsModalVisible(false)
          loadAgain(true)
          message.success('You bought this token');
        }
        catch(e)
        {
          setBuying(false)
          setResponseMessage(e.toString())
        }
      };
      
      const handleTimeChange = (e) => {
          if(e == 'custom')
            setTime(false)
          else
          setTime(true)
      }
      const config = {
        rules: [
          {
            type: 'object',
            required: true,
          },
        ],
      };
      const data = [
        {
          title: 'Ant Design Title 1',
        }
      ];
    return <>
        <FooterButton
                color={"#ffffff"}
                style={{ background: "#0066ff" }}
                onClick={showModal} 
                // disabled={address && address == asset?.owner?.address ? true : false}
                  >
                  Buy
                </FooterButton>
        <Modal title="Buy this token " visible={isModalVisible} onCancel={handleCancel}
            footer={false}>
              {step ? showInfo(asset) : buy()}
        </Modal>
         <Modal title={<strong>{"You are not connect to any wallet!"}</strong>} footer={false} visible={notConnected} onCancel={handleCancel}>
           <ModalContainer>
             <ModalTextContainer>{"You need to connect your Ethereum wallet to sign messages and send transactions to Ethereum blockchain"}</ModalTextContainer>
           <Link style={{textAlign: "center"}} href="/wallet" passHref><a><ConnectButton color={"white"} background={"#0066ff"} marginBottom={"15px"} > Connect Wallet </ConnectButton></a></Link>
           {/* <ConnectButton color={"black"} background={"white"} > Create Wallet </ConnectButton> */}
           </ModalContainer>
         </Modal>
    </>

function showInfo(asset)
{
  const data = [
    {
      title: 'Information of Token',
    }
  ];
  function onChange(e) {
    setStep(false)
  }
  return <> <List
                    itemLayout="horizontal"
                    dataSource={data}
                >
                  <List.Item.Meta
                        avatar={<Avatar shape={'square'} src={asset.thumbnail} size={64}/>}
                        title={<strong>{asset.name}</strong>}
                        description={asset.collection?.name}
                        >
                        <div>
                          {
                            asset.sellOrder != null && `${getAuctionPriceDetails(asset.sellOrder).priceBase} ${asset.sellOrder.paymentTokenContract.symbol}`
                          }
                        </div>
                    </List.Item.Meta>
                  <List.Item extra={
                    // checkName(asset.owner?.user)
                    <Link
                    href={{
                      pathname: "/profile/talent",
                      query: {
                        address: asset?.owner?.address,
                        talent: checkName(asset?.owner?.user?.username),
                        avatar: asset?.owner?.profile_img_url,
                      },
                    }}
                    passHref
                  >
                    <a>
                      <AvatarContainer>
                        <Avatar
                          size={"small"}
                          icon={
                            <img src={asset?.owner?.profile_img_url} />
                          }
                        />
                        <span style={{ flex: "1" }}>
                          {checkName(asset?.owner?.user?.username)}
                        </span>
                      </AvatarContainer>
                    </a>
                  </Link>
                    }>
                      {<span>{"Owner"}</span>}
                    </List.Item>
                    <List.Item extra={asset?.numOfSales}>
                      {<span>{"Number of sale"}</span>}
                    </List.Item>
                    {/* <List.Item extra={asset?.numOfSales}>
                      {<span>{"Your balance"}</span>}
                    </List.Item> */}
                    <List.Item>
                    <Checkbox onChange={onChange}>Accept the terms and policy</Checkbox>
                    </List.Item>
                </List>
                </>
}
function buy()
{
  return <>   <Form name="complex-form" id={"makeOffer"} onFinish={onFinish} labelCol={{ span: 24 }} wrapperCol={{ span: 24 }}>
  <List
      itemLayout="horizontal"
      dataSource={data}
      renderItem={item => (
      <List.Item>
          <List.Item.Meta
          avatar={<Avatar shape={'square'} src={asset.thumbnail} size={64}/>}
          title={<Link href={`/collection/${asset?.collection?.slug}`}><a>{asset?.collection.name}</a></Link>}
          description={asset.name}
          />
          <div>
            {
              asset.sellOrder &&  `${getAuctionPriceDetails(asset.sellOrder).priceBase} ${asset.sellOrder.paymentTokenContract.symbol}`
            }
          </div>
      </List.Item>
      )}
  />
  <Form.Item><span style={{color: "red"}}>{responseMessage}</span></Form.Item>
      <div style={{textAlign: "center"}}>
           <ConnectButton color={"black"} style={{margin: "5px"}} type={"button"} onClick={handleCancel} background={"white"} marginBottom={"15px"} > Cancel </ConnectButton>
              <SubmitButton key="submit" size={"large"} loading={buying} color={"white"} marginBottom={"15px"} background={"#0066ff"} form={"makeOffer"} htmlType={"submit"} type="primary">
                  Buy
              </SubmitButton> 
                </div>
</Form>
  </>
}
}

export default BuyNftModal;