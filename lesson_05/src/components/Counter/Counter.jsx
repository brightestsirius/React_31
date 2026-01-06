import React, { useContext } from "react";

import {
  COUNTER_DECREMENT,
  COUNTER_INCREMENT,
  COUNTER_ADD_VALUE,
} from "./../../store/counterSlice/reducer";

import CounterContext from "../../contexts/CounterContext";

export default function Counter() {
  const { stateCounter, dispatchCounter } = useContext(CounterContext);

  const handleDecrement = () => {
    dispatchCounter({ type: COUNTER_DECREMENT }); // action = {type: `decrement`}
  };

  const handleIncrement = () => dispatchCounter({ type: COUNTER_INCREMENT });

  const handleAddValue = () => {
    const value = +prompt(`Enter value`, 10);
    dispatchCounter({ type: COUNTER_ADD_VALUE, payload: value });
  };

  return (
    <div className="counter" style={{ color: stateCounter.color }}>
      <button onClick={handleDecrement}>-</button>
      <span>{stateCounter.counter}</span>
      <button onClick={handleIncrement}>+</button>
      <button onClick={handleAddValue}>Add value</button>
    </div>
  );
}
