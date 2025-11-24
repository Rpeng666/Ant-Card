'use client';

import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { Calendar, Clock, ArrowRight } from "lucide-react";
import { Navbar } from "@/components/landing/Navbar";
import { Footer } from "@/components/landing/Footer";
import { ScrollToTop } from "@/components/landing/ScrollToTop";

interface BlogPost {
  id: string;
  title: string;
  description: string;
  excerpt: string;
  author: string;
  date: string;
  readTime: string;
  category: string;
  tags: string[];
  featured: boolean;
}

export default function BlogClient() {
  const blogPosts: BlogPost[] = [
    {
      id: "ultimate-guide-md2card-creation",
      title: "The Ultimate Guide to Creating Stunning Md2Cards",
      description: "Learn everything about Md2Card creation, from basic concepts to advanced techniques. Transform your Markdown content into beautiful visual cards.",
      excerpt: "Learn everything about Md2Card creation, from basic concepts to advanced techniques. Transform your Markdown content into beautiful visual cards with our comprehensive guide.",
      author: "Sarah Chen",
      date: "2024-01-15",
      readTime: "8 min read",
      category: "Tutorials",
      tags: ["Md2Card", "Markdown", "Tutorial"],
      featured: true
    },
    {
      id: "social-media-card-design-tips",
      title: "10 Social Media Card Design Tips That Actually Work",
      description: "Discover proven strategies for creating engaging social media cards that drive engagement and conversions. From color theory to typography, learn the essentials.",
      excerpt: "Discover proven strategies for creating engaging social media cards that drive engagement and conversions. From color theory to typography, learn the essentials.",
      author: "Mike Johnson",
      date: "2024-01-10",
      readTime: "6 min read",
      category: "Design",
      tags: ["Social Media", "Design", "Marketing"],
      featured: true
    },
    {
      id: "markdown-productivity-hacks",
      title: "5 Markdown Productivity Hacks for Content Creators",
      description: "Boost your content creation efficiency with these Markdown tips and tricks. From shortcuts to templates, learn how to write better content faster.",
      excerpt: "Boost your content creation efficiency with these Markdown tips and tricks. From shortcuts to templates, learn how to write better content faster.",
      author: "Emily Davis",
      date: "2024-01-05",
      readTime: "5 min read",
      category: "Productivity",
      tags: ["Markdown", "Productivity", "Tips"],
      featured: false
    },
    {
      id: "ant-card-vs-alternatives",
      title: "Ant Card vs Other Markdown Card Generators: 2024 Comparison",
      description: "See how Ant Card stacks up against other Markdown card generators. Compare features, pricing, and performance to make the best choice for your needs.",
      excerpt: "See how Ant Card stacks up against other Markdown card generators. Compare features, pricing, and performance to make the best choice for your needs.",
      author: "David Park",
      date: "2023-12-28",
      readTime: "7 min read",
      category: "Reviews",
      tags: ["Comparison", "Tools", "Analysis"],
      featured: false
    }
  ];

  const categories = ["All", "Tutorials", "Design", "Productivity", "Reviews"];
  const [selectedCategory, setSelectedCategory] = useState("All");

  const filteredPosts = selectedCategory === "All"
    ? blogPosts
    : blogPosts.filter(post => post.category === selectedCategory);

  const featuredPosts = blogPosts.filter(post => post.featured);
  const regularPosts = filteredPosts.filter(post => !post.featured);

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

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
        <div className="mb-16">
          <h2 className="text-2xl font-bold mb-8">Featured Articles</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {featuredPosts.map((post) => (
              <Card key={post.id} className="hover:shadow-lg transition-shadow">
                <CardHeader>
                  <div className="flex items-center gap-2 text-sm text-muted-foreground mb-4">
                    <Calendar className="w-4 h-4" />
                    <span>{post.date}</span>
                    <Clock className="w-4 h-4 ml-2" />
                    <span>{post.readTime}</span>
                  </div>
                  <Badge className="w-fit mb-2">{post.category}</Badge>
                  <CardTitle className="text-xl">{post.title}</CardTitle>
                  <p className="text-muted-foreground">{post.description}</p>
                </CardHeader>
                <CardContent>
                  <div className="flex gap-2 mb-4">
                    {post.tags.map((tag) => (
                      <Badge key={tag} variant="secondary" className="text-xs">
                        {tag}
                      </Badge>
                    ))}
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-muted-foreground">
                      By {post.author}
                    </span>
                    <Button size="sm" asChild>
                      <Link href={`/blog/${post.id}`}>
                        Read More
                        <ArrowRight className="w-4 h-4 ml-2" />
                      </Link>
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Category Filter */}
        <div className="mb-12">
          <div className="flex flex-wrap gap-2 justify-center">
            {categories.map((category) => (
              <Button
                key={category}
                variant={selectedCategory === category ? "default" : "outline"}
                size="sm"
                onClick={() => setSelectedCategory(category)}
              >
                {category}
              </Button>
            ))}
          </div>
        </div>

        {/* Regular Posts */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {regularPosts.map((post) => (
            <Card key={post.id} className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="flex items-center gap-2 text-sm text-muted-foreground mb-4">
                  <Calendar className="w-4 h-4" />
                  <span>{post.date}</span>
                  <Clock className="w-4 h-4 ml-2" />
                  <span>{post.readTime}</span>
                </div>
                <Badge className="w-fit mb-2">{post.category}</Badge>
                <CardTitle className="text-lg">{post.title}</CardTitle>
                <p className="text-muted-foreground text-sm">{post.description}</p>
              </CardHeader>
              <CardContent>
                <div className="flex gap-2 mb-4">
                  {post.tags.map((tag) => (
                    <Badge key={tag} variant="secondary" className="text-xs">
                      {tag}
                    </Badge>
                  ))}
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-muted-foreground">
                    By {post.author}
                  </span>
                  <Button size="sm" variant="outline" asChild>
                    <Link href={`/blog/${post.id}`}>
                      Read More
                      <ArrowRight className="w-4 h-4 ml-2" />
                    </Link>
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Newsletter */}
        <div className="mt-16 bg-muted/50 rounded-lg p-8 text-center">
          <h2 className="text-2xl font-bold mb-4">Stay Updated</h2>
          <p className="text-muted-foreground mb-6 max-w-2xl mx-auto">
            Get the latest tips, tutorials, and updates about Ant Card delivered to your inbox.
          </p>
          <Button size="lg" asChild>
            <Link href="/app/card-editor">
              Start Creating Now
            </Link>
          </Button>
        </div>
      </main>

      <Footer />
      <ScrollToTop />
    </div>
  );
}