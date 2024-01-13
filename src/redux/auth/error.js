import { createReducer } from "@reduxjs/toolkit";
import { toast } from "react-toastify";

import { registerUserOp, loginUserOp, logoutUserOp, refreshUserOp } from "./ops";

const userError = createReducer(null, {
  [registerUserOp.rejected]: (error, action) => {
    if (action.payload) {
      //extended Axios error processing
      const { data } = action.payload;

      const extendedReason = (data.name === "MongoError" && data.code === 11000) ? "This user is already registered. Try logging in." : "Re-check your registration data.";

      toast.error(
        <>
          <p>Unable to register a user.</p>
          <p>{extendedReason}</p>
        </>
        /*`Unable to register a user. ${extendedReason}`*/
      );
      return action.payload; //write extended error info into redux
    }
    const { code, message } = action.error;
    toast.error(`Unable to register a user. Server responded with code ${code} and message: ${message}.`);
    return action.error; //write error into redux
  },

  [loginUserOp.rejected]: (error, action) => {
    if (action.payload) {
      //extended Axios error processing
      const { status, statusText } = action.payload;
      toast.error(<>
        <p>Login failed. Re-check your login data.</p>
        <p>Error code {status}, message: {statusText}</p>
      </>
        /*`Login failed. Re-check your login data. \n\n Error code ${status}, message: ${statusText}`*/
      );

      return action.payload;
    }
    const { code, message } = action.error;
    toast.error(`Login failed. Server responded with code ${code} and message: ${message}.`);
    return action.error; //write error into redux
  },

  [logoutUserOp.rejected]: (error, action) => {
    if(action.payload) {
      //extended Axios error processing
      const { status, statusText } = action.payload;
      let extendedReason = `Error code ${status}, message: ${statusText}`;
      if (status === 401) {
        extendedReason = "You have already logged out or your current token is invalid."
      }
      toast.error(<>
        <p>Logout failed.</p>
        <p>{extendedReason}</p>
      </>
      );

      return action.payload;
    }
    const { code, message } = action.error;
    toast.error(`Logout failed. Server responded with code ${code} and message: ${message}.`);
    return action.error; //write error into redux
  },

  [refreshUserOp.rejected]: (error, action) => {
    if(action.payload) {
      //extended Axios error processing
      const { status, statusText } = action.payload;
      let extendedReason = `Error code ${status}, message: ${statusText}`;
      if (status === 401) {
        extendedReason = "You are logged out or your current token is invalid."
      }

      toast.error(<>
        <p>Restoring session failed.</p>
        <p>{ extendedReason}</p>
      </>
      );

      return action.payload;
    }
    const { code, message } = action.error;
    toast.error(`Restoring session failed. Server responded with code ${code} and message: ${message}.`);
    return action.error; //write error into redux
  },
});

export default userError;