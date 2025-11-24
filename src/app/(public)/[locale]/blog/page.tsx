import { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import BlogGridWithPagination from '@/components/blog/blog-grid-with-pagination';
import { websiteConfig } from '@/config/website';
import { constructMetadata } from '@/lib/metadata';
import { getUrlWithLocale } from '@/lib/urls/urls';
import type { Locale } from '@/i18n/routing';
import type { BlogPost } from '@/types/blog';
import { blogSource } from "@/lib/source";

// export async function generateStaticParams() {
//   const posts = blogSource.getPages();
//   return posts
// }

export async function generateMetadata(props: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const params = await props.params;
  const { locale: lang } = params;
  const t = await getTranslations({ locale: lang, namespace: "Metadata" });
  const pt = await getTranslations({ locale: lang, namespace: "BlogPage" });

  return constructMetadata({
    title: `${pt('title')} | ${t('title')}`,
    description: pt('description'),
    canonicalUrl: getUrlWithLocale('/blog', lang),
  });
}

// Convert server blog data to client-safe format
function convertToClientBlogPost(serverPost: ServerBlogType): BlogPost {
  return {
    slug: serverPost.slug,
    data: {
      title: serverPost.data.title || '',
      description: serverPost.data.description || '',
      date: serverPost.data.date || '',
      author: serverPost.data.author || '',
      categories: serverPost.data.categories || [],
      tags: serverPost.data.tags || [],
      featured: serverPost.data.featured || false,
      published: serverPost.data.published !== false,
      image: serverPost.data.image,
      readTime: serverPost.data.readTime,
    },
    content: serverPost.content,
  };
}

export default async function BlogPage(props: {
  params: Promise<{ locale: string }>;
}) {
  const params = await props.params;
  const { locale: lang } = params;
  const posts = blogSource.getPages();
  const publishedPosts = posts.filter((post) => post.data.published !== false);
  const sortedPosts = publishedPosts.sort((a, b) => {
    return new Date(b.data.date).getTime() - new Date(a.data.date).getTime();
  });

  const currentPage = 1;
  const blogPageSize = websiteConfig.blog.paginationSize;
  const paginatedPosts = sortedPosts.slice(
    (currentPage - 1) * blogPageSize,
    currentPage * blogPageSize
  );
  const totalPages = Math.ceil(sortedPosts.length / blogPageSize);

  // Convert to client-safe format
  const clientPosts = paginatedPosts.map(convertToClientBlogPost);


  return (
    <BlogGridWithPagination
      locale={lang}
      posts={clientPosts}
      totalPages={totalPages}
      routePrefix="/blog"
    />
  );
}