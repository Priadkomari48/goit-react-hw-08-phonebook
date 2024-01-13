import { createSlice } from "@reduxjs/toolkit";

const contactFilterSlice = createSlice({
  name: "filter",
  initialState: "",
  reducers: {
    updateFilter(filter, action) {
      if (action.payload === filter) { 
        return filter;
      }

      return action.payload; //if using combineReducers with primitive values as state slices, we MUST return a value since Immer can't pick it up for us
      //at least I think that's what happens
    },
  },
});

export const { updateFilter } = contactFilterSlice.actions;
export default contactFilterSlice.reducer;