import { websiteConfig } from '@/config/website';
import type { Locale } from '@/i18n/routing';

export function getUrlWithLocale(path: string, locale: Locale): string {
  const baseUrl = websiteConfig.url.base;
  const localizedPath = `/${locale}${path}`;
  return `${baseUrl}${localizedPath}`;
}