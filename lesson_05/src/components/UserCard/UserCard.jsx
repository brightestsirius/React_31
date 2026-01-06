import React from "react";

export default function UserCard({ user, color }) {
  return user ? (
    <ul className="card" style={{ color }}>
      {Object.keys(user).map((key) => (
        <li key={key}>
          {key}: {String(user[key])}
        </li>
      ))}
    </ul>
  ) : null;
}
