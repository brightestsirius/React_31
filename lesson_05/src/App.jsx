import React, { useState } from "react";

import Heading from "./components/Heading/Heading";
import ColorPicker from "./components/ColorPicker/ColorPicker";

import UserForm from "./components/UserForm/UserForm";
import UserCard from "./components/UserCard/UserCard";

export default function App() {
  const [user, setUser] = useState({
    name: `Daria`,
    allowEmail: true,
  });
  const [color, setColor] = useState(null);

  return (
    <>
      <Heading color={color} />
      <ColorPicker liftingColor={setColor} />
      <UserForm user={user} setUser={setUser} />
      <UserCard user={user} />
    </>
  );
}
