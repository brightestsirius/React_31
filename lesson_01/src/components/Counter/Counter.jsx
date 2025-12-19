import React from "react";
import "./style.sass";

import CounterResult from "./CounterResult";

export default function Counter({ counter, counterDec, counterInc }) {
  return (
    <div className="counter">
      <button onClick={counterDec}>-</button>
      <CounterResult counter={counter} />
      <button onClick={counterInc}>+</button>
    </div>
  );
}
