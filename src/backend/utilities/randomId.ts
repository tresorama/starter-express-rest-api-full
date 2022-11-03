import { random } from "nano-crypto";

export const generateRandomId = (length = 24) => random(length).alphanumeric();
