import propTypes from "prop-types";

import style from "./Button.module.css";

export default function Button({ type, onClick, label, disabled = false, ...props}) {
  return (
    <button type={type} onClick={onClick} disabled={disabled} className={style.btn}>
      {label}
    </button>
  );
}

Button.propTypes = {
  type: propTypes.oneOf(["button", "submit", "reset", "menu"]).isRequired,
  onClick: propTypes.func,
  label: propTypes.string,
  disabled: propTypes.bool,
}