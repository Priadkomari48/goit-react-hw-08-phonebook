import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
//import { useNavigate } from "react-router-dom";

import { selectUserName, selectUserEmail } from "redux/auth/authSlice";
import { logoutUserOp } from "redux/auth/ops";
import Button from "components/Button";

import style from "./UserMenu.module.css";

export default function UserMenu(props) {
  
  const userEmail = useSelector(selectUserEmail);
  const userName = useSelector(selectUserName);
  const dispatch = useDispatch();
  //const navigate = useNavigate();

  async function logout() {
    //dispatch logout
    /*const result = await */dispatch(logoutUserOp()); //token is retrieved inside op
    /*if (result?.meta?.requestStatus === "fulfilled") {
      navigate("/");
    }*/
  }

  return (
    <div className={style.container}>
      <p className={style.greeting}>
        Logged in as {userEmail}.
        <br />
        Hi, {userName}!
      </p>
      <Button type={"button"} onClick={logout} label={"Log out"}/>
      
      {/* <button type="button" onClick={logout}>Logout</button> */}
    </div>
    );
}