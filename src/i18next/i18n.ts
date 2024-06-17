import i18n from "i18next";
import LanguageDetector from "i18next-browser-languagedetector";
import Backend from "i18next-http-backend";
import { initReactI18next } from "react-i18next";

export type TLanguages = "en" | "uk";

export const fallbackLanguages: TLanguages[] = ["en", "uk"];

i18n
  .use(Backend)
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    fallbackLng: fallbackLanguages,
    debug: false,
    interpolation: {
      escapeValue: false,
    },
    ns: [
      "translations"
    ],
    returnObjects: true,
  });

export default i18n;
