import { EnumLang } from "../Enums";
//import Locale from "date-fns/locale";
import Locale from "date-fns/locale";
import US from "date-fns/locale/en-US";
import EN from "date-fns/locale/en-GB";
import FR from "date-fns/locale/fr";
import ES from "date-fns/locale/es";

export class LangUtils {
    public static GetLocalForLang = (language: EnumLang) => {
        let locale: Locale;

        switch (language) {
            case EnumLang.US:
                locale = US;
                break;
            case EnumLang.FR:
                locale = FR;
                break;
            case EnumLang.ES:
                locale = ES;
                break;
            case EnumLang.EN:
            default:
                locale = EN;
                break;
        }

        return locale;
    }
}