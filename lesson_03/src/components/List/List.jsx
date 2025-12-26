import React, { useState, useEffect } from "react";

//🟢🟡🔴💚💔
const LIST = [`cat`, `dog`, `lion`, `tiger`, `parrot`].map((item) => ({
  id: crypto.randomUUID(),
  value: item,
}));

export default function List() {
  const [list, setList] = useState(LIST);
  const [removeIntId, setRemoveIntId] = useState(null);
  const [color, setColor] = useState(null);

  useEffect(() => {
    console.log(`🟢 in componentDidMount`);

    const intId = setInterval(() => {
      setList((prevState) => prevState.slice(0, -1));
    }, 1000);
    setRemoveIntId(intId);

    return () => {
      console.log(`🔴 in componentWillUnmount`);
      clearInterval(intId);
    };
  }, []);

  useEffect(() => {
    console.log(`🟡 in componentDidUpdate for list`, list);
    if (!list.length) clearInterval(removeIntId);
  }, [list]);

  useEffect(() => {
    if (list.length <= 2) setColor(`crimson`);
  }, [list]);

  return list.length ? (
    <ul style={{ color }}>
      {list.map(({ id, value }) => (
        <li key={id}>{value}</li>
      ))}
    </ul>
  ) : null;
}
