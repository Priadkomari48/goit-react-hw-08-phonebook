import { createAsyncThunk } from "@reduxjs/toolkit";

import { fetchContacts } from "js/connectionsAPI";
import { filterAxiosError } from "js/serializeAxiosData";
import { selectUserToken } from "redux/auth/authSlice";

export const getContactsOp = createAsyncThunk(
  "items/getContacts",
  async (args, thunkAPI) => {
    let response;
    const token = selectUserToken(thunkAPI.getState());

    try {
      response = await fetchContacts(token);
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

    /*const contacts = (response.data === "Not found") ? [] : response.data;*/

    return response.data; //contacts;
  },
  {
    condition: ( _, { getState, extra }) => {
      //pre-check if a fetch is already ongoing
      const { contacts } = getState();

      const { status } = contacts;
      if (status !== "idle" && status !== "success" && status !== "error") {
        //toast.warn(`Another operation - ${status} - is in progress. Try again later.`);
        return false;
      };
      return true;
    },
  }
)