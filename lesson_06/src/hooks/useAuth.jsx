import React, { useState } from "react";

export default function useAuth() {
  const [isAuth, setIsAuth] = useState(false);

  const login = () => setIsAuth(true);
  const logout = () => setIsAuth(false);

  return { isAuth, login, logout };
}