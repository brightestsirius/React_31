import React from "react";
import useBear from "../../store/useBear";

export default function Bears() {
  const bears = useBear((state) => state.bears);
  const increasePopulation = useBear((state) => state.increasePopulation);
  const removeAllBears = useBear((state) => state.removeAllBears);
  const updateBears = useBear((state) => state.updateBears);

  return (
    <div>
      <p>Bears: {bears}</p>
      <button onClick={increasePopulation}>increasePopulation</button>{" "}
      <button onClick={removeAllBears}>removeAllBears</button>{" "}
      <input type="number" onBlur={(e) => updateBears(+e.target.value)} />
    </div>
  );
}
