import React, { useContext } from "react";
import { NavLink } from "react-router";

import AuthContext from "./../../contexts/AuthContext";

export default function Navigation() {
  const { state } = useContext(AuthContext);

  const getClassName = ({ isActive }) => {
    const classes = [`nav__item`];
    isActive && classes.push(`nav__item--active`);
    return classes.join(` `);
  };

  return (
    <nav>
      <ul>
        <li>
          <NavLink to="/" className={getClassName}>
            Home
          </NavLink>
        </li>
        <li>
          <NavLink to="/todos" className={getClassName}>
            Todos
          </NavLink>
        </li>
        {state.isLogin ? (
          <li>
            <NavLink to="/account" className={getClassName}>
              Account
            </NavLink>
          </li>
        ) : null}
      </ul>
    </nav>
  );
}
