import axios from "axios";
const API = `https://694eda01b5bc648a93c1705e.mockapi.io/posts`;
import type { Post } from "../types/post"

const service = {
  get: (id: string): Promise<Post> => axios.get<Post>(`${API}/${id}`).then(({ data }) => data),
  list: (): Promise<Post[]> => axios.get<Post[]>(API).then(({ data }) => data),
  put: (obj: Post): Promise<Post> => axios.put<Post>(`${API}/${obj.id}`, obj).then(({ data }) => data),
  delete: (id: string): Promise<void> => axios.delete(`${API}/${id}`).then(() => undefined),
  post: (obj: Omit<Post, "id">): Promise<Post> => axios.post<Post>(API, obj).then(({ data }) => data),
};

export default service;