import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import {
  type SidebarAdConfig,
  authorInfo,
  budgetVpsConfig,
  vpsRecommendations,
} from '@/config/blog-sidebar-config';
import { Link } from '@/i18n/routing.public';
import { dailyNewsSource, techNewsSource } from '@/lib/source';
import { Routes } from '@/routes';
import {
  ArrowRightIcon,
  ExternalLinkIcon,
  GithubIcon,
  MailIcon,
  SparklesIcon,
} from 'lucide-react';

interface BlogSidebarProps {
  className?: string;
}

interface NewsItem {
  title: string;
  date: string;
  url: string;
  highlight?: boolean;
}

/**
 * VPS 推荐卡片
 */
function VpsAdCard({ ad }: { ad: SidebarAdConfig }) {
  return (
    <Card className="overflow-hidden hover:shadow-lg transition-shadow">
      <CardContent className="p-6 space-y-4">
        <div className="flex items-start justify-between">
          <div>
            <h3 className="font-bold text-xl">{ad.title}</h3>
            {ad.subtitle && (
              <p className="text-sm text-muted-foreground">{ad.subtitle}</p>
            )}
          </div>
          {ad.badge && (
            <Badge variant="destructive" className="shrink-0">
              {ad.badge}
            </Badge>
          )}
        </div>

        {ad.price && (
          <div className="text-3xl font-bold text-primary">{ad.price}</div>
        )}

        <ul className="space-y-2 text-sm">
          {ad.features.map((feature, index) => (
            <li key={index} className="flex items-center gap-2">
              <span className="size-1.5 rounded-full bg-primary" />
              {feature}
            </li>
          ))}
        </ul>

        <Button asChild className="w-full">
          <a
            href={ad.link}
            target={ad.link.startsWith('http') ? '_blank' : undefined}
            rel={ad.link.startsWith('http') ? 'noopener noreferrer' : undefined}
          >
            {ad.buttonText || '查看详情'}
            {ad.link.startsWith('http') && (
              <ExternalLinkIcon className="ml-2 size-4" />
            )}
          </a>
        </Button>
      </CardContent>
    </Card>
  );
}

/**
 * 站长简介
 */
function AuthorCard() {
  return (
    <Card>
      <CardContent className="p-6 space-y-4">
        <div className="flex items-center gap-4">
          <Avatar className="size-16">
            <AvatarImage src={authorInfo.avatar} alt={authorInfo.name} />
            <AvatarFallback>{authorInfo.name.slice(0, 2)}</AvatarFallback>
          </Avatar>
          <div>
            <h3 className="font-bold text-lg">{authorInfo.name}</h3>
            <p className="text-sm text-muted-foreground">AIGC | 智能工具创造者</p>
          </div>
        </div>

        <p className="text-sm text-muted-foreground leading-relaxed">
          {authorInfo.bio}
        </p>

        {authorInfo.social && (
          <div className="flex items-center gap-3 pt-2">
            {authorInfo.social?.youtube && (
              <a
                href={authorInfo.social.youtube}
                target="_blank"
                rel="noopener noreferrer"
                className="text-muted-foreground hover:text-primary transition-colors"
              >
                <svg
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  className="size-6"
                >
                  <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
                </svg>
              </a>
            )}
            {authorInfo.social.github && (
              <a
                href={authorInfo.social.github}
                target="_blank"
                rel="noopener noreferrer"
                className="text-muted-foreground hover:text-primary transition-colors"
              >
                <GithubIcon className="size-5" />
              </a>
            )}
            {authorInfo.social.email && (
              <a
                href={authorInfo.social.email}
                className="text-muted-foreground hover:text-primary transition-colors"
              >
                <MailIcon className="size-5" />
              </a>
            )}
          </div>
        )}
      </CardContent>
    </Card>
  );
}

/**
 * AI新闻资讯列表
 */
function NewsWidget({
  items,
  title,
  url,
}: { items: NewsItem[]; title: string; url: string }) {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-lg flex items-center gap-2">
          <SparklesIcon className="size-4 text-primary" />
          {title}
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-1 p-4 pt-0">
        {items.map((item, index) => (
          <div key={index}>
            {index > 0 && <Separator className="my-3" />}
            <Link
              href={item.url}
              className="block group hover:bg-accent p-2 rounded-md transition-colors"
            >
              <div className="flex items-start justify-between gap-2">
                <h4 className="text-sm font-medium line-clamp-2 group-hover:text-primary transition-colors flex-1">
                  {item.title}
                </h4>
                {item.highlight && (
                  <Badge
                    variant="default"
                    className="text-xs shrink-0 bg-yellow-500"
                  >
                    焦点
                  </Badge>
                )}
              </div>
              <time className="text-xs text-muted-foreground mt-1 block">
                {item.date}
              </time>
            </Link>
          </div>
        ))}

        <div className="pt-4">
          <Link
            href={url}
            className="flex items-center justify-center gap-2 text-sm text-primary hover:underline"
          >
            查看更多{title}
            <ArrowRightIcon className="size-3" />
          </Link>
        </div>
      </CardContent>
    </Card>
  );
}

/**
 * 博客侧边栏
 */
export function BlogSidebar({ className }: BlogSidebarProps) {
  // 获取最新的AI新闻
  const allNews = dailyNewsSource.getPages();
  const publishedNews = allNews.filter((news) => news.data.published);
  const sortedNews = publishedNews
    .sort((a, b) => {
      return new Date(b.data.date).getTime() - new Date(a.data.date).getTime();
    })
    .slice(0, 5); // 只取最新的5条

  const techNews = techNewsSource.getPages();
  const publishedTechNews = techNews.filter((news) => news.data.published);
  const sortedTechNews = publishedTechNews
    .sort((a, b) => {
      return new Date(b.data.date).getTime() - new Date(a.data.date).getTime();
    })
    .slice(0, 5);

  const newsItems: NewsItem[] = sortedNews.map((news) => ({
    title: news.data.title,
    date: new Date(news.data.date).toLocaleDateString('zh-CN', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    }),
    url: news.url,
    highlight: news.data.highlight || false,
  }));

  const techNewsItems: NewsItem[] = sortedTechNews.map((news) => ({
    title: news.data.title,
    date: new Date(news.data.date).toLocaleDateString('zh-CN', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    }),
    url: news.url,
    highlight: news.data.highlight || false,
  }));

  return (
    <div className={className}>
      <div className="space-y-6 lg:sticky lg:top-20">
        {/* 站长简介 */}
        <AuthorCard />

        {/* AI热门资讯 */}
        {newsItems.length > 0 && (
          <NewsWidget
            items={newsItems}
            title="AI热门资讯"
            url={Routes.NewsOfAI}
          />
        )}

        {/* 科技热门资讯 */}
        {techNewsItems.length > 0 && (
          <NewsWidget
            items={techNewsItems}
            title="科技热门资讯"
            url={Routes.NewsOfTech}
          />
        )}
      </div>
    </div>
  );
}
