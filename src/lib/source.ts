import { type InferPageType, loader } from 'fumadocs-core/source';
import { author, blog, category } from '../../.source';
import { createMDXSource } from 'fumadocs-mdx/runtime/next';

/**
 * Blog authors source
 */

export const authorSource = loader(
  {
    baseUrl: '/author',
    // i18n: docsI18nConfig,
    source: createMDXSource(author),
  });

/**
 * Blog categories source
 */
export const categorySource = loader(
  {
    baseUrl: '/category',
    // i18n: docsI18nConfig,
    source: createMDXSource(category),
  });

/**
 * Blog posts source
 */
export const blogSource = loader(
  {
    baseUrl: '/blog',
    source: createMDXSource(blog),
    // i18n: docsI18nConfig,
  });


export type AuthorType = InferPageType<typeof authorSource>;
export type CategoryType = InferPageType<typeof categorySource>;
export type BlogType = InferPageType<typeof blogSource>;
