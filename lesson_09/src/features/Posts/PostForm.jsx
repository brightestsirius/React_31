import React from "react";
import { useForm } from "react-hook-form";

import { POST_STATUS } from "../../store/usePostsStore";
import {
  usePostUpdateMutation,
  usePostCreateMutation,
} from "../../queries/postQueries";

export default function PostForm({ currentPost }) {
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
  });

  const update = usePostUpdateMutation();
  const create = usePostCreateMutation();

  const onSubmit = (data) => {
    if (currentPost) {
      update.mutate({ id: currentPost.id, ...data });
    } else {
      create.mutate(data);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="modal__form">
      <label>
        Title: <input type="text" {...register("title", { required: true })} />
        {errors.title && <span>This field is required</span>}
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
