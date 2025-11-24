export type HackerNewsStoryType = 'top' | 'new';

export interface HackerNewsStory {
  id: number;
  title: string;
  hnUrl: string;
  externalUrl?: string | null;
  score: number;
  by: string;
  commentsCount: number;
  publishedAt: string;
  commentSummary: string;
}

export interface HackerNewsDigestMetadata {
  generatedAt: string;
  windowHours: number;
  storyType: HackerNewsStoryType;
  minScore: number;
  timezone: string;
}

export interface HackerNewsDigest extends HackerNewsDigestMetadata {
  date: string;
  stories: HackerNewsStory[];
}

export interface HackerNewsDigestIndexEntry {
  date: string;
  file: string;
  stories: number;
  generatedAt: string;
}
