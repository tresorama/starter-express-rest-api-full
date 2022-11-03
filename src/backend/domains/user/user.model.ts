import type { User, CreatableUser } from "./user.types";
import { fakeDb } from "./user.db";
import { generateRandomId } from "@/utilities/randomId";
import { objectContainsFields } from "@/utilities/object";

/**
 * User model, has direct access to the User persistent store (DB).
 */
export const Store_User = {
  findOne: async ({ where }: { where: Partial<User>; }) => {
    return fakeDb.find((item) => objectContainsFields(item, where));
  },
  createOne: async (userData: CreatableUser) => {
    const newUser = {
      ...userData,
      id: generateRandomId()
    };
    fakeDb.push(newUser);
    return newUser;
  }
};
