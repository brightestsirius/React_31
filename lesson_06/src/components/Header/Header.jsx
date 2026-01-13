import React from "react";
import { NavLink } from "react-router";

export default function Header() {
  const getClassName = ({ isActive }) => {
    const classes = [`nav__item`];
    isActive && classes.push(`nav__item--active`);
    return classes.join(` `);
  };

  return (
    <header>
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
        </ul>
      </nav>
    </header>
  );
}
