import React from "react";
import useBearStore from "../../store/useBearStore";

export default function Bears() {
  const count = useBearStore((state) => state.count);
  const bears = useBearStore((state) => state.bears);

  const increasePopulation = useBearStore((state) => state.increasePopulation);
  const removeAllBears = useBearStore((state) => state.removeAllBears);
  const updateBears = useBearStore((state) => state.updateBears);
  const fetchBears = useBearStore((state) => state.fetchBears);

  return (
    <div>
      <p>Bears: {count}</p>{" "}
      <button onClick={increasePopulation}>increasePopulation</button>{" "}
      <button onClick={removeAllBears}>removeAllBears</button>{" "}
      <input type="text" onBlur={(e) => updateBears(+e.target.value)} />{" "}
      <button onClick={fetchBears}>Get bears</button>
      {bears.length ? (
        <ul>
          {bears.map((item) => (
            <li key={item.id}>{item.title}</li>
          ))}
        </ul>
      ) : null}
    </div>
  );
}
