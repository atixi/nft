import { Menu } from 'antd'
import React from 'react';
import Products from '/Components/products';
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
function LiveAuctions() {
    return (
        <>
            <div >
                <div className="p-3">
                    <h3>Live Auctions</h3>
                </div>

                <Products />
            </div>
        </>
    );
}

export default LiveAuctions;