'use client';

import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import type { TopicConfig } from '@/config/blog-sidebar-config';
import { Link } from '@/i18n/routing.public';
import { cn } from '@/lib/utils';
import useEmblaCarousel from 'embla-carousel-react';
import { ChevronLeftIcon, ChevronRightIcon } from 'lucide-react';
import Image from 'next/image';
import { useCallback, useEffect, useState } from 'react';

interface TopicCarouselProps {
  topics: TopicConfig[];
}

/**
 * 专题轮播图
 */
export function TopicCarousel({ topics }: TopicCarouselProps) {
  const [emblaRef, emblaApi] = useEmblaCarousel({
    loop: true,
    align: 'center',
  });

  const [selectedIndex, setSelectedIndex] = useState(0);
  const [scrollSnaps, setScrollSnaps] = useState<number[]>([]);

  const scrollPrev = useCallback(() => {
    if (emblaApi) emblaApi.scrollPrev();
  }, [emblaApi]);

  const scrollNext = useCallback(() => {
    if (emblaApi) emblaApi.scrollNext();
  }, [emblaApi]);

  const scrollTo = useCallback(
    (index: number) => {
      if (emblaApi) emblaApi.scrollTo(index);
    },
    [emblaApi]
  );

  const onSelect = useCallback(() => {
    if (!emblaApi) return;
    setSelectedIndex(emblaApi.selectedScrollSnap());
  }, [emblaApi]);

  useEffect(() => {
    if (!emblaApi) return;
    onSelect();
    setScrollSnaps(emblaApi.scrollSnapList());
    emblaApi.on('select', onSelect);
    emblaApi.on('reInit', onSelect);
  }, [emblaApi, onSelect]);

  // 自动播放
  useEffect(() => {
    if (!emblaApi) return;
    const autoplay = setInterval(() => {
      emblaApi.scrollNext();
    }, 5000);
    return () => clearInterval(autoplay);
  }, [emblaApi]);

  return (
    <div className="relative">
      {/* 轮播容器 */}
      <div className="overflow-hidden rounded-2xl" ref={emblaRef}>
        <div className="flex">
          {topics.map((topic) => (
            <div key={topic.id} className="flex-[0_0_100%] min-w-0 px-4">
              <Link href={`/blog/category/${topic.slug}`}>
                <Card className="overflow-hidden hover:shadow-2xl transition-all duration-300 border-2 hover:border-primary/50">
                  <div className="relative aspect-[21/9] bg-gradient-to-br from-primary/20 via-primary/10 to-background">
                    {/* 背景图 */}
                    {topic.image ? (
                      <Image
                        src={topic.image}
                        alt={topic.name}
                        fill
                        className="object-cover opacity-30"
                        priority
                      />
                    ) : (
                      <div className="absolute inset-0 flex items-center justify-center">
                        <span className="text-9xl opacity-20">
                          {topic.icon || '📁'}
                        </span>
                      </div>
                    )}

                    {/* 内容叠加层 */}
                    <div className="absolute inset-0 flex items-center justify-center">
                      <CardContent className="text-center space-y-6 p-8 max-w-2xl">
                        {topic.badge && (
                          <Badge
                            variant="secondary"
                            className="text-sm px-4 py-1"
                          >
                            {topic.badge}
                          </Badge>
                        )}

                        <h2 className="text-4xl md:text-5xl font-bold">
                          {topic.name}
                        </h2>

                        {topic.description && (
                          <p className="text-lg text-muted-foreground">
                            {topic.description}
                          </p>
                        )}

                        <Button size="lg" className="mt-4">
                          探索更多
                        </Button>
                      </CardContent>
                    </div>
                  </div>
                </Card>
              </Link>
            </div>
          ))}
        </div>
      </div>

      {/* 上一张/下一张按钮 */}
      <Button
        variant="outline"
        size="icon"
        className="absolute left-4 top-1/2 -translate-y-1/2 size-12 rounded-full bg-background/80 backdrop-blur-sm hover:bg-background shadow-lg"
        onClick={scrollPrev}
      >
        <ChevronLeftIcon className="size-6" />
      </Button>

      <Button
        variant="outline"
        size="icon"
        className="absolute right-4 top-1/2 -translate-y-1/2 size-12 rounded-full bg-background/80 backdrop-blur-sm hover:bg-background shadow-lg"
        onClick={scrollNext}
      >
        <ChevronRightIcon className="size-6" />
      </Button>

      {/* 指示器 */}
      <div className="flex justify-center gap-2 mt-6">
        {scrollSnaps.map((_, index) => (
          <button
            key={index}
            type="button"
            className={cn(
              'size-2.5 rounded-full transition-all duration-300',
              index === selectedIndex
                ? 'bg-primary w-8'
                : 'bg-muted-foreground/30 hover:bg-muted-foreground/50'
            )}
            onClick={() => scrollTo(index)}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>
    </div>
  );
}
