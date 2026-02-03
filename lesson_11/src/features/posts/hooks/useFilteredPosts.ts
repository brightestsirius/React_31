import { useMemo } from "react";
import type { FilterStatus, Post } from "../../../types/post";
import { POST_STATUS } from "../../../types/post";

export function filterPosts(posts: Post[], filterStatus: FilterStatus, search: string) {
    const q = search.trim().toLowerCase();

    return posts.filter((p) => {
        const matchesText =
            !q ||
            p.title?.toLowerCase().includes(q) ||
            p.body?.toLowerCase().includes(q);

        const matchesStatus =
            filterStatus === POST_STATUS.ALL ? true : p.status === filterStatus;

        return matchesText && matchesStatus;
    });
}

export function useFilteredPosts(posts: Post[], filterStatus: FilterStatus, search: string) {
    return useMemo(() => filterPosts(posts, filterStatus, search), [posts, filterStatus, search]);
}