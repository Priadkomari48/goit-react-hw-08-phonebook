import { /*createAction, createReducer,*/  createSlice } from "@reduxjs/toolkit";
//import { nanoid } from "nanoid";
//import { toast } from "react-toastify";

import { getContactsOp, addContactOp/*, deleteContactOp*/ } from "./ops";

export const contactItemsSlice = createSlice({
  name: "items",
  initialState: null,
  reducers: {
    deleteContactFromRedux: (items, action) => {
      const id = action.payload; //ID of the successfully deleted contact
      return items.filter((contact) => {
        return contact.id !== id;
      });
    },
  },
  extraReducers: {
    [getContactsOp.fulfilled]: (items, action) => {
      return action.payload; //full rewrite of contacts/items - IMMER does NOT process this
    },

    /*[getContactsOp.rejected]: (items, action) => {
      if (action.error.code === "ERR_BAD_REQUEST") {
        return []; //init with empty array
      }
      return items;
    },*/

    [addContactOp.fulfilled]: (items, action) => {
      if (!items) { //first contact ever?
        return [action.payload];
      }
      return [...items, action.payload]; //without IMMER - for practice
    },
    /*[deleteContactOp.fulfilled]: (items, action) => {
      const { id } = action.payload; //ID of the successfully deleted contact
      return items.filter((contact) => {
        return contact.id !== id;
      });
    },*/
  }
});

export const { deleteContactFromRedux } = contactItemsSlice.actions;

export default contactItemsSlice.reducer;