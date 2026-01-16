import React from "react";
import Navigation from "./Navigation";
import AuthButton from "../AuthButton/AuthButton";

export default function Header() {
  return (
    <header>
      <Navigation />
      <AuthButton />
    </header>
  );
}
