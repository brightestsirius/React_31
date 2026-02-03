import { describe, it, expect, vi, beforeEach } from "vitest";
import { renderHook, waitFor } from "@testing-library/react";
import type { Post } from "../types/post";
import { POST_STATUS } from "../types/post";

import {
    usePostsQuery,
    usePostCreateMutation,
    usePostUpdateMutation,
    usePostDeleteMutation,
} from "./postQueries";

import { createTestQueryClient, makeWrapper } from "../test/queryTestUtils";

vi.mock("../services/posts.service", () => ({
    default: {
        list: vi.fn(),
        post: vi.fn(),
        put: vi.fn(),
        delete: vi.fn(),
    },
}));

import service from "../services/posts.service";

const mockedService = service as unknown as {
    list: ReturnType<typeof vi.fn>;
    post: ReturnType<typeof vi.fn>;
    put: ReturnType<typeof vi.fn>;
    delete: ReturnType<typeof vi.fn>;
};

describe("postQueries", () => {
    beforeEach(() => {
        vi.clearAllMocks();
    });

    it("should fetch posts (usePostsQuery)", async () => {
        const apiPosts: Post[] = [
            { id: "1", title: "A", body: "x", status: POST_STATUS.DRAFT },
        ];

        mockedService.list.mockResolvedValueOnce(apiPosts);

        const client = createTestQueryClient();
        const wrapper = makeWrapper(client);

        const { result } = renderHook(() => usePostsQuery(), { wrapper });

        await waitFor(() => expect(result.current.isSuccess).toBe(true));
        expect(result.current.data).toEqual(apiPosts);
        expect(mockedService.list).toHaveBeenCalledTimes(1);
    });

    it("should create a post and invalidate posts query", async () => {
        mockedService.post.mockResolvedValueOnce({
            id: "2",
            title: "New",
            body: "y",
            status: POST_STATUS.DRAFT,
        });

        const client = createTestQueryClient();
        const wrapper = makeWrapper(client);

        const invalidateSpy = vi.spyOn(client, "invalidateQueries");

        const { result } = renderHook(() => usePostCreateMutation(), { wrapper });

        const payload = { title: "New", body: "y", status: POST_STATUS.DRAFT };
        await result.current.mutateAsync(payload);

        expect(mockedService.post).toHaveBeenCalledWith(payload);
        expect(invalidateSpy).toHaveBeenCalledWith({ queryKey: ["posts"] });
    });

    it("should update a post and invalidate posts query", async () => {
        mockedService.put.mockResolvedValueOnce({
            id: "1",
            title: "A+",
            body: "x",
            status: POST_STATUS.PUBLISHED,
        });

        const client = createTestQueryClient();
        const wrapper = makeWrapper(client);

        const invalidateSpy = vi.spyOn(client, "invalidateQueries");

        const { result } = renderHook(() => usePostUpdateMutation(), { wrapper });

        const payload: Post = {
            id: "1",
            title: "A+",
            body: "x",
            status: POST_STATUS.PUBLISHED,
        };

        await result.current.mutateAsync(payload);

        expect(mockedService.put).toHaveBeenCalledWith(payload);
        expect(invalidateSpy).toHaveBeenCalledWith({ queryKey: ["posts"] });
    });

    it("should remove a post optimistically before server resolves", async () => {
        let resolveDelete!: (value: void) => void;
        mockedService.delete.mockReturnValueOnce(
            new Promise<void>((resolve) => {
                resolveDelete = resolve;
            })
        );

        const client = createTestQueryClient();
        const wrapper = makeWrapper(client);

        client.setQueryData<Post[]>(["posts"], [
            { id: "1", title: "A", body: "", status: POST_STATUS.DRAFT },
            { id: "2", title: "B", body: "", status: POST_STATUS.PUBLISHED },
        ]);

        const { result } = renderHook(() => usePostDeleteMutation(), { wrapper });

        result.current.mutate("2");
        await waitFor(() => {
            const cached = client.getQueryData<Post[]>(["posts"])!;
            expect(cached.map((p) => p.id)).toEqual(["1"]);
        });

        resolveDelete();
    });

    it("should rollback optimistic delete on error", async () => {
        mockedService.delete.mockRejectedValueOnce(new Error("boom"));

        const client = createTestQueryClient();
        const wrapper = makeWrapper(client);

        const initial: Post[] = [
            { id: "1", title: "A", body: "", status: POST_STATUS.DRAFT },
            { id: "2", title: "B", body: "", status: POST_STATUS.PUBLISHED },
        ];
        client.setQueryData(["posts"], initial);

        const { result } = renderHook(() => usePostDeleteMutation(), { wrapper });

        await result.current.mutateAsync("2").catch(() => { });

        await waitFor(() => {
            expect(client.getQueryData(["posts"])).toEqual(initial);
        });
    });
});