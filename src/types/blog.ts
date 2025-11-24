// Client-safe blog types
export interface BlogPost {
  slug: string;
  data: {
    title: string;
    description: string;
    date: string;
    author: string;
    categories: string[];
    tags?: string[];
    featured?: boolean;
    published?: boolean;
    image?: string;
    readTime?: string;
  };
  content: string;
}

export interface Author {
  slug: string;
  data: {
    name: string;
    avatar?: string;
    bio?: string;
  };
}

export interface Category {
  slug: string;
  data: {
    name: string;
    description?: string;
  };
}