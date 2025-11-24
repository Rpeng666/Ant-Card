import { PostCard } from '@/components/blog-home/post-card';
import { BlogCardSkeleton } from '@/components/blog/blog-card';
import { websiteConfig } from '@/config/website';
import type { Locale } from 'next-intl';

interface BlogGridProps {
  locale: Locale;
  posts: any[];
}

export default function BlogGrid({ locale, posts }: BlogGridProps) {
  // console.log('BlogGrid, posts', posts);
  return (
    <div>
      {posts?.length > 0 && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          {posts.map((post) => (
            <PostCard
              key={post.slug}
              locale={locale}
              post={{
                ...post,
                url: `/blog/${post.slug}`
              }}
            />
          ))}
        </div>
      )}
    </div>
  );
}

export function BlogGridSkeleton({
  count = websiteConfig.blog.paginationSize,
}: { count?: number }) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
      {[...Array(count)].map((_, index) => (
        <BlogCardSkeleton key={index} />
      ))}
    </div>
  );
}
