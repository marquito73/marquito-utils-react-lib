import { EnumLang } from "../Enums";

import {enUS, enGB, fr, es} from "date-fns/locale";

export class LangUtils {
    public static GetLocalForLang = (language: EnumLang) => {
        let locale: Locale;

        switch (language) {
            case EnumLang.US:
                locale = enUS;
                break;
            case EnumLang.FR:
                locale = fr;
                break;
            case EnumLang.ES:
                locale = es;
                break;
            case EnumLang.EN:
            default:
                locale = enGB;
                break;
        }

        return locale;
    }
}