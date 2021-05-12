import styles from '../styles/hotcollection.module.css';
export default function HCItem(props){
    return (
        <div className={styles.item}>
            <div>
                <img style={{height:"100%",width:"auto",margin:"0px auto"}} src={props.item.coverpic}/>
            </div>
            <div style={{borderTop:"1px solid #ccc"}}>
                <div className={styles.avatar}>
                    <img alt="Identicon" src={props.item.profpic} loading="lazy" className="sc-eirseW evgNzS"/>
                </div>
                <div style={{padding:"0px 10px",marginTop:"-35px"}}>
                    <span>{props.item.title}</span>
                    <span>{props.item.subtitle}</span>
                </div>
            </div>
        </div>
    );
}