import styles from './ContactItem.module.css';

const ContactItem = ({ name, number, onDelete }) => {
    return (<span className={styles.contact}>
        <span className={styles.contactName}>{name} :</span>
        {number}
    </span>);
}

export default ContactItem;