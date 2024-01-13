import { useSelector, useDispatch } from "react-redux";
import { useState, useEffect } from "react";

import ContactItem from "../ContactItem";
//import propTypes from "prop-types";
import styles from "./ContactList.module.css"

/*import { selectItems } from "../../redux/contacts/items";
import { selectFilter } from "redux/contacts/filter";
import { selectStatus } from "redux/contacts/status";*/
import { selectItems, selectFilter, selectStatus } from "redux/contacts/contactsSlice";

import { getContactsOp/*, deleteContactOp */} from "redux/contacts/ops";
import { deleteContactWithFeedback } from "redux/contacts/ops/deleteContactOp";

const ContactList = () => {
    const [isContactFetched, setIsContactFetched] = useState(false);

    const lowCaseFilter = useSelector(selectFilter).toLowerCase();

    const dispatch = useDispatch();
    
    const contacts = useSelector(selectItems);
    const contactStatus = useSelector(selectStatus);

    useEffect(() => {
        //let promise = null;
        if (!isContactFetched) {
            /*promise = */dispatch(getContactsOp());
            //console.log(promise);
            setIsContactFetched(true);
        }   
        return () => {
            /*if (promise !== null) {
               promise.abort(); 
            }*/
            //setIsContactFetched(false);
        }
    }, [isContactFetched, dispatch]);

    /*function deleteContactById(id) {
        //console.log(`Trying to delete contact ${id}`);
        //dispatch(deleteContactOp(id))
        deleteContactWithFeedback(id);
        
    }*/

    return (<>
        {(contactStatus === "loading") && <p>[Loading contacts]</p>}
        {(contacts && (contacts.length === 0)) &&
            <p>No contacts so far...</p>}
        {(contacts && (contacts.length > 0)) &&
            <ul className={styles.contactList}>
                {contacts.map((contact) => {
                    // console.log(`${contact.name.toLowerCase()} includes ${lowCaseFilter}: ${contact.name.toLowerCase().includes(lowCaseFilter)}`);
                    return (contact.name.toLowerCase().includes(lowCaseFilter) &&
                        <li key={contact.id} className={styles.contact}>
                            <ContactItem
                                name={contact.name}
                                number={contact.number}
                            />
                            <button
                                type="button"
                                onClick={() => deleteContactWithFeedback(contact.id)}
                                className={styles.btnDeleteContact}
                            >Delete contact
                            </button>
                        </li>);
                })}
            </ul>}  
    </>             
    );
}

ContactList.propTypes = {
    // contacts: propTypes.arrayOf(
    //     propTypes.shape({
    //         id: propTypes.string.isRequired,
    //         name: propTypes.string.isRequired,
    //         number:propTypes.string.isRequired,
    //     })
    // ).isRequired,
    //filter: propTypes.string,
}

export default ContactList;