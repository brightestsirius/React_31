import React from "react";

export default function UserCard({ user }) {
  return user ? (
    <ul className="card">
      {Object.keys(user).map((key) => (
        <li key={key}>
          {key}: {String(user[key])}
        </li>
      ))}
    </ul>
  ) : null;
}
