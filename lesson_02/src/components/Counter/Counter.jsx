import React, { useState, useEffect } from "react";
import "./style.sass";

export default function Counter({
  counter,
  decrementCounter,
  incrementCounter,
  addCounter,
  inputCounter,
  liftingActionCount
}) {
  const [color, setColor] = useState(`blue`);
  const [actionCount, setActionCount] = useState(0);

  const handleInputCounter = (e) => {
    const value = e.target.value;
    value && inputCounter(+value);

    counter>=5 && setColor(`red`);

    setActionCount(prevState => prevState+1);
  }

  const handleDecrementCounter = () => {
    decrementCounter();
    setActionCount(prevState => prevState+1);
  }

  const handleIncrementCounter = () => {
    incrementCounter();
    setActionCount(prevState => prevState+1);
  }

  const handleAddCounter = () => {
    addCounter();
    setActionCount(prevState => prevState+1);
  }

  useEffect(() => {
    console.log(`🟡 in componentDidUpdate for actionCount`, actionCount);
    liftingActionCount(actionCount);
  }, [actionCount])

  return (
    <div className="counter">
      <button onClick={handleDecrementCounter}>-</button>
      <span style={{ color }}>{counter}</span>
      <button onClick={handleIncrementCounter}>+</button>

      <button onClick={handleAddCounter}>Add counter value</button>

      <input type="number" onBlur={handleInputCounter} />
    </div>
  );
}
