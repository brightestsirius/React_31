import React from "react";
import { useNavigate } from "react-router";

export default function NavigateButton({ title, path }) {
  const navigate = useNavigate();

  return <button onClick={() => navigate(path)}>{title}</button>;
}
