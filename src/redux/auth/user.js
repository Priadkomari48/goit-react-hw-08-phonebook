import { createSlice } from "@reduxjs/toolkit";

import { registerUserOp, loginUserOp, logoutUserOp, refreshUserOp } from "./ops";

const INIT_USER = {
  user: {
    name: null,
    email: null,
  },
  token: null,
};

const userSlice = createSlice({
  name: "user",
  initialState: { ...INIT_USER },
  reducers: {
    resetToken(user) {
      return { ...user, token: null };
    },
  },
  extraReducers: {
    [registerUserOp.fulfilled]: (user, action) => {
      //console.log(action.payload);
      return action.payload;
    },

    [loginUserOp.fulfilled]: (user, action) => {
      return action.payload;
    },

    [logoutUserOp.fulfilled]: (user, action) => {
      return {...INIT_USER};
    },

    [refreshUserOp.fulfilled]: (user, action) => {
      return {...user, user: action.payload }; //could use IMMER but decided not to
    },
  },
});

export { INIT_USER };
export const { resetToken } = userSlice.actions;
export default userSlice.reducer;

