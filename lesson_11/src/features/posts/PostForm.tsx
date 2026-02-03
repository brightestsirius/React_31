import { useForm } from "react-hook-form";

import { zodResolver } from "@hookform/resolvers/zod"
import { z as zod } from "zod"

import { POST_STATUS } from "../../types/post";
import {
  usePostUpdateMutation,
  usePostCreateMutation,
} from "../../queries/postQueries";

import type { Post } from "../../types/post"

const schema = zod
  .object({
    title: zod.string().min(3, `Title: more then 3`).max(20, `Title: less then 20`),
    status: zod.enum([POST_STATUS.DRAFT, POST_STATUS.PUBLISHED])
  })

type Props = { currentPost: Post, onDone: () => void }
type FormValues = zod.infer<typeof schema>

export default function PostForm({ currentPost, onDone }: Props) {
  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm<FormValues>({
    resolver: zodResolver(schema),
    mode: `onChange`,
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

  const onSubmit = (data: FormValues) => {
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
        {errors.title && <span className="error">{errors.title?.message}</span>}
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
