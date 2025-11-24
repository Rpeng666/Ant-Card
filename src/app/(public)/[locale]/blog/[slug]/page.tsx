import { Metadata } from "next";
import { notFound } from "next/navigation";
import { getTranslations } from "next-intl/server";
import { blogSource } from '@/lib/source';
import { BlogPostPage } from '@/components/blog/BlogPostPage';
import { constructMetadata } from '@/lib/metadata';
import { getUrlWithLocale } from '@/lib/urls/urls';
import type { Locale } from '@/i18n/routing';

export async function generateStaticParams() {
  const posts = blogSource.getPages();
  return posts.map((post) => ({
    slug: post?.slug?.split('/'),
  }));
}

export async function generateMetadata({
  params
}: {
  params: Promise<{ slug: string[]; locale: string }>;
}): Promise<Metadata> {
  const { slug: slugArray, locale: lang } = await params;
  const slug = slugArray.join('/');
  const post = blogSource.getPage(slug);

  if (!post) {
    return {
      title: "Blog Post Not Found",
    };
  }

  const t = await getTranslations({ locale: lang, namespace: "Metadata" });

  return constructMetadata({
    title: `${post.data.title} | ${t('title')}`,
    description: post.data.description,
    canonicalUrl: getUrlWithLocale(`/blog/${slug}`, lang),
  });
}

export default async function BlogPostPageComponent({
  params
}: {
  params: Promise<{ slug: string[], locale: string }>
}) {
  const { slug: slugArray, locale: lang } = await params;
  const slug = slugArray.join('/');
  const post = blogSource.getPage(slug);

  if (!post) {
    notFound();
  }

  // Find related posts
  const relatedPosts = blogSource
    .getPages()
    .filter((p) => p.id !== post.id && p.data.category === post.data.category)
    .slice(0, 3);

  return (
    <BlogPostPage
      locale={lang}
      post={post}
      relatedPosts={relatedPosts}
    />
  );
}