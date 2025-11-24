import { BlogCategoryFilter } from '@/components/blog/blog-category-filter';
import Container from '@/components/layout/container';
import { categorySource } from '@/lib/source';
import { getTranslations } from 'next-intl/server';
import type { PropsWithChildren } from 'react';
import { Navbar } from '@/components/landing/Navbar';

interface BlogListLayoutProps extends PropsWithChildren {
  params: Promise<{ locale: string }>;
}

export default async function BlogListLayout(props: BlogListLayoutProps) {
  const { children } = props;
  const params = await props.params;
  const { locale } = params;
  const t = await getTranslations('BlogPage');

  // Filter categories by locale
  const language = locale as string;
  const categoryList = categorySource.getPages().map((category) => ({
    slug: category.slug,
    name: category.data.name,
    description: category.data.description || '',
  }));
  // console.log('categoryList', categorySource.getPages());

  return (
    <div className="min-h-screen">
      {/* 紧凑型顶部 */}
      <div >
        <Container className="py-6 px-4">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">

            <Navbar locale={language} />

          </div>
        </Container>
      </div>

      {/* 内容区域 */}
      <Container className="py-6 px-4">
        <div className="flex-shrink-0">
          <BlogCategoryFilter categoryList={categoryList} />
        </div>
        {children}
      </Container>
    </div>
  );
}
