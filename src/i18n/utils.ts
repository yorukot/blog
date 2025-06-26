export const LOCALES = {
    en: 'English',
    'zh-tw': '繁體中文'
} as const;

export type Locale = keyof typeof LOCALES;

export const DEFAULT_LOCALE: Locale = 'en';

/**
 * Get the locale from a URL path
 */
export function getLocaleFromUrl(url: URL): Locale {
    const [, locale] = url.pathname.split('/');
    if (locale && locale in LOCALES) {
        return locale as Locale;
    }
    return DEFAULT_LOCALE;
}

/**
 * Remove locale prefix from a path
 */
export function removeLocaleFromPath(path: string): string {
    const segments = path.split('/');
    if (segments[1] && segments[1] in LOCALES) {
        segments.splice(1, 1);
    }
    return segments.join('/') || '/';
}

/**
 * Add locale prefix to a path
 */
export function addLocaleToPath(path: string, locale: Locale): string {
    if (locale === DEFAULT_LOCALE) {
        return path;
    }

    const cleanPath = removeLocaleFromPath(path);
    return `/${locale}${cleanPath === '/' ? '' : cleanPath}`;
}

/**
 * Get the localized URL for a given path and locale
 */
export function getLocalizedUrl(path: string, locale: Locale): string {
    return addLocaleToPath(path, locale);
}

/**
 * Get all available locale URLs for a given path
 */
export function getAllLocalizedUrls(path: string): Record<Locale, string> {
    const cleanPath = removeLocaleFromPath(path);
    const urls = {} as Record<Locale, string>;

    for (const locale of Object.keys(LOCALES) as Locale[]) {
        urls[locale] = getLocalizedUrl(cleanPath, locale);
    }

    return urls;
}

/**
 * Check if a locale is supported
 */
export function isValidLocale(locale: string): locale is Locale {
    return locale in LOCALES;
} 