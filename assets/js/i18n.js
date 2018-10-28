import i18n from "i18next";
import { reactI18nextModule } from 'react-i18next';
import polish from '../public/locales/pl/translation.json';

const resources = {
    pl: {
        translation: polish
    }
};

i18n
    .use(reactI18nextModule) // passes i18n down to react-i18next
    .init({
        resources,
        lng: "en",

        keySeparator: false,
});

export default i18n;