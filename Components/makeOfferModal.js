import {
  Avatar,
  Button,
  Checkbox,
  DatePicker,
  Form,
  Input,
  List,
  Modal,
  Select,
  TimePicker,
  message,
} from "antd";
import {
  AvatarContainer,
  FooterButton,
} from "./StyledComponents/productDetails-styledComponents";
import React, { useEffect, useState } from "react";
import { checkName, makeOffer, signTransaction } from "Utils/utils";
import {
  getAccountTokens,
  getDisplayWalletModal,
  getMetaConnected,
  getWalletConnected,
  setDisplayWalletModal,
} from "store/action/accountSlice";
import { useDispatch, useSelector } from "react-redux";

import ConnectWalletModal from "./commons/connectWalletModal";
import Link from "next/link";
import { getAuctionPriceDetails } from "/Constants/constants";
import styled from "styled-components";

const { Option } = Select;

const SubmitButton = styled(Button)`
  margin: auto;
  width: 200px;
  line-height: 12px;
  font-weight: 600;
  border-radius: 25px;
  border: 1px solid rgba(4, 4, 5, 0.1);
  background-color: ${(props) => props.background} !important;
  color: ${(props) => props.color} !important;
  margin-bottom: ${(props) => (props.marginBottom ? props.marginBottom : "")};
  font-size: 0.98rem !important;
  padding: 13px 20px;
`;
const ConnectButton = styled.button`
  margin: auto;
  width: 200px;
  line-height: 12px;
  font-weight: 600;
  border-radius: 25px;
  border: 1px solid rgba(4, 4, 5, 0.1);
  background-color: ${(props) => props.background} !important;
  color: ${(props) => props.color} !important;
  margin-bottom: ${(props) => (props.marginBottom ? props.marginBottom : "")};
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
`;
function MakeOfferModal({ asset, assets, isBundle, loadAgain }) {
  const isWalletConnected = useSelector(getWalletConnected);
  const isMetaConnected = useSelector(getMetaConnected);
  const tokenAddresses = useSelector(getAccountTokens);
  const [address, setAddress] = useState(null);
  const [balance, setBalance] = useState(null);

  const [isModalVisible, setIsModalVisible] = useState(false);
  const [notConnected, setNotConnected] = useState(false);
  const [timeInput, setTime] = useState(true);
  const [responseMessage, setResponseMessage] = useState([""]);
  const [step, setStep] = useState(false);
  const [makingOffer, setMakingOffer] = useState(false);
  const dispatch = useDispatch();
  const isDisplayWalletModal = useSelector(getDisplayWalletModal);
  const showModal = () => {
    console.log("calling show modal");
    isWalletConnected || isMetaConnected
      ? setIsModalVisible(true)
      : setNotConnected(true);
  };
  const handleCancel = () => {
    setIsModalVisible(false);
    setResponseMessage("");
    setStep(false);
    setMakingOffer(false);
    setNotConnected(false);
  };

  const [error, setError] = useState();
  const onFinish = async (values) => {
    const enableAccount = await ethereum.enable();
    if (enableAccount) {
      if (enableAccount.length > 0) {
        const offerSign = await signTransaction(
          enableAccount[0],
          "Making offer",
          asset
        );
        if (offerSign.success) {
          setResponseMessage("");
          setMakingOffer(true);
          let offerResult = await makeOffer(
            values,
            asset,
            isBundle,
            assets,
            address && address
          );

          if (offerResult.success) {
            setMakingOffer(false);
            setIsModalVisible(false);
            loadAgain(true);
            message.success("Offer is saved");
          } else {
            setIsModalVisible(true);
            setMakingOffer(false);
            setResponseMessage(offerResult.message);
          }
        }
      }
    }
  };

  const handleTimeChange = (e) => {
    if (e == "custom") setTime(false);
    else setTime(true);
  };
  const config = {
    rules: [
      {
        type: "object",
        required: true,
      },
    ],
  };
  useEffect(() => {
    if (isWalletConnected) {
      setAddress(tokenAddresses.walletToken[0].toString());
      setBalance(tokenAddresses.walletBalance);
    } else if (isMetaConnected) {
      setAddress(tokenAddresses.metaToken[0].toString());
      setBalance(tokenAddresses.metaBalance);
    }
  }, [asset, assets]);
  return (
    <>
      <FooterButton
        color={"#0066ff"}
        style={{ background: "#0066ff26" }}
        disabled={address && address == asset?.owner?.address ? true : false}
        onClick={showModal}
      >
        Make Offer
      </FooterButton>
      {isModalVisible && (
        <Modal
          title="Make an Offer"
          visible={isModalVisible}
          onCancel={handleCancel}
          footer={false}
        >
          {step ? offer() : showInfo(asset)}
        </Modal>
      )}
      {/* <ConnectWalletModal displayModal={isDisplayWalletModal} /> */}
      {/* {!isMetaConnected && <ConnectWalletModal />} */}
      {/* <Modal title={<strong>{"You are not connect to any wallet!"}</strong>} footer={false} visible={notConnected} onCancel={handleCancel}>
           <ModalContainer>
             <ModalTextContainer>{"You need to connect your Ethereum wallet to sign messages and send transactions to Ethereum blockchain"}</ModalTextContainer>
           <Link style={{textAlign: "center"}} href="/wallet" passHref><a><ConnectButton color={"white"} background={"#0066ff"} marginBottom={"15px"} > Connect Wallet </ConnectButton></a></Link>
           </ModalContainer>
         </Modal> */}
    </>
  );

  function showInfo(asset) {
    const data = [
      {
        title: "Ant Design Title 1",
      },
    ];
    function onChange(e) {
      setStep(true);
    }
    return (
      <>
        {" "}
        <List itemLayout="horizontal" dataSource={data}>
          <List.Item.Meta
            avatar={<Avatar shape={"square"} src={asset.thumbnail} size={64} />}
            title={<strong>{asset.name}</strong>}
            description={asset.collection?.name}
          >
            <div>
              {asset.sellOrder != null &&
                `${getAuctionPriceDetails(asset.sellOrder).priceBase} ${
                  asset.sellOrder.paymentTokenContract.symbol
                }`}
            </div>
          </List.Item.Meta>
          <List.Item
            extra={
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
                      icon={<img src={asset?.owner?.profile_img_url} />}
                    />
                    <span style={{ flex: "1" }}>
                      {checkName(asset?.owner?.user?.username)}
                    </span>
                  </AvatarContainer>
                </a>
              </Link>
            }
          >
            {<span>{"Owner"}</span>}
          </List.Item>
          <List.Item extra={asset?.numOfSales}>
            {<span>{"Number of sale"}</span>}
          </List.Item>
          <List.Item extra={`${parseFloat(balance).toFixed(4)} ETH`}>
            {<span>{"Your balance"}</span>}
          </List.Item>
          <List.Item>
            <Checkbox onChange={onChange}>
              Accept the {<a href={"/docs/terms.pdf"}>Terms</a>} and{" "}
              {<a href={"/docs/privacy.pdf"}>Privacy policy</a>}
            </Checkbox>
          </List.Item>
        </List>
      </>
    );
  }
  function offer() {
    return (
      <Form
        name="complex-form"
        id={"makeOffer"}
        onFinish={onFinish}
        labelCol={{ span: 24 }}
        wrapperCol={{ span: 24 }}
      >
        <Form.Item label="Price">
          <Input.Group compact>
            <Form.Item name={["price", "blockchain"]} noStyle>
              <Input
                prefix={
                  <img
                    src={
                      "https://storage.opensea.io/files/accae6b6fb3888cbff27a013729c22dc.svg"
                    }
                    width={"25"}
                    height={"25"}
                  />
                }
                disabled
                suffix={"WETH"}
                style={{ width: "20%" }}
                size={"large"}
              />
            </Form.Item>
            <Form.Item
              name={["price", "amount"]}
              noStyle
              rules={[{ required: true, message: "Amount is required" }]}
            >
              <Input
                style={{ width: "55%" }}
                size={"large"}
                placeholder="Amount"
              />
            </Form.Item>
            <Form.Item
              name={["price", "amountInDollar"]}
              noStyle
              // rules={[{ required: true, message: 'amountInDollar is required' }]}
            >
              <Input
                style={{ width: "25%" }}
                size={"large"}
                placeholder="$0.00"
              />
            </Form.Item>
          </Input.Group>
        </Form.Item>
        {/* dds */}
        {isBundle && (
          <Form.Item label="Offer Expiration">
            <Input.Group compact>
              <Form.Item
                name={["dateTime", "days"]}
                noStyle
                rules={[
                  { required: true, message: "Number of days is required" },
                ]}
              >
                <Select
                  type={"object"}
                  placeholder={"Days"}
                  size={"large"}
                  onChange={handleTimeChange}
                  style={{ width: "25%" }}
                >
                  <Option value="1">1 Day</Option>
                  <Option value="3">3 Days</Option>
                  <Option value="7">1 Week</Option>
                  <Option value="30">1 Month</Option>
                  <Option value="custom">Custom Date</Option>
                </Select>
              </Form.Item>
              {timeInput ? (
                <Form.Item
                  name={["dateTime", "time"]}
                  noStyle
                  rules={[{ required: true, message: "Time is required" }]}
                >
                  <TimePicker
                    type={"object"}
                    allowClear={false}
                    {...config}
                    style={{ width: "75%" }}
                    size="large"
                  />
                </Form.Item>
              ) : (
                <Form.Item
                  name={["dateTime", "date"]}
                  noStyle
                  rules={[{ required: true, message: "Date is required" }]}
                >
                  <DatePicker
                    showTime
                    allowClear={false}
                    format="YYYY-MM-DD HH:mm:ss"
                    {...config}
                    style={{ width: "75%" }}
                    size={"large"}
                    type={"object"}
                  />
                </Form.Item>
              )}
            </Input.Group>
          </Form.Item>
        )}
        <Form.Item>
          <span style={{ color: "red" }}>{responseMessage}</span>
        </Form.Item>
        <div style={{ textAlign: "center" }}>
          <ConnectButton
            color={"black"}
            style={{ margin: "5px" }}
            onClick={handleCancel}
            background={"white"}
            marginBottom={"15px"}
          >
            {" "}
            Cancel{" "}
          </ConnectButton>
          {/* <ConnectButton type={"submit"} color={"white"} background={"#0066ff"} marginBottom={"15px"} > Send Offer </ConnectButton> */}

          {/* <Button key="back" onClick={handleCancel}>
                Cancel
              </Button> */}
          <SubmitButton
            key="submit"
            size={"large"}
            loading={makingOffer}
            color={"white"}
            marginBottom={"15px"}
            background={"#0066ff"}
            form={"makeOffer"}
            htmlType={"submit"}
            type="primary"
          >
            Send Offer
          </SubmitButton>
        </div>
      </Form>
    );
  }
}
export default MakeOfferModal;
