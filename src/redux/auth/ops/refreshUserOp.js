import { createAsyncThunk } from "@reduxjs/toolkit";

import { refreshUser } from "js/connectionsAPI";
import { selectUserToken, /*selectIsRestoringSession*/ } from "../authSlice";

import { filterAxiosError } from "js/serializeAxiosData";

export const refreshUserOp = createAsyncThunk(
  "auth/refreshUser",
  async (_, thunkAPI) => {
    let response;

    const state = thunkAPI.getState();
    const token = selectUserToken(state);

    try {
      response = await refreshUser(token);
    }
    catch (error) {
      if (error.name === "AxiosError") {
        const serializedError = filterAxiosError(error);
        //console.log(serializedError);
        return thunkAPI.rejectWithValue(serializedError);
      }
      else {
        throw error; //throw further
      }
    }

    return response.data;
  },

  {
    condition: (args, { getState, extra }) => {
      //pre-check if we have a token, no need to "refresh" something that doesn't exist
      const token = selectUserToken(getState());

      
      if (!token) {
        return false; //abort refresh
      }  
      /*
      //pre-check if a fetch is already ongoing
      const isRestoringSession = selectIsRestoringSession(getState());
      if (isRestoringSession === true) {
        //toast.warn(`Restoring session in progress. Ignoring duplicate dispatch.`);
        return false;
      };
      */
      return true;
    }
  }
)