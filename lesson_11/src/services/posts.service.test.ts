import { describe, it, expect, vi, beforeEach } from "vitest";
import axios from "axios";
import service from "./posts.service";
import type { Post } from "../types/post";

const BASE_URL = "https://694eda01b5bc648a93c1705e.mockapi.io/posts";

vi.mock("axios", () => {
  const fn: any = vi.fn(); // axios(url)
  fn.put = vi.fn();
  fn.post = vi.fn();
  fn.delete = vi.fn();
  return { default: fn };
});

type MockedAxios = {
  <T>(url: string): Promise<{ data: T }>;
  put: <T>(url: string, payload: any) => Promise<{ data: T }>;
  post: <T>(url: string, payload: any) => Promise<{ data: T }>;
  delete: (url: string) => Promise<any>;
};

const mockedAxios = axios as unknown as MockedAxios;

describe.only("posts.service (API layer)", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("should fetch all posts and return response data", async () => {
    const apiPosts: Post[] = [
      { id: "1", title: "A", content: "x", status: "draft" as any },
    ];

    mockedAxios.mockResolvedValueOnce({ data: apiPosts });
    // mockFn.mockImplementationOnce(() => Promise.resolve(value));

    const res = await service.list();

    expect(mockedAxios).toHaveBeenCalledTimes(1);
    expect(mockedAxios).toHaveBeenCalledWith(BASE_URL);
    expect(res).toEqual(apiPosts);
  });

  it("should fetch a post by id and return response data", async () => {
    const apiPost: Post = {
      id: "7",
      title: "One",
      content: "y",
      status: "published" as any,
    };

    mockedAxios.mockResolvedValueOnce({ data: apiPost });

    const res = await service.get("7");

    expect(mockedAxios).toHaveBeenCalledWith(`${BASE_URL}/7`);
    expect(res).toEqual(apiPost);
  });

  it("should create a post and return the created entity", async () => {
    const payload = { title: "New", content: "z", status: "draft" as any };
    const created: Post = { id: "2", ...payload };

    mockedAxios.post.mockResolvedValueOnce({ data: created });

    const res = await service.post(payload);

    expect(mockedAxios.post).toHaveBeenCalledTimes(1);
    expect(mockedAxios.post).toHaveBeenCalledWith(BASE_URL, payload);
    expect(res).toEqual(created);
  });

  it("should update a post and return the updated entity", async () => {
    const payload: Post = {
      id: "3",
      title: "Upd",
      content: "q",
      status: "published" as any,
    };

    mockedAxios.put.mockResolvedValueOnce({ data: payload });

    const res = await service.put(payload);

    expect(mockedAxios.put).toHaveBeenCalledWith(`${BASE_URL}/3`, payload);
    expect(res).toEqual(payload);
  });

  it("should delete a post by id", async () => {
    mockedAxios.delete.mockResolvedValueOnce({}); // service ignores response data

    const res = await service.delete("9");

    expect(mockedAxios.delete).toHaveBeenCalledWith(`${BASE_URL}/9`);
    expect(res).toBeUndefined();
  });
});