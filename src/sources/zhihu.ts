import axios from 'axios';
import { ZhihuConfig, NewsItem, NewsResponse } from '../types';
import { format } from 'date-fns';

export async function getZhihuHot(config: ZhihuConfig): Promise<NewsResponse> {
  const { limit = 50 } = config;

  try {
    const response = await axios.get('https://www.zhihu.com/api/v3/feed/topstory/hot-lists/total', {
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36'
      }
    });

    const items: NewsItem[] = response.data.data
      .slice(0, limit)
      .map((item: any, index: number) => ({
        title: item.target.title,
        url: `https://www.zhihu.com/question/${item.target.id}`,
        source: '知乎热榜',
        publishedAt: format(new Date(item.target.created * 1000), 'yyyy-MM-dd HH:mm:ss'),
        summary: item.target.excerpt,
        rank: index + 1,
        category: item.target.type
      }));

    return {
      source: 'zhihu',
      items
    };
  } catch (error) {
    console.error('Error fetching Zhihu hot topics:', error);
    return {
      source: 'zhihu',
      items: []
    };
  }
}