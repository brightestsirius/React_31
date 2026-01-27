import React from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z as zod } from "zod";

import { POST_STATUS } from "../../store/usePostsStore";
import {
  useUpdatePostsMutation,
  useCreatePostsMutation,
} from "../../queries/postsQueries";

const schema = zod.object({
  title: zod
    .string()
    .min(3, `Title: min 3 symbols`)
    .max(10, `Title: max 10 symbols`),
  body: zod.string().min(3, `Body: min 3 symbols`),
  status: zod.enum([POST_STATUS.DRAFT, POST_STATUS.PUBLISHED]),
});

export default function PostForm({ initial, onDone }) {
  const update = useUpdatePostsMutation();
  const create = useCreatePostsMutation();

  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm({
    resolver: zodResolver(schema),
    mode: "onChange",
    values: initial
      ? {
          title: initial.title ?? ``,
          body: initial.body ?? ``,
          status: initial.status ?? POST_STATUS.DRAFT,
        }
      : {
          title: ``,
          body: ``,
          status: POST_STATUS.DRAFT,
        },
  });

  const onSubmit = (data) => {
    if (initial) {
      update.mutate({id: initial.id, ...data}, {onSuccess: onDone});
    } else {
      create.mutate(data, {onSuccess: onDone});
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="modal__form">
      <label>
        Title: <input type="text" {...register("title")} />
        {errors.title && <span className="error">This field is required</span>}
      </label>
      <label>
        Body: <textarea {...register("body")}></textarea>
      </label>
      <label>
        Status:{" "}
        <select {...register("status")}>
          <option value={POST_STATUS.DRAFT}>Draft</option>
          <option value={POST_STATUS.PUBLISHED}>Published</option>
        </select>
      </label>
      <button disabled={!isValid}>Submit</button>
    </form>
  );
}
