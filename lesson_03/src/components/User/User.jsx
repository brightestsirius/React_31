import React, { useState, useEffect, useRef } from "react";

// 🟢🟡🔴💚💔

export default function User() {
  const [user, setUser] = useState({
    name: `Oleh`,
    email: `oleh@gmail.com`,
  });

  const prevUser = useRef(user);

  const changeName = () => {
    const name = prompt(`Enter name`, `Katya`);
    setUser((prevState) => ({ ...prevState, name }));
  };

  const changeEmail = () => {
    const email = prompt(`Enter email`, `katya@gmail.com`);
    setUser((prevState) => ({ ...prevState, email }));
  };

  useEffect(() => {
    if(prevUser.current.email !== user.email){
        console.log(`💔 Terminate connection with ${prevUser.current.email}`);
    }

    console.log(`💚 Establish connection with ${user.email}`);
    prevUser.current.email = user.email;
  }, [user.email])

  return (
    <ul>
      <li>Name: {user.name} <button onClick={changeName}>Change name</button></li>
      <li>
        Email: {user.email} <button onClick={changeEmail}>Change email</button>
      </li>
    </ul>
  );
}
