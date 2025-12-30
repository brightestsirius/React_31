import React, { useCallback } from "react";

import Button from "./../Button/Button";

export default function ListItem({ item, changeTitle, deleteItem }) {
  const getClassName = useCallback(() => {
    const classes = [`list__item`];

    item.completed && classes.push(`list__item--completed`);

    return classes.join(` `);
  }, [item]);

  return (
    <li className={getClassName()}>
      {item.title}{" "}
      <Button title={"Change title"} handleClick={() => changeTitle(item)} />{" "}
      <Button title={"Delete"} handleClick={() => deleteItem(item)} />
    </li>
  );
}
