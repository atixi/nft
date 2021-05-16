import { Component } from 'react'
import Header from '/Components/header'
import styles from '../styles/product_details.module.css'
import {Tabs} from 'antd'
const { TabPane } = Tabs;
export default class ProductPage extends Component{
    // static async getInitialProps ({ query }) {
    //     const id = query.id
    //     const name = query.name
    //     return {
    //       id: id,
    //       name: name
    //     }
    // }
    item = {
        image:"/images/p1.jpeg",
        name:"CoinBae #1",
        favorite:62,
        category:'🌈 Art',
        description:`There are only 3. 1 of them in Saltbae's collection, 2 of them are mine. If you buy it, you will have the PSD file. You can edit it as you wish and be the creator of the project. This rare work is a project I've been working on since...`,
        owner:{
            avatar:'/images/profpics/1.jpg',
            name:'Saltbae Nusret'
        }
    };

    render(){
        return (<>
            <Header/>
            <div className={styles.wrapper}>
                <div className={`${styles.content} d-sm-flex`}>
                    <div className="float-none float-sm-left">
                        <img src={this.item.image}/>
                    </div>

                    <div className={'float-none float-sm-left'}>
                        <div className={styles.details}>
                            <div style={{display:"flex"}}>
                                <h1 style={{flex:1,margin:"0px"}}>{this.item.name}</h1>
                                <button style={{flex:"none"}}><svg viewBox="0 0 17 16" fill="none" width="16" height="16" xlmns="http://www.w3.org/2000/svg"><path d="M8.2112 14L12.1056 9.69231L14.1853 7.39185C15.2497 6.21455 15.3683 4.46116 14.4723 3.15121V3.15121C13.3207 1.46757 10.9637 1.15351 9.41139 2.47685L8.2112 3.5L6.95566 2.42966C5.40738 1.10976 3.06841 1.3603 1.83482 2.97819V2.97819C0.777858 4.36443 0.885104 6.31329 2.08779 7.57518L8.2112 14Z" stroke="rgba(4, 4, 5, 1)" stroke-width="2"></path></svg> 
                                    {this.item.favorite}
                                </button>
                                <button style={{flex:"none",padding:"4px !important",width:"35px"}}>
                                    <svg viewBox="0 0 14 4" fill="none" width="13.200000000000001" height="13.200000000000001" xlmns="http://www.w3.org/2000/svg"><path fillRule="evenodd" clipRule="evenodd" d="M3.5 2C3.5 2.82843 2.82843 3.5 2 3.5C1.17157 3.5 0.5 2.82843 0.5 2C0.5 1.17157 1.17157 0.5 2 0.5C2.82843 0.5 3.5 1.17157 3.5 2ZM8.5 2C8.5 2.82843 7.82843 3.5 7 3.5C6.17157 3.5 5.5 2.82843 5.5 2C5.5 1.17157 6.17157 0.5 7 0.5C7.82843 0.5 8.5 1.17157 8.5 2ZM11.999 3.5C12.8274 3.5 13.499 2.82843 13.499 2C13.499 1.17157 12.8274 0.5 11.999 0.5C11.1706 0.5 10.499 1.17157 10.499 2C10.499 2.82843 11.1706 3.5 11.999 3.5Z" fill="currentColor"></path></svg>
                                </button>
                            </div>
                            <div>
                                <span className="text-gradient">1 ETH</span><span style={{color:"#ccc"}}> / 1 of 3</span>
                            </div>
                            <div>
                                <button>{this.item.category}</button><button><span className="text-gradient">Unlockable</span></button>
                            </div>
                            <p><text>{this.item.description}</text></p>
                            <Tabs defaultActiveKey="1">
                                <TabPane key="1" tab={<span>Details</span>}>
                                    <span style={{color:"#ccc"}}>Owner</span><br/>
                                    <div style={{display:"flex",alignItems:'center'}}>
                                        <img className={styles.avatar} src={this.item.owner.avatar}/>
                                        <span style={{flex:"1"}}>{this.item.owner.name}</span>
                                    </div>
                                </TabPane>
                                <TabPane key="2" tab={<span>Bids</span>}>
                                    Bids
                                </TabPane>
                                <TabPane key="3" tab={<span>Owners</span>}>
                                    Owners
                                </TabPane>
                                <TabPane key="4" tab={<span>History</span>}>
                                    History
                                </TabPane>
                            </Tabs>
                        </div>
                        <div className={styles.footer}>
                            <div style={{display:"flex"}}>
                                <button style={{color:"#ffffff",border:"0px",fontSize:"15px",backgroundColor:"#0066ff"}}>Buy</button>
                                <button style={{color:"#0066ff",border:"0px",fontSize:"15px",backgroundColor:"#0066ff26"}}>Place a bid</button>
                            </div>
                            <center>Service fee 2.5%. 1.025 ETH (~$4,383.71)</center>
                        </div>
                    </div>
                
                </div>
            </div></>
        )
    }
}