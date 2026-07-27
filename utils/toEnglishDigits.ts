export default function toEnglishDigits(str: string) {
    const persianDigits = '۰۱۲۳۴۵۶۷۸۹';
    const englishDigits = '0123456789';
    return str.replace(/[۰-۹]/g, d => englishDigits[persianDigits.indexOf(d)]);
}