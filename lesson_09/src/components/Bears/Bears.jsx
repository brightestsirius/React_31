import React from "react";

import useBearsStore from "../../store/useBearsStore";

export default function Bears() {
  const bears = useBearsStore((s) => s.bears);
  const bearsTitles = useBearsStore((s) => s.bearsTitles);

  const increasePopulation = useBearsStore((s) => s.increasePopulation);
  const removeAllBears = useBearsStore((s) => s.removeAllBears);
  const updateBears = useBearsStore((s) => s.updateBears);
  const fetchBears = useBearsStore((s) => s.fetchBears);

  return (
    <div>
      <p>Bears: {bears}</p>{" "}
      <button onClick={increasePopulation}>increasePopulation</button>{" "}
      <button onClick={removeAllBears}>removeAllBears</button>{" "}
      <input type="text" onBlur={(e) => updateBears(+e.target.value)} />{" "}
      <button onClick={fetchBears}>Get bears</button>
      {bearsTitles.length ? (
        <ul>
          {bearsTitles.map((item) => (
            <li key={item.id}>{item.title}</li>
          ))}
        </ul>
      ) : null}
    </div>
  );
}
