export const POST_STATUS = {
    ALL: `all`,
    DRAFT: `draft`,
    PUBLISHED: `published`,
} as const;

export type PostStatus = typeof POST_STATUS.DRAFT | typeof POST_STATUS.PUBLISHED;
export type FilterStatus = typeof POST_STATUS.ALL | PostStatus;

export type Post = {
    id: string,
    title: string,
    body?: string,
    status: PostStatus
}