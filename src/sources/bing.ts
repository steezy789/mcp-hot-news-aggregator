import axios from 'axios';
import { BingNewsConfig, NewsItem, NewsResponse } from '../types';
import { format } from 'date-fns';

export async function getBingNews(config: BingNewsConfig): Promise<NewsResponse> {
  const { apiKey, market = 'en-US', category = '', count = 10 } = config;

  try {
    const response = await axios.get('https://api.bing.microsoft.com/v7.0/news/trendingtopics', {
      headers: {
        'Ocp-Apim-Subscription-Key': apiKey
      },
      params: {
        mkt: market,
        category,
        count
      }
    });

    const items: NewsItem[] = response.data.value.map((article: any) => ({
      title: article.name,
      url: article.newsSearchUrl,
      source: 'Bing News',
      publishedAt: format(new Date(article.datePublished), 'yyyy-MM-dd HH:mm:ss'),
      summary: article.description,
      category: article.category
    }));

    return {
      source: 'bing',
      items
    };
  } catch (error) {
    console.error('Error fetching Bing news:', error);
    return {
      source: 'bing',
      items: []
    };
  }
}