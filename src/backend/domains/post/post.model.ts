import type { Post } from "./post.types";
import { fakeDb } from "./post.db";
import { objectContainsFields } from "@/utilities/object";

/**
 * Post model, has direct access to the Post persistent store (DB).
 */
export const Store_Post = {
  findOne: async ({ where }: { where: Partial<Post>; }) => {
    return fakeDb.find((item) => objectContainsFields(item, where));
  },
  findMany: async ({ where }: { where: Partial<Post>; }) => {
    return fakeDb.filter(item => objectContainsFields(item, where));
  }
};
