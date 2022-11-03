import { User } from "@/domains/user/user.types";

export type Post = {
  id: string;
  authorId: User['id'];
  title: string;
  content: string;
};