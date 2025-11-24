'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { Calendar, Clock, ArrowRight, User } from 'lucide-react';
import type { BlogPost } from '@/types/blog';

interface BlogGridProps {
  posts: BlogPost[];
  locale: string;
  featured?: boolean;
}

export function BlogGrid({ posts, locale, featured = false }: BlogGridProps) {
  console.log('BlogGrid posts:', posts);
  return (
    <div className={`grid ${featured ? 'md:grid-cols-2 lg:grid-cols-3' : 'md:grid-cols-2 lg:grid-cols-3'} gap-8`}>
      {posts.map((post) => (
        <Card key={post.slug} className="hover:shadow-lg transition-shadow group">
          <CardHeader>
            <div className="flex items-center gap-2 text-sm text-muted-foreground mb-4">
              <Calendar className="w-4 h-4" />
              <span>{post.data.date}</span>
              <Clock className="w-4 h-4 ml-2" />
              <span>{post.data.readTime || '5 min read'}</span>
            </div>
            <Badge className="w-fit mb-2 capitalize">
              {post.data.categories?.[0] || 'Uncategorized'}
            </Badge>
            <CardTitle className={`${featured ? 'text-xl' : 'text-lg'} group-hover:text-primary transition-colors`}>
              {post.data.title}
            </CardTitle>
            <p className="text-muted-foreground text-sm">{post.data.description}</p>
          </CardHeader>
          <CardContent>
            <div className="flex gap-2 mb-4">
              {post.data.tags?.map((tag: string) => (
                <Badge key={tag} variant="secondary" className="text-xs capitalize">
                  {tag}
                </Badge>
              ))}
            </div>
            <div className="flex justify-between items-center">
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <User className="w-4 h-4" />
                <span className="capitalize">
                  {post.data.author?.replace('-', ' ') || 'Anonymous'}
                </span>
              </div>
              <Button
                size={featured ? "sm" : "sm"}
                variant={featured ? "default" : "outline"}
                asChild
              >
                <Link href={`/${locale}/blog/${post.slug}`}>
                  Read More
                  <ArrowRight className="w-4 h-4 ml-2" />
                </Link>
              </Button>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}