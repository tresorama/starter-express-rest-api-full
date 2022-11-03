import type { User } from "./user.types";
import { generateRandomId } from "@/utilities/randomId";
import { hashPassword } from "./utilities/password";

export const fakeDb: User[] = [
  {
    id: "zS3j8bdztsHxXD1NJEvV2JU3",//generateRandomId(),
    username: "luke-destiny",
    password: hashPassword('banana'),
  },
  {
    id: generateRandomId(),
    username: "sarah-fate",
    password: hashPassword('gossip'),
  }
];
