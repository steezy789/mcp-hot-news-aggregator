import axios from 'axios';
import { NewsAPIConfig, NewsItem, NewsResponse } from '../types';
import { format } from 'date-fns';

export async function getNewsAPINews(config: NewsAPIConfig): Promise<NewsResponse> {
  const { apiKey, country = 'us', category = 'general', pageSize = 10 } = config;

  try {
    const response = await axios.get('https://newsapi.org/v2/top-headlines', {
      params: {
        apiKey,
        country,
        category,
        pageSize
      }
    });

    const items: NewsItem[] = response.data.articles.map((article: any) => ({
      title: article.title,
      url: article.url,
      source: article.source.name,
      publishedAt: format(new Date(article.publishedAt), 'yyyy-MM-dd HH:mm:ss'),
      summary: article.description,
      category
    }));

    return {
      source: 'newsapi',
      items
    };
  } catch (error) {
    console.error('Error fetching NewsAPI news:', error);
    return {
      source: 'newsapi',
      items: []
    };
  }
}