import { createAsyncThunk } from "@reduxjs/toolkit";

import { loginUser } from "js/connectionsAPI";

import { filterAxiosError } from "js/serializeAxiosData";

export const loginUserOp = createAsyncThunk(
  "auth/loginUser",
  async (userCreds, thunkAPI) => {
    let response;
    try {
      response = await loginUser(userCreds);
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