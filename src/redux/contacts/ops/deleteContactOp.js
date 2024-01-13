import { createAsyncThunk } from "@reduxjs/toolkit";

import { delContact } from "js/connectionsAPI";
import { filterAxiosError, serializeAxiosData } from "js/serializeAxiosData";
import { selectUserToken } from "redux/auth/authSlice";
import { deleteContactFromRedux } from "../items";

import { storeDispatch } from "redux/store";

//since our backend doesn't return anything on deletion, dispatch deletion from redux store manually
export async function deleteContactWithFeedback(id) {
  //console.log(`Trying to delete contact ${id}`);
  const result = await storeDispatch(deleteContactOp(id));
  //console.log(result);
  if (result.meta.requestStatus === "fulfilled" && result.payload.status === 200) {
    storeDispatch(deleteContactFromRedux(id));
  }
}

export const deleteContactOp = createAsyncThunk(
  "items/deleteContact",
  async (id, thunkAPI) => {
    let response;
    const token = selectUserToken(thunkAPI.getState());

    try {
      response = await delContact(id, token);
    }
    catch (error) {
      if (error.name === "AxiosError") {
        const serializedError = filterAxiosError(error);
        return thunkAPI.rejectWithValue(serializedError);
      }
      else {
        throw error; //throw further
      }
    }
    const flatData = serializeAxiosData(response);

    return flatData;
  },
);