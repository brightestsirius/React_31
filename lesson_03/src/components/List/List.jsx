import React, { useState, useEffect, useRef } from "react";
import "./style.sass";

// 🟢🟡🔴💚💔
const LIST = [`cat`, `dog`, `lion`, `tiger`, `parrot`].map((item) => ({
  id: crypto.randomUUID(),
  value: item,
}));

// useState => state: {list, color} => rerender
// useRef => ref: {intervalId}
// props => props: {LIST} => rerender

// 🟢 componentDidMount
// 🟡 componentDidUpdate
// 🔴 componentWillUnmout

export default function List({removeComponent}) {
  const [list, setList] = useState(LIST);
  const [color, setColor] = useState(null);

  const intervalId = useRef(); // intervalId.current

  useEffect(() => {
    console.log(`🟢 Establish connection with server`);

    intervalId.current = setInterval(() => {
      console.log(`in interval`);
      setList((prevState) => prevState.slice(0, -1));
    }, 1000);

    return () => {
      console.log(`🔴 Terminate connection with server`);
      clearInterval(intervalId.current);
    };
  }, []);

  useEffect(() => {
    if (!list.length) {
      clearInterval(intervalId.current);
    }
  }, [list]);

  useEffect(() => {
    if (list.length <= 3) setColor(`red`);
  }, [list]);

  return list.length ? (
    <div className="list">
      <button onClick={removeComponent}>Close List component</button>
      <ul style={{ color }}>
        {list.map(({ id, value }) => (
          <li key={id}>{value}</li>
        ))}
      </ul>
    </div>
  ) : null;
}