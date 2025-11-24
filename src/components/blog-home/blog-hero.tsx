import { Badge } from '@/components/ui/badge';
import { Link } from '@/i18n/routing.public';
import { formatPostDate } from '@/lib/blog-utils';
import type { BlogType } from '@/lib/source';
import { ArrowRightIcon, ClockIcon } from 'lucide-react';
import type { Locale } from 'next-intl';
import Image from 'next/image';

interface BlogHeroProps {
  post: BlogType;
  locale: Locale;
}

/**
 * 博客首页主推文章横幅
 */
export function BlogHero({ post, locale }: BlogHeroProps) {
  return (
    <section className="relative w-full bg-gradient-to-br from-primary/10 via-background to-background border-b">
      <div className="container mx-auto px-4 py-12 md:py-16">
        <div className="grid lg:grid-cols-2 gap-8 items-center">
          {/* 左侧：文章信息 */}
          <div className="space-y-4">
            {post.data.badge && (
              <Badge variant="secondary" className="mb-2">
                {post.data.badge}
              </Badge>
            )}

            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight">
              {post.data.title}
            </h1>

            {post.data.description && (
              <p className="text-lg text-muted-foreground">
                {post.data.description}
              </p>
            )}

            <div className="flex items-center gap-4 text-sm text-muted-foreground">
              <time dateTime={post.data.date}>
                {formatPostDate(post.data.date, locale)}
              </time>
              <span className="flex items-center gap-1">
                <ClockIcon className="size-4" />
                <span>5 分钟阅读</span>
              </span>
            </div>

            <div className="pt-4">
              <Link
                href={post.url}
                className="inline-flex items-center gap-2 px-6 py-3 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors font-medium"
              >
                阅读全文
                <ArrowRightIcon className="size-4" />
              </Link>
            </div>
          </div>

          {/* 右侧：文章封面 */}
          <div className="relative aspect-[16/10] rounded-lg overflow-hidden shadow-2xl">
            <Image
              src={post.data.image || '/images/blog/placeholder.png'}
              alt={post.data.title}
              fill
              className="object-cover"
              priority
            />
          </div>
        </div>
      </div>
    </section>
  );
}
