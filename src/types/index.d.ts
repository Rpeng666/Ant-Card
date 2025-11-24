import type { ReactNode } from 'react';
import type { PricePlan } from '@/payment/types';
import type { CreditPackage } from '@/credits/types';

/**
 * website config, without translations
 */
export type WebsiteConfig = {
  ui: UiConfig;
  metadata: MetadataConfig;
  features: FeaturesConfig;
  routes: RoutesConfig;
  analytics: AnalyticsConfig;
  auth: AuthConfig;
  i18n: I18nConfig;
  blog: BlogConfig;
  docs: DocsConfig;
  dailyNews?: DailyNewsConfig;
  mail: MailConfig;
  newsletter: NewsletterConfig;
  storage: StorageConfig;
  payment: PaymentConfig;
  price: PriceConfig;
  credits: CreditsConfig;
};

/**
 * UI configuration
 */
export interface UiConfig {
  mode?: ModeConfig;
  theme?: ThemeConfig;
}

/**
 * Website metadata
 */
export interface MetadataConfig {
  images?: ImagesConfig;
  social?: SocialConfig;
}

export interface ModeConfig {
  defaultMode?: 'light' | 'dark' | 'system';                  // The default mode of the website
  enableSwitch?: boolean;                                     // Whether to enable the mode switch
}

export interface ThemeConfig {
  defaultTheme?: 'default' | 'blue' | 'green' | 'amber' | 'neutral'; // The default theme of the website
  enableSwitch?: boolean;                                     // Whether to enable the theme switch
}

export interface ImagesConfig {
  ogImage?: string;                                           // The image as Open Graph image
  logoLight?: string;                                         // The light logo image
  logoDark?: string;                                          // The dark logo image
}

/**
 * Social media configuration
 */
export interface SocialConfig {
  twitter?: string;
  github?: string;
  discord?: string;
  blueSky?: string;
  mastodon?: string;
  youtube?: string;
  linkedin?: string;
  facebook?: string;
  instagram?: string;
  tiktok?: string;
  telegram?: string;
    email?: string;
}

/**
 * Website features
 */
export interface FeaturesConfig {
  enableCrispChat?: boolean;          // Whether to enable the crisp chat
  enableUpgradeCard?: boolean;        // Whether to enable the upgrade card in the sidebar
  enableUpdateAvatar?: boolean;       // Whether to enable the update avatar in settings
  enableAffonsoAffiliate?: boolean;   // Whether to enable affonso affiliate
  enablePromotekitAffiliate?: boolean;   // Whether to enable promotekit affiliate
  enableDatafastRevenueTrack?: boolean;   // Whether to enable datafast revenue tracking
  enableTurnstileCaptcha?: boolean;   // Whether to enable turnstile captcha
}

/**
 * Routes configuration
 */
export interface RoutesConfig {
  defaultLoginRedirect?: string;      // The default login redirect route
}

/**
 * Analytics configuration
 */
export interface AnalyticsConfig {
  enableVercelAnalytics?: boolean;    // Whether to enable vercel analytics
  enableSpeedInsights?: boolean;      // Whether to enable speed insights
}

export interface AuthConfig {
  enableGoogleLogin?: boolean;       // Whether to enable google login
  enableGithubLogin?: boolean;       // Whether to enable github login
  enableCredentialLogin?: boolean;   // Whether to enable email/password login
}

/**
 * I18n configuration
 */
export interface I18nConfig {
  defaultLocale: string;              // The default locale of the website
  locales: Record<string, { flag?: string; name: string }>; // The locales of the website
}

/**
 * Blog configuration
 */
export interface BlogConfig {
  enable: boolean;                   // Whether to enable the blog
  paginationSize: number;            // Number of posts per page
  relatedPostsSize: number;          // Number of related posts to show
}

/**
 * Docs configuration
 */
export interface DocsConfig {
  enable: boolean;                   // Whether to enable the docs
}

/**
 * Daily News configuration
 */
export interface DailyNewsConfig {
  enable: boolean;                   // Whether to enable the daily news
  paginationSize: number;            // Number of news items per page
}

/**
 * Mail configuration
 */
export interface MailConfig {
  provider: 'resend';                // The email provider, only resend is supported for now
  fromEmail?: string;                // The email address to send from
  supportEmail?: string;             // The email address to send support emails to
}

/**
 * Newsletter configuration
 */
export interface NewsletterConfig {
  enable: boolean;                   // Whether to enable the newsletter
  provider: 'resend';                 // The newsletter provider, only resend is supported for now
  autoSubscribeAfterSignUp?: boolean; // Whether to automatically subscribe users to the newsletter after sign up
}

/**
 * Storage configuration
 */
export interface StorageConfig {
  enable: boolean;                   // Whether to enable the storage
  provider: 's3';                    // The storage provider, only s3 is supported for now
}

/**
 * Payment configuration
 */
export interface PaymentConfig {
  provider: 'stripe';                // The payment provider, only stripe is supported for now
}

/**
 * Price configuration
 */
export interface PriceConfig {
  plans: Record<string, PricePlan>;  // Plans indexed by ID
}

/**
 * Credits configuration
 */
export interface CreditsConfig {
  enableCredits: boolean;            // Whether to enable credits
  enablePackagesForFreePlan: boolean;// Whether to enable purchase credits for free plan users
  registerGiftCredits: {
    enable: boolean;                 // Whether to enable register gift credits
    amount: number;                  // The amount of credits to give to the user
    expireDays?: number;             // The number of days to expire the credits, undefined means no expire
  };
  packages: Record<string, CreditPackage>;  // Packages indexed by ID
}

/**
 * menu item, used for navbar links, sidebar links, footer links
 */
export type MenuItem = {
  title: string;                      // The text to display
  description?: string;               // The description of the item
  icon?: ReactNode;                   // The icon to display
  href?: string;                      // The url to link to
  external?: boolean;                 // Whether the link is external
  authorizeOnly?: string[];           // The roles that are authorized to see the item
};

/**
 * nested menu item, used for navbar links, sidebar links, footer links
 */
export type NestedMenuItem = MenuItem & {
  items?: MenuItem[];                // The items to display in the nested menu
};

/**
 * Blog Category
 *
 * we can not pass CategoryType from server component to client component
 * so we need to define a new type, and use it in the client component
 */
export type BlogCategory = {
  slug: string;
  name: string;
  description: string;
};
