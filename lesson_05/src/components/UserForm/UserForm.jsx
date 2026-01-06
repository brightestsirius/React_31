import React, { useRef } from "react";

export default function UserForm({ user, setUser }) {
  const inputNameRef = useRef();
  const inputAllowEmailRef = useRef();

  const handleSubmit = (e) => {
    e.preventDefault();
    setUser({
      name: inputNameRef.current.value,
      allowEmail: inputAllowEmailRef.current.checked,
    });
  };

  return (
    <form className="form" onSubmit={handleSubmit}>
      <label>
        Name: <input type="text" defaultValue={user.name} ref={inputNameRef} />
      </label>
      <label>
        Allow email:{" "}
        <input
          type="checkbox"
          defaultChecked={user.allowEmail}
          ref={inputAllowEmailRef}
        />
      </label>
      <button>Submit</button>
    </form>
  );
}
