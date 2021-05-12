import styles from '../styles/dropdown.module.css';

export default function(props){
    return(
    <span className={styles.dropdown}>
        <button className={props.trigger.className} style={{...props.trigger.style,boxSizing:"content-box"}}>{props.trigger.title}</button>
        <label>
            <input type="checkbox"/>
            {props.children}
        </label>
    </span>);
}