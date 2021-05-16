import styles from '../styles/dropdown.module.css';

export default function(props){
    return(
    <span className={styles.dropdown}>
        {props.trigger}
        <label>
            <input type="checkbox"/>
            {props.children}
        </label>
    </span>);
}