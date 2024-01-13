//import { useSelector } from "react-redux";

//import { getContacts } from "js/connectionsAPI";
//import { selectUserToken } from "redux/auth/authSlice";

import ContactForm from "../ContactForm";
import Filter from "../Filter";
import ContactList from "../ContactList";


export default function ContactsLayout(props) {
  /*const token = useSelector(selectUserToken);

  console.log(token);*/
  return (
    <>
      <h1>Phonebook</h1>
      <ContactForm
        //onSubmit={(newContact) => {addContact(newContact)}}
      />

      <h2>Contacts</h2>

      <Filter
        //value={filter}
        //onChange={onFilterChange}
      />

      <ContactList
        //contacts={contacts}
        //filter={filter}
      />
    </>
  )
}