import { useState } from "react";

export default function Counter() {
  const [count, setCount] = useState(0);

  return (
    <div className="counter">
      <p aria-label="count-value">Count: {count}</p>

      <button type="button" onClick={() => setCount((c) => c + 1)}>
        Increment
      </button>

      <button
        type="button"
        onClick={() => setCount(0)}
        disabled={count === 0}
      >
        Reset
      </button>
    </div>
  );
}