# Workflow Library：Google Search Console sitemap 与 robots.txt 发布规划

**适用版本：** 当前 Workflow Library 静态站点。  
**更新日期：** 2026-08-15。  
**正式域名：** `https://knexio.xyz`。  

> 本规划采用 `sitemap_index.xml` 和子 sitemap 的结构。这与该域名此前已验证的 Search Console 兼容模式一致；sitemap 仍只是帮助 Google 发现规范 URL 的提示，并不保证抓取、收录或排名。[1]

## 1. 当前生产 sitemap 架构

| 文件 | 正式地址 | URL 范围 | 用途 |
|---|---|---:|---|
| Sitemap index | `https://knexio.xyz/sitemap_index.xml` | 3 个子 sitemap | **Search Console 的正式提交入口**。 |
| 站点页面 sitemap | `https://knexio.xyz/sitemap-pages.xml` | 8 | 首页、内容库、阅读路径和信任页面。 |
| 指南 sitemap | `https://knexio.xyz/sitemap-guides.xml` | 12 | 所有可索引的工作流指南。 |
| 专题 sitemap | `https://knexio.xyz/sitemap-workflows.xml` | 4 | 四个专题聚合页。 |
| 兼容 sitemap | `https://knexio.xyz/sitemap.xml` | 3 个子 sitemap | 保留原提交地址可访问，同时返回与 sitemap index 相同的内容。 |
| Robots | `https://knexio.xyz/robots.txt` | 不适用 | 允许公开抓取，并指向 `sitemap_index.xml`。 |

所有子 sitemap 合计 **24 个规范 URL**。不包含 `/404`、预览域名、参数页、重复入口或任何 `noindex` 页面。

## 2. URL 分组

### 2.1 `sitemap-pages.xml`

`/`、`/guides`、`/series`、`/about`、`/editorial-policy`、`/privacy`、`/terms` 和 `/contact`。

### 2.2 `sitemap-guides.xml`

`/guides/research-brief-from-scattered-sources`、`/guides/clear-project-update-prompt`、`/guides/meeting-notes-to-action-list`、`/guides/one-week-content-plan-from-questions`、`/guides/brief-first-prompt-pattern`、`/guides/thirty-minute-project-starting-plan`、`/guides/meeting-follow-up-email`、`/guides/decision-log-from-project-notes`、`/guides/weekly-priorities-from-project-list`、`/guides/meeting-agenda-from-notes`、`/guides/customer-feedback-theme-map` 和 `/guides/project-handoff-brief`。

### 2.3 `sitemap-workflows.xml`

`/workflows/research-and-decisions`、`/workflows/writing-and-updates`、`/workflows/meetings-and-follow-up` 和 `/workflows/planning-and-priorities`。

## 3. 生成与验证

在项目根目录执行：

```bash
SITE_URL=https://knexio.xyz pnpm sitemap
```

该命令会在 `client/public/` 生成 sitemap index、三个子 sitemap、兼容 `sitemap.xml` 和 `robots.txt`。部署前应直接访问上述六个生产 URL，确认均返回 HTTP 200；三个子 sitemap 必须使用 `<urlset>`，而 index 与兼容 sitemap 必须使用 `<sitemapindex>`。

`robots.txt` 应保持如下关键行：

```txt
User-agent: *
Allow: /
Disallow: /404

Sitemap: https://knexio.xyz/sitemap_index.xml
```

Google 建议 sitemap 使用完整绝对 URL，并只提交希望在搜索结果中出现的规范 URL。[1] 不要用 robots.txt 代替页面级 `noindex`；被禁止抓取的 URL 仍可能因外链而被发现。[2]

## 4. Search Console 切换步骤

| 顺序 | 操作 | 完成标准 |
|---|---|---|
| 1 | 确认 Cloudflare 已部署最新 sitemap 文件 | `sitemap_index.xml` 与三份子 sitemap 均返回 200/XML。 |
| 2 | 在 Search Console **移除**旧的 `https://knexio.xyz/sitemap.xml` 提交记录 | 只移除提交记录，不删除线上兼容文件。 |
| 3 | 提交 `https://knexio.xyz/sitemap_index.xml` | 列表显示 index 地址，等待 Google 读取。 |
| 4 | 24–72 小时后复查 | 出现“上次读取时间”，并依次显示子 sitemap 与发现的 URL。 |
| 5 | 检查首页、`/guides` 和一篇代表文章 | URL Inspection 显示可抓取、canonical 正确；只在需要时请求单页索引。 |

不要同时把旧单一 sitemap 和 sitemap index 作为两个独立提交长期保留。线上保留 `/sitemap.xml` 仅用于旧引用兼容；Search Console 应以 `sitemap_index.xml` 为唯一正式入口。

## 5. 持续维护

新增指南、专题或重要页面时，应更新生成脚本中的分组，重新运行 `pnpm sitemap`，并将变更部署至 Cloudflare。只在内容、规范 URL、主要结构化数据或重要内部链接发生实质变化时更新 `lastmod`；无需固定频率重复提交未变更的 sitemap。[1]

## References

[1] Google Search Central, [Build and submit a sitemap](https://developers.google.com/search/docs/crawling-indexing/sitemaps/build-sitemap)

[2] Google Search Central, [Introduction to robots.txt](https://developers.google.com/search/docs/crawling-indexing/robots/intro)
