import { useSelector } from "react-redux";
import { Navigate, /*useLocation*/ } from "react-router-dom";
//import { toast } from "react-toastify";

import { selectIsLoggedIn } from "redux/auth/authSlice";

export default function PrivateRoute({ children, fallbackRoute = "/" }) {
  const isLoggedIn = useSelector(selectIsLoggedIn);
  //const location = useLocation();
  /*function showRedirectNote() {
    toast.warn("This page is unavailable to guests. Please log in or register.", {autoClose: 2000});
  }*/

  return (<>
    {isLoggedIn ? children :
      <>
        <Navigate to={fallbackRoute} /*state={ {from: location} } */ replace={true} />
        {/* {showRedirectNote()} */}
      </>   
    }
  </>
  );
}