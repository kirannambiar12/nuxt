import { describe, expect, it } from "vitest";
import { interviewPosts } from "../server/data/posts";

describe("interviewPosts data", () => {
  it("contains at least 3 sample posts", () => {
    expect(interviewPosts.length).toBeGreaterThanOrEqual(3);
  });

  it("has unique numeric IDs", () => {
    const ids = interviewPosts.map((post) => post.id);
    const uniqueIds = new Set(ids);

    expect(ids.every((id) => Number.isInteger(id))).toBe(true);
    expect(uniqueIds.size).toBe(ids.length);
  });
});
