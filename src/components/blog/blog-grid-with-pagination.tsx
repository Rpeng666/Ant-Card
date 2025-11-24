'use client';

import { BlogGrid } from './BlogGrid';
import CustomPagination from '../shared/pagination';
import { Navbar } from '@/components/landing/Navbar';
import { Footer } from '@/components/landing/Footer';
import { ScrollToTop } from '@/components/landing/ScrollToTop';
import type { BlogPost } from '@/types/blog';

interface BlogGridWithPaginationProps {
  locale: string;
  posts: BlogType[];
  totalPages: number;
  routePrefix: string;
}

export default function BlogGridWithPagination({
  locale,
  posts,
  totalPages,
  routePrefix,
}: BlogGridWithPaginationProps) {
  const featuredPosts = posts.filter(post => post.data.featured);
  const regularPosts = posts.filter(post => !post.data.featured);

  console.log('BlogGridWithPagination posts:', posts);
  console.log('BlogGridWithPagination featuredPosts:', featuredPosts);
  console.log('BlogGridWithPagination regularPosts:', regularPosts);

  return (
    <div className="min-h-screen bg-background">

      <main className="container py-20">
        {/* Header */}
        <div className="text-center space-y-6 mb-16">
          <h1 className="text-4xl lg:text-6xl font-bold">
            Ant Card Blog
          </h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Tips, tutorials, and insights about creating stunning Md2Cards with Ant Card.
            Learn from experts and transform your content creation workflow.
          </p>
        </div>

        {/* Featured Posts */}
        {featuredPosts.length > 0 && (
          <div className="mb-16">
            <h2 className="text-2xl font-bold mb-8">Featured Articles</h2>
            <BlogGrid posts={featuredPosts} locale={locale} featured />
          </div>
        )}

        {/* Regular Posts */}
        {/* {regularPosts.length > 0 && (
          <div>
            <h2 className="text-2xl font-bold mb-8">All Articles</h2>
            <BlogGrid posts={regularPosts} locale={locale} featured={false} />
          </div>
        )} */}

        {/* Pagination */}
        {/* {totalPages > 1 && (
          <div className="mt-12 flex items-center justify-center">
            <CustomPagination
              routePrefix={routePrefix}
              totalPages={totalPages}
            />
          </div>
        )} */}

        {/* Newsletter */}
        <div className="mt-16 bg-muted/50 rounded-lg p-8 text-center">
          <h2 className="text-2xl font-bold mb-4">Stay Updated</h2>
          <p className="text-muted-foreground mb-6 max-w-2xl mx-auto">
            Get the latest tips, tutorials, and updates about Ant Card delivered to your inbox.
          </p>
          <a
            href="/app/card-editor"
            className="inline-flex items-center justify-center rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-primary text-primary-foreground hover:bg-primary/90 h-11 px-8 py-2"
          >
            Start Creating Now
          </a>
        </div>
      </main>

      <Footer />
      <ScrollToTop />
    </div>
  );
}
