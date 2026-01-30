import React from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z as zod } from "zod";

import {
  usePostUpdateMutation,
  usePostCreateMutation,
} from "../../queries/postQueries";

import { POST_STATUS } from "../../store/usePostsStore";

const schema = zod.object({
  title: zod.string().min(3).max(10),
  status: zod.enum([POST_STATUS.DRAFT, POST_STATUS.PUBLISHED]),
});

export default function PostForm({ currentPost, onDone }) {
  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm({
    values: currentPost
      ? {
          title: currentPost.title ?? ``,
          status: currentPost.status ?? POST_STATUS.DRAFT,
        }
      : {
          title: ``,
          status: POST_STATUS.DRAFT,
        },
    resolver: zodResolver(schema),
    mode: `onChange`,
  });

  const update = usePostUpdateMutation();
  const create = usePostCreateMutation();

  const onSubmit = (data) => {
    if (currentPost) {
      update.mutate({ id: currentPost.id, ...data }, { onSuccess: onDone });
    } else {
      create.mutate(data, { onSuccess: onDone });
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="modal__form">
      <label>
        Title: <input type="text" {...register("title")} />
        {errors.title && <span>{errors.title?.message}</span>}
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
