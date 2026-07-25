import { isLangPersian } from "./i18n/isLangPersian"

function dateToPersianDateString(locale: string, date: Date) {
    const d = new Date(date).toLocaleDateString(isLangPersian(locale) ? "fa-IR" : "en", {
        weekday: "long",
        year: "numeric",
        month: "long",
        day: "numeric"
    })

    return isLangPersian(locale) ? d.split(" ").reverse().join(" ").replace(",", "") : d
}

export default dateToPersianDateString