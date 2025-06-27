import { translations } from './home';

export const lang = {
  en: "English",
  "zh-tw": "繁體中文",
}

export const defaultLang = "en";
export const languages = Object.keys(lang) as Array<keyof typeof lang>;

export function getLangFromUrl(url: URL) {
  const [, lang] = url.pathname.split('/');
  if (lang in translations) return lang as keyof typeof translations;
  return defaultLang;
}

export function useTranslations(lang: keyof typeof translations) {
  return function t(key: keyof typeof translations[typeof defaultLang]) {
    return key in translations[lang] ? (translations[lang] as any)[key] : translations[defaultLang][key];
  }
}

export function getAlternateLanguageUrl(currentUrl: URL, targetLang: keyof typeof lang) {
  const currentLang = getLangFromUrl(currentUrl);
  const pathname = currentUrl.pathname;

  if (currentLang === defaultLang && !pathname.startsWith(`/${defaultLang}`)) {
    return targetLang === defaultLang ? pathname : `/${targetLang}${pathname}`;
  }

  const pathWithoutLang = pathname.replace(`/${currentLang}`, '') || '/';
  return targetLang === defaultLang ? pathWithoutLang : `/${targetLang}${pathWithoutLang}`;
}