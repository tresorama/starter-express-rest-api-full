import "dotenv/config"; // see https://github.com/motdotla/dotenv#how-do-i-use-dotenv-with-import

export const IS_DEVELOPMENT = ["development", undefined].includes(process.env.NODE_ENV);
export const IS_PRODUCTION = "production" == process.env.NODE_ENV;

// AUTH
export const JWT_SECRET = process.env.JWT_SECRET as string;
if (!JWT_SECRET) throw new Error('JWT_SECRET env var is missing !!');
