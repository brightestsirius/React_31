import React from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  decrement,
  increment,
  incrementByAmount,
} from "../../store/features/counter/counterSlice";

export default function Counter() {
  const counter = useSelector((state) => state.counter.value);
  const dispatch = useDispatch();

  const handleIncrementByAmount = () => {
    const value = +prompt(`Enter value`, 10);
    dispatch(incrementByAmount(value));
  };

  return (
    <div>
      <button
        aria-label="Increment value"
        onClick={() => dispatch(increment())}
      >
        Increment
      </button>
      <span> {counter} </span>
      <button
        aria-label="Decrement value"
        onClick={() => dispatch(decrement())}
      >
        Decrement
      </button>
      <button onClick={handleIncrementByAmount}>Increment by amount</button>
    </div>
  );
}
