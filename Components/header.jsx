import { useEffect, useState } from "react";
import styles from "../styles/Header.module.css";
import hstyles from "../styles/search.module.css";
import mstyles from "../styles/dropdown.module.css";
import Image from 'next/image'
import Search from "./search";
import Dropdown from "./Dropdown";
import { Menu } from "antd";
import { accountList } from "../Constants/constants";
import { useStoreApi } from "../providers/storeApi";
import { useWeb3 } from "../providers/getWeb";

export default function Header(props) {
  const { address, balance, message, setBalance, setAddress } = useStoreApi();
  const web3 = useWeb3();

  const [search, setSearch] = useState(false);
  const [menu, setMenu] = useState(false);
  const [accountAddress, setAccountAddress] = useState(address ? address : accountList[0]);

  useEffect(()=>{
    window.ethereum.on("accountsChanged", function(accounts) {
      setAccountAddress(accounts[0])
    });    
  }, [])


  const setUserAccount = async () => {
    if (window.ethereum) {
      await window.ethereum.enable();
      web3.eth.getAccounts().then((account) => {
        setAddress(account[0]);
        setUserBalance(account[0]);
      });
    }
  };

  const displayAddress = ()=>{
    return 'Account: '+ accountAddress.substring(1, 4) +'...'+ accountAddress.substring(accountAddress.length-5, accountAddress.length);
  }
  const setUserBalance = async (fromAddress) => {
    await web3.eth.getBalance(fromAddress).then((value) => {
      const credit = web3.utils.fromWei(value, "ether");
      setBalance(credit);
    });
  };

  const sendTransaction = async (e) => {
    e.preventDefault();
    const amount = e.target[0].value;
    const recepeint = e.target[1].value;
    await web3.eth.sendTransaction({
      from: address,
      to: recepeint,
      value: web3.utils.toWei(amount, "ether"),
    });
    setUserBalance(address);
  };

  const connectToWallet = ()=>{
    console.log('connect to wallet')

  }
  const menuFooter = (
    <div className={mstyles.menu_footer}>
      <div>  
        <a href="#">
          <svg viewBox="0 0 18 16" fill="none" width="18" height="18" xlmns="http://www.w3.org/2000/svg">
            <path d="M17.9655 2.42676C17.3018 2.71851 16.593 2.91726 15.8468 3.00801C16.6073 2.54976 17.1922 1.82751 17.469 0.965759C16.7558 1.38201 15.9653 1.68501 15.1238 1.85376C14.4518 1.13451 13.494 0.684509 12.4305 0.684509C10.3927 0.684509 8.7405 2.33676 8.7405 4.37226C8.7405 4.66476 8.77425 4.94601 8.83575 5.21526C5.76825 5.07051 3.0495 3.59751 1.23 1.37076C0.90975 1.91226 0.7305 2.54151 0.7305 3.22701C0.7305 4.50951 1.383 5.63676 2.3715 6.29901C1.76625 6.27951 1.197 6.11301 0.7005 5.83701V5.88276C0.7005 7.67151 1.97025 9.16326 3.66 9.50301C3.35025 9.58626 3.02325 9.63126 2.688 9.63126C2.4525 9.63126 2.22675 9.60876 2.001 9.56676C2.47425 11.0315 3.83475 12.0995 5.454 12.1295C4.194 13.1188 2.59725 13.7083 0.8775 13.7083C0.585 13.7083 0.29325 13.691 0 13.658C1.64175 14.7035 3.576 15.3148 5.66775 15.3148C12.4583 15.3148 16.167 9.69276 16.167 4.82526C16.167 4.66851 16.167 4.51026 16.1558 4.35276C16.8765 3.83601 17.5057 3.18276 18.0007 2.44176L17.9655 2.42676Z" fill="currentColor"></path>
          </svg>
        </a>
      </div>
      <div>
        <a href="#">
          <svg viewBox="0 0 16 14" fill="none" width="17" height="17" xlmns="http://www.w3.org/2000/svg">
            <path d="M15.9513 1.29916L13.5438 13.1556C13.377 13.997 12.8902 14.1987 12.21 13.8093L8.542 10.979L6.76804 12.7662C6.56797 12.9748 6.40125 13.1556 6.03445 13.1556C5.55428 13.1556 5.63431 12.9679 5.47425 12.495L4.20714 8.19051L0.572523 7.00834C-0.214421 6.76495 -0.22109 6.20168 0.745918 5.7914L14.9243 0.0891779C15.5711 -0.209841 16.1914 0.256072 15.9446 1.29221L15.9513 1.29916Z"fill="currentColor"></path>
          </svg>
        </a>
      </div>
      <div>
        <a href="#">
          <svg viewBox="0 0 14 14" fill="none" width="16" height="16" xlmns="http://www.w3.org/2000/svg">
            <path fillRule="evenodd" clipRule="evenodd" d="M7 0C5.09833 0 4.86092 0.00875 4.11425 0.042C3.36875 0.077 2.86125 0.19425 2.415 0.3675C1.95475 0.546 1.56392 0.78575 1.17483 1.17483C0.78575 1.56392 0.545417 1.95417 0.3675 2.415C0.19425 2.86125 0.0764167 3.36875 0.042 4.11425C0.007 4.86092 0 5.09833 0 7C0 8.90167 0.00875 9.13908 0.042 9.88575C0.077 10.6307 0.19425 11.1388 0.3675 11.585C0.546 12.0447 0.78575 12.4361 1.17483 12.8252C1.56392 13.2137 1.95417 13.4546 2.415 13.6325C2.86183 13.8052 3.36933 13.9236 4.11425 13.958C4.86092 13.993 5.09833 14 7 14C8.90167 14 9.13908 13.9912 9.88575 13.958C10.6307 13.923 11.1388 13.8052 11.585 13.6325C12.0447 13.454 12.4361 13.2137 12.8252 12.8252C13.2137 12.4361 13.4546 12.0464 13.6325 11.585C13.8052 11.1388 13.9236 10.6307 13.958 9.88575C13.993 9.13908 14 8.90167 14 7C14 5.09833 13.9912 4.86092 13.958 4.11425C13.923 3.36933 13.8052 2.86067 13.6325 2.415C13.454 1.95475 13.2137 1.56392 12.8252 1.17483C12.4361 0.78575 12.0464 0.545417 11.585 0.3675C11.1388 0.19425 10.6307 0.0764167 9.88575 0.042C9.13908 0.007 8.90167 0 7 0ZM10.7369 4.10372C11.2 4.10372 11.5769 3.72747 11.5769 3.26372C11.5769 2.80055 11.1994 2.42372 10.7369 2.4243C10.2737 2.4243 9.89685 2.80055 9.89685 3.26372C9.89685 3.72689 10.2731 4.10372 10.7369 4.10372ZM3.40552 6.99997C3.40552 5.01547 5.01377 3.40547 7.00002 3.40547C8.98452 3.40547 10.5945 5.01372 10.5945 6.99997C10.5945 8.98447 8.98627 10.5945 7.00002 10.5945C5.01552 10.5945 3.40552 8.98622 3.40552 6.99997ZM7.00002 9.33337C5.71086 9.33337 4.66669 8.2892 4.66669 7.00004C4.66669 5.71087 5.71086 4.6667 7.00002 4.6667C8.28919 4.6667 9.33335 5.71087 9.33335 7.00004C9.33335 8.2892 8.28919 9.33337 7.00002 9.33337Z" fill="currentColor"></path>
          </svg>
        </a>
      </div>
      <div>
        <a href="#">
          <svg viewBox="0 0 18 13" fill="none" width="18" height="18" xlmns="http://www.w3.org/2000/svg">
            <path fillRule="evenodd" clipRule="evenodd" d="M11.5507 0.0036464H11.5624L11.5612 0L11.5507 0.0036464ZM11.5108 0.0176323L11.5507 0.0036464H11.5252L11.5108 0.0176323ZM11.5039 0.0243315L11.5108 0.0176323L11.4917 0.0243072L11.5039 0.0243315ZM11.5039 0.0243315L11.2748 0.246719C13.8446 0.975936 15.088 2.11473 15.088 2.11473C13.4318 1.30287 11.9393 0.896938 10.4467 0.732864C9.36818 0.56879 8.28967 0.65508 7.37851 0.732864H7.13058C6.54793 0.732864 5.30826 0.975936 3.64711 1.62616C3.06818 1.87287 2.73595 2.03452 2.73595 2.03452C2.73595 2.03452 3.9781 0.816724 6.71529 0.166505L6.54793 0.00243113C6.54793 0.00243113 4.47521 -0.075352 2.2376 1.54594C2.2376 1.54594 0 5.36704 0 10.0778C0 10.0778 1.23967 12.1925 4.64008 12.2727C4.64008 12.2727 5.13595 11.6249 5.63802 11.0549C3.72893 10.4861 2.98512 9.34857 2.98512 9.34857C2.98512 9.34857 3.15124 9.42878 3.40041 9.59164H3.47479C3.50979 9.59164 3.52722 9.60778 3.54568 9.62487C3.54684 9.62595 3.548 9.62702 3.54917 9.6281V9.63539C3.56901 9.65484 3.58636 9.67185 3.62355 9.67185C3.6596 9.68642 3.69564 9.70096 3.73164 9.71548C4.10416 9.8658 4.47123 10.0139 4.77645 10.158C5.35413 10.4035 6.09669 10.6478 7.00785 10.8094C8.16074 10.9735 9.48223 11.0525 10.9872 10.8094L11.0353 10.7988L11.0353 10.7988C11.7631 10.6384 12.4908 10.4779 13.2186 10.1592C13.3516 10.0923 13.4931 10.0255 13.6419 9.95511C14.0339 9.76978 14.4769 9.56038 14.9504 9.26349C14.9504 9.26349 14.2066 10.4011 12.2169 10.9699C12.626 11.5362 13.2025 12.1852 13.2025 12.1852C15.9898 12.1255 17.3804 10.6948 17.8328 10.2295C17.9325 10.1269 17.9866 10.0713 18 10.0875C18 5.38405 15.75 1.55566 15.75 1.55566C13.7464 0.097178 11.8701 0.0257804 11.5039 0.0243315ZM6.13886 5.36701C7.00663 5.36701 7.70828 6.09623 7.70828 6.98952C7.70828 7.88889 7.00167 8.61811 6.1339 8.61811C5.26613 8.61811 4.55952 7.88889 4.55952 6.99682C4.55952 6.09745 5.26613 5.37066 6.1339 5.37066L6.13886 5.36701ZM11.7707 5.36701C12.6422 5.36701 13.3451 6.09623 13.3451 6.98952C13.3451 7.88889 12.6384 8.61811 11.7707 8.61811C10.9029 8.61811 10.1963 7.88889 10.1963 6.99682C10.1988 6.09745 10.9066 5.37066 11.7707 5.37066V5.36701Z" fill="currentColor"></path>
          </svg>
        </a>
      </div>
      <div>
        <a href="#">
          <svg viewBox="0 0 18 12" fill="none" width="18" height="18" xlmns="http://www.w3.org/2000/svg">
            <path d="M17.6242 1.85293C17.5199 1.49635 17.3209 1.17147 17.0465 0.909689C16.772 0.64791 16.4314 0.458089 16.0576 0.358571C14.6546 1.02807e-05 9.00801 1.01525e-05 9.00801 1.01525e-05C9.00801 1.01525e-05 3.37567 -0.00714662 1.95839 0.358571C1.58457 0.458089 1.24399 0.64791 0.969559 0.909689C0.69513 1.17147 0.496134 1.49635 0.391808 1.85293C0.125849 3.22313 -0.00526955 4.61404 0.000162055 6.00752C-0.00424273 7.39574 0.126872 8.78133 0.391808 10.1464C0.496134 10.5029 0.69513 10.8278 0.969559 11.0896C1.24399 11.3514 1.58457 11.5412 1.95839 11.6407C3.35991 12 9.00801 12 9.00801 12C9.00801 12 14.6396 12 16.0576 11.6407C16.4314 11.5412 16.772 11.3514 17.0465 11.0896C17.3209 10.8278 17.5199 10.5029 17.6242 10.1464C17.8836 8.78084 18.0092 7.39525 17.9994 6.00752C18.0102 4.61454 17.8846 3.22363 17.6242 1.85293ZM7.20584 8.57757V3.4296L11.9056 6.00752L7.20584 8.57757Z" fill="currentColor"></path>
          </svg>
        </a>
      </div>
      <div>
        <a href="#">
          <svg viewBox="0 0 18 12" fill="none" width="20" height="20" xlmns="http://www.w3.org/2000/svg">
            <path d="M5.07644 11.25C7.88022 11.25 10.1531 8.89939 10.1531 5.99991C10.1531 3.10043 7.88004 0.75 5.07644 0.75C2.27284 0.75 0 3.09972 0 5.99991C0 8.9001 2.27267 11.25 5.07644 11.25Z" fill="currentColor"></path>
            <path d="M13.1839 10.9419C14.5857 10.9419 15.7222 8.72942 15.7222 5.99991C15.7222 3.27111 14.5857 1.0579 13.1839 1.0579C11.7821 1.0579 10.6455 3.27111 10.6455 5.99991C10.6455 8.72871 11.7821 10.9419 13.1839 10.9419Z" fill="currentColor"></path>
            <path d="M17.1072 10.4277C17.6003 10.4277 18 8.44542 18 5.99991C18 3.55458 17.6006 1.57207 17.1074 1.57207C16.6142 1.57207 16.2145 3.55511 16.2145 5.99991C16.2145 8.44471 16.6142 10.4277 17.1072 10.4277Z" fill="currentColor"></path>
          </svg>
        </a>
      </div>
  </div>
  );
  const menu1=(<Menu>
          <Menu.Item key="0">
            <a href="#">RARI Token</a>
          </Menu.Item>
          <Menu.Item key="1">
            <a href="#">Discussion</a>
          </Menu.Item>
          <Menu.Item key="3">
          <a href="#">Voting</a>
          </Menu.Item>
          <Menu.Item key="3">
          <a href="#">Suggest feature</a>
          </Menu.Item>
          <Menu.Item key="3">
          <a href="#">Subscribe</a>
          </Menu.Item>
          <Menu.Divider></Menu.Divider>
          <Menu.Item>
            {menuFooter}            
          </Menu.Item>
        </Menu>
        );

  const menu2 = (
    <Menu>
      <Menu.Item key="1">
        <a href="#">How it works</a>
      </Menu.Item>
      <Menu.Item key="1">
      <a href="#">RARI Token</a>
      </Menu.Item>
      <Menu.Item key="1">
      <a href="#">Discussion</a>
      </Menu.Item>
      <Menu.Item key="1">
      <a href="#">Voting</a>
      </Menu.Item>
      <Menu.Item key="1">
      <a href="#">Suggest feature</a>
      </Menu.Item>
      <Menu.Item key="1">
      <a href="#">Subscribe</a>
      </Menu.Item>
      
      <Menu.Divider></Menu.Divider>
      <Menu.Item>
        {menuFooter}            
      </Menu.Item>
    </Menu>
  );



  if (search)
    return (
      <div className={styles.searchWrapper}>
        <div
          className={styles.pageHeader}
          style={{ borderBottom: "1px solid #e5e5e5" }}
        >
          <button
            onClick={() => {
              setSearch(false);
            }}
            className={styles.btn}
          >
            <svg
              viewBox="0 0 16 16"
              fill="none"
              width="14"
              height="14"
              xlmns="http://www.w3.org/2000/svg"
            >
              <path d="M4 12L12 4" stroke="currentColor" strokeWidth="2"></path>
              <path d="M12 12L4 4" stroke="currentColor" strokeWidth="2"></path>
            </svg>
          </button>
          <div style={{ flex: 1 }} className={hstyles.wrapper}>
            <svg
              style={{ margin: "0px 10px", color: "#aaa" }}
              viewBox="0 0 16 16"
              fill="none"
              width="14"
              height="14"
              xlmns="http://www.w3.org/2000/svg"
            >
              <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M2 7C2 4.23858 4.23858 2 7 2C9.76142 2 12 4.23858 12 7C12 9.76142 9.76142 12 7 12C4.23858 12 2 9.76142 2 7ZM7 0C3.13401 0 0 3.13401 0 7C0 10.866 3.13401 14 7 14C8.57591 14 10.0302 13.4792 11.2001 12.6004C11.2281 12.6376 11.259 12.6733 11.2929 12.7071L14.2929 15.7071C14.6834 16.0976 15.3166 16.0976 15.7071 15.7071C16.0976 15.3166 16.0976 14.6834 15.7071 14.2929L12.7071 11.2929C12.6733 11.259 12.6376 11.2281 12.6004 11.2001C13.4792 10.0302 14 8.57591 14 7C14 3.13401 10.866 0 7 0Z"
                fill="currentColor"
              ></path>
            </svg>
            <input
              type="text"
              style={{ flex: 1, width: "auto" }}
              placeholder="Search by creator, collectible or collection"
            />
          </div>
        </div>
        <div className={styles.searchBody}>
          <br />
          <center>
            Search by creator, collectible
            <br />
            or collection
          </center>
        </div>
      </div>
    );
  if (menu)
    return (
      <div className={styles.menueWrapper}>
        <div className={styles.pageHeader}>
          <span>
            <svg
              width="40"
              height="40"
              viewBox="0 0 40 40"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <rect width="40" height="40" rx="8" fill="#FEDA03"></rect>
              <path
                d="M27.6007 19.8536C28.8607 19.5262 29.9817 18.5838 29.9817 16.6889C29.9817 13.5342 27.3031 12.8 23.8706 12.8H10.2V27.0064H15.9539V22.185H22.7793C23.8309 22.185 24.446 22.6016 24.446 23.6334V27.0064H30.2V23.4548C30.2 21.5203 29.1087 20.3 27.6007 19.8536ZM22.8785 18.3556H15.9539V16.9667H22.8785C23.6325 16.9667 24.0888 17.0659 24.0888 17.6612C24.0888 18.2564 23.6325 18.3556 22.8785 18.3556Z"
                fill="black"
              ></path>
            </svg>
          </span>
          <button className={`${styles.btn} mx-3`}>English</button>
          <div style={{ flex: 1 }}></div>
          <button
            onClick={() => {
              setMenu(false);
            }}
            className={styles.btn}
          >
            <svg
              style={{ marginTop: "-5px" }}
              viewBox="0 0 16 16"
              fill="none"
              width="14"
              height="14"
              xlmns="http://www.w3.org/2000/svg"
            >
              <path d="M4 12L12 4" stroke="currentColor" strokeWidth="2"></path>
              <path d="M12 12L4 4" stroke="currentColor" strokeWidth="2"></path>
            </svg>
          </button>
        </div>
        <div className={styles.menueBody}>
          <ul>
            <li>
              <a href="#">Explore</a>
            </li>
            <li>
              <a href="#">My items</a>
            </li>
            <li>
              <a href="#">Following</a>
            </li>
            <li>
              <a href="#">
                Activity{" "}
                <svg
                  width="30"
                  height="14"
                  viewBox="0 0 30 14"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <rect
                    x="0.5"
                    width="29"
                    height="14"
                    rx="7"
                    fill="url(#paint0_radial)"
                  ></rect>
                  <path
                    d="M11.044 10V4.328H9.78V7.776L7.652 4.328H6.116V10H7.372V6.272L9.708 10H11.044ZM15.8644 10V8.8H13.5284V7.712H15.6404V6.6H13.5284V5.52H15.8564V4.328H12.2644V10H15.8644ZM22.3676 7.968L21.1916 4.328H19.8956L18.7196 7.96L17.7836 4.328H16.4396L17.9836 10H19.3116L20.5276 6.24L21.7356 10H23.0396L24.5836 4.328H23.2876L22.3676 7.968Z"
                    fill="white"
                  ></path>
                  <defs>
                    <radialGradient
                      id="paint0_radial"
                      cx="0"
                      cy="0"
                      r="1"
                      gradientUnits="userSpaceOnUse"
                      gradientTransform="translate(-10.6167 -5.6875) rotate(24.662) scale(36.6973 39.3316)"
                    >
                      <stop stopColor="#0C50FF"></stop>
                      <stop offset="0.557292" stopColor="#5B9DFF"></stop>
                      <stop offset="1" stopColor="#FF74F1"></stop>
                    </radialGradient>
                  </defs>
                </svg>
              </a>
            </li>
            <li>
              <a href="#">How it works</a>
            </li>
            <li>
              <a style={{ color: "#e77af3" }}>Community</a>
            </li>
            <li>
              <a href="#">RARI Token</a>
            </li>

            <li>
              <a href="#">Discussion</a>
            </li>
            <li>
              <a href="#">Voting</a>
            </li>
            <li>
              <a href="#">Suggest feature</a>
            </li>
            <li>
              <a href="#">Subscribe</a>
            </li>
          </ul>

          <div className={styles.menueFooter}>
            {menuFooter}
            <div style={{ display: "flex", padding: "20px 10px" }}>
              <button
                style={{ flex: 1, backgroundColor: "#0066ff", color: "#fff" }}
                className={`${styles.btn}`}
              >
                Create
              </button>
              <button
                style={{ flex: 1 }}
                className={`${styles.btn} ${styles.btnCreate}`}
              >
                Connect
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  return (
    <nav className={`${styles.mainNav} ${styles.pageHeader}`}>
      <div>
        <a href="#">
         <Image src="/logo/logo.png" width="40" height="40"/>
        </a>
      </div>
      <div className="d-none d-xl-flex px-1" style={{ flex: 1 }}>
        <Search />
      </div>
      <ul style={{ paddingRight: "30px" }}>
        <li className={`${styles.active} d-none d-lg-flex`}>
          <a href="#">Explore</a>
        </li>
        <li className="d-none d-lg-flex">
          <a href="#">My items</a>
        </li>
        <li className="d-none d-lg-flex">
          <a href="#">Following</a>
        </li>
        <li className="d-none d-lg-flex">
          <a href="#">
            Activity{" "}
            <svg
              width="30"
              height="14"
              viewBox="0 0 30 14"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <rect
                x="0.5"
                width="29"
                height="14"
                rx="7"
                fill="url(#paint0_radial)"
              ></rect>
              <path
                d="M11.044 10V4.328H9.78V7.776L7.652 4.328H6.116V10H7.372V6.272L9.708 10H11.044ZM15.8644 10V8.8H13.5284V7.712H15.6404V6.6H13.5284V5.52H15.8564V4.328H12.2644V10H15.8644ZM22.3676 7.968L21.1916 4.328H19.8956L18.7196 7.96L17.7836 4.328H16.4396L17.9836 10H19.3116L20.5276 6.24L21.7356 10H23.0396L24.5836 4.328H23.2876L22.3676 7.968Z"
                fill="white"
              ></path>
              <defs>
                <radialGradient
                  id="paint0_radial"
                  cx="0"
                  cy="0"
                  r="1"
                  gradientUnits="userSpaceOnUse"
                  gradientTransform="translate(-10.6167 -5.6875) rotate(24.662) scale(36.6973 39.3316)"
                >
                  <stop stopColor="#0C50FF"></stop>
                  <stop offset="0.557292" stopColor="#5B9DFF"></stop>
                  <stop offset="1" stopColor="#FF74F1"></stop>
                </radialGradient>
              </defs>
            </svg>
          </a>
        </li>
        <div className="d-none d-lg-flex" style={{ alignItems: "center" }}>
          <div
            style={{
              width: "0px",
              borderLeft: "1px solid #ccc",
              height: "50%",
            }}
          ></div>
        </div>
        <li className="d-none d-xl-flex">
          <a href="#">How it works</a>
        </li>
        <li className="d-none d-xl-flex">
          <Dropdown trigger="Community" menu={menu1}/>
        </li>
        <li className="d-none d-lg-flex d-xl-none">
          
          <Dropdown trigger={(<svg
                  viewBox="0 0 14 4"
                  fill="none"
                  width="16"
                  height="16"
                  xlmns="http://www.w3.org/2000/svg"
                >
                  <path
                    fillRule="evenodd"
                    clipRule="evenodd"
                    d="M3.5 2C3.5 2.82843 2.82843 3.5 2 3.5C1.17157 3.5 0.5 2.82843 0.5 2C0.5 1.17157 1.17157 0.5 2 0.5C2.82843 0.5 3.5 1.17157 3.5 2ZM8.5 2C8.5 2.82843 7.82843 3.5 7 3.5C6.17157 3.5 5.5 2.82843 5.5 2C5.5 1.17157 6.17157 0.5 7 0.5C7.82843 0.5 8.5 1.17157 8.5 2ZM11.999 3.5C12.8274 3.5 13.499 2.82843 13.499 2C13.499 1.17157 12.8274 0.5 11.999 0.5C11.1706 0.5 10.499 1.17157 10.499 2C10.499 2.82843 11.1706 3.5 11.999 3.5Z"
                    fill="currentColor"
                  ></path>
                </svg>)} menu={menu2}/>
          </li>
      </ul>
      <div style={{ flex: 1 }} className="d-block d-xl-none"></div>
      <div style={{ display: "flex" }}>
        <button
          className={`${styles.btn} ${styles.btnCreate} d-none d-lg-block`}
        >
          Create
        </button>
        <button
          className={`${styles.btn} ${styles.btnConnect} d-none d-lg-block` } onClick={() => setUserAccount()}
        >
          Connect wallet 
        </button> 

        <button
          onClick={() => {
            setSearch(true);
          }}
          className={`${styles.btn} d-block d-xl-none`}
        >
          <svg
            style={{ color: "#000" }}
            viewBox="0 0 16 16"
            fill="none"
            width="14"
            height="14"
            xlmns="http://www.w3.org/2000/svg"
          >
            <path
              fillRule="evenodd"
              clipRule="evenodd"
              d="M2 7C2 4.23858 4.23858 2 7 2C9.76142 2 12 4.23858 12 7C12 9.76142 9.76142 12 7 12C4.23858 12 2 9.76142 2 7ZM7 0C3.13401 0 0 3.13401 0 7C0 10.866 3.13401 14 7 14C8.57591 14 10.0302 13.4792 11.2001 12.6004C11.2281 12.6376 11.259 12.6733 11.2929 12.7071L14.2929 15.7071C14.6834 16.0976 15.3166 16.0976 15.7071 15.7071C16.0976 15.3166 16.0976 14.6834 15.7071 14.2929L12.7071 11.2929C12.6733 11.259 12.6376 11.2281 12.6004 11.2001C13.4792 10.0302 14 8.57591 14 7C14 3.13401 10.866 0 7 0Z"
              fill="currentColor"
            ></path>
          </svg>
        </button>
        <button
          onClick={() => {
            setMenu(true);
          }}
          className={`${styles.btn} d-block d-lg-none`}
        >
          <svg
            style={{ color: "#000" }}
            viewBox="0 0 18 8"
            fill="none"
            width="13.200000000000001"
            height="13.200000000000001"
            xlmns="http://www.w3.org/2000/svg"
          >
            <path
              fillRule="evenodd"
              clipRule="evenodd"
              d="M1 0C0.447715 0 0 0.447715 0 1C0 1.55228 0.447716 2 1 2H17C17.5523 2 18 1.55228 18 1C18 0.447715 17.5523 0 17 0H1ZM4 6C3.44772 6 3 6.44772 3 7C3 7.55228 3.44772 8 4 8H14C14.5523 8 15 7.55228 15 7C15 6.44772 14.5523 6 14 6H4Z"
              fill="currentColor"
            ></path>
          </svg>
        </button>
      </div>
    </nav>
  );
}
