import React, { useMemo } from "react";
import useTodosStore from "./../../store/useTodosStore";
import TodosForm from "./TodosForm";

export default function TodosEditorModal({ todos }) {
  const isEditorOpen = useTodosStore((s) => s.isEditorOpen);
  const editingTodoId = useTodosStore((s) => s.editingTodoId);
  const closeEdit = useTodosStore((s) => s.closeEdit);

  const initial = useMemo(() => {
    const todo = todos.find((item) => item.id === editingTodoId);
    return todo ? todo : null;
  }, [todos, editingTodoId]);

  if (!isEditorOpen) return;
  return (
    <div className="modal" onClick={closeEdit}>
      <div className="container" onClick={(e) => e.stopPropagation()}>
        <div className="container__header">
          {initial ? `Editing todo #${initial.id}` : `Create todo`}
          <button onClick={closeEdit}>x</button>
        </div>
        <div className="container__body">
          <TodosForm initial={initial} onDone={closeEdit} />
        </div>
      </div>
    </div>
  );
}
