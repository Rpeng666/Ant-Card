'use client';

import FilterItemMobile from '@/components/shared/filter-item-mobile';
import {
  Drawer,
  DrawerContent,
  DrawerOverlay,
  DrawerPortal,
  DrawerTitle,
  DrawerTrigger,
} from '@/components/ui/drawer';
import type { BlogCategory } from '@/types';
import { LayoutListIcon } from 'lucide-react';
import { useTranslations } from 'next-intl';
import { useParams } from 'next/navigation';
import { useState } from 'react';

export type BlogCategoryListMobileProps = {
  categoryList: BlogCategory[];
};

export function BlogCategoryListMobile({
  categoryList,
}: BlogCategoryListMobileProps) {
  const { slug } = useParams() as { slug?: string };
  const selectedCategory = categoryList.find(
    (category) => category.slug === slug
  );
  const [open, setOpen] = useState(false);
  const t = useTranslations('BlogPage');

  const closeDrawer = () => {
    setOpen(false);
  };

  return (
    <Drawer open={open} onClose={closeDrawer}>
      <DrawerTrigger
        onClick={() => setOpen(true)}
        className="flex items-center w-full p-4 border-y text-foreground/90 cursor-pointer"
      >
        <div className="flex items-center justify-between w-full gap-4">
          <div className="flex items-center gap-2">
            <LayoutListIcon className="size-5" />
            <span className="text-sm">{t('categories')}</span>
          </div>
          <span className="text-sm">
            {selectedCategory?.name ? `${selectedCategory?.name}` : t('categories.all')}
          </span>
        </div>
      </DrawerTrigger>
      <DrawerPortal>
        <DrawerOverlay className="fixed inset-0 z-40 bg-background/50" />
        <DrawerContent className="fixed inset-x-0 bottom-0 z-50 mt-24 overflow-hidden rounded-t-[10px] border bg-background">
          <DrawerTitle className="sr-only">{t('categories')}</DrawerTitle>
          <ul className="mb-14 w-full p-4 text-muted-foreground">
            <FilterItemMobile
              title={t('categories.all')}
              href="/blog"
              active={!slug}
              clickAction={closeDrawer}
            />

            {categoryList.map((item) => (
              <FilterItemMobile
                key={item.slug}
                title={item.name}
                href={`/blog/category/${item.slug}`}
                active={item.slug === slug}
                clickAction={closeDrawer}
              />
            ))}
          </ul>
        </DrawerContent>
      </DrawerPortal>
    </Drawer>
  );
}
