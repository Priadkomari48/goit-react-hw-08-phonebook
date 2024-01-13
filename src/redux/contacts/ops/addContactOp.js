import { createAsyncThunk } from "@reduxjs/toolkit";

import { postContact } from "js/connectionsAPI";
import { filterAxiosError } from "js/serializeAxiosData";
import { selectUserToken } from "redux/auth/authSlice";

import { toast } from "react-toastify";

export const addContactOp = createAsyncThunk(
  "items/addContact",
  async (contact, thunkAPI) => {
    let response;
    const token = selectUserToken(thunkAPI.getState());

    try {
      response = await postContact(contact, token);
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

    return response.data;
  },
  {
    condition: (contact, { getState, extra }) => {
      //pre-check against current Redux state: what if the contact already exists? Comparison by name.
      //Normally a backend should do this but mockapi, being a "test api", is not capable of that
      const { contacts } = getState();

      const contactList = (contacts && contacts.items) ? contacts.items : [];
      
      const { name: newName } = contact; //destruct new contact from payload
      const normalizedNewName = newName.toLowerCase(); //check if the person already exists in contacts

      if ( contactList.some( (contact) => {
        return contact.name.toLowerCase() === normalizedNewName;
      }
      )) {
        toast.error(`${newName} is already in contacts.`, {autoClose: 2000}); //new error message with react-toastify
        return false; //abort POST
      };
    },
  },
);