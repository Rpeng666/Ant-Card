import { PostCard } from '@/components/blog-home/post-card';
import { Button } from '@/components/ui/button';
import { Link } from '@/i18n/routing.public';
import type { BlogType } from '@/lib/source';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import type { Locale } from 'next-intl';

interface PostFeedProps {
  posts: BlogType[];
  locale: Locale;
  showPagination?: boolean;
  currentPage?: number;
  totalPages?: number;
  baseUrl?: string;
}

/**
 * 文章列表卡片
 */
export function PostFeed({
  posts,
  locale,
  showPagination = false,
  currentPage = 1,
  totalPages = 1,
  baseUrl = '/blog',
}: PostFeedProps) {
  return (
    <section className="space-y-4">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
        {posts.map((post) => (
          <PostCard key={post.url} post={post} locale={locale} />
        ))}
      </div>

      {showPagination && totalPages > 1 && (
        <div className="flex items-center justify-center gap-2 pt-8">
          {/* 上一页 */}
          <Link
            href={
              currentPage > 1 ? `${baseUrl}?page=${currentPage - 1}` : baseUrl
            }
            className={
              currentPage === 1 ? 'pointer-events-none opacity-50' : ''
            }
          >
            <Button
              variant="outline"
              size="icon"
              disabled={currentPage === 1}
              className="h-9 w-9"
            >
              <ChevronLeft className="h-4 w-4" />
            </Button>
          </Link>

          {/* 页码 */}
          <div className="flex items-center gap-1">
            {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => {
              // 显示逻辑：首页、末页、当前页、当前页前后1页
              const showPage =
                page === 1 ||
                page === totalPages ||
                Math.abs(page - currentPage) <= 1;

              // 显示省略号
              const showEllipsis =
                (page === 2 && currentPage > 3) ||
                (page === totalPages - 1 && currentPage < totalPages - 2);

              if (!showPage && !showEllipsis) return null;

              if (showEllipsis) {
                return (
                  <span
                    key={`ellipsis-${page}`}
                    className="px-2 text-muted-foreground"
                  >
                    ...
                  </span>
                );
              }

              return (
                <Link
                  key={page}
                  href={page === 1 ? baseUrl : `${baseUrl}?page=${page}`}
                >
                  <Button
                    variant={currentPage === page ? 'default' : 'outline'}
                    size="icon"
                    className="h-9 w-9"
                  >
                    {page}
                  </Button>
                </Link>
              );
            })}
          </div>

          {/* 下一页 */}
          <Link
            href={
              currentPage < totalPages
                ? `${baseUrl}?page=${currentPage + 1}`
                : baseUrl
            }
            className={
              currentPage === totalPages ? 'pointer-events-none opacity-50' : ''
            }
          >
            <Button
              variant="outline"
              size="icon"
              disabled={currentPage === totalPages}
              className="h-9 w-9"
            >
              <ChevronRight className="h-4 w-4" />
            </Button>
          </Link>
        </div>
      )}

      {/* 简单模式：只显示查看更多 */}
      {showPagination && totalPages === 1 && (
        <div className="flex justify-center pt-8">
          <Link
            href={baseUrl}
            className="px-6 py-3 bg-primary text-primary-foreground hover:bg-primary/90 rounded-lg font-medium transition-colors shadow-md"
          >
            查看更多文章
          </Link>
        </div>
      )}
    </section>
  );
}
