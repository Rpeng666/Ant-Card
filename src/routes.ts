import { websiteConfig } from './config/website';

/**
 * The routes for the application
 */
export enum Routes {
  Root = '/',

  // marketing pages
  FAQ = '/#faq',
  Features = '/#features',
  Pricing = '/pricing', // change to /#pricing if you want to use the pricing section in homepage
  Blog = '/blog',
  Docs = '/docs',
  About = '/about',
  Contact = '/contact',
  AINavigation = '/ai-navigation',
  Waitlist = '/waitlist',
  Changelog = '/changelog',
  Roadmap = 'https://mksaas.link/roadmap',
  CookiePolicy = '/cookie',
  PrivacyPolicy = '/privacy',
  TermsOfService = '/terms',

  // auth routes
  Login = '/auth/login',
  Register = '/auth/register',
  AuthError = '/auth/error',
  ForgotPassword = '/auth/forgot-password',
  ResetPassword = '/auth/reset-password',

  // dashboard routes
  Dashboard = '/dashboard',
  AdminUsers = '/admin/users',
  SettingsProfile = '/settings/profile',
  SettingsBilling = '/settings/billing',
  SettingsCredits = '/settings/credits',
  SettingsSecurity = '/settings/security',
  SettingsNotifications = '/settings/notifications',

  // AI routes
  AIText = '/ai/text',
  AIImage = '/ai/image',
  AIChat = '/ai/chat',
  AIVideo = '/ai/video',
  AIAudio = '/ai/audio',

  NewsOfAI = '/news/ai',
  NewsOfTech = '/news/tech',
  NewsOfHacker = '/news/hacker-news',
  NewsOfAiBase = '/news/ai-base',
  NewsInsights = '/news/insights',
  NewsSearch = '/news/search',
  NewsRSS = '/news/rss',
  NewsRSSFeed = '/news/rss.xml',

  // block routes
  MagicuiBlocks = '/magicui',
  HeroBlocks = '/blocks/hero-section',
  LogoCloudBlocks = '/blocks/logo-cloud',
  FeaturesBlocks = '/blocks/features',
  IntegrationsBlocks = '/blocks/integrations',
  ContentBlocks = '/blocks/content',
  StatsBlocks = '/blocks/stats',
  TeamBlocks = '/blocks/team',
  TestimonialsBlocks = '/blocks/testimonials',
  CallToActionBlocks = '/blocks/call-to-action',
  FooterBlocks = '/blocks/footer',
  PricingBlocks = '/blocks/pricing',
  ComparatorBlocks = '/blocks/comparator',
  FAQBlocks = '/blocks/faqs',
  LoginBlocks = '/blocks/login',
  SignupBlocks = '/blocks/sign-up',
  ForgotPasswordBlocks = '/blocks/forgot-password',
  ContactBlocks = '/blocks/contact',
}

/**
 * The routes that can not be accessed by logged in users
 */
export const routesNotAllowedByLoggedInUsers = [Routes.Login, Routes.Register];

/**
 * The routes that are protected and require authentication
 */
export const protectedRoutes = [
  Routes.Dashboard,
  Routes.AdminUsers,
  Routes.SettingsProfile,
  Routes.SettingsBilling,
  Routes.SettingsCredits,
  Routes.SettingsSecurity,
  Routes.SettingsNotifications,
];

/**
 * The default redirect path after logging in
 */
export const DEFAULT_LOGIN_REDIRECT =
  websiteConfig.routes.defaultLoginRedirect ?? Routes.Dashboard;
