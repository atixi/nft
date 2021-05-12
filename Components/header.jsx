import { useState } from 'react';
import styles from '../styles/Header.module.css';
import hstyles from '../styles/search.module.css';
import Search from './search';
export default function Header(props){
    
    const [search,setSearch] = useState(false);
    const [menu,setMenu] = useState(false);

    function showSearch(){
        setSearch(true);
    }
    function showMenu(){
        setMenu(true);
    }

    if(search)
        return (
            <div className={styles.searchWrapper}>
                <div className={styles.searchHeader}>
                    <button onClick={()=>{setSearch(false)}} className={styles.btn}>
                        <svg style={{marginTop:"-5px"}} viewBox="0 0 16 16" fill="none" width="14" height="14" xlmns="http://www.w3.org/2000/svg"><path d="M4 12L12 4" stroke="currentColor" strokeWidth="2"></path><path d="M12 12L4 4" stroke="currentColor" strokeWidth="2"></path></svg>
                    </button>
                    <div style={{flex:1}} className={hstyles.wrapper}>
                        <svg style={{margin:"0px 10px",color:"#aaa"}} viewBox="0 0 16 16" fill="none" width="14" height="14" xlmns="http://www.w3.org/2000/svg"><path fillRule="evenodd" clipRule="evenodd" d="M2 7C2 4.23858 4.23858 2 7 2C9.76142 2 12 4.23858 12 7C12 9.76142 9.76142 12 7 12C4.23858 12 2 9.76142 2 7ZM7 0C3.13401 0 0 3.13401 0 7C0 10.866 3.13401 14 7 14C8.57591 14 10.0302 13.4792 11.2001 12.6004C11.2281 12.6376 11.259 12.6733 11.2929 12.7071L14.2929 15.7071C14.6834 16.0976 15.3166 16.0976 15.7071 15.7071C16.0976 15.3166 16.0976 14.6834 15.7071 14.2929L12.7071 11.2929C12.6733 11.259 12.6376 11.2281 12.6004 11.2001C13.4792 10.0302 14 8.57591 14 7C14 3.13401 10.866 0 7 0Z" fill="currentColor"></path></svg>
                        <input type="text" style={{flex:1,width:"auto"}} placeholder="Search by creator, collectible or collection"/>
                    </div>
                </div>
                <div className={styles.searchBody}>
                    <br />
                    <center>
                        Search by creator, collectible<br/>or collection
                    </center>
                </div>
            </div>
        );
    
    if(menu)
        return (
            <div className={styles.menuWrapper}>
                <div className={styles.menueHeader}>
                    <span>
                        <svg width="40" height="40" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg"><rect width="40" height="40" rx="8" fill="#FEDA03"></rect><path d="M27.6007 19.8536C28.8607 19.5262 29.9817 18.5838 29.9817 16.6889C29.9817 13.5342 27.3031 12.8 23.8706 12.8H10.2V27.0064H15.9539V22.185H22.7793C23.8309 22.185 24.446 22.6016 24.446 23.6334V27.0064H30.2V23.4548C30.2 21.5203 29.1087 20.3 27.6007 19.8536ZM22.8785 18.3556H15.9539V16.9667H22.8785C23.6325 16.9667 24.0888 17.0659 24.0888 17.6612C24.0888 18.2564 23.6325 18.3556 22.8785 18.3556Z" fill="black"></path></svg>
                    </span>
                    <button onClick={()=>{setMenu(false)}} className={styles.btn}>
                        <svg style={{marginTop:"-5px"}} viewBox="0 0 16 16" fill="none" width="14" height="14" xlmns="http://www.w3.org/2000/svg"><path d="M4 12L12 4" stroke="currentColor" strokeWidth="2"></path><path d="M12 12L4 4" stroke="currentColor" strokeWidth="2"></path></svg>
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
                                Activity <svg width="30" height="14" viewBox="0 0 30 14" fill="none" xmlns="http://www.w3.org/2000/svg"><rect x="0.5" width="29" height="14" rx="7" fill="url(#paint0_radial)"></rect><path d="M11.044 10V4.328H9.78V7.776L7.652 4.328H6.116V10H7.372V6.272L9.708 10H11.044ZM15.8644 10V8.8H13.5284V7.712H15.6404V6.6H13.5284V5.52H15.8564V4.328H12.2644V10H15.8644ZM22.3676 7.968L21.1916 4.328H19.8956L18.7196 7.96L17.7836 4.328H16.4396L17.9836 10H19.3116L20.5276 6.24L21.7356 10H23.0396L24.5836 4.328H23.2876L22.3676 7.968Z" fill="white"></path><defs><radialGradient id="paint0_radial" cx="0" cy="0" r="1" gradientUnits="userSpaceOnUse" gradientTransform="translate(-10.6167 -5.6875) rotate(24.662) scale(36.6973 39.3316)"><stop stopColor="#0C50FF"></stop><stop offset="0.557292" stopColor="#5B9DFF"></stop><stop offset="1" stopColor="#FF74F1"></stop></radialGradient></defs></svg>
                            </a>
                        </li>
                    </ul>
                </div>
            </div>
        );
    return (
        <nav className={styles.mainNav}>
            <ul>
                <li>
                    <a href="#">
                        <svg width="40" height="40" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg"><rect width="40" height="40" rx="8" fill="#FEDA03"></rect><path d="M27.6007 19.8536C28.8607 19.5262 29.9817 18.5838 29.9817 16.6889C29.9817 13.5342 27.3031 12.8 23.8706 12.8H10.2V27.0064H15.9539V22.185H22.7793C23.8309 22.185 24.446 22.6016 24.446 23.6334V27.0064H30.2V23.4548C30.2 21.5203 29.1087 20.3 27.6007 19.8536ZM22.8785 18.3556H15.9539V16.9667H22.8785C23.6325 16.9667 24.0888 17.0659 24.0888 17.6612C24.0888 18.2564 23.6325 18.3556 22.8785 18.3556Z" fill="black"></path></svg>
                    </a>
                </li>
                <li className="d-none d-xl-flex">
                    <Search/>
                </li>
                <li className={`${styles.active} d-none d-lg-flex`}>
                    <a href="#">
                        Explore
                    </a>
                </li>
                <li className="d-none d-lg-flex">
                    <a href="#">
                        My items
                    </a>
                </li>
                <li className="d-none d-lg-flex">
                    <a href="#">
                        Following
                    </a>
                </li>
                <li className="d-none d-lg-flex">
                    <a href="#">
                        Activity <svg width="30" height="14" viewBox="0 0 30 14" fill="none" xmlns="http://www.w3.org/2000/svg"><rect x="0.5" width="29" height="14" rx="7" fill="url(#paint0_radial)"></rect><path d="M11.044 10V4.328H9.78V7.776L7.652 4.328H6.116V10H7.372V6.272L9.708 10H11.044ZM15.8644 10V8.8H13.5284V7.712H15.6404V6.6H13.5284V5.52H15.8564V4.328H12.2644V10H15.8644ZM22.3676 7.968L21.1916 4.328H19.8956L18.7196 7.96L17.7836 4.328H16.4396L17.9836 10H19.3116L20.5276 6.24L21.7356 10H23.0396L24.5836 4.328H23.2876L22.3676 7.968Z" fill="white"></path><defs><radialGradient id="paint0_radial" cx="0" cy="0" r="1" gradientUnits="userSpaceOnUse" gradientTransform="translate(-10.6167 -5.6875) rotate(24.662) scale(36.6973 39.3316)"><stop stopColor="#0C50FF"></stop><stop offset="0.557292" stopColor="#5B9DFF"></stop><stop offset="1" stopColor="#FF74F1"></stop></radialGradient></defs></svg>
                    </a>
                </li>
                <div className="d-none d-lg-flex" style={{alignItems:"center"}}>
                    <div style={{width:"0px",borderLeft:"1px solid #ccc",height:"50%"}}></div>
                </div>
                <li className="d-none d-xl-flex">
                    <a href="#">
                        How it works
                    </a>
                </li>
                <li className="d-none d-xl-flex">
                    <a href="#">
                        Community <svg viewBox="0 0 11 7" fill="none" width="10" height="10" xlmns="http://www.w3.org/2000/svg"><path fillRule="evenodd" clipRule="evenodd" d="M5.00146 6.41431L9.70857 1.7072C10.0991 1.31668 10.0991 0.683511 9.70857 0.292986C9.31805 -0.097538 8.68488 -0.097538 8.29436 0.292986L5.00146 3.58588L1.70857 0.292986C1.31805 -0.097538 0.684882 -0.097538 0.294358 0.292986C-0.0961662 0.68351 -0.0961662 1.31668 0.294358 1.7072L5.00146 6.41431Z" fill="currentColor"></path></svg>
                    </a>
                </li>
                <li className="d-none d-lg-flex d-xl-none">
                    <a href="#">
                        <svg viewBox="0 0 14 4" fill="none" width="16" height="16" xlmns="http://www.w3.org/2000/svg"><path fillRule="evenodd" clipRule="evenodd" d="M3.5 2C3.5 2.82843 2.82843 3.5 2 3.5C1.17157 3.5 0.5 2.82843 0.5 2C0.5 1.17157 1.17157 0.5 2 0.5C2.82843 0.5 3.5 1.17157 3.5 2ZM8.5 2C8.5 2.82843 7.82843 3.5 7 3.5C6.17157 3.5 5.5 2.82843 5.5 2C5.5 1.17157 6.17157 0.5 7 0.5C7.82843 0.5 8.5 1.17157 8.5 2ZM11.999 3.5C12.8274 3.5 13.499 2.82843 13.499 2C13.499 1.17157 12.8274 0.5 11.999 0.5C11.1706 0.5 10.499 1.17157 10.499 2C10.499 2.82843 11.1706 3.5 11.999 3.5Z" fill="currentColor"></path></svg>
                    </a>
                </li>
                
            </ul>
            <ul>
                <li className="d-none d-lg-flex">
                    <button className={`${styles.btn} ${styles.btnCreate}`}>Create</button>
                </li>
                <li className="d-none d-lg-flex">
                    <button className={`${styles.btn} ${styles.btnConnect}`}>Connect wallet</button>
                </li>
                <li className=" d-flex d-xl-none">
                    <button onClick={()=>{setSearch(true)}} className={`${styles.btn}`}>
                        <svg style={{color:"#000"}} viewBox="0 0 16 16" fill="none" width="14" height="14" xlmns="http://www.w3.org/2000/svg"><path fillRule="evenodd" clipRule="evenodd" d="M2 7C2 4.23858 4.23858 2 7 2C9.76142 2 12 4.23858 12 7C12 9.76142 9.76142 12 7 12C4.23858 12 2 9.76142 2 7ZM7 0C3.13401 0 0 3.13401 0 7C0 10.866 3.13401 14 7 14C8.57591 14 10.0302 13.4792 11.2001 12.6004C11.2281 12.6376 11.259 12.6733 11.2929 12.7071L14.2929 15.7071C14.6834 16.0976 15.3166 16.0976 15.7071 15.7071C16.0976 15.3166 16.0976 14.6834 15.7071 14.2929L12.7071 11.2929C12.6733 11.259 12.6376 11.2281 12.6004 11.2001C13.4792 10.0302 14 8.57591 14 7C14 3.13401 10.866 0 7 0Z" fill="currentColor"></path></svg>
                    </button>
                </li>
                <li className="d-flex d-lg-none">
                    <button onClick={()=>{setMenu(true)}} className={`${styles.btn}`}>
                        <svg style={{color:"#000"}} viewBox="0 0 18 8" fill="none" width="13.200000000000001" height="13.200000000000001" xlmns="http://www.w3.org/2000/svg"><path fillRule="evenodd" clipRule="evenodd" d="M1 0C0.447715 0 0 0.447715 0 1C0 1.55228 0.447716 2 1 2H17C17.5523 2 18 1.55228 18 1C18 0.447715 17.5523 0 17 0H1ZM4 6C3.44772 6 3 6.44772 3 7C3 7.55228 3.44772 8 4 8H14C14.5523 8 15 7.55228 15 7C15 6.44772 14.5523 6 14 6H4Z" fill="currentColor"></path></svg>
                    </button>
                </li>
            </ul>
        </nav>
    );
}