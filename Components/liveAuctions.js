import React from 'react';
// import Products from '/Components/products';
import { PRODUCTS } from '/Constants/constants'

import Carousel from "react-elastic-carousel";

import styles from '/styles/Products.module.css'
import { Menu, Dropdown } from 'antd';
import { HeartTwoTone } from '@ant-design/icons';
import Link from 'next/link';
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
                {console.log(PRODUCTS)}

                <Carousel breakPoints={breakPoints} pagination={false} transitionMs={1000}>
                    {PRODUCTS.map((product) => (
                    // console.log("called");
                    Prod(product)
                    
                    ))} 
                </Carousel>
            </div>
        </>
    );
  
}
function Prod(product)
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
                Purchase now
            </Menu.Item>
            <Menu.Item key="2">
                Place a bid
            </Menu.Item>
            <Menu.Item key="3">
                View on OpenSea
            </Menu.Item>
            <Menu.Item key="3">
                Share
            </Menu.Item>
        </Menu>
    );
    console.log("productt: ",product)
     return (
        <div className={`${styles.productItem} p-2 p-lg-1`}>
                                 <div className={`${styles.topOfProductImage} mt-3`}>
                                     <div>
                                         {PRODUCTS.map(m =>
                                             <img src={m.productImage} width={22} className={styles.ownImage} />
                                         )}
                                     </div>
                                     <Dropdown.Button onClick={handleButtonClick} overlay={menu} />
                                 </div>
                                 <div className={`col-md-12 p-3`}>
                                     <img src={product.productImage} className="w-100 rounded" />
                                 </div>
                                 <div className={styles.productDescriptionDiv}>
                                     <h6><strong><Link href={`/product-details?id=${product.id}`}>{product.productTitle}</Link></strong></h6>
                                     <h6>{product.price} <span className={styles.wareHouse}>{product.currentQTY + ' of ' + product.totalQTY}</span></h6>
                                     <div className={styles.productDescriptionBottom}>
                                         <h6 className={styles.placeBid}>{product.palceMessage}</h6> <h6 className={styles.placeBid}>{product.likes} <HeartTwoTone /></h6>
                                    </div>
                             </div>
                            </div>
     )
}
export default LiveAuctions;