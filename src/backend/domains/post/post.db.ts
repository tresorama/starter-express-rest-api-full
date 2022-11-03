import type { Post } from "./post.types";
import { fakeDb as userFakeDb } from "@/domains/user/user.db";
// import { generateRandomId } from "@/utilities/randomId";

export const fakeDb: Post[] = [
  {
    id: "l74tiuS3wz3y59USKZxMuzPU", // generateRandomId(),
    authorId: userFakeDb[0].id,
    title: 'Moon',
    content: "Ipsum ipsum proident ad dolore elit non nostrud cillum do Lorem reprehenderit in occaecat. Duis deserunt veniam duis sunt eiusmod consequat duis excepteur cillum aliquip et. Lorem tempor dolore ex est. Dolore irure Lorem incididunt minim ipsum aliquip Lorem aute culpa irure voluptate culpa. Adipisicing et laboris anim laborum minim deserunt consectetur in nisi sint eu sint sunt exercitation. Aute adipisicing cillum dolore reprehenderit excepteur aliquip ex aute qui Lorem nisi consectetur esse enim. Sit culpa aliquip cillum eiusmod."
  },
  {
    id: "8yK7qrwKWP1WRKhA6BgtY5es", // generateRandomId(),
    authorId: userFakeDb[1].id,
    title: 'Sun',
    content: "Ipsum ipsum proident ad dolore elit non nostrud cillum do Lorem reprehenderit in occaecat. Duis deserunt veniam duis sunt eiusmod consequat duis excepteur cillum aliquip et. Lorem tempor dolore ex est. Dolore irure Lorem incididunt minim ipsum aliquip Lorem aute culpa irure voluptate culpa. Adipisicing et laboris anim laborum minim deserunt consectetur in nisi sint eu sint sunt exercitation. Aute adipisicing cillum dolore reprehenderit excepteur aliquip ex aute qui Lorem nisi consectetur esse enim. Sit culpa aliquip cillum eiusmod."
  },
];
