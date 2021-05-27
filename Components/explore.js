import styles from '/styles/Products.module.css'
import React from 'react';
import Products from '/Components/products';
import Profile from "/Components/profileAvatar";
import { Dropdown, Menu } from 'antd';
import styled from "styled-components";
const FilterAndSort = styled.div`
border: 1px solid gray;
height: 44px;
margin-top: -7px !important;
border-radius: 20px;
`;
const menu = (
    <Menu>
      <Menu.Item key="0">
        <a href="https://www.antgroup.com">1st menu item</a>
      </Menu.Item>
      <Menu.Item key="1">
        <a href="https://www.aliyun.com">2nd menu item</a>
      </Menu.Item>
      <Menu.Divider />
      <Menu.Item key="3">3rd menu item</Menu.Item>
    </Menu>
  );
function Explore() {
    return (
        <>
            <div >
                <div className={styles.categoriesListParent}>
                    <div className="p-3">
                        <h3>Explore</h3>
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
                    <FilterAndSort className="pr-3">
                        <Dropdown overlay={menu} placement="bottomCenter"  trigger={['click']}>
                            <> 
                              <svg viewBox="0 0 24 24" fill="none" width="22" height="22" xlmns="http://www.w3.org/2000/svg"><path d="M20 16L12 16" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"></path><path d="M6 16L4 16" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"></path><path d="M20 8L18 8" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"></path><path d="M12 8L4 8" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"></path><circle cx="9" cy="16" r="3" fill="currentColor"></circle><circle cx="15" cy="8" r="3" fill="currentColor"></circle></svg>
                                <span>{"Filter & Sort"}</span>
                            </>
                        </Dropdown>
                    </FilterAndSort>
                </div>
                <Products />

            </div>
        </>
    );
}

export default Explore;