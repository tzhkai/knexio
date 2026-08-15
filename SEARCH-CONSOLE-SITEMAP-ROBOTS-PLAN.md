# Workflow Library：Google Search Console sitemap 与 robots.txt 发布规划

**适用版本：** 当前 Workflow Library 静态站点。  
**编写日期：** 2026-08-15。  
**使用前提：** 请先将下文的 `https://www.example.com` 替换为唯一的正式 HTTPS 域名；不要在同一份 sitemap 中混用 `www` 与非 `www`、`http` 与 `https`，或临时预览域名。

> 本文是技术发布规划，不是 Google 收录或排名保证。Sitemap 是帮助 Google 发现规范 URL 的提示，而不是保证抓取、收录或排名的指令。[1]

## 1. 发布目标与规范 URL 原则

当前站点应在正式域名根目录公开以下两个文件：

| 文件 | 正式位置 | 用途 |
|---|---|---|
| XML sitemap | `https://www.example.com/sitemap.xml` | 向搜索引擎列出希望被发现的规范、可索引页面。 |
| robots 文件 | `https://www.example.com/robots.txt` | 提供爬取规则并声明 sitemap 的绝对 URL。 |

Sitemap 中只应放入希望出现在搜索结果中的**绝对规范 URL**。当前项目不应提交 `/404`、临时预览 URL、重复参数页、未完成页面或任何 `noindex` 页面。Google 建议使用完整绝对 URL；同一内容若存在不同入口，应仅提交首选 canonical URL。[1]

目前网站共规划 **24 个规范 URL**：8 个站点/信任/聚合页、12 篇指南和 4 个主题页。对于当前规模，一份根目录 XML sitemap 足够；不需要 sitemap index。单个 sitemap 到达 50,000 个 URL 或 50 MB（未压缩）前，无需拆分。[1]

## 2. 当前 sitemap URL 清单

下列路径都应以正式域名为前缀，例如 `https://www.example.com/guides/...`。

### 2.1 站点与信任页面

| 路径 | 页面角色 | 是否纳入 |
|---|---|---|
| `/` | 首页 | 是 |
| `/guides` | 全部指南库 | 是 |
| `/series` | 按顺序阅读专题 | 是 |
| `/about` | 关于项目 | 是 |
| `/editorial-policy` | 编辑方法 | 是 |
| `/privacy` | 隐私与 Cookie 说明 | 是 |
| `/terms` | 服务条款 | 是 |
| `/contact` | 联系页面 | 是 |

### 2.2 指南文章

| 路径 | 页面标题简述 |
|---|---|
| `/guides/research-brief-from-scattered-sources` | 从分散来源制作研究简报 |
| `/guides/clear-project-update-prompt` | 撰写清晰的项目更新 |
| `/guides/meeting-notes-to-action-list` | 将会议纪要转为行动列表 |
| `/guides/one-week-content-plan-from-questions` | 从真实问题制作一周内容计划 |
| `/guides/brief-first-prompt-pattern` | 使用 brief-first 提示词模式 |
| `/guides/thirty-minute-project-starting-plan` | 制作 30 分钟项目起步计划 |
| `/guides/meeting-follow-up-email` | 撰写会议跟进邮件 |
| `/guides/decision-log-from-project-notes` | 从项目笔记制作决策记录 |
| `/guides/weekly-priorities-from-project-list` | 从项目清单规划周优先级 |
| `/guides/meeting-agenda-from-notes` | 从上次笔记制作会议议程 |
| `/guides/customer-feedback-theme-map` | 从客户反馈制作主题图 |
| `/guides/project-handoff-brief` | 制作项目交接说明 |

### 2.3 主题聚合页

| 路径 | 主题 |
|---|---|
| `/workflows/research-and-decisions` | 研究与决策 |
| `/workflows/writing-and-updates` | 写作与更新 |
| `/workflows/meetings-and-follow-up` | 会议与跟进 |
| `/workflows/planning-and-priorities` | 计划与优先级 |

## 3. XML sitemap 模板

以下是正式发布后 `/sitemap.xml` 的结构模板。实际文件应由项目内置脚本生成，以避免漏掉新增文章。`<lastmod>` 只应在页面的主要内容、结构化数据或重要链接发生实质变化时更新；Google 会在其准确且可验证时使用这个值，且忽略 `<priority>` 与 `<changefreq>`。[1]

```xml
<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <url>
    <loc>https://www.example.com/</loc>
    <lastmod>2026-08-15</lastmod>
  </url>
  <url>
    <loc>https://www.example.com/guides</loc>
    <lastmod>2026-08-15</lastmod>
  </url>
  <url>
    <loc>https://www.example.com/series</loc>
    <lastmod>2026-08-15</lastmod>
  </url>
  <url>
    <loc>https://www.example.com/guides/customer-feedback-theme-map</loc>
    <lastmod>2026-08-15</lastmod>
  </url>
  <!-- 继续列出本规划第 2 节中的其余规范 URL -->
</urlset>
```

### 当前项目的生成命令

项目已经包含生成脚本。绑定正式域名后，在项目根目录执行：

```bash
SITE_URL=https://www.example.com pnpm sitemap
```

该命令会将 `sitemap.xml` 与 `robots.txt` 生成到 `client/public/`。只有在 `SITE_URL` 与最终 canonical 域名完全一致时才执行；例如你最终选择非 `www` 域名，就应使用 `https://example.com`，并在全站 canonical、Open Graph、Search Console 属性和 sitemap 中保持一致。

## 4. robots.txt 模板

正式 `/robots.txt` 应使用以下最小模板：

```txt
User-agent: *
Allow: /
Disallow: /404

Sitemap: https://www.example.com/sitemap.xml
```

这套规则允许搜索引擎抓取公开页面，排除专门的错误路由，并在根文件中声明 XML sitemap。不要用 robots.txt 来隐藏已公开的 HTML 页面：Google 说明，被 `Disallow` 的 URL 仍可能因外部链接而出现在搜索结果中；若需要排除索引，应使用 `noindex`、访问控制或移除页面。[2]

不要屏蔽 JavaScript、CSS、图片或正文资源，除非确认屏蔽后不会影响 Google 理解页面。对当前站点而言，不建议添加诸如 `Disallow: /assets/`、`Disallow: /client/` 或宽泛通配规则。

## 5. Google Search Console 提交流程

| 顺序 | 操作 | 完成标准 |
|---|---|---|
| 1 | 选择一个正式 canonical 域名 | 全站均使用同一个 HTTPS 主机名和 URL 形式。 |
| 2 | 发布站点与两个根文件 | 浏览器直接访问 `/sitemap.xml` 与 `/robots.txt` 均返回 200。 |
| 3 | 创建 Search Console 资源并完成所有权验证 | 资源与正式域名范围匹配；不要提交临时预览域名。 |
| 4 | 在 **Sitemaps** 报告中提交 `sitemap.xml` | 状态可读取；Google 未报告解析错误。 |
| 5 | 用 **URL Inspection** 检查首页、`/guides`、`/series` 和一篇指南 | URL 可访问、canonical 符合预期，必要时再请求抓取。 |
| 6 | 检查 Page indexing、Sitemaps 和 Performance 报告 | 修复服务器错误、意外 noindex、重复 canonical 或 sitemap 解析问题。 |

Search Console 可用于提交 sitemap 和单个 URL、查看抓取与索引信息、检查问题，并分析展示、点击和查询数据。[3] 对于新站，先让首页、内容库、专题页和代表性文章完成正常抓取，再根据真实的展示查询决定下一篇内容，而不是反复手动提交同一 URL。

## 6. 发布前检查清单

- [ ] 正式域名已启用 HTTPS，且只选定一个 canonical 版本。
- [ ] `/sitemap.xml` 返回 XML，不是 HTML 404 页或登录页。
- [ ] `/robots.txt` 返回纯文本，`Sitemap:` 使用正式绝对 URL。
- [ ] Sitemap 仅含本规划第 2 节的规范、可索引 URL；不含 `/404` 与预览 URL。
- [ ] 每个 sitemap URL 都能返回 200，并能从站内导航或链接抵达。
- [ ] 文章内容、作者/审校信息、隐私政策和联系信息已改为真实上线版本。
- [ ] Search Console 资源已验证，sitemap 已提交，并完成至少四个代表 URL 的检查。

## 7. 持续维护规则

新增指南或专题页时，应同步完成以下事项：将新 URL 加入 sitemap 生成逻辑；确认页面有自指 canonical、可见内部链接和适当的结构化数据；在内容发生实质变化后更新准确的 `lastmod`；随后在 Search Console 检查新页面的 URL Inspection 与后续索引状态。无需按固定频率重复提交同一份未变化 sitemap；在新增或实质更新 URL 后重新生成即可。

## References

[1] Google Search Central, [Build and submit a sitemap](https://developers.google.com/search/docs/crawling-indexing/sitemaps/build-sitemap)

[2] Google Search Central, [Introduction to robots.txt](https://developers.google.com/search/docs/crawling-indexing/robots/intro)

[3] Google, [Search Console overview](https://search.google.com/search-console/about)
