import React, { useState, useContext } from "react";

import UserContext from "../../contexts/UserContext";

export default function UserForm() {
  const [formUser, setFormUser] = useState(null);

  const { user, setUser } = useContext(UserContext);

  const handleSubmit = (e) => {
    e.preventDefault();

    setUser(formUser);
  };

  return (
    <form className="form" onSubmit={handleSubmit}>
      <label>
        Name:{" "}
        <input
          type="text"
          onChange={(e) =>
            setFormUser((prevState) => ({ ...prevState, name: e.target.value }))
          }
        />
      </label>
      <button>Submit</button>
    </form>
  );
}
