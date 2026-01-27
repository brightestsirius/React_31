import React from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z as zod } from "zod";

import {
  useUpdateTodoMutation,
  useCreateTodoMutation,
} from "../../queries/todosQueries";

import { POST_STATUS } from "../../store/useTodosStore";

const schema = zod.object({
  title: zod
    .string()
    .min(3, `Title: min 3 symbols`)
    .max(20, `Title: max 20 symbols`),
  body: zod.string().min(3, `Body: min 3 symbols`),
  status: zod.enum([POST_STATUS.DRAFT, POST_STATUS.PUBLISHED]),
});

export default function TodosForm({ initial, onDone }) {
  const create = useCreateTodoMutation();
  const update = useUpdateTodoMutation();

  const isPending = create.isPending || update.isPending;

  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm({
    resolver: zodResolver(schema),
    values: initial
      ? {
          title: initial.title ?? "",
          body: initial.body ?? "",
          status: initial.status ?? POST_STATUS.DRAFT,
        }
      : {
          title: "",
          body: "",
          status: POST_STATUS.DRAFT,
        },
    mode: "onChange",
  });

  const onSubmit = (data) => {
    if (initial) {
      update.mutate({ id: initial.id, ...data }, { onSuccess: onDone });
    } else {
      create.mutate(data, { onSuccess: onDone });
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <label>
        Title: <input type="text" {...register("title")} />
        {errors.title && <p className="error">{errors.title?.message}</p>}
      </label>
      <label>
        Body: <textarea {...register("body")} />
      </label>
      <label>
        Status:{" "}
        <select {...register("status")}>
          <option value={POST_STATUS.DRAFT}>Draft</option>
          <option value={POST_STATUS.PUBLISHED}>Published</option>
        </select>
      </label>
      <button disabled={!isValid || isPending}>
        {initial ? `Save` : `Create`}
      </button>

      {isPending && <small>Saving...</small>}
    </form>
  );
}
