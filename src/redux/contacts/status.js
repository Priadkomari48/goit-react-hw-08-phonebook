import { createReducer } from "@reduxjs/toolkit";

import { getContactsOp, addContactOp, deleteContactOp } from "./ops";

// idle | loading/adding/deleting | success | error
export const contactStatus = createReducer("idle", {
  [getContactsOp.pending]: (status, action) => {
    return "loading";
  },
  [getContactsOp.fulfilled]: (status, action) => {
    return "success";
  },
  [getContactsOp.rejected]: (status, action) => {
    return "error";
  },

  [addContactOp.pending]: (status, action) => {
    return "adding";
  },
  [addContactOp.fulfilled]: (status, action) => {
    return "success";
  },
  [addContactOp.rejected]: (status, action) => {
    return "error";
  },

  [deleteContactOp.pending]: (status, action) => {
    return "deleting";
  },
  [deleteContactOp.fulfilled]: (status, action) => {
    return "success";
  },
  [deleteContactOp.rejected]: (status, action) => {
    return "error";
  },
});