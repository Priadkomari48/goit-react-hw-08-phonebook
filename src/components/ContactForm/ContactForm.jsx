import { useDispatch, useSelector } from "react-redux";

import { useState } from "react";
//import propTypes from "prop-types";
import style from "./ContactForm.module.css"

import { addContactOp } from "redux/contacts/ops";
import { selectStatus } from "redux/contacts/contactsSlice";

const INIT_STATE = {
    name: "",
    number: "", //phone
}

export default function ContactForm (/*{onSubmit}*/) {
    const [contact, setContact] = useState({...INIT_STATE})
    //state = { ...INIT_STATE };

    const dispatch = useDispatch();

    function onInputChange(event) {
        const { name, value } = event.currentTarget;
        // const inputValue = event.currentTarget.value;
        setContact({...contact, [name]: value });
    };

    function onFormSubmit(event) {
        event.preventDefault();
        
        //dispatch(addContact(contact));
        dispatch(addContactOp(contact));
        setContact({ ...INIT_STATE });
    };

    const reduxStatus = useSelector(selectStatus);

    function isAdding() {
        if (reduxStatus === "adding") {
            return true;
        }
        return false;
    }

    function submitButtonTitle() {
        if (reduxStatus === "adding") {
            return "Adding...";
        }
        return "Add contact";
    }

    return (
        <form action="submit" className={style.formAddContact} onSubmit={onFormSubmit}>
            <label className={style.formLabel}>Name
                <input
                    type="text"
                    name="name"
                    pattern="^[a-zA-Zа-яА-Я]+(([' -][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*)*$"
                    title="Name may contain only letters, apostrophe, dash and spaces. For example Adrian, Jacob Mercer, Charles de Batz de Castelmore d'Artagnan"
                    required
                    onChange={onInputChange}
                    value={contact.name}
                    className={style.formInput}
                />
            </label>
            
            <label className={style.formLabel}>Phone number
                <input
                    type="tel"
                    name="number"
                    pattern="\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}"
                        title="Phone number must be digits and can contain spaces, dashes, parentheses and can start with +"
                    required
                    onChange={onInputChange}
                    value={contact.number}
                    className={style.formInput}
                />
            </label>
            
            <button type="submit" className={style.formBtnSubmit} disabled={isAdding()}>{ submitButtonTitle()}</button>
        </form>
    );
}

ContactForm.propTypes = {
    //onSubmit: propTypes.func.isRequired,
}