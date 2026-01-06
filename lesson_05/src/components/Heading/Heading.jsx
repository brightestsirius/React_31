import React, { useContext } from "react";

import ThemeContext from "../../contexts/ThemeContext";

export default function Heading() {
  const { color } = useContext(ThemeContext);

  return <h1 style={{ color }}>Hello, world!</h1>;
}
