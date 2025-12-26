import React, { useState, useEffect, useRef } from "react";
import "./style.sass";

// 🟢🟡🔴💚💔
const LIST = [`cat`, `dog`, `lion`, `tiger`, `parrot`].map((item) => ({
  id: crypto.randomUUID(),
  value: item,
}));

export default function List({ removeList }) {
  const [list, setList] = useState(LIST);
  const [color, setColor] = useState(null);

  const intIdRef = useRef();

  useEffect(() => {
    intIdRef.current = setInterval(() => {
      console.log(`in interval`);
      setList((prevState) => prevState.slice(0, -1));
    }, 1000);

    return () => {
      console.log(`🔴 in componentWillUnmount`);
      clearInterval(intIdRef.current);
    };
  }, []);

  useEffect(() => {
    if (!list.length) {
      clearInterval(intIdRef.current);
      removeList();
    }
  }, [list]);

  useEffect(() => {
    if (list.length <= Math.round(LIST.length / 2)) setColor(`crimson`);
  }, [list]);

  return (
    <div className="list">
      <button onClick={removeList}>Close List Component</button>
      <ul style={{ color }}>
        {list.map(({ id, value }) => (
          <li key={id}>{value}</li>
        ))}
      </ul>
    </div>
  );
}
