import { useState } from "react";
import Counter from "./components/Counter/Counter";
import User from './components/User/User'

const App = () => {
  const [counter, setCounter] = useState(10);

  setTimeout(() => {
    setCounter(20);
  }, 1000);

  const counterDec = () => setCounter(counter - 1);
  const counterInc = () => setCounter(counter + 1);

  return (
    <>
      <p>Counter in App: {counter}</p>
      <Counter
        counter={counter}
        counterDec={counterDec}
        counterInc={counterInc}
      />
      <User />
    </>
  );
};

export default App;
