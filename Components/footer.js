import styles from '../styles/Footer.module.css'
import { Row, Col, Input, Space, Select } from 'antd'
import React from 'react';
const { Search } = Input;
const { Option } = Select;
const options = [
    {
        value: 'zhejiang',
        label: 'Zhejiang',
        children: [
            {
                value: 'hangzhou',
                label: 'Hangzhou',
                children: [
                    {
                        value: 'xihu',
                        label: 'West Lake',
                    },
                ],
            },
        ],
    },
    {
        value: 'jiangsu',
        label: 'Jiangsu',
        children: [
            {
                value: 'nanjing',
                label: 'Nanjing',
                children: [
                    {
                        value: 'zhonghuamen',
                        label: 'Zhong Hua Men',
                    },
                ],
            },
        ],
    },
];
function Footer() {
    return (
        <>
            <div className={styles.mainFooter}>
                <Row>
                    <Col md={8}>
                        <h5>Get Latest Rarible updates</h5>
                        <div className="col-md-10">
                            <input className={`form-control form-control-md`} type="text" placeholder="Your e-mail" />
                            <button type="button" class="btn btn-primary">
                                I'm in
                            </button>
                        </div>

                    </Col>
                    <Col md={4}>
                        <h5>Rarible</h5>
                        <h6>Explore</h6>
                        <h6>How it works</h6>
                        <h6>Create</h6>
                        <h6>Support</h6>
                    </Col>
                    <Col md={4}>
                        <h5>Community</h5>
                        <h6>RARI Token</h6>
                        <h6>Discussion</h6>
                        <h6>Voting</h6>
                        <h6>Suggest feature</h6>
                    </Col>
                    <Col md={8}>
                        <h5>Language</h5>

                        <Select defaultValue="Option1-1">
                            <Option value="Option1-1">Option1-1</Option>
                            <Option value="Option1-2">Option1-2</Option>
                        </Select>

                    </Col>
                </Row>
            </div>
        </>
    );
}

export default Footer;