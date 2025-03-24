import axios from 'axios';
import { WeiboConfig, NewsItem, NewsResponse } from '../types';
import { format } from 'date-fns';

export async function getWeiboHot(config: WeiboConfig): Promise<NewsResponse> {
  const { cookie = '', limit = 50 } = config;

  try {
    const response = await axios.get('https://weibo.com/ajax/side/hotSearch', {
      headers: {
        Cookie: cookie,
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36'
      }
    });

    const items: NewsItem[] = response.data.data.realtime
      .slice(0, limit)
      .map((item: any, index: number) => ({
        title: item.note,
        url: `https://s.weibo.com/weibo?q=${encodeURIComponent(item.note)}`,
        source: '微博热搜',
        publishedAt: format(new Date(), 'yyyy-MM-dd HH:mm:ss'),
        rank: index + 1,
        category: item.category
      }));

    return {
      source: 'weibo',
      items
    };
  } catch (error) {
    console.error('Error fetching Weibo hot topics:', error);
    return {
      source: 'weibo',
      items: []
    };
  }
}