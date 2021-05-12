import profileStyles from '/styles/profile.module.css'
import styles from '/styles/PartFive.module.css'
import { Row, Col } from 'antd'
import { Menu, Dropdown, Tabs } from 'antd';
import { DownOutlined, UserOutlined } from '@ant-design/icons';
import { HeartTwoTone, CopyOutlined } from '@ant-design/icons';
import React from 'react';
import { PRODUCTS } from '/Constants/constants'
import Header from '/Components/header';
const { TabPane } = Tabs;
function callback(key) {
    console.log(key);
}
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
function Profile() {

    return (
        <>
            <Header />
            <div>
                <div className={profileStyles.profile}>
                    <div className={profileStyles.cover}>
                        <img src='./images/profile/profile.png' />
                    </div>
                    <div className={profileStyles.bio}>
                        <div className={profileStyles.avatar}>
                            <img alt="Identicon" src='./images/profile/profile.png' loading="lazy" className="sc-eirseW evgNzS" />
                        </div>
                        <div className={profileStyles.bioDescription} >
                            <h3>People are the pillars of the...</h3>
                            <h6>kasdfkaUksdLWD...745343 <CopyOutlined /></h6>
                            <span>Years are passing by and, slowly but surely, the complete picture of the puzzle that was imagined by a few visionaries becomes clearer and clearer... </span>
                            <button type="button" className={profileStyles.otherLinks}><svg viewBox="0 0 15 16" fill="none" width="13.200000000000001" height="13.200000000000001" xlmns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" clip-rule="evenodd" d="M11.7086 5.2928L7.00146 0.585693L2.29436 5.2928C1.90383 5.68332 1.90383 6.31649 2.29436 6.70701C2.68488 7.09754 3.31805 7.09754 3.70857 6.70701L6.00146 4.41412V11C6.00146 11.5523 6.44918 12 7.00146 12C7.55375 12 8.00146 11.5523 8.00146 11V4.41412L10.2944 6.70701C10.6849 7.09754 11.318 7.09754 11.7086 6.70701C12.0991 6.31649 12.0991 5.68332 11.7086 5.2928ZM1.00146 10C1.55375 10 2.00146 10.4477 2.00146 11V14H12.0015V11C12.0015 10.4477 12.4492 10 13.0015 10C13.5538 10 14.0015 10.4477 14.0015 11V15C14.0015 15.5523 13.5538 16 13.0015 16H1.00146C0.44918 16 0.00146484 15.5523 0.00146484 15V11C0.00146484 10.4477 0.44918 10 1.00146 10Z" fill="currentColor"></path></svg></button>
                            <button type="button" className={profileStyles.otherLinks}><svg viewBox="0 0 14 4" fill="none" width="13.200000000000001" height="13.200000000000001" xlmns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" clip-rule="evenodd" d="M3.5 2C3.5 2.82843 2.82843 3.5 2 3.5C1.17157 3.5 0.5 2.82843 0.5 2C0.5 1.17157 1.17157 0.5 2 0.5C2.82843 0.5 3.5 1.17157 3.5 2ZM8.5 2C8.5 2.82843 7.82843 3.5 7 3.5C6.17157 3.5 5.5 2.82843 5.5 2C5.5 1.17157 6.17157 0.5 7 0.5C7.82843 0.5 8.5 1.17157 8.5 2ZM11.999 3.5C12.8274 3.5 13.499 2.82843 13.499 2C13.499 1.17157 12.8274 0.5 11.999 0.5C11.1706 0.5 10.499 1.17157 10.499 2C10.499 2.82843 11.1706 3.5 11.999 3.5Z" fill="currentColor"></path></svg></button>
                        </div>
                    </div>
                </div>
                <Tabs defaultActiveKey="1" onChange={callback}>
                    <TabPane tab="On sale" key="1">
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
                                            see difference
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
                    </TabPane>
                    <TabPane tab="Collections" key="2">
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
                    </TabPane>
                </Tabs>

            </div>
        </>
    );
}

export default Profile;