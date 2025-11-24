export interface AiBaseArticle {
  id: number;
  title: string;
  url: string;
  publishedAt: string;
  summary: string;
}

export interface AiBaseDigest {
  date: string;
  generatedAt: string;
  timezone: string;
  windowHours: number;
  maxArticles: number;
  articles: AiBaseArticle[];
}

export interface AiBaseDigestIndexEntry {
  date: string;
  file: string;
  generatedAt: string;
  articles: number;
}
