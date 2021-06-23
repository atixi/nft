
import { Menu, Button as But, List, Avatar } from 'antd';
import {SwapOutlined, QuestionCircleOutlined} from "@ant-design/icons"
import styled from "styled-components";
import Link from "next/link";
import {Button} from "./StyledComponents/header-styledComponents";
const Label = styled.div`
    margin: 0px;
    padding: 0px;
    -webkit-box-align: stretch;
    align-items: stretch;
    border-width: 0px;
    border-style: solid;
    border-color: rgb(4, 4, 5);
    display: flex;
    flex-basis: auto;
    flex-direction: column;
    flex-shrink: 0;
    min-height: 0px;
    min-width: 0px;
    max-width: 100%;
    h4{
        margin-bottom: 0px !important;
        margin-top: -5px !important;
    };
    &:first-child{
        text-decoration: none;
        color: inherit;
        font-size: 17px !important;
        line-height: inherit;
        font-family: inherit;
        font-weight: inherit;
        text-overflow: ellipsis;
        white-space: nowrap;
        overflow: hidden;
        max-width: 100%;
    };
    &:last-child{
        margin: 4px 0px 0px;
        padding: 0px;
        -webkit-box-align: stretch;
        align-items: stretch;
        border-width: 0px;
        border-style: solid;
        border-color: rgb(4, 4, 5);
        display: flex;
        flex-basis: auto;
        flex-direction: column;
        flex-shrink: 0;
        min-height: 0px;
        min-width: 0px;
        max-width: 100%;
    }
`;
const AddFundsButton = styled(But)`
        margin-top: 10px;
        margin-bottom: 10px;
`
const ListTitle = styled.span`
    color: gray;
`;
const ListDescription = styled.span`
    color: black;
    span{
        color: gray;
    }
`;
const DropdownMenu = styled(Menu)`
    width: 350px;
    padding: 8px 24px;
    margin-top: 15px;
    @media (max-width: 485px)
    {
        margin-right: 10px !important;
    };
`;
const CONSTANTS = {
    setDisplay: "set display name",
    balance: "Balance",
    bidding: "Bidding",
    addFunds: "Add Funds with Visa",
    myItems: "My Items",
    editProfile: "Edit Profile",
    manageFunds: "Manage Funds",
    disconnect: "Disconnect" 
}
function ConnectedWallet(){
    let address = "0x15d25c1d4c0410514f01ee0953b3db495ccf112d";
    address = address.toString().replace(address.toString().substring(10, address.length - 10), ".....");
    return (
        <DropdownMenu>
            <Label>
                <span>{address}</span>
                <span><Link href={"#"}><a><small>{CONSTANTS.setDisplay}</small></a></Link></span>
            </Label>
        <List itemLayout="horizontal"  >
            <List.Item>
                <List.Item.Meta
                avatar={<Avatar src="" size={"large"} />}
                title={<ListTitle>{CONSTANTS.balance}</ListTitle>}
                description={<ListDescription>{"0 wETH "} <span>{"0"}</span></ListDescription>}
                />
            </List.Item>
            <List.Item extra={<Button><SwapOutlined /></Button>}>
                <List.Item.Meta
                avatar={<Avatar src="" size={"large"} />}
                title={<ListTitle>{`${CONSTANTS.bidding} ${balance}`} <QuestionCircleOutlined style={{marginLeft: "20px", marginTop: "5px", position: "absolute", color: "black !important"}} /></ListTitle>}
                description={<ListDescription>{"0 wETH "} <span>{"0"}</span></ListDescription>}
                />
            </List.Item>
           
        </List>
        <AddFundsButton block shape={"round"} size={"large"}>{CONSTANTS.addFunds}</AddFundsButton>
        <hr/>
        <Menu.Item key={"1"}><Link href={"#"}><a>{"My Items"}</a></Link></Menu.Item>
        <Menu.Item key={"2"}><Link href={"#"}><a>{"Edit Profile"}</a></Link></Menu.Item>
        <Menu.Item key={"3"}><Link href={"#"}><a>{"Manage Funds"}</a></Link></Menu.Item>
        <Menu.Item key={"4"}><Link href={"#"}><a>{"Disconnect"}</a></Link></Menu.Item>
  </DropdownMenu>
    )
}

export default ConnectedWallet;