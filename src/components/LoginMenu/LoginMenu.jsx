import { NavLink } from "react-router-dom";

import { navLinkStyle } from "components/NavBar/NavBar";

export default function LoginMenu() {
  return (
    <div>
      <NavLink end to={'/login'} className={({ isActive }) => navLinkStyle(isActive)} >
        Login
      </NavLink>

      <NavLink end to={'/register'} className={({ isActive }) => navLinkStyle(isActive)} >
        Register
      </NavLink>
    </div>
  );
}