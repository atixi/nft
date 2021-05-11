import styles from '../styles/PartFive.module.css'
import { Row, Col } from 'antd'
import { Menu, Dropdown } from 'antd';
import { DownOutlined, UserOutlined } from '@ant-design/icons';
import { HeartTwoTone } from '@ant-design/icons';
import React from 'react';
const PRODUCTS = [
    {
        id: 1,
        productTitle: 'product one',
        productImage: '/images/products/product1.jpg',
        price: '99 ETH',
        currentQTY: 90,
        totalQTY: 100,
        likes: 100,
        palceMessage: 'Place a bid'
    },
    {
        id: 1,
        productTitle: 'product one',
        productImage: '/images/products/product1.jpg',
        price: '99 ETH',
        currentQTY: 90,
        totalQTY: 100,
        likes: 100,
        palceMessage: 'Place a bid'
    },
    {
        id: 1,
        productTitle: 'product one',
        productImage: '/images/products/product1.jpg',
        price: '99 ETH',
        currentQTY: 90,
        totalQTY: 100,
        likes: 100,
        palceMessage: 'Place a bid'
    },
    {
        id: 1,
        productTitle: 'product one',
        productImage: '/images/products/product1.jpg',
        price: '99 ETH',
        currentQTY: 90,
        totalQTY: 100,
        likes: 100,
        palceMessage: 'Place a bid'
    },
]
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
function PartFive() {
    return (
        <>
            <div className="">
                <div className={styles.categoriesListParent}>
                    <div>
                        <h1>Explore</h1>
                    </div>
                    <div className={styles.categoriesListScroll}>
                        <ul className={`${styles.categoriesList} m-2`}>
                            <li>All</li>
                            <li>Art</li>
                            <li>Photography</li>
                            <li>Games</li>
                            <li>Metaverses</li>
                            <li>Music</li>
                            <li>Music</li>
                        </ul>
                    </div>
                    <div>
                        Filter & Sort
                    </div>
                </div>

                <Row justify="space-between">

                    {PRODUCTS.map(n =>
                        <Col lg={4} md={6} sm={8} xs={24} className="p-4 p-lg-1">
                            <div className={`${styles.productItem} p-2 p-lg-1`}>
                                <div className={styles.topOfProductImage}>
                                    <div>
                                        {PRODUCTS.map(m =>
                                            <img src={m.productImage} width={22} className={styles.ownImage} />
                                        )}
                                    </div>
                                    <Dropdown.Button onClick={handleButtonClick} overlay={menu} />
                                </div>
                                <div className={`col-md-12 p-3`}>
                                    <img src={n.productImage} className="w-100 rounded" />
                                </div>
                                <div className={styles.productDescriptionDiv}>
                                    <h6><strong>{n.productTitle}</strong></h6>
                                    <h6>{n.price} <span className={styles.wareHouse}>{n.currentQTY + ' of ' + n.totalQTY}</span></h6>
                                    <div className={styles.productDescriptionBottom}>
                                        <h6 className={styles.placeBid}>{n.palceMessage}</h6> <h6 className={styles.placeBid}>{n.likes} <HeartTwoTone /></h6>
                                    </div>

                                </div>
                            </div>

                        </Col>
                    )}

                </Row>
            </div>
        </>
    );
}

export default PartFive;