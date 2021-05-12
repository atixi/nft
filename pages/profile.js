import styles from '../styles/TopSellers.module.css'
import { Row, Col, Menu, Dropdown } from 'antd'
import { } from 'antd';
import { DownOutlined, UserOutlined } from '@ant-design/icons';
import { HeartTwoTone } from '@ant-design/icons';
import { Markup } from 'interweave';
import React from 'react';
import { PRODUCTS } from '/Constants/products';
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