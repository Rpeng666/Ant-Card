export interface InsightReference {
  id: string;
  title: string;
  url: string;
  source: 'hacker-news' | 'ai-base' | string;
}

export interface InsightSection {
  heading: string;
  insight: string;
  takeaways: string[];
  references: InsightReference[];
}

export interface InsightArticle {
  date: string;
  generatedAt: string;
  timezone: string;
  title: string;
  summary: string;
  highlights: string[];
  sections: InsightSection[];
  recommendedActions?: string[];
}

export interface InsightIndexEntry {
  date: string;
  file: string;
  generatedAt: string;
}
