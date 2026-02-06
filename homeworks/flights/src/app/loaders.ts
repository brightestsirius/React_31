import { redirect } from "react-router";

export function requireAuthLoader() {
  const token = localStorage.getItem("authToken");
  if (!token) throw redirect("/login");
  return null;
}