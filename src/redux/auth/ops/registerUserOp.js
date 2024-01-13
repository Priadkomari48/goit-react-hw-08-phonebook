import { createAsyncThunk } from "@reduxjs/toolkit";

import { registerUser } from "js/connectionsAPI";

import { filterAxiosError } from "js/serializeAxiosData";

export const registerUserOp = createAsyncThunk(
  "auth/registerUser",
  async (newUserCreds, thunkAPI) => {
    let response;
    try {
      response = await registerUser(newUserCreds);
    }
    catch (error) {
      if (error.name === "AxiosError") {
        const serializedError = filterAxiosError(error);
        //console.log(serializedError);
        return thunkAPI.rejectWithValue(serializedError);
      }
      else {
        throw error;
      }
    }
 
    //does not work, as Axios throws an error on bad status automatically, and RTK auto-rejects the promise
    //if Axios is not used, can be helpful!
    if (response.status !== 201) {
      //400 - error creating user
      //500 - server error
      return thunkAPI.rejectWithValue(response);
      //if POST fails, reject promise explicitly
    }
    return response.data;
  },
)