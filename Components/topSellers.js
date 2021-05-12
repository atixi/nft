import styles from '../styles/TopSellers.module.css'
import { Row, Col, Menu, Dropdown } from 'antd'
import { } from 'antd';
import { DownOutlined, UserOutlined } from '@ant-design/icons';
import { HeartTwoTone } from '@ant-design/icons';
import { Markup } from 'interweave';
import React from 'react';
const PRODUCTS = [
    {
        id: 1,
        productTitle: 'product one',
        productImage: '/images/tops/image.png',
        price: '99 ETH',
        currentQTY: 90,
        totalQTY: 100,
        likes: 100,
        palceMessage: 'Place a bid'
    },
    {
        id: 2,
        productTitle: 'product one',
        productImage: '/images/tops/image-2.png',
        price: '99 ETH',
        currentQTY: 90,
        totalQTY: 100,
        likes: 100,
        palceMessage: 'Place a bid'
    },
    {
        id: 3,
        productTitle: 'product one',
        productImage: '/images/tops/image-3.png',
        price: '99 ETH',
        currentQTY: 90,
        totalQTY: 100,
        likes: 100,
        palceMessage: 'Place a bid'
    },
    {
        id: 4,
        productTitle: 'product one',
        productImage: '/images/tops/image-4.jpg',
        price: '99 ETH',
        currentQTY: 90,
        totalQTY: 100,
        likes: 100,
        palceMessage: 'Place a bid'
    },
    {
        id: 5,
        productTitle: 'product one',
        productImage: '/images/tops/image-5.png',
        price: '99 ETH',
        currentQTY: 90,
        totalQTY: 100,
        likes: 100,
        palceMessage: 'Place a bid'
    },
    {
        id: 6,
        productTitle: 'product one',
        productImage: '/images/tops/image-6.jpg',
        price: '99 ETH',
        currentQTY: 90,
        totalQTY: 100,
        likes: 100,
        palceMessage: 'Place a bid'
    },
    {
        id: 7,
        productTitle: 'product one',
        productImage: '/images/tops/image-7.png',
        price: '99 ETH',
        currentQTY: 90,
        totalQTY: 100,
        likes: 100,
        palceMessage: 'Place a bid'
    },
    {
        id: 8,
        productTitle: 'product one',
        productImage: '/images/tops/image-8.png',
        price: '99 ETH',
        currentQTY: 90,
        totalQTY: 100,
        likes: 100,
        palceMessage: 'Place a bid'
    },
    {
        id: 9,
        productTitle: 'product one',
        productImage: '/images/tops/image-9.jpg',
        price: '99 ETH',
        currentQTY: 90,
        totalQTY: 100,
        likes: 100,
        palceMessage: 'Place a bid'
    },
    {
        id: 1,
        productTitle: 'product one',
        productImage: '/images/tops/image-4.jpg',
        price: '99 ETH',
        currentQTY: 90,
        totalQTY: 100,
        likes: 100,
        palceMessage: 'Place a bid'
    },
    {
        id: 1,
        productTitle: 'product one',
        productImage: '/images/tops/image-4.jpg',
        price: '99 ETH',
        currentQTY: 90,
        totalQTY: 100,
        likes: 100,
        palceMessage: 'Place a bid'
    },
    {
        id: 1,
        productTitle: 'product one',
        productImage: '/images/tops/image-4.jpg',
        price: '99 ETH',
        currentQTY: 90,
        totalQTY: 100,
        likes: 100,
        palceMessage: 'Place a bid'
    },
    {
        id: 1,
        productTitle: 'product one',
        productImage: '/images/tops/image-4.jpg',
        price: '99 ETH',
        currentQTY: 90,
        totalQTY: 100,
        likes: 100,
        palceMessage: 'Place a bid'
    },
    {
        id: 1,
        productTitle: 'product one',
        productImage: '/images/tops/image-4.jpg',
        price: '99 ETH',
        currentQTY: 90,
        totalQTY: 100,
        likes: 100,
        palceMessage: 'Place a bid'
    },
    {
        id: 1,
        productTitle: 'product one',
        productImage: '/images/tops/image-4.jpg',
        price: '99 ETH',
        currentQTY: 90,
        totalQTY: 100,
        likes: 100,
        palceMessage: 'Place a bid'
    },
]
const breackCol = '<Col /> asdfsdf'
//<Markup content={breackCol} />
const check = (i) => {
    i++;
    if ((i / 5) === 0) {
        //return <h1>asdf</h1>
        console.log("some thing" + i)
    }



}
function TopSellers() {
    return (
        <>
            <div className="">
                <div className="p-3">
                    <h1>Top Sellers</h1>
                </div>

                <Row justify="space-between" className={styles.topSells}>

                    {PRODUCTS.map((n, i) =>
                        <Col>
                            <div className={`${styles.topItem} p-2 p-lg-1`}>
                                <div>{n.id}</div>
                                <div className={styles.topItemImage}><img src={n.productImage} /></div>
                                <div>{n.productTitle} <span>nll</span></div>
                            </div>
                            {check(i)}
                        </Col>
                    )}

                </Row>
            </div>
        </>
    );
}

export default TopSellers;