import { translations } from './translations';
import { config } from '@/config';

export const lang = {
  en: 'English',
  'zh-tw': '繁體中文',
};

export const defaultLang = 'en';
export const languages = Object.keys(lang) as Array<keyof typeof lang>;

export function getLangFromUrl(url: URL) {
  const [, lang] = url.pathname.split('/');
  if (lang in translations) return lang as keyof typeof translations;
  return defaultLang;
}

export function useTranslations(lang: keyof typeof translations) {
  return function t(
    key: keyof (typeof translations)[typeof defaultLang],
    interpolations?: Record<string, string | number>
  ) {
    let translation =
      key in translations[lang] ? (translations[lang] as any)[key] : translations[defaultLang][key];

    // Handle interpolations
    if (interpolations) {
      Object.entries(interpolations).forEach(([placeholder, value]) => {
        translation = translation.replace(
          new RegExp(`\\{${placeholder}\\}`, 'g'),
          value.toString()
        );
      });
    }

    return translation;
  };
}

export function getAlternateLanguageUrl(currentUrl: URL, targetLang: keyof typeof lang) {
  const currentLang = getLangFromUrl(currentUrl);
  const pathname = currentUrl.pathname;

  if (currentLang === defaultLang && !pathname.startsWith(`/${defaultLang}`)) {
    return `/${targetLang}${pathname}`;
  }

  const pathWithoutLang = pathname.replace(`/${currentLang}`, '') || '/';
  return `/${targetLang}${pathWithoutLang}`;
}

// Helper functions to get configuration data
export function getPersonalInfo() {
  return config.personal;
}

export function getContactInfo() {
  return config.contact;
}

export function getProjects() {
  return config.projects;
}

export function getTechStack() {
  return config.techStack;
}

export function getExperiences() {
  return config.experiences;
}

export function getExperienceTypes() {
  return config.experienceTypes;
}
