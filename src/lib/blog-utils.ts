import type { BlogType } from '@/lib/source';
import type { Locale } from 'next-intl';

/**
 * 博客文章工具函数
 */

/**
 * 获取已发布的文章
 */
export function getPublishedPosts(posts: BlogType[]): BlogType[] {
  return posts.filter((post) => post.data.published);
}

/**
 * 按日期排序文章（最新在前）
 */
export function sortPostsByDate(posts: BlogType[]): BlogType[] {
  return posts.sort((a, b) => {
    return new Date(b.data.date).getTime() - new Date(a.data.date).getTime();
  });
}

/**
 * 获取置顶/推荐文章
 */
export function getFeaturedPost(posts: BlogType[]): BlogType | undefined {
  // 优先查找 featured 标记的文章
  const featuredPost = posts.find((post) => post.data.featured === true);

  // 如果没有 featured，返回最新的文章
  return featuredPost || posts[0];
}

/**
 * 按分类过滤文章
 */
export function filterPostsByCategory(
  posts: BlogType[],
  category: string
): BlogType[] {
  return posts.filter((post) => {
    return post.data.categories?.includes(category);
  });
}

/**
 * 按作者过滤文章
 */
export function filterPostsByAuthor(
  posts: BlogType[],
  author: string
): BlogType[] {
  return posts.filter((post) => post.data.author === author);
}

/**
 * 分页文章
 */
export function paginatePosts(
  posts: BlogType[],
  page: number,
  pageSize: number
): {
  posts: BlogType[];
  totalPages: number;
  currentPage: number;
  hasNext: boolean;
  hasPrev: boolean;
} {
  const totalPages = Math.ceil(posts.length / pageSize);
  const startIndex = (page - 1) * pageSize;
  const endIndex = startIndex + pageSize;
  const paginatedPosts = posts.slice(startIndex, endIndex);

  return {
    posts: paginatedPosts,
    totalPages,
    currentPage: page,
    hasNext: page < totalPages,
    hasPrev: page > 1,
  };
}

/**
 * 按分类分组文章
 */
export function groupPostsByCategory(
  posts: BlogType[]
): Map<string, BlogType[]> {
  const grouped = new Map<string, BlogType[]>();

  for (const post of posts) {
    const categories = post.data.categories || [];
    for (const category of categories) {
      if (!grouped.has(category)) {
        grouped.set(category, []);
      }
      grouped.get(category)!.push(post);
    }
  }

  return grouped;
}

/**
 * 获取相关文章
 */
export function getRelatedPosts(
  currentPost: BlogType,
  allPosts: BlogType[],
  limit = 3
): BlogType[] {
  const currentCategories = currentPost.data.categories || [];

  // 过滤掉当前文章
  const otherPosts = allPosts.filter((post) => post.url !== currentPost.url);

  // 按相关度排序（共同分类数量）
  const scoredPosts = otherPosts.map((post) => {
    const postCategories = post.data.categories || [];
    const commonCategories = postCategories.filter((cat) =>
      currentCategories.includes(cat)
    );
    return {
      post,
      score: commonCategories.length,
    };
  });

  // 排序并返回指定数量
  return scoredPosts
    .sort((a, b) => b.score - a.score)
    .slice(0, limit)
    .map((item) => item.post);
}

/**
 * 获取文章摘要
 */
export function getPostExcerpt(post: BlogType, maxLength = 150): string {
  if (post.data.description) {
    return post.data.description;
  }

  // 如果没有描述，返回默认文本
  return '暂无描述';
}

/**
 * 计算文章阅读时间（基于字数，简化版本）
 */
export function calculateReadingTime(post: BlogType): number {
  // 返回默认阅读时间（可以后续根据实际内容长度调整）
  return 5; // 默认5分钟
}

/**
 * 格式化日期
 */
export function formatPostDate(
  dateString: string,
  locale: Locale = 'zh'
): string {
  const date = new Date(dateString);

  if (locale === 'zh') {
    return date.toLocaleDateString('zh-CN', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  }

  return date.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
}

/**
 * 获取所有唯一的分类
 */
export function getAllCategories(posts: BlogType[]): string[] {
  const categories = new Set<string>();

  for (const post of posts) {
    const postCategories = post.data.categories || [];
    for (const category of postCategories) {
      categories.add(category);
    }
  }

  return Array.from(categories);
}

/**
 * 获取所有唯一的作者
 */
export function getAllAuthors(posts: BlogType[]): string[] {
  const authors = new Set<string>();

  for (const post of posts) {
    if (post.data.author) {
      authors.add(post.data.author);
    }
  }

  return Array.from(authors);
}
