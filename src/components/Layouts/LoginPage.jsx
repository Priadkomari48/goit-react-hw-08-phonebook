import { useState } from "react";
import { useDispatch } from "react-redux";

import { loginUserOp } from "redux/auth/ops";

import style from "./RegisterPage.module.css";
import sharedFormStyle from "../ContactForm/ContactForm.module.css";

const INIT_CREDS = {
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

  function onFormSubmit(event) {
    event.preventDefault();

    //console.log(credentials);
    dispatch(loginUserOp(credentials));
    setCredentials({ ...INIT_CREDS });
  }

  return (
    <form action="submit" onSubmit={onFormSubmit} className={[sharedFormStyle.formAddContact, style.form].join(" ")}>
      <label className={sharedFormStyle.formLabel}>E-mail
        <input
          type="email"
          name="email"
          required
          onChange={onInputChange}
          value={credentials.email}
          className={sharedFormStyle.formInput}
        />
      </label>
      
      <label className={sharedFormStyle.formLabel}>Password
        <input
          type="password"
          name="password"
          required
          onChange={onInputChange}
          value={credentials.password}
          className={sharedFormStyle.formInput} 
        />
      </label>
      
      <button type="submit" className={sharedFormStyle.formBtnSubmit}>Log in</button>
    </form>
    );
}