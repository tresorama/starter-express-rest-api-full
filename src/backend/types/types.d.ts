import { UserWithoutSensitive } from "../domains/user/user.types";

declare global {
  namespace Express {
    interface Request {
      user?: UserWithoutSensitive;
    }
  }
}
