import React, {useState, useEffect} from "react"
import {Modal, Form, Input, Select, Row, Col, message, Tooltip, DatePicker, TimePicker, Button, Space, Typography} from "antd"
import {FooterButton, ButtonContainer} from "./StyledComponents/productDetails-styledComponents";
import {makeOffer} from "Utils/utils";
import { useDispatch, useSelector } from "react-redux";
import { getAccountTokens, getWalletConnected, getMetaConnected } from "store/action/accountSlice";
const { Option } = Select;
import Link from "next/link"
import styled from "styled-components"
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
function MakeOfferModal({asset, loadAgain})
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

    const [error, setError] = useState()
      const onFinish = async values => {
        try {
          let offer = await makeOffer(values, asset, address && address)
     
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
    return <>
        <FooterButton 
            color={"#0066ff"}
            style={{ background: "#0066ff26" }}
            disabled={address && address == asset?.owner?.address ? true : false}
            onClick={showModal} >
            Make Offer
        </FooterButton>
     <Modal title="Make an Offer" visible={isModalVisible} onCancel={handleCancel}
            footer={[
            <Button key="back" onClick={handleCancel}>
                Cancel
            </Button>,
            <Button key="submit" form={"makeOffer"} htmlType={"submit"} type="primary">
                Submit
            </Button>,
            
            ]}>
                <Form name="complex-form" id={"makeOffer"} onFinish={onFinish} labelCol={{ span: 24 }} wrapperCol={{ span: 24 }}>
                <Form.Item label="Price">
                <Input.Group compact>
                    <Form.Item
                    name={['price', 'blockchain']}
                    noStyle
                >
                    <Input prefix={<img src={"https://storage.opensea.io/files/accae6b6fb3888cbff27a013729c22dc.svg"} width={"25"} height={"25"}/>} disabled suffix={"WETH"} style={{ width: '20%' }}  size={"large"} />

                    </Form.Item>
                    <Form.Item
                        name={['price', 'amount']}
                        noStyle
                        rules={[{ required: true, message: 'Amount is required' }]}>
                        <Input style={{ width: '55%' }}  size={"large"} placeholder="Amount" />
                    </Form.Item>
                    <Form.Item
                        name={['price', 'amountInDollar']}
                        noStyle
                        // rules={[{ required: true, message: 'amountInDollar is required' }]}
                        >
                        <Input style={{ width: '25%' }}  size={"large"} placeholder="$0.00" />
                </Form.Item>
                </Input.Group>
                </Form.Item>
                {/* dds */}
                <Form.Item label="Offer Expiration">
                <Input.Group compact>
                    <Form.Item
                    name={['dateTime', 'days']}
                    noStyle
                    rules={[{ required: true, message: 'Number of days is required' }]}
                >
                        <Select type={"object"} placeholder={"Days"} size={"large"} onChange={handleTimeChange} style={{width: "25%"}}>
                            <Option value="1">1 Day</Option>
                            <Option value="3">3 Days</Option>
                            <Option value="7">1 Week</Option>
                            <Option value="30">1 Month</Option>
                            <Option value="custom">Custom Date</Option>
                        </Select>
                    </Form.Item>
                    {timeInput ?
                    <Form.Item
                    name={['dateTime', 'time']}
                    noStyle
                    rules={[{ required: true, message: 'Time is required' }]}>
                        <TimePicker type={"object"} {...config} style={{ width: '75%' }}  size="large" />
                    </Form.Item>
                    :
                    <Form.Item
                    name={['dateTime', 'date']}
                    noStyle
                    rules={[{ required: true, message: 'Date is required' }]}>
                        <DatePicker showTime format="YYYY-MM-DD HH:mm:ss"
                        {...config}
                        style={{ width: '75%' }} 
                        size={"large"}
                        type={"object"}
                      /> 
                      </Form.Item>
                            
                      }
                    
                    {/* <Form.Item
                        name={['time', 'streett']}
                        noStyle
                        rules={[{ required: true, message: 'Street is required' }]}>
                        <Input prefix="$" style={{ width: '25%' }}  size={"large"} placeholder="Input street" />
                </Form.Item> */}
                </Input.Group>
                </Form.Item>
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

export default MakeOfferModal;