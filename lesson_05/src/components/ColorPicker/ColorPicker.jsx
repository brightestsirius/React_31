import React, { useState, useEffect } from "react";

export default function ColorPicker({ liftingColor }) {
  const [color, setColor] = useState();

  useEffect(() => {
    liftingColor(color);
  }, [color]);

  return (
    <form>
      <label>
        Set theme color:{" "}
        <input type="color" onChange={(e) => setColor(e.target.value)} />
      </label>
    </form>
  );
}
