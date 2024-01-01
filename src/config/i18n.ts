import i18n from "i18next";
import HttpApi from "i18next-http-backend";
import LanguageDetector from "i18next-browser-languagedetector";
import { initReactI18next } from "react-i18next";

i18n
  .use(HttpApi)
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    fallbackLng: "en",
    detection: {
      order: ["queryString", "cookie"],
      caches: ["cookie"],
    },
    interpolation: {
      escapeValue: false,
    },
  })
  .catch(() => {
    // eslint-disable-next-line no-console
    console.log("Failed to initialized i18n");
  });

export default i18n;

type ServerTextMappingType = {
  [key: string]: string;
};

export const ServerTextMapping: ServerTextMappingType = {};
