import React, { useContext } from "react";

import UserContext from "../../contexts/UserContext";
import ThemeContext from "../../contexts/ThemeContext";

export default function UserBanner() {
  const { user } = useContext(UserContext);
  const { color } = useContext(ThemeContext);

  return user ? (
    <div className="card" style={{ color }}>
      User Banner: {user.name}
    </div>
  ) : null;
}
