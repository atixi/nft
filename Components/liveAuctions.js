import React from 'react';
import { PRODUCTS } from '/Constants/constants'

import Carousel from "react-elastic-carousel";

import { Menu, Dropdown } from 'antd';
import { HeartTwoTone } from '@ant-design/icons';
import Link from 'next/link';
import styled from "styled-components";
import styles from '/styles/Products.module.css'

const Button = styled.button`
    border: none;
    background: transparent;
    margin-right: 15px;
    margin-top: -5px;
`
const CardTitle = styled.div`
    font-weight: 700;
    font-size: 16px;
    color: black !important;
`
const ProductPrice = styled.span`
text-transform: uppercase;
	background: linear-gradient(to right, #009DFF 0%, #026BFF 100%);
	-webkit-background-clip: text;
	-webkit-text-fill-color: transparent;
    font-weight: bold;
`;
const BidsStatus = styled.small`
    color: #818182;
    font-weight: bold;
`

const breakPoints = [
  { width: 1, itemsToShow: 1 },
  { width: 550, itemsToShow: 2, itemsToScroll: 2 },
  { width: 768, itemsToShow: 3,itemsToScroll: 3 },
  { width: 1024, itemsToShow:4,itemsToScroll:4 },
  { width: 1200, itemsToShow: 5,itemsToScroll:5 }
];

function LiveAuctions() {
    return (
        <>
            <div >
                <div className="p-3">
                    <h3>Live Auctions</h3>
                </div>

                <Carousel breakPoints={breakPoints} pagination={false} transitionMs={1000}>
                    {PRODUCTS.map((product) => (
                    ProductCard(product)
                    ))} 
                </Carousel>
            </div>
        </>
    );
  
}

function ProductCard(product)
{
    function handleButtonClick(e) {
        message.info('Click on left button.');
        console.log('click left button', e);
    }
    function handleMenuClick(e) {
        message.info('Click on menu item.');
        console.log('click', e);
    }
    const menu = (
        <Menu onClick={handleMenuClick}>
            <Menu.Item key="1">
                <span>Purchase now</span>
            </Menu.Item>
            <Menu.Item key="2">
                <span>Place a bid</span>
            </Menu.Item>
            <Menu.Item key="3">
                <span>View on OpenSea</span>
            </Menu.Item>
            <Menu.Item key="3">
                <span>Share</span>
            </Menu.Item>
        </Menu>
    );
     return (
        <div className={`${styles.productItem} p-2 p-lg-1 mr-3`}>
            <div className={`${styles.topOfProductImage} mt-3`}>
                <div className={"pl-3"}>
                    {PRODUCTS.map(m =>
                        <img src={m.productImage} width={22} className={styles.ownImage} />
                    )}
                </div>
                <Dropdown onClick={handleButtonClick} overlay={menu} placement="bottomRight" ><Button>...</Button></Dropdown> 
            </div>
            <div className={`col-md-12 p-3`}>
                <img src={product.productImage} className="w-100 rounded" />
            </div>
            <div className={`${styles.productDescriptionDiv} pl-3`}>
            <div className={styles.countDownParent}><div className={styles.countDown}>{"043h 34m 34s left"} <HeartTwoTone className={styles.countDownIcon}/></div></div>
            <Link href={`/product-details?id=${product.id}`}><CardTitle>{product.productTitle}</CardTitle></Link>
                <BidsStatus>Highest bids</BidsStatus>
                <div className={styles.productDescriptionBottom}>
                <ProductPrice>{product.price}</ProductPrice>
                <span className={styles.wareHouse}>{" "+product.currentQTY + ' of ' + product.totalQTY}</span>
                <span className={`${styles.likeButtonContainer}`}>
                    <HeartTwoTone className={styles.likeButton} />
                    <h6 className={`${styles.placeBid} mr-3`}>{product.likes}</h6>
                </span>
            </div>
        </div>
    </div>
     )
}
export default LiveAuctions;