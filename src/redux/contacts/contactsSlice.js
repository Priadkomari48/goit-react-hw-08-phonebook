import { combineReducers } from "@reduxjs/toolkit";

import filterReducer from "./filter";
import itemsReducer from "./items";
import { contactStatus } from "./status";
import { contactError } from "./error";

const contactsReducer = combineReducers({
  items: itemsReducer,
  filter: filterReducer,
  status: contactStatus,
  error: contactError,
});

const selectItems = (state) => state.contacts.items;
function selectFilter(state) {
  return state.contacts.filter;
}
const selectStatus = (state) => state.contacts.status;

export { selectItems, selectFilter, selectStatus }; //slice selectors
export default contactsReducer; //slice reducer