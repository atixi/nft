import styles from '../styles/HotCollections.module.css'
import { Row, Col } from 'antd'
import { Menu, Dropdown } from 'antd';
import { DownOutlined, UserOutlined } from '@ant-design/icons';
import { HeartTwoTone } from '@ant-design/icons';
import Item from "./Item";
import React from 'react';
import Carousel from 'react-elastic-carousel'

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

function HotCollections() {
    const [items, setItems] = useState([1, 2, 3, 4, 5, 6, 7, 8]);
    return (
        <>
            <div className="">
                <Carousel itemsToShow={4}>
                    {items.map((item) => (
                        <Item key={item}>{item}</Item>
                    ))}
                </Carousel>

            </div>
        </>
    );
}

export default HotCollections;