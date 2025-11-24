import { Badge } from '@/components/ui/badge';
import { Card } from '@/components/ui/card';
import { Link } from '@/i18n/routing.public';
import { formatPostDate } from '@/lib/blog-utils';
import type { BlogType } from '@/lib/source';
import { CalendarIcon, ClockIcon } from 'lucide-react';
import type { Locale } from 'next-intl';
import Image from 'next/image';

interface PostCardProps {
  post: BlogType;
  locale: Locale;
  showReadTime?: boolean;
  readTime?: string;
}

/**
 * 文章卡片组件 - 横向布局，图片背景 + 文字悬浮
 *
 * @param post - 文章数据
 * @param locale - 语言环境
 * @param showReadTime - 是否显示阅读时间
 * @param readTime - 阅读时间文本
 */
export function PostCard({
  post,
  locale,
  showReadTime = true,
  readTime = '5 min',
}: PostCardProps) {
  return (
    <Link href={post.url}>
      <Card className="hover:shadow-md transition-all hover:border-primary/50 cursor-pointer overflow-hidden h-40 relative group">
        {/* 背景图片 */}
        <div className="absolute inset-0">
          <Image
            src={post.data.image || '/images/blog/placeholder.png'}
            alt={post.data.title}
            fill
            className="object-cover transition-transform group-hover:scale-105"
          />
          {/* 渐变遮罩 */}
          <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/60 to-black/40" />
        </div>

        {/* 悬浮内容 */}
        <div className="relative z-10 h-full flex flex-col justify-between p-4 pt-3 text-white">
          <div className="flex-1 space-y-1.5">
            {/* 第一行：文章标题 */}
            <h3 className="font-bold text-lg line-clamp-2 group-hover:text-primary transition-colors drop-shadow-lg leading-tight">
              {post.data.title}
            </h3>

            {/* 第二行：徽章和分类 */}
            <div className="flex items-center gap-2 flex-wrap">
              {post.data.badge && (
                <Badge className="text-xs shadow-lg bg-primary text-primary-foreground">
                  {post.data.badge}
                </Badge>
              )}
              {post.data.categories &&
                post.data.categories.length > 0 &&
                post.data.categories.slice(0, 2).map((category) => (
                  <Badge
                    key={category}
                    variant="outline"
                    className="text-xs px-2 py-0 border-white/30 text-white"
                  >
                    {category}
                  </Badge>
                ))}
            </div>

            {/* 文章描述 */}
            {post.data.description && (
              <p className="text-xs text-white/90 line-clamp-2 leading-relaxed drop-shadow">
                {post.data.description}
              </p>
            )}
          </div>

          {/* 底部信息 */}
          <div className="flex items-center gap-4 text-xs text-white/80 drop-shadow">
            <time dateTime={post.data.date} className="flex items-center gap-1">
              <CalendarIcon className="size-3" />
              {formatPostDate(post.data.date, locale)}
            </time>
            {showReadTime && (
              <span className="flex items-center gap-1">
                <ClockIcon className="size-3" />
                {readTime}
              </span>
            )}
          </div>
        </div>
      </Card>
    </Link>
  );
}
