import { combineReducers } from "@reduxjs/toolkit";
import { persistReducer } from "redux-persist";
import storage from 'redux-persist/lib/storage'; // defaults to localStorage for web

import userReducer, {INIT_USER} from "./user";
import errorReducer from "./error";
import loginStatus from "./loginStatus";
import restoringSession from "./restoringSession";

//using nested persistReducer to store only user/token
const persistTokenConfig = {
  key: 'user',
  storage,
  whitelist: ['token'],
}

const persistedUserReducer = persistReducer(persistTokenConfig, userReducer);

//we persist only userReducer. From the outside nothing should change
const authReducer = combineReducers({
  user: persistedUserReducer,
  error: errorReducer,
  isLoggedIn: loginStatus,
  isRestoringSession: restoringSession,
});

const INIT_AUTH = {
  user: INIT_USER,
  error: null,
  isLoggedIn: false,
  isRestoringSession: false,
};

const selectIsLoggedIn = (state) => state.auth.isLoggedIn;
const selectUserName = (state) => state.auth.user.user.name;
const selectUserEmail = (state) => state.auth.user.user.email;
const selectUserToken = (state) => state.auth.user.token;
const selectIsRestoringSession = (state) => state.auth.isRestoringSession;

export {INIT_AUTH};
export { selectIsLoggedIn, selectIsRestoringSession, selectUserName, selectUserEmail, selectUserToken };
export default authReducer;