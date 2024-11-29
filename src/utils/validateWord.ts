import { bannedKeys } from "@/shared";

export const validateInput = (key: string) => {
  if (
    (!bannedKeys.includes(key) && !key.includes("F")) ||
    key === "Backspace"
  ) {
    return true;
  }
  return false;
};
