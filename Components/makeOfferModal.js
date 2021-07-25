import React, {useState} from "react"
import {Modal, Form, Input, Select, Row, Col, Tooltip, DatePicker, TimePicker, Button, Space, Typography} from "antd"
import {FooterButton} from "./StyledComponents/productDetails-styledComponents";
import {makeOffer} from "Utils/utils";
import { useDispatch, useSelector } from "react-redux";
import { getAccountTokens, getMetaToken } from "store/action/accountSlice";
const { Option } = Select;

function MakeOfferModal({asset})
{
const tokens = useSelector(getAccountTokens)
console.log(tokens)
  console.log("asset in modal", asset)
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [timeInput, setTime] = useState(true)
    const showModal = () => {
      setIsModalVisible(true);
    };
    const handleCancel = () => {
      setIsModalVisible(false);
    };

  
      const onFinish = values => {
        console.log('Received values of form: ', values);
        console.log("make offer", makeOffer(values, asset))
      };
      
      const handleTimeChange = (e) => {
          console.log(e)
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
          </Form>
        </Modal>
    </>
}

export default MakeOfferModal;