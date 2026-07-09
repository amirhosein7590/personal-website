import { rtlLangs } from "@/constants/i18n/rtlLangs";

export function isRtl(locale: string) {
    return rtlLangs.includes(locale) ? true : false
}