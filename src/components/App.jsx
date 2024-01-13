//import {useState} from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import { lazy, Suspense, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";

import { selectIsLoggedIn, selectIsRestoringSession } from "redux/auth/authSlice";
import { refreshUserOp } from "redux/auth/ops";

import NavBar from "./NavBar";
import UserMenu from "./UserMenu";
import LoginMenu from "./LoginMenu/LoginMenu";
import { RestrictedRoute, PrivateRoute } from "./Routes";
import NotFoundPage from "./Layouts/NotFoundPage";
import style from "./App.module.css";

const ContactsPage = lazy(() => import("./Layouts/ContactsPage"));
const LoginPage = lazy(() => import("./Layouts/LoginPage"));
const RegisterPage = lazy(() => import("./Layouts/RegisterPage"));


export const App = () => {
  const isLoggedIn = useSelector(selectIsLoggedIn);
  const isRestoringSession = useSelector(selectIsRestoringSession);

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(refreshUserOp());
  }, [dispatch])

  return (
    <div
      style={{
        height: '100vh',
        fontSize: 20,
        color: '#010101',

        paddingLeft: 50,
        paddingRight: 50,
      }}
    >
      <header className={style.header}>
        <NavBar isLoggedIn={isLoggedIn}>
          {(isLoggedIn && !isRestoringSession) ?
            <UserMenu />
            :
            <LoginMenu />
          }
        </NavBar>
      </header> 

      {isRestoringSession ?
        <p>Restoring last session...</p>
        :
        <Routes>
          <Route exact path="/login" element={
            <RestrictedRoute fallbackRoute={"/contacts"}>
              <Suspense fallback={<p>Loading page...</p>}>
                <LoginPage />
              </Suspense>
            </RestrictedRoute>
          }/>

          <Route exact path="/register" element={
            <RestrictedRoute fallbackRoute={"/contacts"}>
              <Suspense fallback={<p>Loading page...</p>}>
                <RegisterPage />
              </Suspense>
            </RestrictedRoute>
          }/>

          <Route exact path="/contacts" element={
            <PrivateRoute fallbackRoute={"/login"}>
              <Suspense fallback={<p>Loading page...</p>}>
                <ContactsPage />
              </Suspense>
            </PrivateRoute>
          } />

          <Route exact path="/route-not-found" element={
            <NotFoundPage />
          } />

          <Route path="/" element={<Navigate to={"/login"} replace={true} />} /> 

          <Route path="*" element={<Navigate to={"/route-not-found"} replace={true} />} />         
        </Routes>
      }
      
      <ToastContainer />
    </div>
  );
};
