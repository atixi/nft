import styles from '/styles/TopSellers.module.css'
import { Row, Col } from 'antd'
import Link from 'next/Link'
import React from 'react';
import { SELLERS } from '/Constants/constants'
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
                    <h3>Top Sellers in 1 Day</h3>
                </div>

                <Row justify="space-between" className={styles.topSells}>
                    {SELLERS.map((n, i) =>
                        <Col md={5} sm={6} xs={14}>
                            <Row className={`${styles.topItem} p-2 p-lg-1`}>
                                <Col md={1} sm={1} xs={1}>
                                    {n.id}
                                </Col>
                                <Col className={styles.topItemImage} md={5} sm={6} xs={7}>
                                    <img src={n.productImage} />
                                </Col>
                                <Col md={18} sm={17} xs={16}>
                                    <Link href='/profile/[id]' as={`/profile/${n.id}`} >{n.productTitle}</Link>
                                    <br />
                                    <span>3 ETH</span>
                                </Col>
                            </Row>
                            <Row className={`${styles.topItem} p-2 p-lg-1`}>
                                <Col md={1} sm={1} xs={1}>
                                    {n.id}
                                </Col>
                                <Col className={styles.topItemImage} md={5} sm={6} xs={7}>
                                    <img src={n.productImage} />
                                </Col>
                                <Col md={18} sm={17} xs={16}>
                                    <Link href='/profile/[id]' as={`/profile/${n.id}`} >{n.productTitle}</Link>
                                    <br />
                                    <span>3 ETH</span>
                                </Col>
                            </Row>
                            <Row className={`${styles.topItem} p-2 p-lg-1`}>
                                <Col md={1} sm={1} xs={1}>
                                    {n.id}
                                </Col>
                                <Col className={styles.topItemImage} md={5} sm={6} xs={7}>
                                    <img src={n.productImage} />
                                </Col>
                                <Col md={18} sm={17} xs={16}>
                                    <Link href='/profile/[id]' as={`/profile/${n.id}`} >{n.productTitle}</Link>
                                    <br />
                                    <span>3 ETH</span>
                                </Col>
                            </Row>

                            {check(i)}
                        </Col>
                    )}

                </Row>
            </div>
        </>
    );
}

export default TopSellers;