import React, {useState, useEffect} from "react"
import {Modal, Form,Select, List, Avatar, message, Tooltip, DatePicker, TimePicker, Button, Space, Typography} from "antd"
import {FooterButton, ButtonContainer} from "./StyledComponents/productDetails-styledComponents";
import {makeOffer, buyOrder} from "Utils/utils";
import { useDispatch, useSelector } from "react-redux";
import { getAccountTokens, getWalletConnected, getMetaConnected } from "store/action/accountSlice";
const { Option } = Select;
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
function BuyNftModal({asset, ad, loadAgain})
{
const isWalletConnected = useSelector(getWalletConnected)
const isMetaConnected = useSelector(getMetaConnected)
const tokenAddresses = useSelector(getAccountTokens)
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
      setIsModalVisible(false);
      setNotConnected(false)
    };

      const onFinish = async values => {
        try {
          let buy = await buyOrder(asset, address && address)
     
          setIsModalVisible(false)
          loadAgain(true)
          message.success('Offer is saved');
        }
        catch(e)
        {
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
        <Modal title="Make an Offer" visible={isModalVisible} onCancel={handleCancel}
            footer={[
            <Button key="back" onClick={handleCancel}>
                Cancel
            </Button>,
            <Button key="submit" form={"makeOffer"} htmlType={"submit"} type="primary">
                Buy
            </Button>,
            
            ]}>
                <Form name="complex-form" id={"makeOffer"} onFinish={onFinish} labelCol={{ span: 24 }} wrapperCol={{ span: 24 }}>
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
                             `${getAuctionPriceDetails(asset.sellOrder && asset.sellOrder).priceBase} ${asset.sellOrder.paymentTokenContract.symbol}`
                          }
                        </div>
                    </List.Item>
                    )}
                />
                <Form.Item><span style={{color: "red"}}>{responseMessage}</span></Form.Item>
          </Form>
        </Modal>
         <Modal title={<strong>{"You are not connect to any wallet!"}</strong>} footer={false} visible={notConnected} onCancel={handleCancel}>
           <ModalContainer>
             <ModalTextContainer>{"You need to connect your Ethereum wallet to sign messages and send transactions to Ethereum blockchain"}</ModalTextContainer>
           <Link style={{textAlign: "center"}} href="/wallet" passHref><a><ConnectButton color={"white"} background={"#0066ff"} marginBottom={"15px"} > Connect Wallet </ConnectButton></a></Link>
           {/* <ConnectButton color={"black"} background={"white"} > Create Wallet </ConnectButton> */}
           </ModalContainer>
         </Modal>
    </>
}

export default BuyNftModal;