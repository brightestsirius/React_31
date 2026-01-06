import React, { useContext } from "react";

import ThemeContext from "../../contexts/ThemeContext";

export default function ThemeStyle() {
  const { color, setColor } = useContext(ThemeContext);

  return (
    <form className="form">
      <label>
        Set theme color:{" "}
        <input
          type="color"
          defaultValue={color}
          onChange={(e) => setColor(e.target.value)}
        />
      </label>
    </form>
  );
}
