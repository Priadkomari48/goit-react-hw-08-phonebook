import { useState } from "react";
import { useDispatch } from "react-redux";
//import { toast } from "react-toastify";

import { registerUserOp } from "redux/auth/ops/registerUserOp";

import style from "./RegisterPage.module.css";
import sharedFormStyle from "../ContactForm/ContactForm.module.css";

const INIT_CREDS = {
  name: "",
  email: "",
  password: "",
}

export default function RegisterPage(props) {
  const [credentials, setCredentials] = useState({ ...INIT_CREDS });

  const dispatch = useDispatch();

  function onInputChange(event) {
    const { name, value } = event.currentTarget;
    setCredentials({ ...credentials, [name]: value });

  }

  async function onFormSubmit(event) {
    event.preventDefault();

    /*if (credentials.password.length < 7) {
      toast.warn("Password length should be at least 7 symbols for safety reasons. Try something more complex.");
      return false;
    }*/

    dispatch(registerUserOp(credentials));

    setCredentials({ ...INIT_CREDS });
  }

  return (
    <form action="submit" onSubmit={onFormSubmit} className={[sharedFormStyle.formAddContact, style.form].join(" ")}>
      <label htmlFor="name" className={sharedFormStyle.formLabel}>
        Name
        <input
          type="text"
          name="name"
          required
          onChange={onInputChange}
          value={credentials.name}
          className={sharedFormStyle.formInput}
        />
      </label>
      <p className={ style.hint}>This name will be used to address you as a user</p>
      
      <label htmlFor="email" className={sharedFormStyle.formLabel}>
        E-mail
        <input
          type="email"
          name="email"
          required
          onChange={onInputChange}
          value={credentials.email}
          className={sharedFormStyle.formInput}
        />
      </label>
      <p className={ style.hint}>Will be used to log in</p>
      
      <label htmlFor="password" className={sharedFormStyle.formLabel}>
        Password
        <input
          type="password"
          name="password"
          required
          onChange={onInputChange}
          value={credentials.password}
          className={sharedFormStyle.formInput}
        />
      </label>   
      <p className={ style.hint}>Keep it safe!</p>

      <button type="submit" className={sharedFormStyle.formBtnSubmit}>Register</button>
    </form>
    );
}