import React, { useState, useEffect, useRef } from "react";

// 🟢🟡🔴💚💔
const LIST = [`cat`, `dog`, `lion`, `tiger`, `parrot`].map((item) => ({
  id: crypto.randomUUID(),
  value: item,
}));

export default function List() {
  const [list, setList] = useState(LIST);
  const [intervalId, setIntervalId] = useState(null);
  const [color, setColor] = useState(null);

  const prevListRef = useRef();

  const establishConnectionWithItem = (item) => {
    console.log(`💚 Establish connection with ${item.value}`);
  };
  const terminateConnectionWithItem = (item) => {
    console.log(`💔 Terminate connection with ${item.value}`);
  };

  useEffect(() => {
    const intId = setInterval(() => {
      setList((prevState) => prevState.slice(0, -1));
    }, 1000);
    setIntervalId(intId);

    return () => {
      console.log(`🔴 in componentWillUnmount`);
      clearInterval(intId);
    };
  }, []);

  useEffect(() => {
    if (!list.length) clearInterval(intervalId);
  }, [list]);

  useEffect(() => {
    if (list.length <= Math.round(LIST.length / 2)) setColor(`crimson`);
  }, [list]);

  // connection
  useEffect(() => {
    prevListRef.current = list;
    prevListRef.current.forEach(establishConnectionWithItem);

    return () => {
        console.log(`🔴 in componentWillUnmount for connection`);
        prevListRef.current
            .forEach(item => terminateConnectionWithItem(item));
    }
  }, []);

  useEffect(() => {
    prevListRef.current
        .filter(item => {
            return !list.find(el => el.id === item.id);
        })
        .forEach(item => terminateConnectionWithItem(item));

    prevListRef.current = list;
  }, [list])
  // connection

  const styledList = { color };

  return list.length ? (
    <ul style={styledList}>
      {list.map(({ id, value }) => (
        <li key={id}>{value}</li>
      ))}
    </ul>
  ) : null;
}