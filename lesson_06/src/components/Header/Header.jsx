import React, { useContext } from "react";
import { NavLink } from "react-router";

import AuthContext from "../../contexts/AuthContext";

export default function Header() {
  const { isAuth, login, logout } = useContext(AuthContext);

  const getClassName = ({ isActive }) => {
    const classes = [`nav__item`];
    isActive && classes.push(`nav__item--active`);
    return classes.join(` `);
  };

  const handleLogin = () => {
    isAuth ? logout() : login();
  };

  return (
    <header>
      <nav>
        <ul>
          <li>
            <NavLink to={`/`} className={getClassName}>
              Home
            </NavLink>
          </li>
          <li>
            <NavLink to={`/todos`} className={getClassName}>
              Todos
            </NavLink>
          </li>
          <li>
            <NavLink to={`/account`} className={getClassName}>
              Account
            </NavLink>
          </li>
        </ul>
      </nav>

      <button onClick={handleLogin}>{isAuth ? `Logout` : `Login`}</button>
    </header>
  );
}
