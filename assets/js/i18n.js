import i18n from "i18next";
import { reactI18nextModule } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';
import pl from '../public/locales/pl/translation.json';
import en from '../public/locales/en/translation.json';

i18n
    .use(LanguageDetector)
    .use(reactI18nextModule) // passes i18n down to react-i18next
    .init({
        fallbackLng: "en",
        debug: true,
        react: {
            wait: true
        },
        resources: {
            pl: { translation: pl },
            en: { translation: en }
        }
});

export default i18n;