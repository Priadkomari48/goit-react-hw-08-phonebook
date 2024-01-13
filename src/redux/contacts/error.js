import { createReducer } from "@reduxjs/toolkit";
import { toast } from "react-toastify";

import { getContactsOp, addContactOp, deleteContactOp } from "./ops";

export const contactError = createReducer(null, {
  [getContactsOp.rejected]: (error, action) => {
     if (action.payload) {
      //extended Axios error processing
      const { status, statusText } = action.payload;

      const extendedReason = status === 401? "You are not logged in or your token is invalid." : "";

      toast.error(
        <>
          <p>Unable to retrieve contacts from the server.</p>
          <p>Error code {status}, message: {statusText}. {extendedReason}</p>
        </>
      );
      return action.payload; //write extended error info into redux
    }
    else {
      toast.error(`Failed to retrieve contacts from the server. Error code ${action.error.code}, message: ${action.error.message}.`, { autoClose: 2000 });
    }
    return action.error; //write error into status
  },

  [addContactOp.rejected]: (error, action) => {
    toast.error(`Failed to add contact to the server. Error code ${action.error.code}, message: ${action.error.message}.`, {autoClose: 2000});
    return action.error; //write error into status
  },

  [deleteContactOp.rejected]: (error, action) => {
    toast.error(`Failed to delete contact from the server. Error code ${action.error.code}, message: ${action.error.message}.`, {autoClose: 2000});
    return action.error; //write error into status
  },
});