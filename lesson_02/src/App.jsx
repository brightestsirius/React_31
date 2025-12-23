import React, { useState } from "react";

import CounterValue from "./components/Counter/CounterValue";
import Counter from "./components/Counter/Counter";
import CounterStatistics from "./components/Counter/CounterStatistics";
import List from './components/List/List'

export default function App() {
  const [counter, setCounter] = useState(100);
  const [actionCount, setActionCount] = useState();

  const decrementCounter = () => {
    setCounter(counter - 1);
  };

  const incrementCounter = () => {
    setCounter(counter + 1);
  };

  const addCounter = () => {
    setCounter((prevState) => prevState + 10); // 3+10
    setCounter((prevState) => prevState + 100); // 13+100
  };

  const liftingActionCount = (value) => {
    setActionCount(value);
  }

  return (
    <>
      <CounterValue counter={counter} />

      <Counter
        counter={counter}
        decrementCounter={decrementCounter}
        incrementCounter={incrementCounter}
        addCounter={addCounter}
        inputCounter={setCounter}
        liftingActionCount={liftingActionCount}
      />

      <CounterStatistics counter={counter} actionCount={actionCount} />

      <List />
    </>
  );
}
