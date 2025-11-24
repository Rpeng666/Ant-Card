import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import {
  type TopicConfig,
  topicCategories,
} from '@/config/blog-sidebar-config';
import { Link } from '@/i18n/routing.public';
import Image from 'next/image';
import { TopicCarousel } from './topic-carousel';

interface TopicGridProps {
  topics?: TopicConfig[];
  showCarousel?: boolean;
}

/**
 * 专题宫格展示
 */
export function TopicGrid({
  topics = topicCategories,
  showCarousel = true,
}: TopicGridProps) {
  return (
    <section>
      {/* 轮播图 */}
      {showCarousel && topics.length > 0 && (
        <div className="mb-8">
          <TopicCarousel topics={topics} />
        </div>
      )}

      <div className="mb-8">
        <h2 className="text-2xl font-bold mb-2">专题介绍</h2>
        <p className="text-muted-foreground">探索不同主题的精选内容</p>
      </div>

      {/* 宫格 */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
        {topics.map((topic) => (
          <Link key={topic.id} href={`/blog/category/${topic.slug}`}>
            <Card className="hover:shadow-lg transition-all hover:scale-105 cursor-pointer h-full">
              <CardContent className="p-4 flex flex-col items-center justify-center text-center space-y-3">
                {topic.image ? (
                  <div className="relative size-16 rounded-lg overflow-hidden">
                    <Image
                      src={topic.image}
                      alt={topic.name}
                      fill
                      className="object-cover"
                    />
                  </div>
                ) : (
                  <div className="size-16 rounded-lg bg-primary/10 flex items-center justify-center">
                    <span className="text-2xl">{topic.icon || '📁'}</span>
                  </div>
                )}

                <div className="space-y-1">
                  <h3 className="font-semibold text-sm line-clamp-2">
                    {topic.name}
                  </h3>

                  {topic.badge && (
                    <Badge variant="secondary" className="text-xs">
                      {topic.badge}
                    </Badge>
                  )}
                </div>
              </CardContent>
            </Card>
          </Link>
        ))}
      </div>
    </section>
  );
}
