import React, { useState, useEffect } from "react";

// 🟢🟡🔴💚💔

export default function User({ removeComponent }) {
  const [user, setUser] = useState({
    name: `Oleh`,
    email: `oleh@gmail.com`,
  });

  useEffect(() => {
    console.log(`🟢 in componentDidMount`);

    return () => {
        console.log(`🔴 in componentWillUnmount`);
    }
  }, [])

  useEffect(() => {
    console.log(`💚 Establish connection with ${user.email}`);

    return () => {
      console.log(`💔 Terminate connection with ${user.email}`);
    };
  }, [user]);

  const changeEmail = () => {
    const email = prompt(`Enter email`, `katya@gmail.com`);
    setUser((prevState) => ({ ...prevState, email }));
  };

  return (
    <>
      <button onClick={removeComponent}>X</button>
      <ul>
        <li>Name: {user.name}</li>
        <li>
          Email: {user.email}{" "}
          <button onClick={changeEmail}>Change email</button>
        </li>
      </ul>
    </>
  );
}
