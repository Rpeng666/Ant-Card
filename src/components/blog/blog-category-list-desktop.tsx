'use client';

import { ToggleGroup, ToggleGroupItem } from '@/components/ui/toggle-group';
import { Link } from '@/i18n/routing.public';
import { cn } from '@/lib/utils';
import type { BlogCategory } from '@/types';
import { useTranslations } from 'next-intl';
import { useParams } from 'next/navigation';

export type BlogCategoryListDesktopProps = {
  categoryList: BlogCategory[];
};

export function BlogCategoryListDesktop({
  categoryList,
}: BlogCategoryListDesktopProps) {
  const { slug } = useParams() as { slug?: string };
  const t = useTranslations('BlogPage.categories');

  return (
    <div className="flex items-center justify-center">
      <ToggleGroup
        size="sm"
        type="single"
        value={slug || 'All'}
        aria-label="Toggle blog category"
        className="h-9 overflow-hidden rounded-md space-x-1 border bg-background p-1 *:h-7 *:text-muted-foreground"
      >
        <ToggleGroupItem
          key="All"
          value="All"
          className={cn(
            'rounded-sm px-2 cursor-pointer',
            'data-[state=on]:bg-primary data-[state=on]:text-primary-foreground',
            'hover:bg-accent hover:text-accent-foreground'
          )}
          aria-label={'Toggle all blog categories'}
        >
          <Link href={'/blog'} className="px-4">
            <h2>{t('all')}</h2>
          </Link>
        </ToggleGroupItem>

        {categoryList.map((category) => (
          <ToggleGroupItem
            key={category.slug}
            value={category.slug}
            className={cn(
              'rounded-sm px-2 cursor-pointer',
              'data-[state=on]:bg-primary data-[state=on]:text-primary-foreground',
              'hover:bg-accent hover:text-accent-foreground'
            )}
            aria-label={`Toggle blog category of ${category.name}`}
          >
            <Link
              href={`/blog/category/${category.slug}`}
              className="px-4"
            >
              <h2>{category.name}</h2>
            </Link>
          </ToggleGroupItem>
        ))}
      </ToggleGroup>
    </div>
  );
}
