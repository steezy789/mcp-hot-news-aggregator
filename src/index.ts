import { NewsConfig, NewsResponse, NewsSource } from './types';
import { getNewsAPINews } from './sources/newsapi';
import { getBingNews } from './sources/bing';
import { getWeiboHot } from './sources/weibo';
import { getZhihuHot } from './sources/zhihu';

export * from './types';

export async function getHotNews(config: NewsConfig, sources?: NewsSource[]): Promise<NewsResponse[]> {
  const availableSources = sources || ['newsapi', 'bing', 'weibo', 'zhihu'];
  const results: NewsResponse[] = [];

  const tasks = availableSources.map(async (source) => {
    try {
      switch (source) {
        case 'newsapi':
          if (config.newsAPI) {
            const newsAPIResult = await getNewsAPINews(config.newsAPI);
            results.push(newsAPIResult);
          }
          break;
        case 'bing':
          if (config.bingNews) {
            const bingResult = await getBingNews(config.bingNews);
            results.push(bingResult);
          }
          break;
        case 'weibo':
          if (config.weibo) {
            const weiboResult = await getWeiboHot(config.weibo);
            results.push(weiboResult);
          }
          break;
        case 'zhihu':
          if (config.zhihu) {
            const zhihuResult = await getZhihuHot(config.zhihu);
            results.push(zhihuResult);
          }
          break;
      }
    } catch (error) {
      console.error(`Error fetching news from ${source}:`, error);
    }
  });

  await Promise.all(tasks);
  return results;
}

// 便捷方法
export async function getAllNews(config: NewsConfig): Promise<NewsResponse[]> {
  return getHotNews(config);
}

export async function getGlobalNews(config: NewsConfig): Promise<NewsResponse[]> {
  return getHotNews(config, ['newsapi', 'bing']);
}

export async function getChineseNews(config: NewsConfig): Promise<NewsResponse[]> {
  return getHotNews(config, ['weibo', 'zhihu']);
}