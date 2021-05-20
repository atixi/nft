import styles from '../styles/dropdown.module.css';
import { Menu, Dropdown } from 'antd';


export default function AppDropdown(props){

    return(
        <Dropdown className={styles.dropdown} overlayClassName={styles.dropdown} overlay={props.menu} trigger={['click']}>
            <a className="ant-dropdown-link" onClick={e => e.preventDefault()}>
                {props.trigger}
            </a>
        </Dropdown>
    );
}