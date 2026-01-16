import React, { useContext, useEffect } from "react";
import { useLocation, useNavigate } from "react-router";

import AuthContext from "../../contexts/AuthContext";

import { AUTH_LOGIN, AUTH_LOGOUT } from "../../store/authSlice";

export default function AuthButton() {
  const { state, dispatch } = useContext(AuthContext);
  const location = useLocation();
  const navigate = useNavigate();

  const handleClick = () =>
    dispatch({ title: state.isLogin ? AUTH_LOGOUT : AUTH_LOGIN }); // {title} action

  useEffect(() => {
    if (state.isLogin && location.state && location.state.from) {
      navigate(location.state.from.pathname);
    }
  }, [state.isLogin]);

  return (
    <button onClick={handleClick}>{state.isLogin ? `Logout` : `Login`}</button>
  );
}
