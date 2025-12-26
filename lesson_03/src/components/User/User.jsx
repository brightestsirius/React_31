import React, { useState, useEffect } from "react";

//🟢🟡🔴💚💔

export default function User() {
  const [user, setUser] = useState({
    name: `SuperUser`,
    email: `oleg@gmail.com`,
  });

  const changeEmail = () => {
    const email = prompt(`Enter email`, `katya@gmail.com`);
    setUser((prevState) => ({ ...prevState, email }));
  };

  const changeName = () => {
    const name = prompt(`Enter name`, `Katya`);
    setUser((prevState) => ({ ...prevState, name }));
  };

  useEffect(() => {
    console.log(`💚 Establish connection with ${user.email}`);

    return () => {
        console.log(`💔 Terminate connection with ${user.email}`);
    }
  }, [user.email])

  return (
    <>
      <ul>
        <li>Name: {user.name}</li>
        <li>Email: {user.email}</li>
      </ul>
      <button onClick={changeName}>Change name</button> <button onClick={changeEmail}>Change email</button>
    </>
  );
}
