# MCP Hot News Aggregator

这是一个用于聚合多个热点新闻来源的 MCP（Model-Controller-Provider）模块。它支持从以下来源获取热点新闻：

- NewsAPI.org - 全球新闻
- Bing News Search API - 微软新闻搜索
- 新浪微博热搜
- 知乎热榜

## 安装

```bash
npm install @steezy789/mcp-hot-news-aggregator
```

## 配置

你需要配置相应的 API 密钥才能使用某些新闻源：

1. NewsAPI.org API Key - 从 https://newsapi.org/register 获取
2. Bing News Search API Key - 从 Azure 门户获取
3. 微博 Cookie（可选）- 用于获取更多数据

## 使用方法

### 基本用法

```typescript
import { getHotNews, NewsConfig } from '@steezy789/mcp-hot-news-aggregator';

const config: NewsConfig = {
  newsAPI: {
    apiKey: 'your_newsapi_key',
    country: 'us',
    category: 'technology'
  },
  bingNews: {
    apiKey: 'your_bing_api_key',
    market: 'en-US'
  },
  weibo: {
    cookie: 'your_weibo_cookie',
    limit: 50
  },
  zhihu: {
    limit: 50
  }
};

// 获取所有来源的新闻
const allNews = await getHotNews(config);

// 获取特定来源的新闻
const specificNews = await getHotNews(config, ['newsapi', 'bing']);
```

### 便捷方法

```typescript
import { getAllNews, getGlobalNews, getChineseNews } from '@steezy789/mcp-hot-news-aggregator';

// 获取所有来源的新闻
const allNews = await getAllNews(config);

// 只获取国际新闻（NewsAPI 和 Bing News）
const globalNews = await getGlobalNews(config);

// 只获取中文新闻（微博和知乎）
const chineseNews = await getChineseNews(config);
```

### 返回数据格式

```typescript
interface NewsItem {
  title: string;        // 新闻标题
  url: string;         // 新闻链接
  source: string;      // 新闻来源
  publishedAt: string; // 发布时间
  summary?: string;    // 新闻摘要（如果有）
  category?: string;   // 新闻分类（如果有）
  rank?: number;      // 排名（仅用于微博和知乎）
}

interface NewsResponse {
  source: 'newsapi' | 'bing' | 'weibo' | 'zhihu';
  items: NewsItem[];
}
```

## 新闻源特点

### NewsAPI
- 提供全球新闻
- 支持多个国家和语言
- 支持分类筛选
- 需要 API 密钥

### Bing News
- 微软提供的新闻搜索
- 支持多个市场和语言
- 提供趋势新闻
- 需要 API 密钥

### 微博热搜
- 中国最大的社交媒体平台热点
- 实时更新
- 提供热度排名
- Cookie 可选（但推荐提供以获取更多数据）

### 知乎热榜
- 中国最大的问答社区热点
- 话题深度讨论
- 提供热度排名
- 无需认证

## 注意事项

1. API 限制
   - NewsAPI 免费版每天限制 100 次请求
   - Bing News API 需要 Azure 订阅
   - 微博和知乎可能会限制频繁访问

2. 错误处理
   - 所有 API 调用都有错误处理
   - 如果某个源失败，不会影响其他源的获取
   - 建议实现自己的错误处理逻辑

3. 数据刷新
   - 建议根据实际需求设置合适的缓存策略
   - 不同源的数据更新频率不同

## 许可证

MIT