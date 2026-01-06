import React, { useState } from "react";

export default function UserForm({ liftingUser }) {
  const [user, setUser] = useState({
    name: `Daria`,
    allowEmail: true,
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    liftingUser(user);
  };

  const handleUserName = (e) =>
    setUser((prevState) => ({ ...prevState, name: e.target.value }));

  const handleUserEmail = (e) =>
    setUser((prevState) => ({ ...prevState, allowEmail: e.target.checked }));

  return (
    <form onSubmit={handleSubmit} className="form">
      <label>
        Name:{" "}
        <input type="text" defaultValue={user.name} onChange={handleUserName} />
      </label>
      <label>
        Allow email:{" "}
        <input
          type="checkbox"
          defaultChecked={user.allowEmail}
          onChange={handleUserEmail}
        />
      </label>
      <button>Submit</button>
    </form>
  );
}