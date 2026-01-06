import React, { useState } from "react";
import UserForm from "./components/UserForm/UserForm";
import UserCard from "./components/UserCard/UserCard";
import ColorPicker from "./components/ColorPicker/ColorPicker";
import Heading from "./components/Heading/Heading";

export default function App() {
  const [user, setUser] = useState(null);
  const [color, setColor] = useState(null);

  return (
    <>
      <ColorPicker liftingColor={setColor} />
      <Heading color={color} />
      <UserForm liftingUser={setUser} />
      <UserCard user={user} color={color} />
    </>
  );
}
