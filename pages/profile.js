import styles from '../styles/PartFive.module.css'
import { Row, Col } from 'antd'
import { Menu, Dropdown } from 'antd';
import { DownOutlined, UserOutlined } from '@ant-design/icons';
import { HeartTwoTone } from '@ant-design/icons';
import React from 'react';
import { PRODUCTS } from '/Constants/constants'

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
            <div >
                <div className={styles.categoriesListParent}>
                    <div className="p-3">
                        <h1>Explore</h1>
                    </div>
                    <div className={styles.categoriesListScroll}>
                        <ul className={`${styles.categoriesList} m-2`}>
                            <li>All</li>
                            <li>🌈 Art</li>
                            <li>📸 Photography</li>
                            <li>🕹 Games</li>
                            <li>👾 Metaverses</li>
                            <li>🎵 Music</li>
                            <li>🏷 Domains</li>
                            <li>💰 DeFi</li>
                            <li>🤡 Memes</li>
                            <li>🤘 Punks</li>
                            <li><svg viewBox="0 0 14 4" fill="none" width="13.200000000000001" height="13.200000000000001" xlmns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" clip-rule="evenodd" d="M3.5 2C3.5 2.82843 2.82843 3.5 2 3.5C1.17157 3.5 0.5 2.82843 0.5 2C0.5 1.17157 1.17157 0.5 2 0.5C2.82843 0.5 3.5 1.17157 3.5 2ZM8.5 2C8.5 2.82843 7.82843 3.5 7 3.5C6.17157 3.5 5.5 2.82843 5.5 2C5.5 1.17157 6.17157 0.5 7 0.5C7.82843 0.5 8.5 1.17157 8.5 2ZM11.999 3.5C12.8274 3.5 13.499 2.82843 13.499 2C13.499 1.17157 12.8274 0.5 11.999 0.5C11.1706 0.5 10.499 1.17157 10.499 2C10.499 2.82843 11.1706 3.5 11.999 3.5Z" fill="currentColor"></path></svg></li>
                        </ul>
                    </div>
                    <div className="pr-3">
                        Filter & Sort
                    </div>
                </div>

                <Row justify="space-around">

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