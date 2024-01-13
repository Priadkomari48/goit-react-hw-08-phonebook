import { useSelector } from "react-redux";
import { Navigate, useLocation } from "react-router-dom";

import { selectIsLoggedIn } from "redux/auth/authSlice";

export default function RestrictedRoute({ children, fallbackRoute = "/" }) {
  const isLoggedIn = useSelector(selectIsLoggedIn);
  const location = useLocation();

  if (location.pathname === fallbackRoute) {
    throw new Error("RestrictedRoute should NOT redirect to itself!")
  }

  return (<>
    {!isLoggedIn ? children : <Navigate to={fallbackRoute} /*state={ {from: location} } */ replace={true}/>}
  </>
  );
}