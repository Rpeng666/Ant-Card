'use client';

import { ArrowLeft, Calendar, Clock, User, ArrowRight, Share2 } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import Link from 'next/link';
import { Navbar } from '@/components/landing/Navbar';
import { Footer } from '@/components/landing/Footer';
import { ScrollToTop } from '@/components/landing/ScrollToTop';
import type { InferPageType } from 'fumadocs-core/source';
import { blogSource } from '@/fumadocs.config';

type BlogType = InferPageType<typeof blogSource>;

interface BlogPostPageProps {
  locale: string;
  post: BlogType;
  relatedPosts: BlogType[];
}

export function BlogPostPage({ locale, post, relatedPosts }: BlogPostPageProps) {
  const tableOfContents = post.content
    .split('\n')
    .filter(line => line.startsWith('## '))
    .map(line => ({
      title: line.replace('## ', ''),
      anchor: line.replace('## ', '').toLowerCase().replace(/\s+/g, '-'),
    }));

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      <main className="container py-12 max-w-4xl">
        {/* Navigation */}
        <div className="mb-8">
          <Button variant="ghost" size="sm" asChild>
            <Link href={`/${locale}/blog`}>
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Blog
            </Link>
          </Button>
        </div>

        {/* Article Header */}
        <div className="text-center space-y-4 mb-12">
          <Badge className="w-fit capitalize">{post.data.category}</Badge>
          <h1 className="text-3xl lg:text-4xl font-bold">
            {post.data.title}
          </h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            {post.data.description}
          </p>
          <div className="flex items-center justify-center gap-4 text-sm text-muted-foreground">
            <div className="flex items-center gap-2">
              <Calendar className="w-4 h-4" />
              <span>{post.data.date}</span>
            </div>
            <div className="flex items-center gap-2">
              <Clock className="w-4 h-4" />
              <span>{post.data.readTime || '5 min read'}</span>
            </div>
            <div className="flex items-center gap-2">
              <User className="w-4 h-4" />
              <span className="capitalize">
                By {post.data.author?.replace('-', ' ') || 'Anonymous'}
              </span>
            </div>
          </div>
          <div className="flex flex-wrap justify-center gap-2 mt-4">
            {post.data.tags?.map((tag: string) => (
              <Badge key={tag} variant="secondary" className="capitalize">
                {tag}
              </Badge>
            ))}
          </div>
        </div>

        {/* Share Buttons */}
        <div className="flex justify-center gap-4 mb-12">
          <Button variant="outline" size="sm">
            <Share2 className="w-4 h-4 mr-2" />
            Share
          </Button>
        </div>

        {/* Table of Contents */}
        {tableOfContents.length > 0 && (
          <Card className="mb-12">
            <CardContent className="p-6">
              <h2 className="text-lg font-semibold mb-4">Table of Contents</h2>
              <nav>
                <ul className="space-y-2">
                  {tableOfContents.map((item) => (
                    <li key={item.anchor}>
                      <Link
                        href={`#${item.anchor}`}
                        className="text-muted-foreground hover:text-primary transition-colors"
                      >
                        {item.title}
                      </Link>
                    </li>
                  ))}
                </ul>
              </nav>
            </CardContent>
          </Card>
        )}

        {/* Article Content */}
        <div className="prose prose-gray dark:prose-invert max-w-none">
          <div dangerouslySetInnerHTML={{ __html: post.content }} />
        </div>

        {/* Related Posts */}
        {relatedPosts.length > 0 && (
          <div className="mt-16">
            <h2 className="text-2xl font-bold mb-8">Related Articles</h2>
            <div className="grid md:grid-cols-3 gap-6">
              {relatedPosts.map((relatedPost) => (
                <Card key={relatedPost.slug} className="hover:shadow-lg transition-shadow">
                  <CardContent className="p-6">
                    <div className="flex items-center gap-2 text-sm text-muted-foreground mb-2">
                      <Calendar className="w-4 h-4" />
                      <span>{relatedPost.data.date}</span>
                    </div>
                    <h3 className="font-semibold mb-2">{relatedPost.data.title}</h3>
                    <p className="text-sm text-muted-foreground mb-4">
                      {relatedPost.data.description}
                    </p>
                    <Button size="sm" variant="outline" asChild>
                      <Link href={`/${locale}/blog/${relatedPost.slug}`}>
                        Read More
                        <ArrowRight className="w-4 h-4 ml-2" />
                      </Link>
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        )}

        {/* CTA */}
        <div className="mt-16 text-center">
          <div className="bg-muted/50 rounded-lg p-8">
            <h2 className="text-2xl font-bold mb-4">
              Ready to Create Your Own Md2Cards?
            </h2>
            <p className="text-muted-foreground mb-6 max-w-2xl mx-auto">
              Start transforming your Markdown content into beautiful visual cards with Ant Card.
            </p>
            <Button size="lg" asChild>
              <Link href="/app/card-editor">
                Get Started Free
              </Link>
            </Button>
          </div>
        </div>
      </main>

      <Footer />
      <ScrollToTop />
    </div>
  );
}