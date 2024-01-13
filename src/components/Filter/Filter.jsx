//import debounce from "debounce";
import { useSelector, useDispatch } from "react-redux";

//import propTypes from "prop-types";
import styles from "./Filter.module.css";

import { updateFilter } from "redux/contacts/filter";
import { selectFilter } from "redux/contacts/contactsSlice";

const Filter = (/*{ value, onChange }*/) => {
  const value = useSelector(selectFilter);

  const dispatch = useDispatch();

  function onFilterChange(event) {
    //todo debounce
    dispatch(updateFilter(event.currentTarget.value));

  }

    return (<label>Filter contacts:
              <input
                type="text"
                name="filter"
                onChange={onFilterChange}
                value={value}
                className={styles.inputFilter}
              />
            </label>);
}

Filter.propTypes = {
    //value: propTypes.string,
    //onChange: propTypes.func,
}

export default Filter;