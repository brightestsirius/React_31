import { usePostDeleteMutation } from "../../queries/postQueries";
import usePostsStore from "../../store/usePostsStore";
import { POST_STATUS } from '../../types/post'
import type { Post } from "../../types/post"

type Props = { posts: Post[] };

export default function PostsList({ posts }: Props) {
  const del = usePostDeleteMutation();
  const openModal = usePostsStore((s) => s.openModal);

  const getClassName = (item: Post) => {
    const classes = [`list__item`];
    if (item.status === POST_STATUS.PUBLISHED) classes.push(`list__item--published`);
    return classes.join(` `);
  }

  return posts.length ? (
    <ul>
      {posts.map((item) => (
        <li key={item.id} className={getClassName(item)}>
          {item.title}{" "}
          <button onClick={() => del.mutate(item.id)}>Delete</button>{" "}
          <button onClick={() => openModal(item.id)}>Update</button>
        </li>
      ))}
    </ul>
  ) : null;
}
