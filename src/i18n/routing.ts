export const LOCALES = ['en', 'zh'] as const;
export type Locale = (typeof LOCALES)[number];

export const DEFAULT_LOCALE: Locale = 'zh';

export const localePrefix = 'always'; // or 'as-needed' or 'never'