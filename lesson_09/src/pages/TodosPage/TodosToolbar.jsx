import React from "react";
import useTodosStore from "../../store/useTodosStore";

export default function TodosToolbar() {
  const openCreate = useTodosStore((s) => s.openCreate);
  return (
    <div>
      <button onClick={openCreate}>+ Todo</button>
    </div>
  );
}
