export interface NewsItem {
  title: string;
  url: string;
  source: string;
  publishedAt: string;
  summary?: string;
  category?: string;
  rank?: number;
}

export interface NewsAPIConfig {
  apiKey: string;
  country?: string;
  category?: string;
  pageSize?: number;
}

export interface BingNewsConfig {
  apiKey: string;
  market?: string;
  category?: string;
  count?: number;
}

export interface WeiboConfig {
  cookie?: string;
  limit?: number;
}

export interface ZhihuConfig {
  limit?: number;
}

export interface NewsConfig {
  newsAPI?: NewsAPIConfig;
  bingNews?: BingNewsConfig;
  weibo?: WeiboConfig;
  zhihu?: ZhihuConfig;
}

export type NewsSource = 'newsapi' | 'bing' | 'weibo' | 'zhihu';

export interface NewsResponse {
  source: NewsSource;
  items: NewsItem[];
}