/**
 * 序列化的新闻项类型
 * 用于在 Server Component 和 Client Component 之间传递数据
 */
export interface SerializedNewsItem {
  url: string;
  title: string;
  description?: string;
  date: string;
  tags: string[];
  summary: string;
  highlight: boolean;
}
