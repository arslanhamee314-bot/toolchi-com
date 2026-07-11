import { en } from "./locales/en";
import { ur } from "./locales/ur";
import { tr } from "./locales/tr";

export const dictionaries = {
  en,
  ur,
  tr,
};

export type Locale = "en" | "ur" | "tr";
export type Dictionary = typeof en;

export function getDictionary(locale: string): Dictionary {
  const normalized = (locale || "en").toLowerCase();
  if (normalized === "ur") return ur as unknown as Dictionary;
  if (normalized === "tr") return tr as unknown as Dictionary;
  return en;
}
