import React, { useContext } from "react";

import UserContext from "../../contexts/UserContext";

export default function UserCard() {
  const { user } = useContext(UserContext);

  return user ? (
    <ul className="card">
      {Object.keys(user).map((key) => (
        <li key={key}>
          {key}: {user[key]}
        </li>
      ))}
    </ul>
  ) : null;
}
