import bcrypt from "bcryptjs";

/**
 * Return an hash for a password
 * @param password The password to hash
 */
export const hashPassword = (password: string) => {
  const salt = bcrypt.genSaltSync(10);
  return bcrypt.hashSync(password, salt);
};

/**
 * Test a password against an hash
 * @param password The password (not hashed) to test
 * @param hashedPassword The hash to test against. This hash is a return value of "hashPassword()"
 */
export const comparePassword = (
  password: string,
  hashedPassword: Awaited<ReturnType<typeof hashPassword>>
) => {
  return bcrypt.compareSync(password, hashedPassword);
};
