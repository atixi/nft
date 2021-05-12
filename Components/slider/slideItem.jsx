import styles from '../../styles/slider.module.css';
export default function SlideItem(props){
    return (<div className={styles.slideItem}>
        <div>
            <span className={styles.title}>{props.item.title}</span>
            <span className={styles.subtitle}>{props.item.subtitle}</span>
            <img src={props.item.image}/>
        </div>
    </div>);
}