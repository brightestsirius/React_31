import React, { useState } from "react";

const DEFAULT_USER = {
  name: `John`,
  age: 20,
  country: `Ukraine`,
};

export default function User() {
  const [user, setUser] = useState(DEFAULT_USER);

  setTimeout(() => {
    setUser(prevState => ({ ...prevState, country: `Germany` }));
  }, 1000);

  return (
    <ul>
      {Object.keys(user).map((key) => (
        <li key={key}>
          {key}: {user[key]}
        </li>
      ))}
    </ul>
  );
}
