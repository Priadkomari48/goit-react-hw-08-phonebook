import { createAsyncThunk } from "@reduxjs/toolkit";

import { logoutUser } from "js/connectionsAPI";
import { selectUserToken } from "../authSlice";

import { filterAxiosError } from "js/serializeAxiosData";

export const logoutUserOp = createAsyncThunk(
  "auth/logoutUser",
  async (args, thunkAPI) => {
    let response;

    const state = thunkAPI.getState();
    const token = selectUserToken(state);

    try {
      response = await logoutUser(token);
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
)