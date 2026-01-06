import React, { useState, useReducer } from "react";

import Heading from "./components/Heading/Heading";
import ThemeStyle from "./components/ThemeStyle/ThemeStyle";

import UserForm from "./components/UserForm/UserForm";
import UserCard from "./components/UserCard/UserCard";
import UserBanner from "./components/UserBanner/UserBanner";

import UserContext from "./contexts/UserContext";
import ThemeContext from "./contexts/ThemeContext";
import CounterContext from "./contexts/CounterContext";

import Counter from "./components/Counter/Counter";
import CounterStatistics from "./components/CounterStatistics/CounterStatistics";

import { reducer, initialState } from "./store/counterSlice/reducer";

export default function App() {
  const [user, setUser] = useState(null);
  const [color, setColor] = useState(`#647628`);

  const [stateCounter, dispatchCounter] = useReducer(reducer, initialState);

  return (
    <>
      <ThemeContext.Provider value={{ color, setColor }}>
        <Heading />
        <ThemeStyle />

        <UserContext.Provider value={{ user, setUser }}>
          <UserForm />
          <UserCard />
          <UserBanner />
        </UserContext.Provider>
      </ThemeContext.Provider>

      <hr />

      <CounterContext.Provider value={{stateCounter, dispatchCounter}}>
        <Counter />
        <CounterStatistics />
      </CounterContext.Provider>
    </>
  );
}
