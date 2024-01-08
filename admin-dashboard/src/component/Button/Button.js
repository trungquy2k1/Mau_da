import styles from './Button.module.css';
function Button(props) {
    return (
        <div className={styles.containerbutton}>
            <button className={styles.button} onClick={props.onClick}>
                <span className={styles.txtbtn}>{props.title}</span>
            </button>
        </div>
    );
}

export default Button;
